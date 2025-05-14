

import welcomeImg from '../Hooks/welcome-img.jpg';
import { Link } from 'react-router-dom';

export default function AuthFormLayout({ children, title, subtitle, linkText, linkTo }) {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">

      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
         <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-blue-400 p-8 md:p-10 text-white flex flex-col justify-center items-center">
        
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome to</h2>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-300">Kanban Board</h1>
          <p className="text-base md:text-lg mb-6 text-center">Organize your workflow visually</p>
          <img src={welcomeImg} alt="Logo" className="w-39 h-39 md:w-40 object-cover rounded-full shadow-lg " />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
          {children}
         
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
