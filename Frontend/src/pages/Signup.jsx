import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-50 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to manage your projects
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex cursor-pointer justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;