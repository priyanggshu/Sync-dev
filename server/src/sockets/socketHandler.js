import { Server } from "socket.io";
import { SocketEvent } from "./types/socket";
import { USER_CONNECTION_STATUS } from "./types/user";

let userSocketMap = [];

const getUsersInRoom = (roomId) => {
  return userSocketMap.filter((user) => user.roomId == roomId);
};

const getRoomId = (socketId) => {
  const roomId = userSocketMap.find(
    (user) => user.socketId === socketId
  )?.roomId;
  if (!roomId) {
    console.error(`RoomId is undefined for socketID ${socketId}`);
    return null;
  }
  return roomId;
};

const getUserBySocketId = (socketId) => {
  const user = userSocketMap.find((user) => user.socketId == socketId);
  if (!user) {
    console.error(`User not found for SocketId ${socketId}`);
    return null;
  }
  return user;
};

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
      const userExists = getUsersInRoom(roomId).filter(
        (u) => u.username == username
      );
      if (userExists.length > 0) {
        io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
        return;
      }

      const user = {
        username,
        roomId,
        status: USER_CONNECTION_STATUS.ONLINE,
        cursorPosition: 0,
        typing: false,
        socketId: socket.id,
        currentFile: null,
      };

      userSocketMap.push(user);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });

      const users = getUsersInRoom(roomId);
      io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
    });

    socket.on("disconnecting", () => {
      const user = getUserBySocketId(socket.id);
      if (!user) return;
      const roomId = user.roomId;
      socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
      userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
      socket.leave(roomId);
    });

    socket.on(
      SocketEvent.SYNC_FILE_STRUCTURE,
      ({ fileStructure, openFiles, activeFile, socketId }) => {
        io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
          fileStructure,
          openFiles,
          activeFile,
        });
      }
    );

    socket.on(
      SocketEvent.DIRECTORY_CREATED,
      ({ parentDirId, newDirectory }) => {
        const roomId = getRoomId(socket.id);
        if (!roomId) return;

        socket.broadcast
          .to(roomId)
          .emit(SocketEvent.DIRECTORY_CREATED, { parentDirId, newDirectory });
      }
    );

    socket.on(SocketEvent.DIRECTORY_UPDATED, ({ dirId, children }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.DIRECTORY_UPDATED, { dirId, children });
    });

    socket.on(SocketEvent.DIRECTORY_RENAMED, ({ dirId, newName }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.DIRECTORY_RENAMED, { dirId, newName });
    });

    socket.on(SocketEvent.DIRECTORY_DELETED, ({ dirId }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.DIRECTORY_DELETED, { dirId });
    });

    socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.FILE_CREATED, { parentDirId, newFile });
    });

    socket.on(SocketEvent.FILE_UPDATED, ({ fileID, newContent }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.FILE_UPDATED, { fileID, newContent });
    });

    socket.on(SocketEvent.FILE_RENAMED, ({ fileID, newName }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.FILE_RENAMED, { fileID, newName });
    });

    socket.on(SocketEvent.FILE_DELETED, ({ fileID }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;

      socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileID });
    });

    socket.on(SocketEvent.USER_OFFLINE, () => {
      const socketId = socket.id;

      userSocketMap = userSocketMap.map((user) => 
          user.socketId === socketId
            ? { ...user, status: USER_CONNECTION_STATUS.OFFLINE }
            : user
      );

      const roomId = getRoomId(socketId)
      if(!roomId) return
      
      socket.broadcast
          .to(roomId)
          .emit(SocketEvent.USER_OFFLINE, {socketId})
  });

    socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
      userSocketMap = userSocketMap.map((user) => {
        if (user.socketId == socketId) {
          return { ...user, status: USER_CONNECTION_STATUS.ONLINE };
        }
        return user;
      });
      const roomId = getRoomId(socketId);
      if (!roomId) return;
      socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId });
    });

    socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;
      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.RECEIVE_MESSAGE, { message });
    });

    socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
      userSocketMap = userSocketMap.map((user) => {
        if (user.socketId === socket.id) {
          return { ...user, typing: true, cursorPosition };
        }
        return user;
      });
      const user = getUserBySocketId(socket.id);
      if (!user) return;
      const roomId = user.roomId;
      socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user });
    });

    socket.on(SocketEvent.TYPING_PAUSE, () => {
      userSocketMap = userSocketMap.map((user) => {
        if (user.socketId === socket.id) {
          return { ...user, typing: false };
        }
        return user;
      });
      const user = getUserBySocketId(socket.id);
      if (!user) return;
      const roomId = user.roomId;
      socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user });
    });

    socket.on(SocketEvent.REQUEST_DRAWING, () => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;
      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.REQUEST_DRAWING, { socketId: socket.id });
    });

    socket.on(SocketEvent.SYNC_DRAWING, ({ drawingData, socketId }) => {
      socket.broadcast
        .to(socketId)
        .emit(SocketEvent.SYNC_DRAWING, { drawingData });
    });

    socket.on(SocketEvent.DRAWING_UPDATE, ({ snapshot }) => {
      const roomId = getRoomId(socket.id);
      if (!roomId) return;
      socket.broadcast
        .to(roomId)
        .emit(SocketEvent.DRAWING_UPDATE, { snapshot });
    });
  });
};
