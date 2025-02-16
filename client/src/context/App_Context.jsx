import { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppCOntext must be used within an AppContextProvider");
    }
    return context;
}

export function AppContextProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("initial");
    const [currentUser, setCurrentUser] = useState({
        username: "",
        roomId: ""
    });
    const [activityState, setActivityState] = useState("coding");
    const [drawingData, setDrawingData] = useState(null);

    return (
        <AppContext.Provider
        value={{
            users, setUsers,
            status, setStatus,
            drawingData, setDrawingData,
            currentUser, setCurrentUser,
            activityState, setActivityState
        }}>
            { children }
        </AppContext.Provider>
    )
};

export default AppContext;
