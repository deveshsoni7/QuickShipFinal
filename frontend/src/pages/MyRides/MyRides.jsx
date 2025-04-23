// pages/MyRide.jsx
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyRide = () => {
  const { userId, rides, fetchRides, loading } = useContext(StoreContext);

  useEffect(() => {
    if (userId) fetchRides();
  }, [userId]);

  const deleteRide = async (rideId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ride?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/rides/deleteRide/${rideId}/${userId}`
      );
      if (response.status === 200) {
        alert("Ride deleted successfully!");
        fetchRides();
      }
    } catch (error) {
      console.error("Error deleting ride:", error);
      alert("Failed to delete ride. Please try again.");
    }
  };

  // Format date to dd/mm/yyyy
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  // Format time to hh:mm
  const formatTime = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#f3f8ff] flex justify-center items-start p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">

        {/* Left Side Image */}
        <div className="w-full md:w-1/2 bg-[#f0f4ff] flex items-center justify-center p-6">
          <img
            src="https://img.freepik.com/free-vector/warehouse-staff-wearing-uniform-loading-parcel-box-checking-product-from-warehouse-delivery-logistic-storage-truck-transportation-industry-delivery-logistic-business-delivery_1150-60909.jpg"
            alt="Illustration"
            className="w-full max-w-md h-auto rounded-md"
          />
        </div>

        {/* Ride List */}
        <div className="w-full md:w-1/2 px-6 py-8 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold text-[#23408e] mb-6 text-center">My Rides</h2>

          {loading ? (
            <div className="text-center text-gray-600">Loading your rides...</div>
          ) : rides.length === 0 ? (
            <div className="text-center text-gray-600">No rides found.</div>
          ) : (
            <div className="space-y-6">
              {rides.map((ride) => (
                <div
                  key={ride._id}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-4 flex flex-col md:flex-row gap-6 items-center"
                >
                  {/* Left side of the card: From, To */}
                  <div className="flex flex-col w-full md:w-2/3">
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">From</p>
                      <p className="text-base font-bold text-gray-800">{ride.startLocation}</p>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-semibold">To</p>
                      <p className="text-base font-bold text-gray-800">{ride.endLocation}</p>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-semibold">Date</p>
                      <p className="text-base text-gray-700">{formatDate(ride.startDate)}</p>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-semibold">Time</p>
                      <p className="text-base text-gray-700">{formatTime(ride.startDate)}</p>
                    </div>
                  </div>

                  {/* Right side of the card: Mode, Charges, and Delete */}
                  <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                    {/* Mode */}
                    <div className="flex justify-between w-full mb-2">
                      <p className="text-sm text-gray-500 font-semibold">Mode</p>
                      <p className="text-base text-gray-700">{ride.routeType?.toUpperCase() || "N/A"}</p>
                    </div>

                    {/* Charges */}
                    <div className="flex justify-between w-full mb-2">
                      <p className="text-sm text-gray-500 font-semibold">Charges</p>
                      <p className="text-base text-gray-700">₹{ride.charges || "N/A"}</p>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-between w-full">
                      <button
                        onClick={() => deleteRide(ride._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRide;
