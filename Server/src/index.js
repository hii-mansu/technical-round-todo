import express from "express";
import cors from "cors";
import router from "./routes/todoRoutes.js";
import connectDB from "./config/DB.js";
import "dotenv/config";


const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.use("/api/todos", router);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})