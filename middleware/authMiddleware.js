import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log("🛠 Incoming Headers:", req.headers); // Debugging log

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("🚨 No token found in request!");
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user info to request
        console.log("✅ Decoded Token:", decoded);
        next();
    } catch (error) {
        console.error("🚨 Invalid Token:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }
    next();
};