"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Globe,
  GraduationCap,
  Search,
  Filter,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const allUniversities = [
  { id: 1, name: "თავისუფალი უნივერსიტეტი", city: "თბილისი", type: "კერძო", logo: "/uni_pics/free-uni-logo.jpg", faculties: 7, price: "8500₾", url: "https://freeuni.edu.ge" },
  { id: 2, name: "ქართულ-ამერიკული უნივერსიტეტი (GAU)", city: "თბილისი", type: "კერძო", logo: "/uni_pics/gau-logo.png", faculties: 5, price: "7500₾", url: "https://gau.edu.ge" },
  { id: 3, name: "თბილისის სახელმწიფო უნივერსიტეტი", city: "თბილისი", type: "სახელმწიფო", logo: "/uni_pics/tsu-logo.png", faculties: 14, price: "2250₾", url: "https://tsu.ge" },
  { id: 4, name: "ქუთაისის საერთაშორისო უნივერსიტეტი", city: "ქუთაისი", type: "სახელმწიფო", logo: "/uni_pics/kiu-logo.jpg", faculties: 3, price: "2250₾", url: "https://kiu.edu.ge" },
  { id: 5, name: "კავკასიის უნივერსიტეტი (CU)", city: "თბილისი", type: "კერძო", logo: "/uni_pics/cu-logo.jpg", faculties: 11, price: "8900₾", url: "https://cu.edu.ge" },
  { id: 6, name: "ილიას სახელმწიფო უნივერსიტეტი", city: "თბილისი", type: "სახელმწიფო", logo: "/uni_pics/isu-logo.png", faculties: 4, price: "2250₾", url: "https://iliauni.edu.ge" },
];

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ყველა");

  const filteredUnis = allUniversities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "ყველა" || uni.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">უკან დაბრუნება</span>
            </Link>
            <h1 className="text-3xl font-black text-[#1B2559] uppercase tracking-tight">კატალოგი</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="მოძებნე უნივერსიტეტი..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-medium text-[#1B2559]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
              <select
                className="w-full bg-white border-none rounded-2xl py-4 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-bold text-[11px] text-[#1B2559] appearance-none cursor-pointer uppercase tracking-tighter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="ყველა">ყველა ტიპი</option>
                <option value="კერძო">კერძო</option>
                <option value="სახელმწიფო">სახელმწიფო</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="group bg-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 border border-gray-50 transition-all duration-500 flex flex-col h-full relative"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-[#F4F7FE] rounded-2xl p-3 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                  <img src={uni.logo} alt="" className="w-full h-full object-contain" />
                </div>
                
                {/* Badge Colors matched to your image */}
                <span
                  className={`text-[11px] font-bold px-4 py-1.5 rounded-2xl transition-colors ${
                    uni.type === "კერძო"
                      ? "bg-[#FDF2FF] text-[#7000FF]" // Purple/Pinkish for Private
                      : "bg-[#E6F9F4] text-[#00B589]" // Greenish for Public
                  }`}
                >
                  {uni.type}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex-1">
                <h3 className="text-lg font-black text-[#1B2559] mb-6 group-hover:text-brand-primary transition-colors leading-tight uppercase">
                  {uni.name}
                </h3>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase">{uni.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <GraduationCap size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase">{uni.faculties} ფაკულტეტი</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-tight">სწავლის საფასური:</span>
                    <span className="text-[11px] font-black text-[#1B2559]">{uni.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={uni.url}
                target="_blank"
                className="w-full py-4 bg-[#F4F7FE] text-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"
              >
                ეწვიე ვებ-გვერდს <Globe size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUnis.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">შედეგები არ მოიძებნა</p>
          </div>
        )}
      </div>
    </main>
  );
}