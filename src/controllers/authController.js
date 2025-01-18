import { signUp, signIn } from "../services/supabaseService.js";
import { handleSuccess, handleError } from "../utils/responseUtils.js";

// Register user
export const registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return handleError(
      res,
      400,
      "All fields (email, password, displayName) are required."
    );
  }

  try {
    const user = await signUp(email, password, displayName);
    return handleSuccess(res, 201, "User registered successfully", user);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, 400, "Email and password are required.");
  }

  try {
    const user = await signIn(email, password);
    return handleSuccess(res, 200, "Logged in successfully", user);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};

// User data
export const userData = async (req, res) => {
  const user = req.user;

  if (!user) {
    return handleError(res, 401, "Unauthorized, user not found.");
  }

  try {
    return handleSuccess(res, 200, "User data fetched successfully", user);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};