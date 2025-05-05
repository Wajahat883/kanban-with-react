import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import KanbanBoard from "./pages/KanbanBoard";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from "./pages/Board";
import Dashboard from './pages/Dashboard';
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { TaskProvider } from './pages/TaskContext';

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ['/', '/signup'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideSidebar && <Sidebar />}
      <div className={shouldHideSidebar ? "flex-1 ml-0" : "flex-1 ml-64"}>
        {!shouldHideSidebar && <Navbar />}
        <Routes>
         console.log( <Route path="/" element={<Login />} />)
         console.log( <Route path="/signup" element={<Signup />} />)
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
      </TaskProvider>
    </Router>
  );
}

export default App;
