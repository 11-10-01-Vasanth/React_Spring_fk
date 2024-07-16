import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import Admin from "./Admin/Admin"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
