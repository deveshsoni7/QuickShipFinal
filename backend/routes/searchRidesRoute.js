import express from "express";

const AllRideRoute = express.Router();

AllRideRoute.get("/allRide",RideList);





export default AllRideRoute;