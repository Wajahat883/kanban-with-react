import { useState } from "react";
export default function TaskForm({column,onAdd}){
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

    const handleSubmit =(e)=>{
e.preventDefault();
if(title.trim()===""){
    return
}
onAdd(column,{title,description});
setTitle("")
setDescription("")
    }
    return(
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-3xl p-2 mb-2 border rounded" 
            />
            <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-3xl p-2 mb-2 border rounded"/>
            <button type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Add Task
            </button>
        </form>
    )
}