import express from "express";
import {
    addRide,
    RideList,
    getMyRides,
    updateRide,
    deleteRide,
    getRidesByDriver
} from "../controllers/publishRide.js";

const router = express.Router();

router.get("/allRide", RideList);
router.get("/driver/:driverId", getRidesByDriver);
router.get("/myRides/:userId", getMyRides); // ✅ FIXED ENDPOINT
router.post("/addRide", addRide);
router.put("/updateRide/:rideId", updateRide);
router.delete("/deleteRide/:rideId/:userId", deleteRide);

export default router;
