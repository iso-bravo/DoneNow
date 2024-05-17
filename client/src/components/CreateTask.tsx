import { useState } from "react";

export default function CreateTask() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");

  const handleCreateTask = async (e: any) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:3000/create/task", {
        method: "POST",
        body: JSON.stringify({
          title: Title,
          description: Description,
          due_date: Date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setDescription("");
        setDate("");
        console.log("Task created successfully");
      } else {
        console.log("Error at creating task");
      }
    } catch (error) {
      console.log("Error at creating the task", error);
    }
  };
    return (
      <div className="flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md w-2/3 h-2/3">
        <div className="bg-gray-600 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4 rounded-xl">
          <div className="flex flex-col gap-4 mx-8">
            <h1 className="text-white text-3xl font-bold text-center py-8">
              Task Info
            </h1>
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
  };
