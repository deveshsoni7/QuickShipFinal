import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://deso:Deveshsoni7@cluster0.v52al.mongodb.net/QuickShip').then(()=>console.log("DB connected"));

}
