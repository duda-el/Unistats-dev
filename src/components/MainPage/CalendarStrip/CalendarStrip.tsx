import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

const days = [
  { label: "ორშ", date: 20 },
  { label: "სამ", date: 21 },
  { label: "ოთხ", date: 22 },
  { label: "ხუთ", date: 23, active: true },
  { label: "პარ", date: 24 },
  { label: "შაბ", date: 25 },
  { label: "კვი", date: 26 },
];

const CalendarStrip = () => {
  return (
    /* Removed h-full and reduced p-6 to p-5 */
    <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 relative w-full">
      <div className="flex justify-between items-center relative">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-3 px-3 py-2 rounded-full transition-all duration-300 ${
              day.active 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/40 -translate-y-1 pb-4" 
                : "text-slate-800"
            }`}
          >
            <span className={`text-[11px] font-bold ${day.active ? "text-white" : "text-slate-400"}`}>
              {day.label}
            </span>
            
            <span className="text-lg font-bold tracking-tight">
              {day.date}
            </span>

            {day.active && (
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
            )}
          </div>
        ))}

        {/* Calendar Icon Positioned Bottom Right */}
        <div className="absolute -bottom-1 -right-1 opacity-40">
           <CalendarIcon size={16} className="text-brand-primary" />
        </div>
      </div>
    </div>
  );
};

export default CalendarStrip;