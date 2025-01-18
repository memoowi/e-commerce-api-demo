import { getUserData } from "../services/supabaseService.js";
import { handleError } from "../utils/responseUtils.js";

export const requireAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return handleError(res, 401, "Unauthorized, missing token");
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return handleError(res, 401, "Unauthorized, missing token");
  }

  try {
    const { user: data, error: error } = await getUserData(token);

    if (error) {
      return handleError(res, error.status , error.message);
    }

    req.user = data;
    // console.log("User data:", data);
    next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return handleError(res, 500, "Error fetching user data");
  }
};
