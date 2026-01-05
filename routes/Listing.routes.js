import hotelListing from "../controllers/Listing.controller.js";
import isAuth from "../middleware/isAuth.js";
import isRole from "../middleware/isRole.js";

import express from "express";

const router = express.Router();

//all listings
router.get('/allhotels',hotelListing.getAllListing);
router.post('/hotels',hotelListing.filterlisting);

//booking-user
router.post('/addhotel',isAuth,isRole,hotelListing.addListing);
router.get('/hotels/:id',hotelListing.getListingById);
router.get('/managehotels',isAuth,isRole,hotelListing.getMyHotels);


//owner only 
router.put('/hotels/:id',isAuth,isRole,hotelListing.updateListing);
router.delete('/hotels/:id',isAuth,isRole,hotelListing.deleteListing);



export default router;