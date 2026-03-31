import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 ROLE STATE
  const [role, setRole] = useState("student");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // 🔥 SAVE ROLE
    localStorage.setItem("role", role);

    // 🔥 REDIRECT BASED ON ROLE
    if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/company/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-[#111111] p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-2 text-center">
          Create an account
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer"
          >
            Log in
          </span>
        </p>

        {/* 🔥 ROLE SELECTOR */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">Sign up as</p>

          <div className="flex gap-2">
            {/* INTERN */}
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-xl transition-all duration-300 ${role === "student"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/5 text-gray-400 hover:scale-105"
                }`}
            >
              🎓 Intern
            </button>

            {/* COMPANY */}
            <button
              type="button"
              onClick={() => setRole("company")}
              className={`flex-1 py-2 rounded-xl transition-all duration-300 ${role === "company"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/5 text-gray-400 hover:scale-105"
                }`}
            >
              🏢 Company
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all duration-300"
          >
            Sign up
          </button>
        </form>

        {/* TERMS */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}