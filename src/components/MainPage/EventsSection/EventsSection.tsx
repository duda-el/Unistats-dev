import React from "react";
import { Calendar, MapPin, ArrowRight, Bell } from "lucide-react";
import { events } from "@/src/data/events";

const EventsSection = () => {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#1B2559]">
            მომავალი ღონისძიებები
          </h3>
          <p className="text-xs font-medium text-[#A3AED0]">
            არ გამოტოვო სიახლე
          </p>
        </div>
        <button className="p-3 bg-[#F4F7FE] text-brand-primary rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm">
          <Bell size={20} />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative flex items-center gap-5 p-4 rounded-[28px] border border-transparent hover:border-gray-100 hover:bg-[#F4F7FE]/50 transition-all duration-300 cursor-pointer"
          >
            {/* Date Badge */}
            <div className="flex flex-col items-center justify-center min-w-16.25 h-18.75 bg-[#F4F7FE] rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
              <span className="text-xl font-black text-brand-primary">
                {event.date}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {event.month}
              </span>
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${event.color}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {event.category}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1B2559] truncate group-hover:text-brand-primary transition-colors">
                {event.title}
              </h4>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar size={12} />
                  <span className="text-[10px] font-bold">{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold truncate max-w-30">
                    {event.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Arrow */}
            <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/30">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="mt-8 w-full py-4 rounded-2xl border-2 border-dashed border-gray-100 text-[#A3AED0] text-xs font-bold hover:border-brand-primary hover:text-brand-primary transition-all duration-300 uppercase tracking-widest">
        ყველა ღონისძიება
      </button>
    </div>
  );
};

export default EventsSection;
