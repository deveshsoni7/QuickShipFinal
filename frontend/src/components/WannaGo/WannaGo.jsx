import React from "react";
import { ChevronRight } from "lucide-react"; 

const rides = [
  { start: "Delhi", end: "Jaipur" },
  { start: "Lucknow", end: "Mumbai" },
  { start: "Noida", end: "Sikar" },
];

const WannaGo = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#496580] text-white py-16">
      
      <h1 className="text-2xl font-bold mb-6">
        Where do you want to deliver your package?
      </h1>

      {/* Ride Cards */}
      <div className="flex flex-wrap gap-4 justify-center">
        {rides.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-80 px-6 py-4 bg-white text-black rounded-lg shadow-md 
            transition-all duration-300 hover:bg-black hover:text-white"
          >
            <span className="text-sm font-bold">
              {data.start} → {data.end}
            </span>
            <ChevronRight className="text-gray-400 transition-colors duration-300 hover:text-white" />
          </div>
        ))}
      </div>

      {/* Link */}
      <a
        href="#"
        className="mt-6 text-white hover:text-black hover:underline text-sm transition-all duration-300"
      >
        See our most popular rides
      </a>
    </div>
  );
};

export default WannaGo;
