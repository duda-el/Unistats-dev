"use client";

import React from "react";
import Image from "next/image";
import { 
  Trophy, GraduationCap, ArrowUpRight, 
  Star, Briefcase, Percent, Globe2, 
  Search, Filter, Download, Zap
} from "lucide-react";

const StatisticsPage = () => {
  // რეალური და საინტერესო მონაცემები აბიტურიენტებისთვის
  const uniStats = [
    { 
      id: "01", 
      name: "ქართულ-ამერიკული უნივერსიტეტი GAU", 
      city: "თბილისი", 
      grant: "75%", 
      employment: 92, 
      rating: 4.8, 
      exchange: "30+ Erasmus+", 
      logo: "/uni_pics/gau-logo.png",
      trend: "ზრდადი"
    },
    { 
      id: "02", 
      name: "თბილისის სახელმწიფო უნივერსიტეტი", 
      city: "თბილისი", 
      grant: "88%", 
      employment: 78, 
      rating: 4.5, 
      exchange: "50+ პარტნიორი", 
      logo: "/uni_pics/tsu-logo.png",
      trend: "სტაბილური"
    },
    { 
      id: "03", 
      name: "თბილისის თავისუფალი უნივერსიტეტი", 
      city: "თბილისი", 
      grant: "95%", 
      employment: 98, 
      rating: 4.9, 
      exchange: "20+ პარტნიორი", 
      logo: "/uni_pics/free-uni-logo.jpg",
      trend: "ლიდერი"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 🏆 Highlight Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="გრანტის ლიდერი" 
          value="თავისუფალი უნი." 
          desc="სტუდენტთა 95% იღებს დაფინანსებას" 
          icon={<Percent className="text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard 
          title="დასაქმების ჰაბი" 
          value="GAU" 
          desc="კურსდამთავრებულთა 92% დასაქმებულია" 
          icon={<Briefcase className="text-emerald-500" />}
          color="bg-emerald-50"
        />
        <StatCard 
          title="საერთაშორისო აღიარება" 
          value="თსუ" 
          desc="ყველაზე მეტი Erasmus+ პროგრამა" 
          icon={<Globe2 className="text-purple-500" />}
          color="bg-purple-50"
        />
      </div>

      {/* 🔍 Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-[28px] border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="მოძებნე უნივერსიტეტი..." 
            className="w-full bg-[#F4F7FE] border-none py-3.5 pl-12 pr-4 rounded-2xl text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-100 px-5 py-3.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> ფილტრი
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3.5 rounded-2xl text-xs font-bold hover:shadow-lg hover:shadow-blue-600/30 transition-all">
            <Download size={16} /> ექსპორტი
          </button>
        </div>
      </div>

      {/* 📊 Main Table Container */}
      <div className="bg-white rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FCFCFD]">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-10">#</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">უნივერსიტეტი</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">გრანტის შანსი</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">რეიტინგი</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right pr-10">დასაქმება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {uniStats.map((uni) => (
                <tr key={uni.id} className="group hover:bg-[#F4F7FE]/50 transition-all cursor-pointer">
                  <td className="p-6 pl-10 text-xs font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                    {uni.id}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative bg-white rounded-2xl p-2 shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">
                        <Image src={uni.logo} alt="" fill className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1B2559] group-hover:text-blue-600 transition-colors">{uni.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{uni.city}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-bold text-emerald-500 uppercase">{uni.exchange}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl font-black text-xs">
                      <Zap size={12} /> {uni.grant}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-1.5">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-black text-[#1B2559]">{uni.rating}</span>
                    </div>
                  </td>
                  <td className="p-6 pr-10">
                    <div className="flex items-center justify-end gap-5">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-700">{uni.employment}%</p>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">{uni.trend}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-all shadow-sm">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 🎨 Helper Component for Bento Cards
const StatCard = ({ title, value, desc, icon, color }: any) => (
  <div className="bg-white p-7 rounded-[35px] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} opacity-20 rounded-full group-hover:scale-150 transition-transform duration-700`} />
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{title}</p>
    <h4 className="text-xl font-black text-[#1B2559] mb-1">{value}</h4>
    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default StatisticsPage;