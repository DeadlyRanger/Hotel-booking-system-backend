import hotelListing from "../controllers/Listing.controller.js";

import express from "express";

const router = express.Router();

//all listings
router.get('/hotels',hotelListing.getAllListing);

//booking-user
router.post('/addhotel',hotelListing.addListing);
router.get('/hotels/:id',hotelListing.getListingById);


//owner only 
router.put('/hotels/:id',hotelListing.updateListing);
router.delete('/hotels/:id',hotelListing.deleteListing);


export default router;