import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ITask {
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
}

interface EditTaskProps {
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
  onCancel: () => void;
  onTaskUpdated: (updatedTask: ITask) => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  taskId,
  title,
  description,
  dueDate,
  onCancel,
  onTaskUpdated,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDueDate, setNewDueDate] = useState(dueDate);

  const handleUpdate = async () => {
    try {
        console.log(newTitle)
        console.log(newDescription)
        console.log(newDueDate)
        const task = {
            title: newTitle,
            description: newDescription,
            dueDate: newDueDate,
          };
      const response = await axios.put(
        `http://localhost:3000/tasks/edit/${taskId}`, task);

      if (response.status === 200) {
        const updatedTask: ITask = {
          taskId,
          title: newTitle,
          description: newDescription,
          dueDate: newDueDate,
        };
        onTaskUpdated(updatedTask);
        toast.success("Task updated successfully");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer />
      <div className="bg-gray-600 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-2/6 rounded-xl p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-3xl font-bold text-center">
            Edit Task
          </h1>
          <input
            id="title"
            type="text"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            id="description"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Description"
            maxLength={150}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            id="date"
            type="date"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-transparent border border-gray-300 py-3 px-10 text-gray-300 rounded-md mt-10 hover:bg-gray-500 hover:text-white transition-all duration-300 m-5"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-transparent border border-[#1ED947] py-3 px-10 text-[#1ED947] rounded-md mt-10 hover:bg-[#1ED947] hover:text-white transition-all duration-300 m-5"
            onClick={handleUpdate}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;