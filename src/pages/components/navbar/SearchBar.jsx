// SearchBar.jsx
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
    setFilteredTasks(results);
  };

  return (
    <div className="relative w-full max-w-md mb-6">
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700"
      >
        <input
          type="text"
          placeholder="Search your tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 text-sm focus:outline-none dark:bg-gray-700 dark:text-white w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {filteredTasks.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 mt-2 p-4 rounded-md shadow-md max-h-96 overflow-y-auto z-50">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            Task Results:
          </h3>
          <ul className="space-y-2">
            {filteredTasks.map((task, index) => (
              <li key={index}>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  {task.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
