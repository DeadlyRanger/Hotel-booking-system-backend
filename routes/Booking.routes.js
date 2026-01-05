import express from "express";
import bookingController from "../controllers/Booking.controller.js";
import isAuth from "../middleware/isAuth.js";
import isRole from "../middleware/isRole.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/bookings/:listingId",
  isAuth,
  
  bookingController.createBooking
);

bookingRouter.get(
  "/bookings/my",
  isAuth,
  bookingController.getMyBookings
);

bookingRouter.delete(
  "/bookings/:id",
  isAuth,
 
  bookingController.cancelBooking
);

export default bookingRouter;
