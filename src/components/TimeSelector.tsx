import React from "react";

interface TimeSelectorProps {
  onTimeSelect: (time: number) => void;
  selectedTime: number;
  className?: string;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ onTimeSelect, selectedTime, className }) => {
  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {[15, 30, 60, 100].map(time => (
        <button
          key={time}
          className={`px-3 py-1 rounded ${
            time === selectedTime ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onTimeSelect(time)}
          onKeyDown={event => event.preventDefault()}
        >
          {time}s
        </button>
      ))}
    </div>
  );
};
