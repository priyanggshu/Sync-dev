import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./Socket_Context";

const ChatContext = createContext();

export const useChatRoomContext = () => {
    const context = useContext(chatContext);
    if(!context) {
        throw new Error("useChatRoomContext must be used within a ChatContextProvider");
    };
    return context;
};

function ChatContextProvider({ children }) {
    const {socket} = useSocket();
    const [messages, setMessages] = useState();
    const [isNewMessage, setIsNewMessage] = useState(false); 
    const [lastScrollHeight, setLastScrollHeight] = useState(0);
    
    useEffect(() => {
        socket.on(
            "RECEIVE_MESSAGE",
            ({ message }) => {
                setMessages((message) => [...messages, message]);
                setIsNewMessage(true);
            }
        );
        return () => {
            socket.off("RECEIVE_MESSAGE");
        }
    }, [socket]);

    return (
        <ChatContext.Provider value={{
            messages, setMessages,
            isNewMessage, setIsNewMessage,
            lastScrollHeight, setLastScrollHeight
        }}>
            { children }
        </ChatContext.Provider>
    )
};

export { ChatContextProvider }
export default ChatContext;