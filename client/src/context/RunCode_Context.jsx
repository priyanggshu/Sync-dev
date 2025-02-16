import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/";
import langMap from "lang-map";
import toast from "react-hot-toast";
import { useFileSystem } from "./File_Context";

const RunCodeContext = createContext(null);

export const useRunCodeContext = () => {
    const context = useContext(RunCodeContext);
    if(!context) {
        throw new Error("useRunCode must be used within a RunCodeContextProvider");
    }
    return context;
}

const RunCodeContextProvider = ({ children }) => {
}