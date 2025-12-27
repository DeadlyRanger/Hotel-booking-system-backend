import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";
import router from "./routes/Listing.routes.js";
import userRouter from "./routes/User.routes.js";
import bookingRouter from "./routes/Booking.routes.js";

const app = express();
const port = 3000;

// 🔥 MIDDLEWARE ORDER MATTERS
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

// ROUTES
app.use("/api/listings", router);
app.use("/api/user", userRouter);
app.use("/api/listing", bookingRouter);

// SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  dbConnect();
});

