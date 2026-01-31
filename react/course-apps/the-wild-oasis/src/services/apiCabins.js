import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    const errMessage = `Error fetching cabins: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    const errMessage = `Error deleting cabin: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  return data;
}
