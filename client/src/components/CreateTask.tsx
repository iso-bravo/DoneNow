import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ITask {
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
}
interface CreateTaskProps {
  onTaskCreated: (task: ITask) => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const location = useLocation();
  const userId = location.state?.userId;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleCreateTask = async () => {
    console.log(title);
    console.log(description);
    console.log(date);
    console.log(userId);
    try {
      const response = await axios.post("http://localhost:3000/tasks/create", {
        title: title,
        description: description,
        due_date: date,
        userId: userId,
      });

      if (response.status === 201) {
        onTaskCreated(response.data);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to save task. All fields needed");
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md w-2/3 h-2/3">
      <ToastContainer />
      <div className="bg-gray-600 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4 rounded-xl">
        <div className="flex flex-col gap-4 mx-8">
          <h1 className="text-white text-3xl font-bold text-center py-8">Task Info</h1>
          <input
            id="title"
            type="text"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="description"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Description"
            maxLength={150}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            id="date"
            type="date"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-transparent border border-[#1ED947] py-3 px-10 text-[#1ED947] rounded-md mt-10 hover:bg-[#1ED947] hover:text-white transition-all duration-300 m-5"
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
