import { supabase, supabaseAdmin } from "../services/supabaseService.js";
import { handleSuccess, handleError } from "../utils/responseUtils.js";

// Register user
export const registerUser = async (req, res) => {
  const { email, password, displayName, role } = req.body;

  if (!email || !password || !displayName) {
    return handleError(
      res,
      400,
      "All fields (email, password, displayName) are required."
    );
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
          role,
        },
      },
    });

    if (authError) {
      return handleError(res, authError.status, authError.message);
    }

    // const { error: updateError } =
    //   await supabaseAdmin.auth.admin.updateUserById(authData.user.id, {
    //     user_metadata: { displayName },
    //   });

    // if (updateError) {
    //   return handleError(res, 400, updateError.message);
    // }

    return handleSuccess(res, 201, "User registered successfully", authData);
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
    const { data: authData, error: error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return handleError(res, error.status, error.message);
    }

    return handleSuccess(res, 200, "Logged in successfully", authData);
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

export const logoutUser = async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  try {
    const { error } = await supabase.auth.signOut(token);

    if (error) {
      return handleError(res, 500, "Failed to log out.");
    }
    return handleSuccess(res, 200, "User logged out successfully", null);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};
