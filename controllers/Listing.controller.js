import Listing from "../models/Listing.js";

/* ---------------- GET ALL LISTINGS ---------------- */
const getAllListing = async (req, res) => {
  try {
    const listing = await Listing.find();

    res.status(200).json({
      message: "All listing fetched successfully",
      success: true,
      listing,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

/* ---------------- ADD LISTING ---------------- */
const addListing = async (req, res) => {
  const { Title, Description, price, Address, City, Contact, Image } = req.body;

  try {
    const addhotel = new Listing({
      Title,
      Description,
      price,
      Address,
      City,
      Contact,
      Image,
      Owner: req.user.id,
    });

    await addhotel.save();

    res.status(200).json({
      message: "Listing added successfully",
      success: true,
      addhotel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

/* ---------------- GET LISTING BY ID ---------------- */
const getListingById = async (req, res) => {
  try {
    const hotel = await Listing.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- DELETE LISTING ---------------- */
const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- GET MY HOTELS ---------------- */
const getMyHotels = async (req, res) => {
  try {
    const hotels = await Listing.find({
      Owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- SEARCH HOTELS BY CITY (GET + QUERY) ---------------- */
const hotelsbyCity = async (req, res) => {
  const { city } = req.query;

  try {
    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City query is required",
      });
    }

    const hotels = await Listing.find({ City: city });

    res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      hotels,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- UPDATE LISTING ---------------- */
const updateListing = async (req, res) => {
  try {
    const updatedHotel = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      updatedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- FILTER LISTING (POST) ---------------- */
const filterlisting = async (req, res) => {
  const { City } = req.body;

  try {
    const listings = await Listing.find({ City });

    res.status(200).json({
      message: "Listing fetched successfully",
      success: true,
      listings,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

/* ---------------- EXPORT ---------------- */
const hotelListing = {
  getAllListing,
  getMyHotels,
  addListing,
  getListingById,
  deleteListing,
  updateListing,
  filterlisting,
  hotelsbyCity,
};

export default hotelListing;
