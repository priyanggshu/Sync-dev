import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import auth from "../assets/auth.jpg";

const inputStyle = "block w-full p-4 mb-4 border rounded-lg md:placeholder:text-gray-700 bg-transparent text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnPrimary = "bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-800 transition w-full font-semibold shadow-md";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-5 text-gray-200 relative px-4 py-8 animated-gradient">
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

      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 md:bg-gradient-to-br md:from-[#edede9] md:to-transparent flex-col justify-center items-center p-10 text-center bg-opacity-30 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-extrabold text-white md:text-black mb-4">Syncade  🔂</h1>
        <p className="text-xl text-gray-300 md:text-gray-800 font-semibold">Collaborate. Code. Sync.</p>
        <p className="text-lg text-gray-400 md:text-gray-900 mt-2 font-extralight">Real-time collaboration with effortless Google Drive backup ☁️</p>
        <img src={auth} alt="Login Illustration" className="max-w-sm mt-6 rounded-xl shadow-md" />
      </div>

      {/* Mobile View - Branding & Illustration */}
      <div className="md:hidden flex flex-col items-center justify-center text-center mb-6 w-full p-6 bg-gradient-to-br from-[#f0ebd9] to-transparent rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-black mb-2">Syncade  🔂</h1>
        <p className="text-xl text-gray-300 font-semibold italic">Collaborate. Code. Sync.</p>
        <p className="text-md text-gray-400 font-light">Real-time collaboration with effortless backup ☁️</p>
      </div>

      {/* Right Section - Login Form */}
      <div className="relative md:bg-gradient-to-br md:from-[#e8e7e2] md:to-blue-100 md:border border-gray-700 p-10 rounded-xl shadow-2xl max-w-md w-full md:w-1/2 flex flex-col items-center">
        <img src={auth} alt="Login Illustration" className="absolute inset-0 w-full h-full object-cover opacity-55 rounded-xl md:hidden" />
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 relative z-10">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full relative z-10">
          <input type="email" name="email" placeholder="📧 Email" value={form.email} onChange={handleChange} className={`${inputStyle} shadow-xl placeholder:text-white` } />
          <input type="password" name="password" placeholder="🔒 Password" value={form.password} onChange={handleChange} className={`${inputStyle} shadow-xl placeholder:text-white`} />
          <button type="submit" className={`${btnPrimary} mt-6`}>Login 🔥</button>
        </form>
        <button onClick={handleGoogleLogin} className="mt-6 py-3 flex items-center justify-center w-full font-semibold bg-[#FDC987] text-white md:text-gray-500 border p-3 rounded-lg hover:bg-indigo-200 shadow-sm transition relative gap-1 z-10">
          <FcGoogle className="mr-2 scale-150 text-2xl" /> Login with Google
        </button>
        <p className="text-center font-light mt-4 text-gray-900 md:text-gray-600 relative z-10">Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign Up ✨</Link></p>
      </div>
    </div>
  );
}

export default Login;
