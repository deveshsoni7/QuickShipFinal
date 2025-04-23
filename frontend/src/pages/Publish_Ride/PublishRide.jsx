import React, { useContext, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from "../../context/StoreContext";

const PublishRide = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    charges: "",
    time: "",
    routeType: "car", 
  });

  const { token } = useContext(StoreContext);
  const driverId = token;


  const [suggestions, setSuggestions] = useState({
    startLocation: [],
    endLocation: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // if (name === "startLocation" || name === "endLocation") {
    //   fetchLocations(value, name);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = jwtDecode(token);
      const driverId = decoded.id;
  
      const startDateTime = new Date(`${formData.startDate}T${formData.time}`);
  
      const rideData = {
        ...formData,
        time: startDateTime,
        driverId,
      };
  
      const response = await fetch("http://localhost:4000/api/rides/addRide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rideData)
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("Ride published successfully!");
      } else {
        alert("Failed to publish ride: " + result.message);
      }
    } catch (error) {
      console.error("Error publishing ride:", error);
      alert("An error occurred while publishing the ride.");
    }
  };


  const data = [
    {
      heading: "Deliver.",
      para: "Make every trip count! Transport parcels along your route and turn your vehicle into a smart delivery solution."
    },
    {
      heading: "Connect.",
      para: "Bridging senders and couriers. Connect with trusted drivers and get parcels delivered safely and efficiently."
    },
    {
      heading: "Save.",
      para: "Reduce delivery costs! Share transportation expenses and maximize your vehicle’s efficiency."
    }
  ]

  const testimonials = [
    {
      text: "I rely on this service for all my deliveries! It's fast, reliable, and saves me so much time.",
      author: "Amit, Business Owner",
    },
    {
      text: "This platform makes sending packages so easy! It’s affordable and super convenient for my small business.",
      author: "Priya, Online Seller",
    },
    {
      text: "I love the tracking feature! Knowing exactly where my parcel is at all times gives me peace of mind.",
      author: "Rahul, Frequent Sender",
    },
    {
      text: "I love it! It's super simple to earn some money while helping others send their parcels.",
      author: "Neha, Sustainable Shopper",
    },
    {
      text: "I’ve had a great experience! The drivers are friendly, and deliveries are always on time.",
      author: "Sameer, Small Business Owner",
    },
  ];

  return (
    <>
      <div>
        <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-6xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] md:w-[500px]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Publish a Ride</h2>
              <form onSubmit={handleSubmit}>
                {/* Start Location */}
                <div className="mb-3 relative">
                  <label className="text-gray-600">From</label>
                  <input
                    type="text"
                    name="startLocation"
                    placeholder="Enter starting point"
                    value={formData.startLocation}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {suggestions.startLocation.length > 0 && (
                    <ul className="absolute w-full bg-white border shadow-md rounded-md mt-1 z-10 max-h-40 overflow-auto">
                      {suggestions.startLocation.map((place) => (
                        <li
                          key={place.place_id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, startLocation: place.display_name }))
                          }
                        >
                          {place.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* End Location */}
                <div className="mb-3 relative">
                  <label className="text-gray-600">To</label>
                  <input
                    type="text"
                    name="endLocation"
                    placeholder="Enter destination"
                    value={formData.endLocation}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {suggestions.endLocation.length > 0 && (
                    <ul className="absolute w-full bg-white border shadow-md rounded-md mt-1 z-10 max-h-40 overflow-auto">
                      {suggestions.endLocation.map((place) => (
                        <li
                          key={place.place_id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, endLocation: place.display_name }))
                          }
                        >
                          {place.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Start Date */}
                <div className="mb-3">
                  <label className="text-gray-600">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* End Date */}
                <div className="mb-3">
                  <label className="text-gray-600">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Charges */}
                <div className="mb-3">
                  <label className="text-gray-600">Charges (₹)</label>
                  <input
                    type="number"
                    name="charges"
                    placeholder="Enter charges"
                    value={formData.charges}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div className="mb-3">
                  <label className="text-gray-600">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Route Type */}
                <div className="mb-3">
                  <label className="text-gray-600">Route Type</label>
                  <select
                    name="routeType"
                    value={formData.routeType}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#496580] text-white p-3 rounded-md font-semibold hover:bg-black transition-all"
                >
                  Publish a Ride
                </button>
              </form>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-gray-800 text-center mb-6 max-w-md">
                Join QuickShip and reduce delivery costs by transporting parcels along your route.
              </p>
              <div className="hidden md:block">
                <img src="https://img.freepik.com/free-vector/courier-delivering-order-customer-door-man-getting-parcel-box-package-flat-vector-illustration-postman-shipping-service_74855-8309.jpg"
                  alt="Car Ride"
                  className="w-[350px] md:w-[500px]" />
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="container mx-auto px-6 py-12 text-center">
        {/* Main Heading */}
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-8">
          Deliver. Connect. Save.
        </h1>

        {/* Data Blocks */}
        <div className="flex  flex-col md:flex-row justify-center gap-8 md:gap-16">
          {data.map((item, index) => (
            <div key={index} className="max-w-xs text-center">
              <h2 className="text-xl text-start font-bold text-gray-900 mb-2">{item.heading}</h2>
              <p className="text-gray-600 text-sm text-start">{item.para}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-teal-900 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8">What Our Customers Say</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-3xl"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
                <p className="text-lg font-bold text-gray-900">"{testimonial.text}"</p>
                <p className="text-gray-600 mt-2">- {testimonial.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </>

  );
};

export default PublishRide;