// AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountMenu from './pages/AccountMenu.tsx';import App from "./App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountMenu />} />
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
