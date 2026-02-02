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

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/edit cabin
  // A. Create cabin
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B. Edit cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();
  if (error) {
    const errMessage = `Error creating cabin: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  // File uploads
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
