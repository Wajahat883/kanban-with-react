import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KanbanBoard from "./pages/navbar/KanbanProjects";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/loginpage/signup";
import Dashboard from "./pages/navbar/Dashboard";
import ProtectedRoute from "./pages/navbar/ProtectedRoute";
import AppLayout from "./pages/navbar/Applayout";
import { TaskProvider } from './pages/Hooks/TaskContext';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./pages/Hooks/ThemeContext";
import 'react-toastify/dist/ReactToastify.css';
import { DashboardProvider } from "./pages/Hooks/DashoardConext";
import Taskcard from "./pages/navbar/Taskcard";

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
             
              <Route path="/tasks" element={
                <ProtectedRoute>
                 <Taskcard/>
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
    </DashboardProvider>
    
  );
}

export default App;
