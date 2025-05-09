import { useState } from "react";

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-400 animate-fade-in">
      <button
        className="flex w-full items-center justify-between p-4 text-left font-regular"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className={`px-4 pb-4 ${isOpen ? "block" : "hidden"}`}>
        <p className="text-gray-500">{answer}</p>
      </div>
    </div>
  );
}
