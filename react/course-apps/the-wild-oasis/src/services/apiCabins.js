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
