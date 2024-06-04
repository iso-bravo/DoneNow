import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AccountMenu() {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username,
        password
      });
  
      if (response.status === 200 && response.data) {
        console.log("Login successful");
        const { userId, username } = response.data;
        navigate("/dashboard", { state: { userId, username } });
      } else {
        console.error("Login failed: Invalid credentials");
        toast.error("Username or password invalid");
      }
    } catch (error) {
      console.error("Error en el inicio de sesion:", error);
      toast.error("Username or password invalid");
    }
  };
  

  const register = async () => {
    try {
      const user = {
        username,
        password,
      };

      const response = await axios.post("http://localhost:3000/users/register", user);

      if (response.status === 200) {
        toast.success("Successfully registered");

      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("User already exists");
    }
  };

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="justify-center font-Lexend relative h-screen flex items-center bg-gradient-to-b from-green-400 to-black">
      <ToastContainer />
      <div className="">
        <h2 className="text-white text-4xl mb-8 font-semibold text-center">
          {variant === "login"
            ? "Log into your account"
            : "Create an account"}
        </h2>
        <div className="flex flex-col gap-4 ">
          <input
            id="username"
            type="username"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="password"
            type="password"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="rounded-2xl text-white text-xl py-2 px-3 w-full placeholder-white placeholder-opacity-80"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-[#FFFFFF] text-opacity-50 mt-12">
            {variant === "login"
              ? "First time using DoneNow?"
              : "Already have an account?"}
            <span
              onClick={toggleVariant}
              className="text-white ml-1 hover:underline cursor-pointer"
            >
              {variant === "login" ? "Create an account" : "Log In"}
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={variant === "login" ? login : register}
            className="bg-transparent border border-[#1ED947] py-3 px-10 text-[#1ED947] rounded-md mt-10 hover:bg-[#1ED947] hover:text-white transition-all duration-300"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
