import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import AuthFormLayout from "../Hooks/AuthFormLayout";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     await login(username, password);
     toast.success("Login Successful!")
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };
  

  return (
    
    <AuthFormLayout
      title="Login"
      subtitle="Don't have an account?"
      linkText="Sign Up"
      linkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </AuthFormLayout>
    
  );
}
