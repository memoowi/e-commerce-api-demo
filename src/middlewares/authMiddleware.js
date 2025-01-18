import { getUserData } from "../services/supabaseService.js";

export const requireAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, missing token" });
  }

  try {
    const { user: data, error: error } = await getUserData(token);

    if (error) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }

    req.user = data;
    // console.log("User data:", data);
    next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
