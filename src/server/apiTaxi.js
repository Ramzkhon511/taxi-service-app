import { getCurrentUser } from "./apiRegister";
import supabase from "./supabase";

export async function createBooking(booking) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([booking])
    .select();
  if (error) throw error;

  return data;
}

export async function getBookings() {
  const user = await getCurrentUser();

  if (!user) return [];

  let { data, error } = await supabase
    .from("transactions")
    .select("*, driver:driver_id(*)")
    .eq("user_id", user.id);

  if (error) throw error;

  return data;
}

export async function getBooking(id) {
  let { data, error } = await supabase
    .from("transactions")
    .select("*, driver:driver_id(*)")
    .eq("id", id);

  if (error) throw error;

  return data[0];
}

export async function updateBooking({ bookingId, status }) {
  const { data, error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", bookingId)
    .select();

  if (error) throw error;

  return data;
}

export async function updateDriver({ driverId, review }) {
  const { data, error } = await supabase
    .from("drivers")
    .update({ review: review })
    .eq("id", driverId)
    .select();

  if (error) throw error;

  return data;
}
