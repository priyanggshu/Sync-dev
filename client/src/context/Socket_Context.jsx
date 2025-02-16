import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { useAppContext } from "./App_Context.jsx";

const SocketContext = createContext(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if(!context) {
        throw new Error("useSocket must be used within a SocketContextProvider")
    }
    return context
};

const BACKEND_URL = import.meta.VITE_BACKEND_URL

export const SocketContextProvider = ({ children }) => {
    const { users, setUsers, 
        setStatus, setCurrentUser, 
        drawingData, setDrawingData 
    } = useAppContext()
    
    const socket = useMemo(() => io(BACKEND_URL, {
        reconnectionAttempts: 2
    }), [])

    const handleError = useCallback((err) => {
        console.log("Socket Error: ", err);
        setStatus("Connection-failed");
        toast.dismiss();
        toast.error("Failed to connect to the server");
    }, [setStatus]);

    const handleUsernameExist = useCallback(() => {
        toast.dismiss();
        setStatus("initial");
        toast.error("Username already exists in the room. Please choose another.");
    }, [setStatus]);

    const handleJoiningAccept = useCallback(({ user, users}) => {
        setCurrentUser(user);
        setUsers(users);
        toast.dismiss();
        setStatus("joined");

        if(users.length > 1) {
            toast.loading("Syncing data, please wait...");
        }
    }, [setCurrentUser, setStatus, setUsers]);

    const handleUserLeft = useCallback(({user}) => {
        toast.success(`${user.username} left the room`);
        setUsers(users.filter((u) => u.username !== user.username));
    }, [setUsers, users]);

    const handleRequestDrawing = useCallback(({ socketId }) => {
        socket.emit("sync-drawing", { socketId, drawingData });
    }, [drawingData, socket]);

    const handleDrawingSync = useCallback(({ drawingData }) => {
        setDrawingData(drawingData);
    }, [setDrawingData])


    useEffect(() => {
        socket.on("connection_error", handleError);
        socket.on("connection_failed", handleError);
        socket.on("username-exists", handleUsernameExist);
        socket.on("join-accepted", handleJoiningAccept);
        socket.on("user-disconnected", handleUserLeft);
        socket.on("request-drawing", handleRequestDrawing);
        socket.on("sync-drawing", handleDrawingSync);

        return () => {
            socket.off("connection_error", handleError);
            socket.off("connection_failed", handleError);
            socket.off("username-exists", handleUsernameExist);
            socket.off("join-accepted", handleJoiningAccept);
            socket.off("user-disconnected", handleUserLeft);
            socket.off("request-drawing", handleRequestDrawing);
            socket.off("sync-drawing", handleDrawingSync);
        }
    }, [
        handleError,
        handleUsernameExist,
        handleJoiningAccept,
        handleUserLeft,
        handleRequestDrawing,
        handleDrawingSync,
        setUsers,
        socket
    ]);

    return (
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    );
}

export default SocketContext;