import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // const { user, connectGoogleDrive, googleDriveDetails, changeGoogleDrive } = useAuth();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center text-gray-200 px-4 py-8 animated-gradient">
      <style>
        {`
        @keyframes rotateGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background: linear-gradient(-45deg, #121212, #2a0e3f, #102925, #1b0a2a);
          background-size: 400% 400%;
          animation: rotateGradient 8s ease infinite;
        }
        `}
      </style>
      
      {/* Left Section: Profile and Quotes */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-center p-10 bg-opacity-30 rounded-2xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-white md:text-black mb-4">Syncade 🔂</h1>
        <p className="text-xl text-gray-300 md:text-gray-800 font-semibold">Collaborate. Code. Sync.</p>
        <p className="text-lg text-gray-400 md:text-gray-900 mt-2 font-extralight">Real-time collaboration with effortless Google Drive backup ☁️</p>
      </div>

      {/* Right Section: Room Inputs */}
      <div className="relative md:bg-gradient-to-br md:from-[#e8e7e2] md:to-blue-100 md:border border-gray-700 p-10 rounded-xl shadow-2xl max-w-md w-full md:w-1/2 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Join or Create a Room</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="block w-full p-4 mb-4 border rounded-lg bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-4 mb-4 border rounded-lg bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-800 transition w-full font-semibold shadow-md">Join Room</Button>
        <Button className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md">Create New Room</Button>
        <button className="mt-6 py-3 flex items-center justify-center w-full font-semibold bg-[#FDC987] text-white border p-3 rounded-lg hover:bg-indigo-200 shadow-sm transition relative gap-1">
          <FcGoogle className="mr-2 scale-150 text-2xl" /> Connect Google Drive
        </button>
      </div>
    </div>
  );
};

export default Dashboard;