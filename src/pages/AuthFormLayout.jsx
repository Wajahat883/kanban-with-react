import { useContext } from 'react';
import { AuthContext } from './auth-context'; // Importing AuthContext
import welcomeimage from './welcome-img.jpg';
import { Link } from 'react-router-dom';

export default function AuthFormLayout({ children, title, subtitle, linkText, linkTo }) {
  const { user, logout } = useContext(AuthContext); // useContext se user aur logout ko access kar rahe hain

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden max-w-4xl w-full">
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-blue-400 p-10 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to</h2>
          <h1 className="text-5xl font-extrabold mb-4 text-yellow-300">Kanban Board</h1>
          <p className="text-lg mb-10">Organize your workflow visually</p>
          <img src={welcomeimage} alt="Logo" className="w-40 h-40 object-cover rounded-full shadow-lg mt-4" />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
          {children}
          {user && (
            <div className="mt-4 text-center">
              <p>Welcome back, {user.username}!</p>
              <button onClick={logout} className="text-red-600">Logout</button>
            </div>
          )}
          <p className="text-center mt-4 text-sm text-gray-500">
            {subtitle}{" "}
            <Link to={linkTo} className="text-blue-600 underline font-medium">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
