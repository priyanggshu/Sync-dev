export const USER_CONNECTION_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
};

export const USER = {
    username: string,
    roomId: string,
    status: USER_CONNECTION_STATUS,
    cursorPosition: Number,
    typing: Boolean,
    currentFile: string | null,
    socketId: string
};

