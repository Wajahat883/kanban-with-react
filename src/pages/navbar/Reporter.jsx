
import { Bar,Pie } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement } from "chart.js";


ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement);

const tasks = [
  { 
    id: "1", 
    title: "Task 1",
     team: "Marketing",
      member: "Ali", 
      status: "Completed" 
    },
  {
    id: "2",
     title: "Task 2",
      team: "Development",
       member: "Ahmed",
        status: "Pending"
       },
  { 
    id: "3", 
    title: "Task 3",
     team: "Marketing",
      member: "Ali",
       status: "Completed" 
      },
  { 
    id: "4",
     title: "Task 4",
      team: "Design",
       member: "Sara", 
       status: "Pending" 
      },
  {
     id: "5",
      title: "Task 5",
       team: "Development",
        member: "Ahmed", 
        status: "Completed"
       },
]
const teamNames=[...new Set(tasks.map((task)=>task.team))]
const teamTaskCounts=teamNames.map((team)=>tasks.filter((task)=>task.team===team).length
)
const barData={
  labels:teamNames,
  datasets:[{
    label:"Number of Tasks",
    data:teamTaskCounts,
    backgroundColor:"rgba(75,192,192,0.6)",
  },
],
}
const memberNames = [...new Set(tasks.map((task)=>
task.member))]
const memberTaskCounts = memberNames.map(
  (member)=>tasks.filter((task)=>task.member===member).length
);
const pieData = {
  labels:memberNames,
  datasets:[
    {
      label:"Tasks by Member",
      data:memberTaskCounts,
      backgroundColor:[
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
      ],
    },
  ],
};
export default function Reports() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Team & Member Reports</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto 50px" }}>
        <h2>Tasks by Team (Bar Chart)</h2>
        <Bar data={barData} />
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Tasks by Member (Pie Chart)</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
