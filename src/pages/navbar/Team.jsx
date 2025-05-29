
import { SortableItem } from "./SortableItem"
import { Plus,X } from "lucide-react"
import { useState } from "react"

const initialData = [
  {
    id:"store-design",
    title:"Store Design",
    tasks:[
      {
      id:"1",
      title:"submit permit drawings",
      due:"2025-09-29",
      member:"Team A",
      status:"Approved"
    }
    ]
  },
    {
    id:"marketing",
    title:"Marketing",
    tasks:[
      {
      id:"1",
      title:"submit approvals",
      due:"2025-09-29",
      member:"Team A",
      status:"Approved"
    }
    ]
  },
    {
    id:"development",
    title:"Development",
    tasks:[
      {
      id:"1",
      title:"submit project",
      due:"2025-09-29",
      member:"Team c",
      status:"pending"
    }
    ]
  },

]

const TeamsPage =()=>{
  const [columns,setColumns]=useState(initialData)
  const [addingTaskFor,setAddingTaskFor] = useState(null)
  const [newTask,setNewTask]=useState({
    title:"",
    due:"",
    member:"",
    tag:"",

  })
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTask =(columnId)=>{
    if(!newTask.title)return alert ("Task title is required")
      const taskToAdd ={
    id: `task-${Date.now()}`,
      title: newTask.title.trim(),
      due: newTask.due,
      member: newTask.member.trim(),
      tag: newTask.tag.trim(),
      status: "",
      }
      const newColumns = columns.map((col)=>{
        if(col.id === columnId){
          return{...col,tasks:[...col.tasks,taskToAdd]}
        }
        return col
      })
      setColumns(newColumns)
      setNewTask({title:"",due:"",member:"",tag:""})
      setAddingTaskFor(null)
  }
  return (
    <>
    <div className="flex gap-6 overflow-x-auto h-[90vh] p-6 dark:bg-black">
      {
        columns.map((col)=>(
          <div
           key={col.id}
          className="min-w-[320px] bg-white dark:bg-gray-700 p-4 dark:text-white text-black rounded-lg shadow-md flex flex-col"

          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{col.title}</h2>
              <button onClick={()=>
                setAddingTaskFor(addingTaskFor===col.id?null:col.id )
              }className="text-blue-500 hover:text-blue-600"
              title="Add task">
                {addingTaskFor===col.id?<X size={18}/>:<Plus size={18}/>
                }
              </button>
            </div>
                {
                  addingTaskFor === col.id && (
                    <div className="mb-4 space-y-2">
                      <input
                      type="text"
                      name="title"
                      placeholder="Task Title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1 w-full"
                      />
                       <input
                type="date"
                name="due"
                placeholder="Due Date"
                value={newTask.due}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                name="member"
                placeholder="Member"
                value={newTask.member}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                name="tag"
                placeholder="Tag"
                value={newTask.tag}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
               <button
                onClick={() => handleAddTask(col.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Task
              </button>

                    </div>
                  )
                }
                {col.tasks.map((task) => (
  <SortableItem key={task.id} task={task} />
))}




          </div>
        ))

      }

    </div>
    </>
  )
}
export default TeamsPage