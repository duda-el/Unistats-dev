export interface Subject {
  id: number;
  faculty_id: number;
  subject_name: string;
  coefficient: number;
  min_barrier: string;
  priority: number;
  subject_places: string;
}

export interface Faculty {
  id: number;
  uni_id: number;
  name: string;
  accreditation: string;
  price: number;
  total_places: number;
  funding: string;
  link: string;
  subjects?: Subject[]; // Nested relation
}

export interface University {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  created_at: string;
  faculties?: Faculty[]; // Nested relation
}
