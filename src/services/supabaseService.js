import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Sign up user
export const signUp = async (email, password, displayName) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError.message);

  // Update display name
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    authData.user.id,
    { user_metadata: { displayName } }
  );

  if (updateError) throw new Error(updateError.message);

  return authData;
};

// Sign in user
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

// Get user data
export const getUserData = async (token) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  return { user, error };
};
