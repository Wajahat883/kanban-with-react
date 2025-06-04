import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KanbanBoard from "../kanbanprojects/KanbanProjects";
import Login from "../loginpage/Login";
import Signup from "../loginpage/signup";
import Dashboard from "../sidebar/Dashboard";
import ProtectedRoute from "../Hooks/ProtectedRoute";
import AppLayout from "./Applayout";
import { TaskProvider } from '../Hooks/TaskContext';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "../Hooks/ThemeContext";
import 'react-toastify/dist/ReactToastify.css';
import { DashboardProvider } from "../Hooks/DashoardConext";
import Taskcard from "../kanbanprojects/Tasks/Taskcard";
import TeamsPage from "../kanbanprojects/Teams/Team";
import Reports from "../kanbanprojects/Report/Reporter";
import Calendar from "../navbar/Calender"

function App() {
  return (
    <DashboardProvider>
<Router>
      <ThemeProvider>
        <TaskProvider>
          <Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />


  <Route element={<AppLayout />}>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/kanban"
      element={
        <ProtectedRoute>
          <KanbanBoard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tasks"
      element={
        <ProtectedRoute>
          <Taskcard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/issues"
      element={
        <ProtectedRoute>
          <div>Issues Page</div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/teams"
      element={
        <ProtectedRoute>
          <TeamsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/calendar"
      element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      }
    />
  </Route>

  <Route path="*" element={<div className="p-6">404 - Not Found</div>} />
</Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </TaskProvider>
      </ThemeProvider>
    </Router>
    </DashboardProvider>
    
  );
}

export default App;
