import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KanbanBoard from "./pages/navbar/KanbanBoard";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/loginpage/signup";
import Board from "./pages/loginpage/Board";
import Dashboard from "./pages/navbar/Dashboard";
import ProtectedRoute from "./pages/navbar/ProtectedRoute";
import AppLayout from "./pages/navbar/Applayout";
import { TaskProvider } from './pages/Hooks/TaskContext';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./pages/Hooks/ThemeContext";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <Routes>

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/kanban" element={
                <ProtectedRoute>
                  <KanbanBoard />
                </ProtectedRoute>
              } />
              <Route path="/board" element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <div>Tasks Page</div>
                </ProtectedRoute>
              } />
              <Route path="/issues" element={
                <ProtectedRoute>
                  <div>Issues Page</div>
                </ProtectedRoute>
              } />
            </Route>

       
            <Route path="*" element={<div className="p-6">404 - Not Found</div>} />

          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </TaskProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
