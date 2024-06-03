import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask";
import { Modal } from "flowbite-react";
import { CiLogout } from "react-icons/ci";
import './App.css';
import axios from "axios";

export interface ITask {
  task_id: number;
  title: string;
  description: string;
  due_date: string;
}

export default function App() {
  const location = useLocation();
  const userId = location.state?.userId;
  const username = location.state?.username || "Guest";
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchTasks = async () => {
    console.log(userId)
    try {
      await axios.get(`http://localhost:3000/tasks/user/${userId}`)
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const handleTaskCreated = (newTask: ITask) => {
    setTasks([...tasks, newTask]);
    setOpenModal(false);
  };

  return (
    <div className={`font-Lexend bg-gradient-to-b from-green-500 to-black min-h-screen min-w-full ${openModal ? 'brightness-50' : ''}`}>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <CreateTask onTaskCreated={handleTaskCreated} />
        </Modal.Body>
      </Modal>
      <div className="flex flex-row justify-between flex-wrap items-center p-4 md:p-10 font-bold">
        <div className="space-y-4 md:space-y-10">
          <h1 className="text-white text-3xl md:text-5xl">DoneNow</h1>
          <button
            className="flex flex-row bg-white rounded-full items-center p-1 px-3 md:p-2 md:px-5 gap-2"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus size={30} />
            <span className="text-sm md:text-xl">Add Task</span>
          </button>
        </div>
        <div className="flex flex-col text-white text-xl gap-12">
          <span className="text-3xl">Welcome {username}!</span>
          <span className="flex justify-end">
            <button className="flex gap-2 items-center">
              Log Out
              <CiLogout size={25} />
            </button>
          </span>
        </div>
      </div>
      <div className="flex-grow flex-row rounded-2xl bg-[#454545] m-4 md:m-8 space-y-4 md:space-y-6 p-2 md:p-5 overflow-y-auto">
        {tasks.map((task) => (
          <Task key={task.task_id} {...task} />
        ))}
      </div>
    </div>
  );
}
