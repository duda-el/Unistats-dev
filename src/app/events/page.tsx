"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  MapPin, Calendar as CalendarIcon, 
  Ticket, Search, 
  ChevronRight, ArrowLeft 
} from "lucide-react";
import Link from "next/link";

const studentEvents = [
  {
    id: 1,
    title: "GAU Welcome Party 2026",
    university: "GAU",
    date: "24 იან",
    time: "20:00",
    location: "Mono Hall",
    price: "FREE",
    category: "გართობა",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    color: "#7000FF"
  },
  {
    id: 2,
    title: "TSU Open Ceremony",
    university: "TSU",
    date: "28 იან",
    time: "11:00",
    location: "თსუ I კორპუსი",
    price: "FREE",
    category: "ოფიციალური",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    color: "#00B589"
  },
  {
    id: 3,
    title: "Hackathon: Build the Future",
    university: "Free Uni",
    date: "05 თებ",
    time: "10:00",
    location: "თავისუფალი უნივერსიტეტი",
    price: "15₾",
    category: "ტექნოლოგიები",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    color: "#4318FF"
  }
];

export default function StudentEventsPage() {
  const [filter, setFilter] = useState("ყველა");
  const [searchQuery, setSearchQuery] = useState("");

  // ფილტრაციის ლოგიკა
  const filteredEvents = studentEvents.filter((event) => {
    const matchesCategory = filter === "ყველა" || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white w-full">
      <div className="max-w-[1400px] mx-auto p-6 md:p-10 w-full">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors mb-4 group w-fit">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">მთავარი</span>
            </Link>
            <h1 className="text-4xl font-black text-[#1B2559] uppercase tracking-tight">ღონისძიებები</h1>
            <p className="text-sm text-slate-400 font-medium">სტუდენტური ცხოვრების ეპიცენტრი</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="მოძებნე ივენთი..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-medium text-[#1B2559]"
            />
          </div>
        </div>

        {/* Hero Event (Featured Banner) */}
        <div className="relative w-full h-[450px] rounded-[40px] overflow-hidden mb-8 group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2559] via-[#1B2559]/30 to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1500&auto=format&fit=crop"
            alt="Featured" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-10 left-10 z-20 max-w-2xl">
            <span className="bg-brand-primary text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
              კვირის ფავორიტი
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
              უნივერსიტეტების <br /> გაერთიანებული ფესტივალი
            </h2>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} /> <span className="text-sm font-bold">15 თებერვალი</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} /> <span className="text-sm font-bold">რიყის პარკი</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter - Placed under Main Banner */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 custom-scrollbar">
          {["ყველა", "გართობა", "ოფიციალური", "ტექნოლოგიები", "სპორტი"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${
                filter === cat 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 translate-y-[-2px]" 
                : "bg-white text-slate-400 hover:text-brand-primary hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-5 left-5 z-20">
                  <span className="bg-white/95 backdrop-blur-md text-[#1B2559] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {event.university}
                  </span>
                </div>
                <div className="absolute top-5 right-5 z-20">
                  <div className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-primary shadow-sm hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">
                    <Ticket size={20} />
                  </div>
                </div>
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-black text-[#1B2559] leading-tight uppercase group-hover:text-brand-primary transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-brand-primary leading-none">{event.price}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase mt-2">ბილეთი</p>
                  </div>
                </div>

                <div className="space-y-4 mt-auto pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-brand-primary">
                      <CalendarIcon size={14} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-brand-primary">
                      <MapPin size={14} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide truncate">{event.location}</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-5 bg-[#F4F7FE] text-brand-primary rounded-[22px] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  დეტალები <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100 mt-8">
            <div className="w-20 h-20 bg-[#F4F7FE] rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <CalendarIcon size={32} />
            </div>
            <p className="text-slate-400 font-black uppercase text-sm tracking-widest">ამ კატეგორიაში ივენთები არ არის</p>
          </div>
        )}
      </div>
    </main>
  );
}