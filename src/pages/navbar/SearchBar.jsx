// SearchBar.jsx
import { useState } from "react";
import { Search } from "lucide-react";
import { searchWeb } from "../Hooks/Searchweb";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newResults, setNewResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const results = await searchWeb(searchQuery);
      setNewResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setNewResults([
        {
          title: "Error fetching results.",
          link: "#",
          description: "Please check your connection or try again later.",
        },
      ]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700"
      >
        <input
          type="text"
          placeholder="Search from the web"
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

      {newResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 mt-2 p-4 rounded-md shadow-md max-h-96 overflow-y-auto z-50">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            News Results:
          </h3>
          <ul className="space-y-2">
            {newResults.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
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
