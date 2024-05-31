import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask";
import { Modal } from "flowbite-react";
import { CiLogout } from "react-icons/ci";
import './App.css';

export interface ITask {
  task_id: number;
  title: string;
  description: string;
  due_date: string;
}

export default function App() {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [openModal, setOpenModal] = useState(false);
  
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`font-Lexend bg-custom min-h-screen min-w-full ${openModal ? 'brightness-50' : ''}`}>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <CreateTask />
        </Modal.Body>
      </Modal>
      <div className="flex flex-row justify-between flex-wrap items-center p-4 md:p-10 font-bold">
        <div className="space-y-4 md:space-y-10">
          <h1 className="text-white text-3xl md:text-5xl">DoneNow</h1>
          <button
            className="flex flex-row bg-white rounded-full p-2 md:p-4 items-center"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus className="flex flex-row items-center" />
            <span className="hidden md:block">Create task</span>
          </button>
        </div>
        <h2 className="text-white text-lg md:text-2xl">Welcome back {username}!</h2>
      </div>
      <div className="flex-grow flex-row rounded-2xl bg-[#454545] m-4 md:m-8 space-y-4 md:space-y-6 p-2 md:p-5 overflow-y-auto">
        {tasks.map((task) => (
          <Task
            key={task.task_id}
            task_id={task.task_id}
            title={task.title}
            description={task.description}
            due_date={task.due_date}
          />
        ))}
      </div>
      <div className="flex justify-center items-end">
        <button
          className="flex flex-row bg-white hover:bg-[#1ED947] hover:text-white transition-all duration-300 rounded-full p-2 md:p-4 items-center">
          <CiLogout />
          Log Out
        </button>
      </div>
    </div>
  );
}
