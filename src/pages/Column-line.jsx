import Taskcard from "./Taskcard";

export default function ColumnLine({ title, tasks }) {
  return (
    <div className="bg-gray-100 rounded p-4 w-72">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div>
        {tasks.map((task) => (
          <Taskcard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
