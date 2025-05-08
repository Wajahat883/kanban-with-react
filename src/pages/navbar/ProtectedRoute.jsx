import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function ProtectedRoute({children}){
    const {user}=useAuth()
    if(!user){
        return   <Navigate to="/"/>      
    }
    return children
}