export const USER_CONNECTION_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
};

export const USER = {
    username: String,
    roomId: String,
    status: USER_CONNECTION_STATUS,
    cursorPosition: Number,
    typing: Boolean,
    currentFile: String | null,
    socketId: String
};

