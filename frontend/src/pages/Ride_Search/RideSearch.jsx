import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from '../../components/Search/Search';

const RideSearch = () => {
  const [selected, setSelected] = useState("Earliest departure");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = [
    { label: "Earliest departure" },
    { label: "Lowest price" },
    { label: "Close to departure point" },
    { label: "Close to arrival point" },
    { label: "Shortest ride" },
  ];

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/rides/allRide');
        
       
        if (response.data.success) {
          setRides(response.data.data);
        } else {
          throw new Error('Failed to fetch rides');
        }
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError('Failed to load rides. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRides();
  }, []);

  const formatRideData = (ride) => {
    const start = new Date(ride.startDate);
    const end = new Date(ride.endDate);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const duration = `${hours}H${minutes > 0 ? minutes + "M" : ""}`;

    return {
      id: ride._id,
      date: start.toLocaleDateString(),
      departureTime: new Date(ride.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      departureLocation: ride.startLocation,
      arrivalTime: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalLocation: ride.endLocation,
      duration,
      price: `Rs ${ride.charges}/-`,
      mode: ride.routeType,
    };
  };

  if (loading) {
    return <div className="text-center py-10">Loading rides...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className='text-center text-5xl font-bold m-4 p-4'>Where do you want to deliver?</h1>
      <SearchForm />
      <div className='flex justify-center'>
        <div className='flex w-[85%]'>
          <div className="left w-[30%]">
            <div className="p-4 bg-white rounded-lg shadow-md w-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Sort by</h3>
                <button
                  className="text-blue-500 text-sm font-medium hover:underline"
                  onClick={() => setSelected("")}
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {options.map((option) => (
                  <label key={option.label} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                    <input
                      type="radio"
                      name="sort"
                      value={option.label}
                      checked={selected === option.label}
                      onChange={() => setSelected(option.label)}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <div className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
                      selected === option.label ? "border-blue-500" : "border-gray-400"
                    }`}>
                      {selected === option.label && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="right w-[70%] h-[500px] overflow-y-auto">
            <div className="first flex items-center justify-between m-2 p-2">
              <div className="l flex gap-5">
                <h1>Date</h1>
                <p>Location1 → Location2</p>
              </div>
              <div className="r">
                {rides.length} rides available
              </div>
            </div>
            <div className="card space-y-4">
              {rides.map((ride) => {
                const formattedRide = formatRideData(ride);
                return (
                  <div key={formattedRide.id} className="card hover:border-black transition-all duration-300 bg-white rounded-lg shadow-md p-4 w-full border border-gray-300">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 font-medium">Departure Date: {formattedRide.date}</p>
                      <span className="text-sm text-gray-500">{formattedRide.mode.toUpperCase()}</span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <div className="flex flex-col">
                        <p className="text-lg font-bold">{formattedRide.departureTime}</p>
                        <p className="text-gray-600">{formattedRide.departureLocation}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 text-sm">{formattedRide.duration}</p>
                        <div className="h-1 w-16 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-lg font-bold">{formattedRide.arrivalTime}</p>
                        <p className="text-gray-600">{formattedRide.arrivalLocation}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-semibold">Mode: {formattedRide.mode}</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{formattedRide.price}</p>
                      <button className="flex items-center gap-2 px-3 py-1 bg-[#496580] text-white rounded-md hover:bg-black transition-all duration-300">
                        Chat
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideSearch;