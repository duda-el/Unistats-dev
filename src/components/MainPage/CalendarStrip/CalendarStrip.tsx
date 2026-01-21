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
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
      <div className="flex justify-between items-start relative">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-6 px-4 py-2 rounded-full transition-all duration-300 ${
              day.active 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/40 -translate-y-2 pb-6" 
                : "text-slate-800"
            }`}
          >
            <span className={`text-sm font-medium ${day.active ? "text-white/90" : "text-slate-500"}`}>
              {day.label}
            </span>
            
            <span className="text-xl font-bold tracking-tight">
              {day.date}
            </span>

            {day.active && (
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-auto" />
            )}
          </div>
        ))}

        {/* კალენდრის პატარა აიქონი მარჯვენა დაბალ კუთხეში */}
        <div className="absolute bottom-0 right-0 p-1">
           <CalendarIcon size={18} className="text-brand-primary/40" />
        </div>
      </div>
    </div>
  );
};

export default CalendarStrip;