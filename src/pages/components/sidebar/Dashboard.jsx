
import React from "react";
import { useDashboard } from "../Hooks/DashoardConext";

const Card = ({ title, count, color }) => (
  <div className={`p-4 rounded-lg shadow-md ${color} text-white`}>
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-3xl">{count}</p>
  </div>
);

export default function Dashboard() {
  const { users, posts, todos } = useDashboard();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      <Card title="Users" count={users.length} color="bg-blue-600" />
      <Card title="Posts" count={posts.length} color="bg-green-600" />
      <Card title="Todos" count={todos.length} color="bg-purple-600" />
    </div>
  );
}
