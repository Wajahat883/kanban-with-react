import { createContext,useState,useEffect } from "react";
// import Signup from "./Signup";
 const AuthContext = createContext()
 function AuthProvider({children}){
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("kanban-user"))
        if(storedUser) setUser(storedUser)
    },[])
    const login = (username,password)=>{
        const dummyuser={username,password};
        localStorage.setItem("kanban-user",JSON.stringify(dummyuser))
        setUser(dummyuser)
    }
    const signup = (username, password) => {
        const dummyuser = { username, password };
        localStorage.setItem("kanban-user", JSON.stringify(dummyuser));
        setUser(dummyuser);
    };
    const logout = ()=>{
        localStorage.removeItem("kanban-user")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,login,logout,signup}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };