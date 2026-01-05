import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // ✅ 1. cookie-parser must be enabled
    // token comes from httpOnly cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: token missing"
      });
    }

    // ✅ 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role:decoded.role
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid or expired token"
    });
  }
};

export default isAuth;
