import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  age: { type: Number, min: 18 },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: "India" },
  },

  profession: { type: String },
  aadharNumber: { type: String, unique: true, sparse: true },

  isDriver: { type: Boolean, default: false },
  isVerifiedDriver: { type: Boolean, default: false },

  vehicleInfo: {
    vehicleType: { type: String, enum: ["car", "bike", "van", "truck"] },
    vehicleModel: { type: String },
    vehicleNumber: { type: String, unique: true, sparse: true } // ← This is important
  },
  

  ridesPublished: [{ type: mongoose.Schema.Types.ObjectId, ref: "PublishRide" }],
  bookedRides: [{ type: mongoose.Schema.Types.ObjectId, ref: "PublishRide" }],
  deliveredParcels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parcel" }],
  parcelsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parcel" }],

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
