import React, { useState, useEffect, useRef } from "react";

const Helpdesk = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const popupRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setQuery("");
    setTimeout(() => setSubmitted(false), 3000); // hide after 3s
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button with badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        🛠 Helpdesk
        {/* Notification badge */}
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
          3
        </span>
      </button>

   
      {isOpen && (
        <div
          ref={popupRef}
          className="w-80 bg-white shadow-xl rounded-lg p-4 mt-3 absolute right-0 bottom-12  dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-2">Helpdesk</h2>

          
          <div className="mb-4 dark:text-white">
            <h3 className="font-semibold mb-1">FAQs:</h3>
            <ul className="list-disc list-inside text-sm dark:text-white text-gray-700 space-y-1">
              <li>How to create a new task?</li>
              <li>How to assign tasks?</li>
              <li>How to move tasks?</li>
            </ul>
          </div>

      
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border rounded-md  bg-white dark:bg-gray-800  border-gray-300 dark:border-gray-600 p-2 text-sm"
              placeholder="Type your question..."
              rows="3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm px-3 py-1 mt-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            {submitted && (
              <p className="text-green-600 text-sm mt-2">✅ Sent successfully!</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Helpdesk;
