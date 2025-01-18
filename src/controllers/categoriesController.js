import { supabase, supabaseAdmin } from "../services/supabaseService.js";
import { handleSuccess, handleError } from "../utils/responseUtils.js";

export const getCategories = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      return handleError(res, error.status, error.message);
    }
    return handleSuccess(
      res,
      200,
      "Categories fetched successfully",
      categories
    );
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};

// Controller for adding a category
export const addCategory = async (req, res) => {
  const user = req.user;
  const isAdmin = user.user.user_metadata.role === "admin";
  if (!isAdmin) {
    return handleError(res, 403, "You are not authorized to add a category.");
  }

  const { name, description } = req.body;
  const file = req.file; // The uploaded files

  if (!name || !description || !file) {
    return handleError(
      res,
      400,
      "All fields (name, description, img) are required."
    );
  }

  try {
    // Check no duplicate name
    const { data: duplicateData, error: duplicateError } = await supabase
      .from("categories")
      .select("name")
      .eq("name", name);

    if (duplicateError) {
      //   console.error("Supabase Duplicate Error:", duplicateError);
      return handleError(res, 500, duplicateError.message);
    }

    if (duplicateData.length > 0) {
      return handleError(
        res,
        400,
        "A category with the same name already exists."
      );
    }

    // Upload image to Supabase Storage
    const { data: storageData, error: storageError } =
      await supabaseAdmin.storage
        .from("categories-images")
        .upload(`public/${Date.now()}-${file.originalname}`, file.buffer, {
          contentType: file.mimetype,
        });

    if (storageError) {
      //   console.error("Supabase Storage Error:", storageError.message);
      return handleError(res, 500, storageError.message);
    }

    // console.log(storageData);

    const img_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${storageData.fullPath}`;

    // Insert category into the database
    const { data: category, error: dbError } = await supabaseAdmin
      .from("categories")
      .insert([{ name, description, img_url }])
      .select();

    if (dbError) {
      //   console.error("Supabase Insert Error:", dbError);
      return handleError(res, 500, dbError.message);
    }

    return handleSuccess(res, 201, "Category added successfully", category);
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    return handleError(res, 500, "An unexpected error occurred.");
  }
};
