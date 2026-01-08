import express from "express";
import hotelListing from "../controllers/Listing.controller.js";
import isAuth from "../middleware/isAuth.js";
import isRole from "../middleware/isRole.js";

const router = express.Router();

// ---------------- PUBLIC ROUTES ----------------

// all listings
router.get("/allhotels", hotelListing.getAllListing);

// filter listing (POST)
router.post("/hotels", hotelListing.filterlisting);

// get single hotel
router.get("/hotels/:id", hotelListing.getListingById);

// 🔥 SEARCH HOTELS BY CITY (GET + QUERY)
router.get("/hotelsincity", hotelListing.hotelsbyCity);

// ---------------- PROTECTED ROUTES ----------------

// add hotel (owner/admin)
router.post("/addhotel", isAuth, isRole, hotelListing.addListing);

// manage my hotels
router.get("/managehotels", isAuth, isRole, hotelListing.getMyHotels);

// update hotel
router.put("/hotels/:id", isAuth, isRole, hotelListing.updateListing);

// delete hotel
router.delete("/hotels/:id", isAuth, isRole, hotelListing.deleteListing);

export default router;
