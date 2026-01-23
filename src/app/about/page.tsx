"use client";

import React from "react";
import { 
  Rocket, Heart, ShieldCheck, Target, 
  Sparkles, Coffee, Code2, Users2,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🌟 Hero Section */}
      <div className="text-center space-y-4 py-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest animate-bounce">
          <Sparkles size={14} /> ჩვენი მისია
        </div>
        <h1 className="text-5xl font-black text-[#1B2559] tracking-tight">
          ვაციფრულებთ <span className="text-blue-600">განათლების</span> მომავალს
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          UNISTATS შეიქმნა იმისათვის, რომ აბიტურიენტებს დავეხმაროთ ცხოვრების ყველაზე მნიშვნელოვანი გადაწყვეტილების მიღებაში — მონაცემებზე დაყრდნობით.
        </p>
      </div>

      {/* 🍱 Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[200px]">
        
        {/* Story Card */}
        <div className="md:col-span-8 md:row-span-2 bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 bg-blue-50 w-64 h-64 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black text-[#1B2559]">საიდან დავიწყეთ?</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
              ჩვენ ვიყავით სტუდენტები, რომლებსაც გვიჭირდა რეალური სტატისტიკის პოვნა უნივერსიტეტების შესახებ. გადავწყვიტეთ შეგვექმნა პლატფორმა, სადაც ყველა მონაცემი: დასაქმება, გრანტები და რეიტინგები ერთ სივრცეში იქნებოდა.
            </p>
            <button className="flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-4 transition-all">
              ნახე ჩვენი გზა <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="md:col-span-4 md:row-span-1 bg-blue-600 rounded-[35px] p-8 text-white flex flex-col justify-center">
          <Rocket size={32} className="mb-4 text-blue-200" />
          <h4 className="font-black text-xl italic tracking-tighter">ინოვაცია</h4>
          <p className="text-blue-100 text-sm mt-1">უახლესი AI ტექნოლოგიები მონაცემთა ანალიზისთვის.</p>
        </div>

        <div className="md:col-span-4 md:row-span-1 bg-white rounded-[35px] p-8 border border-gray-50 shadow-sm flex flex-col justify-center">
          <ShieldCheck size={32} className="mb-4 text-emerald-500" />
          <h4 className="font-black text-xl text-[#1B2559]">სანდოობა</h4>
          <p className="text-slate-400 text-sm mt-1">მხოლოდ ოფიციალური და გადამოწმებული წყაროები.</p>
        </div>

        {/* Team Stats */}
        <div className="md:col-span-4 md:row-span-1 bg-slate-50 rounded-[35px] p-8 flex flex-col items-center justify-center text-center group">
          <h2 className="text-4xl font-black text-[#1B2559] group-hover:scale-110 transition-transform tracking-tighter">50K+</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">ყოველთვიური მომხმარებელი</p>
        </div>

        <div className="md:col-span-4 md:row-span-1 bg-white rounded-[35px] p-8 border border-gray-100 shadow-sm flex items-center gap-5">
           <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Users2 size={28} />
           </div>
           <div>
              <h4 className="font-black text-[#1B2559]">გუნდი</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">15+ ექსპერტი</p>
           </div>
        </div>

        <div className="md:col-span-4 md:row-span-1 bg-[#1B2559] rounded-[35px] p-8 text-white flex flex-col justify-center relative overflow-hidden">
          <Code2 size={40} className="absolute right-6 top-6 opacity-20" />
          <h4 className="font-black text-xl tracking-tighter">ღია კოდი</h4>
          <p className="text-slate-400 text-sm mt-1 italic">მხარდაჭერილია დეველოპერების მიერ.</p>
        </div>

      </div>

      {/* 🤝 Bottom CTA */}
      <div className="bg-white rounded-[45px] p-12 border border-gray-100 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
          <Heart size={32} />
        </div>
        <h3 className="text-3xl font-black text-[#1B2559]">გინდა გახდე ჩვენი პარტნიორი?</h3>
        <p className="text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
          თუ გსურს განათლების სფეროში ცვლილებების შეტანა, მოგვწერე და დავიწყოთ თანამშრომლობა.
        </p>
        <button className="bg-[#1B2559] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-[#1B2559]/30 transition-all active:scale-95">
          დაგვიკავშირდი
        </button>
      </div>

    </div>
  );
}