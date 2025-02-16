import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./App_Context";
import { useSocketContext } from "./Socket_Context";