export type StatIcon = "BarChart" | "FileText" | "Tag" | "UserPlus";

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: StatIcon;
  bgColor: string;
  iconBg: string;
}

export const stats: StatItem[] = [
  {
    title: "სტუდენტი",
    value: "250k+",
    change: "+8% მეტი ვიდრე 2023 წელს",
    icon: "BarChart",
    bgColor: "bg-[#FFF0F3]",
    iconBg: "bg-[#EE5D70]",
  },
  {
    title: "აბიტურიენტი",
    value: "42K+",
    change: "+15% მეტი ვიდრე 2023 წელს",
    icon: "FileText",
    bgColor: "bg-[#FFF8ED]",
    iconBg: "bg-[#FFB547]",
  },
  {
    title: "უნივერსიტეტი",
    value: "61",
    change: "+0% მეტი ვიდრე 2023 წელს",
    icon: "Tag",
    bgColor: "bg-[#E6FBF0]",
    iconBg: "bg-[#3BD97B]",
  },
  {
    title: "საერთაშორისო სტუდენტი",
    value: "12K+",
    change: "+4% მეტი ვიდრე 2023 წელს",
    icon: "UserPlus",
    bgColor: "bg-[#F4F1FF]",
    iconBg: "bg-[#8E79F3]",
  },
];
