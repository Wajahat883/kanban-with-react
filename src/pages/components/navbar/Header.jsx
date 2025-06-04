import { useContext } from "react";
import {ThemeContext}from"./ThemeContext"
import {Moon,Sun}from "lucide-react"

const Header =() =>{
const {theme ,toggleTheme} = useContext(ThemeContext);
return(
    <header className="flex justify-between items-center px-6 py-3 bg-slate-800 text-white dark:bg-slate-900">
        <h1 className="text-xl font-bold">Kanban Board</h1>
        <button onClick={toggleTheme}
        className="bg-slate-700 p-2 rounded-full hover:bg-slate-600 transition">
            {theme==="light"?<Moon size={20}/>:<Sun size={20}/>}
        </button>
    </header>
)
}
export default Header;