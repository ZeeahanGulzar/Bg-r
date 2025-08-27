import "dotenv/config";
import express from "express";
import cors from "cors";
import connectdb from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";


let port = process.env.PORT || 4000 ;
let app = express();
await connectdb();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=> res.send("API is working!"));
app.use("/api/user",userRouter);
app.use("/api/image",imageRouter);

app.listen(port,()=> console.log("Server running on port "+port));