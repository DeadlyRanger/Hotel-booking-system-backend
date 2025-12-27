import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import isAuth from '../middleware/isAuth.js';


 
const createBooking = async (req, res) => {
    const {listingId} = req.params
  const {  checkIn, checkOut } = req.body;

  try {
    // 1️⃣ Check dates
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        message: "Invalid booking dates",
        success: false
      });
    }

    // 2️⃣ Find listing (your schema)
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Hotel not found",
        success: false
      });
    }

    // 3️⃣ Check availability via Booking (NOT listing)
    const existingBooking = await Booking.findOne({
      listing: listingId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        { checkIn: { $lt: checkOut, $gte: checkIn } },
        { checkOut: { $gt: checkIn, $lte: checkOut } },
        { checkIn: { $lte: checkIn }, checkOut: { $gte: checkOut } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Hotel not available for selected dates",
        success: false
      });
    }

    // 4️⃣ Calculate price
    const nights =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const totalPrice = nights * listing.price;

    // 5️⃣ Create booking
    const booking = new Booking({
      user: req.user.id,
      listing: listingId,
      checkIn,
      checkOut,
      totalPrice
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      success: true,
      booking
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("listing", "Title City price Image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
  }
};


const bookingController = {
  createBooking , getMyBookings ,
  cancelBooking
};
export default bookingController;