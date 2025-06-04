import React, { useState } from "react";

const BuyNow = () => {
  const [open, setOpen] = useState(false);

  // Dummy task/board info jo BuyNow ke liye dikha sakte hain
  const dummyBoard = {
    name: "Pro Kanban Board",
    description: "Unlock premium features for better task management.",
    price: 9.99,
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border border-blue-600 text-blue-600 font-semibold rounded-xl px-4 py-1 hover:bg-blue-600 hover:text-white transition"
      >
        Buy Now
      </button>

      {open && (
        <div className="fixed inset-0  bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-3 dark:text-white">Purchase Pro Plan</h2>

            <p className="mb-4 dark:text-gray-300">{dummyBoard.description}</p>

            <p className="mb-6 font-semibold text-blue-600 dark:text-blue-400">
              Price: ${dummyBoard.price.toFixed(2)}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Thank you for your purchase! 🎉");
                  setOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNow;
