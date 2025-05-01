import { useState,useEffect } from "react";

const initialBoard = {
    "To Do":[],
    "In Progress":[],
    "Completed":[],
}

export default function useKanbanBoard(){
    const [board,setBoard]=useState(()=>{
        const saved = localStorage.getItem("kanban")
        try{
            const parsed =JSON.parse(saved)
            if( parsed&& typeof parsed==="object"&&Object.values(parsed).every((col)=>Array.isArray(col))){
                return parsed;
            }
        }catch (err) {}
        return initialBoard
    })
    useEffect(()=>{
        localStorage.setItem("kanban",JSON.stringify(board))
    },[board])
    const addTask =(column ,task)=>{
        const newTask={
            id:Date.now(),
            title:task.title,
            description:task.description,
        }
        setBoard((prev)=>({
            ...prev,
            [column]:[...prev[column],newTask],
        }))
    }
    return {board,addTask}
}