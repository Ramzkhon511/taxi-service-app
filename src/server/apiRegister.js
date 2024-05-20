import supabase from "./supabase";

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logoutUser() {
  let { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function registerUser({ email, phone, region, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        phone,
        region,
      },
    },
  });

  if (error) throw error;

  return data;
}