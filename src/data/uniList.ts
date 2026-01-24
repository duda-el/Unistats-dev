export type UniType = "კერძო" | "სახელმწიფო";

export interface UniItem {
  id: number;
  name: string;
  city: string;
  type: UniType;
  logo: string;
  url?: string;
}

export const uniList: UniItem[] = [
  {
    id: 1,
    name: "GAU",
    city: "თბილისი",
    type: "კერძო",
    logo: "/uni_pics/gau-logo.png",
    url: "https://gau.edu.ge",
  },
  {
    id: 2,
    name: "Free Uni",
    city: "თბილისი",
    type: "კერძო",
    logo: "/uni_pics/free-uni-logo.jpg",
    url: "https://freeuni.edu.ge",
  },
  {
    id: 3,
    name: "TSU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/tsu-logo.png",
    url: "https://tsu.ge",
  },
  {
    id: 4,
    name: "KIU",
    city: "ქუთაისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/kiu-logo.jpg",
    url: "https://kiu.edu.ge",
  },
  {
    id: 5,
    name: "CU",
    city: "თბილისი",
    type: "კერძო",
    logo: "/uni_pics/cu-logo.jpg",
    url: "https://cu.edu.ge",
  },
  {
    id: 6,
    name: "ISU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/isu-logo.png",
    url: "https://iliauni.edu.ge",
  },
  {
    id: 7,
    name: "SEU",
    city: "თბილისი",
    type: "კერძო",
    logo: "/uni_pics/seu-logo.png",
    url: "https://iliauni.edu.ge",
  },
  {
    id: 8,
    name: "GTU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/gtu-logo.jpg",
    url: "https://iliauni.edu.ge",
  },
];
