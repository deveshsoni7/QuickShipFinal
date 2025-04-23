import mongoose from "mongoose";

const PublishRideSchema = new mongoose.Schema({
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, 
    charges: { type: Number, required: true },
    time: { type: Date, required: true },
    routeType: { 
        type: String, 
        enum: ["train", "bus", "car", "bike"], 
        required: true 
    },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    // parcels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parcel" }]
});

const PublishRideModel = mongoose.model("PublishRide", PublishRideSchema);

export default PublishRideModel;
