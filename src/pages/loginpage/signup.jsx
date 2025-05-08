import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import AuthFormLayout from '../Hooks/AuthFormLayout'; 
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';

export default function Signup() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const { signup } = useAuth();
  const navigate = useNavigate();
  
  

const handleSubmit = async(e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return;
  }

  try {
   await signup(username, password, email);
    toast.success("Signup successful!")
    navigate("/login");
  } catch (error) {
    toast.error("Invalid credentials: " + error.message)
  }
};

  return (
    <AuthFormLayout
      title="Create an Account"
      subtitle="Already have an account?"
      linkText="Login"
      linkTo="/login"  
    >
      <form onSubmit={handleSubmit} className="space-y-6">
      
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

       
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

       
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

       
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

     
        <div>
          <button
            type="submit"
            
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md"
          >
            Sign Up
          </button>
        </div>

    
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{"/login "}
          <Link to="/login" className="text-blue-600 underline font-medium">
            Login here
          </Link>
        </p>
      </form>
    </AuthFormLayout>
  );
}
