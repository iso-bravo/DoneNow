import axios from "axios";
import { useState } from "react";
import { BsCheckCircle, BsPencil } from "react-icons/bs";
import { ITask } from "../App";
import EditTask from "./EditTask";

interface TaskProps extends ITask {
  onDelete: (taskId: number) => void;
  onEdit: (task: ITask) => void;
}

const Task: React.FC<TaskProps> = ({ taskId, title, description, dueDate, onDelete, onEdit }) => {
  const [showComponent, setShowComponent] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleComplete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/delete/${taskId}`);
      setCompleted(true);
      setTimeout(() => {
        onDelete(taskId);
      }, 1000);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onEdit({ taskId, title, description, dueDate });
    setEditing(true);
  };

  const formattedDueDate = new Date(dueDate).toLocaleDateString();

  return (
    <div
      className={`m-8 rounded-lg font-Lexend transition-all duration-300 relative ${
        completed ? "bg-green-500" : "bg-[#979797] hover:bg-[#888888]"
      }`}
      onMouseEnter={() => setShowComponent(!completed)}
      onMouseLeave={() => setShowComponent(completed)}
    >
      <div className="flex justify-between">
        <div className="flex flex-col m-5">
          <div className={`flex flex-row font-bold text-white`}>
            {title}
          </div>
          <div className={`flex flex-row text-white`}>
            {description}
          </div>
        </div>
        <div className={`flex flex-col align-bottom justify-end m-3 font-bold text-white`}>
          Due date: {formattedDueDate}
        </div>
      </div>
      <div className="absolute top-2 right-2"
      >
        <button
          className="px-2 py-3 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(e);
          }}
        >
          <BsPencil size={20} />
        </button>
      </div>
      {editing && (
        <EditTask
          taskId={taskId}
          title={title}
          description={description}
          dueDate={dueDate}
          onCancel={() => setEditing(false)}
          onTaskUpdated={(updatedTask) => {
            setEditing(false);
          }}
        />
      )}

      {showComponent && (
        <div>
        <div className="absolute inset-0 flex items-center justify-center" onClick={handleComplete}>
          <BsCheckCircle className="text-white text-6xl" />
        </div>
        <div className="absolute top-2 right-2"
        >
          <button
            className="px-2 py-3 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(e);
            }}
          >
            <BsPencil size={20} />
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Task;