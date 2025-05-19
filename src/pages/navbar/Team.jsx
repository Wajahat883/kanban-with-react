import { useState } from "react";

const dummyTeams = [
  {
    id: 1,
    name: "Development Team",
    members: ["Ali", "Zara", "Usman"],
  },
  {
    id: 2,
    name: "Design Team",
    members: ["Areeba", "Taha"],
  },
];

const TeamsPage = () => {
  const [teams, setTeams] = useState(dummyTeams);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddTeam = (e) => {
    e.preventDefault();
    const membersArray = newMembers.split(",").map((m) => m.trim());
    const newTeam = {
      id: Date.now(),
      name: newTeamName,
      members: membersArray,
    };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
    setNewMembers("");
    setShowForm(false);
  };

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teams</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add New Team"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddTeam} className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Team Name"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Members (comma separated)"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={newMembers}
            onChange={(e) => setNewMembers(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Team
          </button>
        </form>
      )}

      {/* Table layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-2 border dark:border-gray-600">#</th>
              <th className="p-2 border dark:border-gray-600">Team Name</th>
              <th className="p-2 border dark:border-gray-600">Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={team.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="p-2 border dark:border-gray-700">{index + 1}</td>
                <td className="p-2 border dark:border-gray-700">{team.name}</td>
                <td className="p-2 border dark:border-gray-700">
                  {team.members.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsPage;
