import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import './App.css';
import CreateTask from "./components/CreateTask";
import Task from "./components/Task";
import EditTask from "./components/EditTask";
import { useNavigate } from "react-router-dom";


export interface ITask {
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const username = location.state?.username || "Guest";
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/user/${userId}`);
      setTasks(response.data);
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

  const handleTaskUpdated = (updatedTask: ITask) => {
    const updatedTasks = tasks.map(task => task.taskId === updatedTask.taskId ? updatedTask : task);
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleTaskDeleted = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.taskId !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
  };

  const handleLogOut = () => {
    navigate("/")
  };

  return (
    <div className={`font-Lexend bg-gradient-to-b from-green-500 to-black min-h-screen min-w-full ${openModal || editingTask ? 'brightness-50' : ''}`}>
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
            <button className="flex gap-2 items-center"
            onClick={handleLogOut}>
              Log Out
              <CiLogout size={25} />
            </button>
          </span>
        </div>
      </div>
      <div className="flex-grow flex-row rounded-2xl bg-[#454545] m-4 md:m-8 space-y-4 md:space-y-6 p-2 md:p-5 overflow-y-auto">
        {tasks.map((task) => (
          <Task key={task.taskId} {...task} onDelete={handleTaskDeleted} onEdit={handleEditTask} />
        ))}
      </div>
      {editingTask && (
        <EditTask
          taskId={editingTask.taskId}
          title={editingTask.title}
          description={editingTask.description}
          dueDate={editingTask.dueDate}
          onCancel={() => setEditingTask(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}
