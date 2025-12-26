import Listing from "../models/Listing.js";


const getAllListing = async(req,res)=>{
     try{
          
        const listing = await Listing.find();

        res.status(200).json({
            message:'All listing fetched successfully',
            success:true,
            listing
        });
             
     }
     catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })

     }
}


const addListing = async(req,res)=>{
      const {
         Title, Description, price , Address,City,Contact,Image
      } = req.body;

      try{

        const addhotel =  new Listing({
            Title,
            Description,
            price,
            Address,
            City,
            Contact,
            Image
        })
        await addhotel.save();
        res.status(200).json({
            message:'Listing added successfully',
            success:true,
            addhotel
        })

      }
      catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
      }
}

const getListingById = async (req, res) => {
  try {
    const hotel = await Listing.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ success: true, hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

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
      updatedHotel
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



const hotelListing = {getAllListing,addListing,getListingById,deleteListing,updateListing}
export default hotelListing