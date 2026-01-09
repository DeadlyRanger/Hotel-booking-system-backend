import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      retryWrites: false,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB SSL error:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
