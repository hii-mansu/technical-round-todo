import mongoose, { mongo } from "mongoose";

const connectDB = async ()=>{
    const MONGO_URI = process.env.MONGO_URI;
     if(!MONGO_URI){
        throw new Error("PORT should be provided for DB connection.");
     };
     mongoose.connection.on("error", (err)=>{
        console.error("Error in DB connection : ", err.message || "Connection Error.");
     });
     mongoose.connection.on("disconnected", ()=>{
        console.warn("DB disconnected,");
     });

     const cnct = await mongoose.connect(MONGO_URI);
     console.log("DB connected successfully on : mongoDB");
     return cnct;
};

export default connectDB;