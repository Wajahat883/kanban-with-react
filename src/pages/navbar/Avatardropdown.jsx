import { useState,useRef,useEffect,useContext } from "react";
import { ThemeContext } from "../Hooks/ThemeContext";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Sun, Moon,User,LayoutDashboard,Settings } from 'lucide-react';
import soloing from "../Hooks/solo.jpg"

function AvatarDropdown (){
     const {theme,toggleTheme}=useContext(ThemeContext);
     const {logout}=useAuth()
     const [open,setopen]=useState(false)
     const dropdownref =useRef(null)
     const navigate =useNavigate();

const storedUser = JSON.parse(localStorage.getItem("user"))
const username = storedUser?.username||"Guest"
const email = storedUser?.email||"No email found"
const role = storedUser?.role ||"Project-Manager"
const avatar =storedUser?.avatar||soloing;

     useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownref.current&&!dropdownref.current.contains(event.target)){
                setopen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=> document.removeEventListener("mousedown",handleClickOutside)
     },[]);

     const handleLogout=()=>{
        logout();
        navigate("/")
     }
     return (
        <div className="relative" ref={dropdownref}>
            <button onClick={()=>setopen(!open)} className="rounded-full border-2 border-white overflow-hidden w-9 h-9">
                <img src={soloing}  alt="avatar" className="w-full h-full object-cover" />

            </button>
            {open&&(
               <div className="absolute right-0 mt-2 w-64 max-[90vw] sm:w-72 bg-white dark:bg-slate-800 text-black dark:text-white border dark:border-gray-700 shadow-xl rounded-md z-50">
          <div className="p-4 border-b dark:border-gray-600 ">
            <div className="p-2 dark:border-gray-600 flex items-center gap-4">
  <img 
    src={avatar}
    alt="user avatar"
    className="w-10 h-10 rounded-full object-cover border-2 border-white  "
  />
            <p className="font-semibold text-base">{username}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[14rem]">{email}</p>
             <button className="text-blue-500 text-xs underline mt-1">
              Switch accounts
            </button>
          </div>
          <ul className="py-2 text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <User size={16} />
              <span>Profile and visibility</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <LayoutDashboard size={16} />
              <span>Activity</span>
            </li>
           
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </li>
          </ul>

          
          
          <div>
           <button
             onClick={toggleTheme}
               className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
           {theme === "dark" ? <Sun/> : <Moon/>} 
              </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-red-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
            )}
        </div>
     )

}


export default AvatarDropdown

