import mongoose from "mongoose";
import PublishRideModel from "../models/PublishRideModel.js";
import User from "../models/UserModal.js";

const addRide = async (req, res) => {
    try {
        const rideDetails = new PublishRideModel({
            startLocation: req.body.startLocation,
            endLocation: req.body.endLocation,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            charges: req.body.charges,
            time: req.body.time,
            routeType: req.body.routeType,
            driverId: req.body.driverId
        });

        const savedRide = await rideDetails.save();

        await User.findByIdAndUpdate(
            req.body.driverId,
            { $push: { ridesPublished: savedRide._id } },
            { new: true }
        );

        res.status(201).json({ 
            success: true, 
            message: "Ride added successfully",
            data: savedRide
        });

    } catch (error) {
        console.error("Error adding ride:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add ride",
            error: error.message 
        });
    }
};

const RideList = async (req, res) => {
    try {
        const rides = await PublishRideModel.find({})
            .populate('driverId', 'name email phone');
        
        res.status(200).json({
            success: true,
            count: rides.length,
            data: rides
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch rides",
            error: error.message
        });
    }
};

const getMyRides = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path: 'ridesPublished',
            options: { sort: { createdAt: -1 } }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            count: user.ridesPublished.length,
            data: user.ridesPublished
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user rides",
            error: error.message
        });
    }
};

const getRidesByDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const user = await User.findById(driverId).populate("ridesPublished");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.ridesPublished);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateRide = async (req, res) => {
    try {
        const { rideId } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(rideId)) {
            return res.status(400).json({ success: false, message: "Invalid ride ID" });
        }

        const updatedRide = await PublishRideModel.findByIdAndUpdate(
            rideId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedRide) {
            return res.status(404).json({ success: false, message: "Ride not found" });
        }

        res.status(200).json({
            success: true,
            message: "Ride updated successfully",
            data: updatedRide
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update ride", error: error.message });
    }
};

const deleteRide = async (req, res) => {
    try {
      const { rideId, userId } = req.params;
  
      const deletedRide = await PublishRideModel.findOneAndDelete({
        _id: rideId,
        driverId: userId,
      });
  
      if (!deletedRide) {
        return res.status(404).json({
          success: false,
          message: "Ride not found or not owned by user",
        });
      }
  
      await User.findByIdAndUpdate(userId, { $pull: { ridesPublished: rideId } });
  
      res.status(200).json({
        success: true,
        message: "Ride deleted successfully",
        data: deletedRide,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete ride",
        error: error.message,
      });
    }
  };

export {
    addRide,
    RideList,
    getMyRides,
    updateRide,
    deleteRide,
    getRidesByDriver
};
