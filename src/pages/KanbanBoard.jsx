
import ColumnLine from "./Column-line";
import useKanbanBoard from "./useKanbanBoard"

export default function KanbanBoard(){
  const {board,addTask}=useKanbanBoard()
  return(
    <div className="flex space-x-4 p-4">
      {Object.entries(board).map(([columnName,tasks])=>(
        <ColumnLine 
        key={columnName}
        title={columnName}
        tasks={tasks}
        addTask={addTask}
        />
      ))}

    </div>
  )
}

