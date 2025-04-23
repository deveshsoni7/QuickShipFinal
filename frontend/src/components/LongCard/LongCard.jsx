import React from "react";
import { useNavigate } from "react-router-dom";

const LongCardData = [
  {
    background: "bg-[#496580]",
    textColor: "text-white",
    img: "https://cdn.blablacar.com/kairos/assets/images/scamDetective-653544b71d88f51797db.svg",
    title: "Help us keep you safe from scams",
    desc: "At Quick Ship, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.",
    btn: "Learn more",
    reverse: false,
  },
  {
    background: "bg-white",
    textColor: "text-black",
    img: "https://cdn.blablacar.com/kairos/assets/images/driver-c3bdd70e6a29c6af9ef1.svg",
    title: "Where do you want to send your parcel?",
    desc: "Let's make this your most affordable and reliable delivery yet.",
    btn: "Offer a Ride",
    reverse: true,
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
              onClick={()=> navigate('/PublishRide')}
              className={`${
                longcard.background === "bg-white"
                  ? "bg-[#496580] text-white hover:bg-black"
                  : "bg-white text-[#496580] hover:text-white hover:bg-black"
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
