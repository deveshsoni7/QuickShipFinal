import React from "react";
import { useNavigate } from "react-router-dom";
const LongCardData = [
  {
    background: "bg-white",
    textColor: "text-black",
    img: "https://img.freepik.com/free-vector/delivery-concept-illustration_114360-2094.jpg",
    title: "We deliver parcels to 300+ cities at unbeatable rates!",
    desc: "Every day, every mile. To send love to family or reach a new destination. A small package or a big shipment. Across cities, across borders—swift, secure, and reliable.",
    btn: "Learn More",
    reverse: false,
  },
];

const LongCard = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full">
      {LongCardData.map((longcard, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            longcard.reverse ? "md:flex-row-reverse" : ""
          } justify-center items-center ${longcard.background} px-6 md:px-24 py-1 mb-1`}
        >
          {/* Image Section */}
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <img className="w-[450px] md:w-[550px]" src={longcard.img} alt="" />
          </div>

          {/* Text Content Section */}
          <div className="md:max-w-lg text-center md:text-left">
            <h1 className={`text-4xl font-bold ${longcard.textColor}`}>
              {longcard.title}
            </h1>
            <p className={`mt-4 text-sm ${longcard.textColor}`}>
              {longcard.desc}
            </p>
            <button
            
              className={`${
                longcard.background === "bg-white"
                  ? "bg-[#496580] text-white hover:bg-black hover:text-white"
                  : "bg-white text-blue-600 hover:bg-gray-200"
              } rounded-full px-8 py-3 mt-6 font-bold shadow-lg transition`}
            >
              {longcard.btn}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LongCard;
