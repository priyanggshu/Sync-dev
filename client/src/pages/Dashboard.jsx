import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Button, Input } from "@/components/ui/button";

const Dashboard = () => {
  // const { user, connectGoogleDrive, googleDriveDetails, changeGoogleDrive } = useAuth();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState(user?.username || "");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section: Profile and Quotes */}
      <div className="md:w-1/2 w-full p-6 bg-gray-100 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
          {googleDriveDetails ? (
            <div className="mt-4">
              <p className="text-gray-800">Google Drive Connected</p>
              <p className="text-gray-600">Account: {googleDriveDetails.email}</p>
              <Button onClick={changeGoogleDrive} className="mt-2 bg-red-500 text-white">
                Change Google Drive Account
              </Button>
            </div>
          ) : (
            <Button onClick={connectGoogleDrive} className="mt-4">
              Connect Google Drive
            </Button>
          )}
        </div>
        <div>
          <p className="italic text-lg text-gray-800">"Code together, build together."</p>
          <p className="text-gray-600">- Real-time collaborative coding at its best.</p>
        </div>
      </div>

      {/* Right Section: Room Inputs */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Join or Create a Room</h2>
        <Input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-4 w-full"
        />
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full"
        />
        <Button className="w-full">Join Room</Button>
        <Button className="mt-4 w-full bg-blue-500 text-white">Create New Room</Button>
      </div>
    </div>
  );
};

export default Dashboard;
