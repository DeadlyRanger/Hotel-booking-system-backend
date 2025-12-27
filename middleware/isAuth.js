import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    // 1️⃣ Get token (cookie OR header)
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    // 2️⃣ Token missing
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Token missing",
        success: false
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next(); // ✅ allow request
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false
    });
  }
};

export default isAuth;
