import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import auth from "../assets/auth.jpg";

const inputStyle = "block w-full p-4 mb-4 border rounded-lg placeholder:text-black bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnPrimary = "bg-blue-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition w-full font-semibold shadow-md";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-8 py-6 md:flex-row md:py-0 md:px-24 bg-gray-50">
      {/* Mobile View - Branding */}
      <div className="md:hidden flex flex-col items-center justify-center text-center w-full p-8 bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-lg mb-2">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Syncade 🔂</h1>
        <p className="text-lg text-gray-700 font-medium">Collaborate. Code. Sync.</p>
        <p className="text-md text-gray-600 font-light">Real-time collaboration with effortless backup ☁️</p>
      </div>

      {/* Left Section - Branding */}
      <div className="md:w-3/5 hidden md:flex flex-col justify-center items-center text-center p-16 bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-black mb-2">Syncade🔂</h1>
        <p className="text-xl text-gray-800 font-semibold">Collaborate. Code. Sync.</p>
        <p className="text-lg text-gray-900 mt-1 font-light">Real-time collaboration with seamless backup ☁️</p>
        <img src={auth} alt="Signup Illustration" className="w-xl mt-4 rounded-lg shadow-md" />
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-3/5 lg:w-2/5 bg-white p-10 md:p-14 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <input type="text" name="username" placeholder="👤 Username" value={form.username} onChange={handleChange} className={inputStyle} />
          <input type="email" name="email" placeholder="📧 Email" value={form.email} onChange={handleChange} className={inputStyle} />
          <input type="password" name="password" placeholder="🔒 Password" value={form.password} onChange={handleChange} className={inputStyle} />
          <button type="submit" className={btnPrimary}>Sign Up ✨</button>
        </form>
        <button onClick={handleGoogleSignup} className="mt-6 py-3 flex items-center justify-center w-full font-semibold bg-gray-200 text-gray-700 border p-3 rounded-lg hover:bg-blue-100 shadow-sm transition">
          <FcGoogle className="mr-2 text-2xl" /> Sign up with Google
        </button>
        <p className="text-center font-light mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login 🔥</Link></p>
      </div>
    </div>
  );
}

export default Signup;
