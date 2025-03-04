import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const BASE_URL="https://simplerecipesbackend.onrender.com"


  // Extract token from URL
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const extractedToken = query.get("token");
    setToken(extractedToken);
    console.log("Extracted Token:", extractedToken); // Debugging
  }, [location.search]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    console.log("Sending request with:", { token, password }); // Debugging

    try {
      const response = await axios.post(`${BASE_URL}/api/reset-password`, {
        token,
        password,
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error:", error.response?.data); // Debugging
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {message && (
        <p style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
      <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mt-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
