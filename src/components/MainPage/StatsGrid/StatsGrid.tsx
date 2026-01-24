"use client";

import React from "react";
import { BarChart, FileText, Tag, UserPlus } from "lucide-react";
import CountUp from "react-countup";
import { stats } from "@/src/data/stats";
import type { StatIcon } from "@/src/data/stats";

const iconMap: Record<StatIcon, React.ElementType> = {
  BarChart,
  FileText,
  Tag,
  UserPlus,
};

const StatsGrid = () => {
  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-50 h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">
          2024 წლის მონაცემები
        </h3>
        <p className="text-sm text-slate-400">სტატისტიკა</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];

          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-[18px] p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-200`}
            >
              <div>
                <div
                  className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center text-white mb-3`}
                >
                  <Icon size={20} />
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
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;
