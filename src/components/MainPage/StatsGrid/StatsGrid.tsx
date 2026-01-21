import React from "react";
import { BarChart, FileText, Tag, UserPlus } from "lucide-react";

const stats = [
  {
    title: "სტუდენტი",
    value: "250k+",
    change: "+8% მეტი ვიდრე 2023 წელს",
    icon: <BarChart size={24} />,
    bgColor: "bg-[#FFF0F3]", // ღია ვარდისფერი
    iconColor: "text-[#EE5D70]",
    iconBg: "bg-[#EE5D70]",
  },
  {
    title: "აბიტურიენტი",
    value: "42K+",
    change: "+15% მეტი ვიდრე 2023 წელს",
    icon: <FileText size={24} />,
    bgColor: "bg-[#FFF8ED]", // ღია ნარინჯისფერი
    iconColor: "text-[#FFB547]",
    iconBg: "bg-[#FFB547]",
  },
  {
    title: "უნივერსიტეტი",
    value: "61",
    change: "+0% მეტი ვიდრე 2023 წელს",
    icon: <Tag size={24} />,
    bgColor: "bg-[#E6FBF0]", // ღია მწვანე
    iconColor: "text-[#3BD97B]",
    iconBg: "bg-[#3BD97B]",
  },
  {
    title: "საერთაშორისო სტუდენტი",
    value: "12K+",
    change: "+4% მეტი ვიდრე 2023 წელს",
    icon: <UserPlus size={24} />,
    bgColor: "bg-[#F4F1FF]", // ღია იისფერი
    iconColor: "text-[#8E79F3]",
    iconBg: "bg-[#8E79F3]",
  },
];

const StatsGrid = () => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">2024 წლის მონაცემები</h3>
        <p className="text-sm text-slate-400">სტატისტიკა</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-[32px] p-6 flex flex-col transition-transform hover:scale-[1.02] duration-200`}
          >
            <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
              {stat.icon}
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-800 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-black/5">
              <span className="text-[11px] font-bold text-brand-primary">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;