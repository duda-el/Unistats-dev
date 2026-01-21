import React from "react";
import { BarChart, FileText, Tag, UserPlus } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    title: "სტუდენტი",
    value: "250k+",
    change: "+8% მეტი ვიდრე 2023 წელს",
    icon: <BarChart size={20} />,
    bgColor: "bg-[#FFF0F3]",
    iconBg: "bg-[#EE5D70]",
  },
  {
    title: "აბიტურიენტი",
    value: "42K+",
    change: "+15% მეტი ვიდრე 2023 წელს",
    icon: <FileText size={20} />,
    bgColor: "bg-[#FFF8ED]",
    iconBg: "bg-[#FFB547]",
  },
  {
    title: "უნივერსიტეტი",
    value: "61",
    change: "+0% მეტი ვიდრე 2023 წელს",
    icon: <Tag size={20} />,
    bgColor: "bg-[#E6FBF0]",
    iconBg: "bg-[#3BD97B]",
  },
  {
    title: "საერთაშორისო სტუდენტი",
    value: "12K+",
    change: "+4% მეტი ვიდრე 2023 წელს",
    icon: <UserPlus size={20} />,
    bgColor: "bg-[#F4F1FF]",
    iconBg: "bg-[#8E79F3]",
  },
];

const StatsGrid = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">
          2024 წლის მონაცემები
        </h3>
        <p className="text-sm text-slate-400">სტატისტიკა</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-[18px] p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-200`}
          >
            <div>
              <div
                className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center text-white mb-3`}
              >
                {stat.icon}
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800 tracking-tight">
                  <CountUp
                    start={0}
                    end={parseFloat(stat.value.replace(/[^0-9.]/g, ""))}
                    duration={1.5}
                    suffix={stat.value.replace(/[0-9.]/g, "")}
                  />
                </span>

                <span className="text-[12px] font-bold text-slate-500/80 uppercase tracking-wide mt-1">
                  {stat.title}
                </span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-black/5">
              <span className="text-[10px] font-bold text-brand-primary">
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
