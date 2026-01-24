export interface FacultyStats {
  price: number;
  jobRate: number;
  salary: number;
  social: number;
  library: number;
}

export interface Faculty {
  id: string;
  name: string;
  stats: FacultyStats;
}

export interface University {
  id: number;
  name: string;
  logo: string;
  type: "კერძო" | "სახელმწიფო";
  faculties: Faculty[];
}

export const universities: University[] = [
  {
    id: 1,
    name: "GAU",
    logo: "/uni_pics/gau-logo.png",
    type: "კერძო",
    faculties: [
      {
        id: "f1",
        name: "ინფორმატიკა",
        stats: {
          price: 4500,
          jobRate: 95,
          salary: 2000,
          social: 88,
          library: 85,
        },
      },
      {
        id: "f2",
        name: "ბიზნესი",
        stats: {
          price: 4000,
          jobRate: 88,
          salary: 1500,
          social: 92,
          library: 80,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Free Uni",
    logo: "/uni_pics/free-uni-logo.jpg",
    type: "კერძო",
    faculties: [
      {
        id: "f3",
        name: "კომპიუტერული მეცნიერება",
        stats: {
          price: 8500,
          jobRate: 99,
          salary: 3000,
          social: 95,
          library: 99,
        },
      },
      {
        id: "f4",
        name: "მართვა და თერაპია",
        stats: {
          price: 7500,
          jobRate: 94,
          salary: 2200,
          social: 90,
          library: 98,
        },
      },
    ],
  },
];
