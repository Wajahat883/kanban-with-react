// Dashboard.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTask } from './TaskContext';

const Dashboard = () => {
  const { tasks, setTasks } = useTask();

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = [...tasks[sourceCol]];
    const destTasks = [...tasks[destCol]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks(prev => ({
        ...prev,
        [sourceCol]: sourceTasks
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setTasks(prev => ({
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks
      }));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {['all', 'pending', 'completed'].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: '#f0f0f0',
                  padding: '8px',
                  width: '300px',
                  minHeight: '400px',
                  borderRadius: '8px',
                }}
              >
                <h3>{col.charAt(0).toUpperCase() + col.slice(1)}</h3>
                {tasks[col]?.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          backgroundColor: '#fff',
                          color: '#333',
                          borderRadius: '4px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          ...provided.draggableProps.style
                        }}
                      >
                        <strong>{task.title}</strong>
                        <p className="text-sm">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
