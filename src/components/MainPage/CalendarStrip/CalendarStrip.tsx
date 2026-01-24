import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

const dayLabels = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი"];

const getWeekDays = () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sun ... 6 = Sat
  const diffToMonday = (day + 6) % 7;

  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - diffToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const isActive =
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();

    return {
      label: dayLabels[i],
      date: d.getDate(),
      active: isActive,
    };
  });
};

const CalendarStrip = () => {
  const days = getWeekDays();

  return (
    <div className="bg-white rounded-4xl p-5 shadow-sm border border-gray-50 relative w-full">
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
            <span
              className={`text-[12px] font-bold ${
                day.active ? "text-white" : "text-slate-400"
              }`}
            >
              {day.label}
            </span>

            <span className="text-lg font-bold tracking-tight">{day.date}</span>

            {day.active && (
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
            )}
          </div>
        ))}

        <div className="absolute -bottom-1 right-0">
          <CalendarIcon size={18} className="text-brand-primary" />
        </div>
      </div>
    </div>
  );
};

export default CalendarStrip;
