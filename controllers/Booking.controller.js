import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";

const createBooking = async (req, res) => {
  const { listingId } = req.params;
  const { checkIn, checkOut } = req.body;

  try {
    console.log("NEW BOOKING REQUEST:", {
      listingId,
      checkIn,
      checkOut
    });

    // 1️⃣ Validate dates
    if (!checkIn || !checkOut) {
      return res.status(400).json({
        message: "Check-in and check-out dates are required",
        success: false
      });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        message: "Invalid booking dates",
        success: false
      });
    }

    // 2️⃣ Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Hotel not found",
        success: false
      });
    }

    // 3️⃣ CORRECT overlap check (FIXED ✅)
    const existingBooking = await Booking.findOne({
      listing: listingId,
      status: { $in: ["pending", "confirmed"] },
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    });

    console.log("BLOCKING BOOKING FOUND:", existingBooking);

    if (existingBooking) {
      return res.status(400).json({
        message: "Hotel not available for selected dates",
        success: false
      });
    }

    // 4️⃣ Price calculation
    const nights =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      return res.status(400).json({
        message: "Invalid booking duration",
        success: false
      });
    }

    const totalPrice = nights * listing.price;

    // 5️⃣ Create booking
    const booking = await Booking.create({
      user: req.user.id,
      listing: listingId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice
    });

    res.status(201).json({
      message: "Booking created successfully",
      success: true,
      booking
    });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({
      message: "Server error",
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

export default {
  createBooking,
  getMyBookings,
  cancelBooking
};
