import ProblemDetail from "./pages/ProblemDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Leaderboard from "./pages/Leaderboard";
import Submissions from "./pages/Submissions";
import Profile from "./pages/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
      </Routes>
    </BrowserRouter>
  );
}