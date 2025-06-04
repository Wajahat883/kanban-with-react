import { useTask } from "../../Hooks/TaskContext";

export default function TaskCard() {
  const { tasks } = useTask();

  return (
    <div className="taskcard-container flex flex-wrap justify-center p-4  gap-2">
      {tasks.all.map((task) => (
        <div
          key={task.id}
          className="taskcard bg-white dark:bg-gray-800 p-4  rounded shadow-md w-full sm:w-[48%] lg:w-[30%] max-w-md"
        >
          <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Due: {task.date}
          </p>

          <p
            className={`text-sm font-semibold  ${
              task.status === "pending"
                ? "text-yellow-600"
                : task.status === "complete"
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            Status: {task.status}
          </p>
        </div>
      ))}
    </div>
  );
}
