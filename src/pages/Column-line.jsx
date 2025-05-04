import Taskcard from "./Taskcard";
import TaskForm from "./TaskForm";

export default function ColumnLine({ title, tasks,addTask }) {
  return (
    <div className="bg-gray-100 rounded p-4 w-72">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <TaskForm column={title} onAdd={addTask}/>
      <div className="space-y-2">
        {Array.isArray(tasks)
        &&tasks.map((task)=>(
          <Taskcard key={task.id} task={task}/>
        ))}
      </div>
  
    </div>
  );
}
