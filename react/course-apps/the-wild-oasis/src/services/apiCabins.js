import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    const errMessage = `Error fetching cabins: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    const errMessage = `Error creating cabin: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    const errMessage = `Error uploading cabin image: ${storageError.message}`;
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
