import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import Admin from "./Admin/Admin";
import ShowSelectGame from "./ShowSelectGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/games/:title" element={<ShowSelectGame />} />
      </Routes>
    </BrowserRouter>
  );
}
