import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import helmet from "helmet";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";


// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// minddlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// api endpoints
app.use("/api/admin",adminRouter)
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);



app.get("/", (req,res) => {
  res.send("API WORKING ")
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("Server run successfully",port)
})