import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const dummyNotifications = [
    { id: 1, message: "New task assigned to you" },
    { id: 2, message: "Project deadline tomorrow" },
    { id: 3, message: "You have 2 new comments" },
  ];

 
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

  return (
    <div className="relative  dark:bg-black" ref={popupRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative  dark:bg-black"
      >
        <Bell className=" dark:bg-gray-800 text-black dark:text-white " />
        {dummyNotifications.length > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-50">
          <div className="p-3 font-bold border-b border-gray-300 dark:border-gray-600">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {dummyNotifications.map((note) => (
              <li
                key={note.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              >
                {note.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
