import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  // const { user, connectGoogleDrive, googleDriveDetails, changeGoogleDrive } = useAuth();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-300 to-blue-500 relative">
      {/* Background Waves */}
      <div className="absolute inset-0 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: "url('/wave-pattern.svg')" }}></div>
      
      {/* Branding */}
      <div className="text-center text-white mt-8 z-10 relative">
        <h1 className="text-4xl font-bold">Syncade</h1>
        <p className="text-lg">A collaborative real-time code editor with cloud backup</p>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-16 my-10 p-6 relative z-10">
        {/* Left Section - Profile & Google Drive */}
        <div className="md:w-1/2 w-full p-6 bg-blue-50 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {username ? username.slice(0, 2).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{username || "User"}</h2>
                <p className="text-gray-600">{user?.email || "email@example.com"}</p>
                <button className="mt-2 bg-red-500 text-white">Logout</button>
              </div>
            </div>
            
            <div className="mt-6">
              {googleDriveDetails ? (
                <div>
                  <p className="text-gray-800">Google Drive Connected</p>
                  <p className="text-gray-600">Account: {googleDriveDetails.email}</p>
                  <button onClick={changeGoogleDrive} className="mt-2 bg-red-500 text-white">Change Google Drive Account</button>
                </div>
              ) : (
                <button onClick={connectGoogleDrive} className="mt-4 bg-blue-500 text-white">Connect Google Drive</button>
              )}
            </div>
          </div>
          
          <p className="italic text-gray-700 text-sm mt-6">"This real-time code editor seamlessly backs up and restores files to and from Google Drive."</p>
        </div>

        {/* Right Section - Room Entry */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full"
          />
          <Button className="w-full bg-green-500 text-white">Join Room</Button>
          <Button className="mt-4 w-full bg-blue-500 text-white">Create New Room</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
