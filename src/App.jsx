import { BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import Sidebar from "./pages/navbar/Sidebar";
import KanbanBoard from "./pages/navbar/KanbanBoard";
import Login from './pages/loginpage/Login';
import Signup from "./pages/loginpage/signup";
import Board from "./pages/loginpage/Board";
import Dashboard from './pages/navbar/Dashboard';
import Navbar from "./pages/navbar/Navbar";
import ProtectedRoute from "./pages/navbar/ProtectedRoute";
import { TaskProvider } from './pages/Hooks/TaskContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ['/', '/signup','/login'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideSidebar && <Sidebar />}
      <div className={shouldHideSidebar ? "flex-1 ml-0" : "flex-1 ml-64"}>
        {!shouldHideSidebar && <Navbar />}
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
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
          <Route path="*" element={<div className="p-6">404 - Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <TaskProvider> 
        <Layout />
        <ToastContainer position="top-right" autoClose={3000} />
      </TaskProvider>
    </Router>
  );
}

export default App;
