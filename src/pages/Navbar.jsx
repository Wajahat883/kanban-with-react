import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Navbar(){
    const {user,logout}=useAuth()
    const navigate =useNavigate()
    const handleLogout = ()=>{
        logout()
        navigate("/")
    }
    return(
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="font-bold">Kanban App</div>
            <div className="space-x-4">
                {!user?(
                    <>
                    <Link to="/">Login</Link>
                    <Link to="/signup">Signup</Link>
                    </>
                ):(
                <>
                <span>{user.username}</span>
                <button onClick={handleLogout}className="bg-red-500 px-2 py-1 rounded">
                    Logout
                </button>
                </>
                )}
            </div>
        </nav>
    )
}