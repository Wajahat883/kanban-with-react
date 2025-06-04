

export const SortableItem = ({  task }) => {




  return (
    <div
    
      className="dark:bg-gray-900 p-3 mb-3 rounded-md border-l-4 border-blue-500 shadow-sm"
    >
      <div className="font-semibold">{task.title}</div>
      <div className="text-xs text-gray-500 mt-1">Due: {task.due}</div>
      <div className="text-xs text-gray-600 mt-1">👤 {task.member}</div>
      <div className="text-xs text-gray-600 mt-1">👤 {task.status}</div>
      {task.file && (
        <div className="text-xs text-purple-500 mt-1">📎 {task.file}</div>
      )}
      {task.tag && (
        <div className="text-xs inline-block mt-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
          {task.tag}
        </div>
      )}
    </div>
  );
};
