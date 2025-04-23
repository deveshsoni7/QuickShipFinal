import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    profilePicture: null,
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    profession: "",
    aadharNumber: "",
    isDriver: false,
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); 
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded.id;
  
    const updateData = {
      fullName: formData.fullName,
      age: formData.age,
      phone: formData.phone,
      profession: formData.profession,
      aadharNumber: formData.aadharNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      isDriver: formData.isDriver,
      vehicleInfo: {
        vehicleType: formData.vehicleType,
        vehicleModel: formData.vehicleModel,
        vehicleNumber: formData.vehicleNumber,
      }
    };
  
    try {
      const response = await fetch(`http://localhost:4000/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating profile.");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Details */}
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" />


        {/* Address */}
        <h3 className="font-semibold mt-4">Address</h3>
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" />

        {/* Other Details */}
        <input name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} className="w-full p-2 border rounded" />


        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#496580] hover:bg-black text-white font-bold py-2 px-6 rounded-full shadow-lg transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
