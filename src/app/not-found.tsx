"use client";

import React from "react";
import Link from "next/link";
import { Home, Search, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      {/* ფონური დეკორი */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* ილუსტრაციის ნაწილი */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl shadow-brand-primary/10 flex items-center justify-center mx-auto rotate-12 group hover:rotate-0 transition-transform duration-500">
            <Ghost size={48} className="text-brand-primary animate-bounce" />
          </div>
          <div className="absolute -bottom-2 right-1/2 translate-x-12 w-8 h-8 bg-[#F4F7FE] rounded-xl flex items-center justify-center shadow-sm -rotate-12">
            <Search size={16} className="text-slate-400" />
          </div>
        </div>

        {/* ტექსტი */}
        <h1 className="text-7xl font-black text-[#1B2559] mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-xl font-black text-[#1B2559] uppercase mb-4 tracking-tight">
          გვერდი ვერ მოიძებნა
        </h2>
        <p className="text-slate-400 text-sm font-bold leading-relaxed mb-10 px-4 italic">
          სამწუხაროდ, გვერდი რომელსაც ეძებთ არ არსებობს ან გადატანილია სხვა
          მისამართზე.
        </p>

        {/* ღილაკები */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.15em] hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-1 transition-all"
          >
            <Home size={16} /> მთავარზე დაბრუნება
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 bg-white text-[#1B2559] border border-gray-100 px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.15em] hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={16} /> უკან გასვლა
          </button>
        </div>
      </div>

      {/* ქვედა დეკორი */}
      <div className="absolute bottom-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
        Unistats • Academic Portal
      </div>
    </main>
  );
}
