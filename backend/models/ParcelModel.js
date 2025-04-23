import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema({
    weight: { type: Number, required: true }, 
    packageType: { 
        type: String, 
        enum: ["document", "electronics", "clothing", "fragile", "other"], 
        required: true 
    },

    pickupLocation: { type: String, required: true },

    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Driver handling the delivery
    assignedRide: { type: mongoose.Schema.Types.ObjectId, ref: "PublishRide" }, // Ride delivering the parcel

    createdAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date }
});

const Parcel = mongoose.model("Parcel", ParcelSchema);

export default Parcel;
