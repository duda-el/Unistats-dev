import { supabase } from "../lib/supabaseClient";

export const universityQueries = {
  // Fetches all universities with their nested faculties and subjects
  getAllFullData: () =>
    supabase.from("universities").select(`
        *,
        faculties (
          *,
          subjects (*)
        )
      `),

  // Fetch a single university by ID
  getById: (id: string | number) =>
    supabase
      .from("universities")
      .select(`*, faculties(*)`)
      .eq("id", id)
      .single(),
};
