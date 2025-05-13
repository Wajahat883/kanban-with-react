import {  createContext,useContext,useEffect,useState } from "react";
import axios from "axios"

const DashboardContext =createContext()
export const DashboardProvider =({children})=>{
    const [users,setusers]=useState([])
    const [posts,setposts]=useState([])
    const [todos,settodos]=useState([])

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>
        setusers(res.data))

        axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>setposts(res.data))

        axios.get("https://jsonplaceholder.typicode.com/todos").then((res)=>
        settodos(res.data))
    },[])
return(
   < DashboardContext.Provider value ={{users,posts,todos}}>
    {children}
   </DashboardContext.Provider>
)
}
export const useDashboard =()=> useContext(DashboardContext)

