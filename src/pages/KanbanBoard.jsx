
import ColumnLine from "./Column-line";

const dummyTasks = {
  Open: [
    { id: 1, title: "Cable Length Mismatch" },
    { id: 2, title: "Streamline support tickets" },
  ],
  "In Progress": [
    { id: 3, title: "Alignment issue on the main page" },
    { id: 4, title: "Replace defective switches" },
  ],
  "To Be Tested": [
    { id: 5, title: "Issue in design format" },
    { id: 6, title: "Rusting of pipes during transport" },
  ],
  Reopen: [
    { id: 7, title: "Water leakage in the third floor" },
    { id: 8, title: "Crack in wall near kitchen cabinet" },
  ],
};

export default function KanbanBoard() {
  return (
    <div className="flex gap-4 p-6 overflow-x-auto">
      {Object.entries(dummyTasks).map(([status, tasks]) => (
        <ColumnLine key={status} title={status} tasks={tasks} />
      ))}
    </div>
  );
}
