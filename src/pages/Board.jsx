import ColumnLine from "./Column-line";
import useKanbanBoard from "./useKanbanBoard";



export default function Board(){
   const [board ,addTask]=useKanbanBoard()
   const handleAdd = (column)=>{
    const title =prompt("Enter task title")
    const description = prompt("Enter task description ")
    if(title&&description){
        addTask(column,{title,description})
    }
   }
   return(
    <div className="flex gap-4 p-4 overflow-auto">
       
        {Object.entries(board).map(([columnTitle,tasks])=>
        (<div key={columnTitle}>
            <ColumnLine title={columnTitle} tasks={tasks}/>
            <button 
            onClick={()=>handleAdd(columnTitle)}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                + Add Task
            </button>
            </div>
            ))}
    </div>
   )
}