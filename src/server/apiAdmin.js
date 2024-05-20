import supabase from "./supabase";

export async function getDrivers() {
  let { data: clients, error } = await supabase.from("drivers").select("*");

  if (error) throw error;

  return clients;
}

export async function getUsers() {
  const { data: clients, error } = await supabase.auth.admin.listUsers();

  if (error) throw error;

  return clients;
}

export async function deleteDriver(id) {
  let { error } = await supabase.from("drivers").delete().match({ id });

  if (error) throw error;
}

export async function createDriver(driver) {
  let { data, error } = await supabase.from("drivers").insert(driver);

  if (error) throw error;

  return data;
}

export async function getTransactions() {
  let { data, error } = await supabase
    .from("transactions")
    .select("*, driver:driver_id(*)");

  if (error) throw error;

  return data;
}
