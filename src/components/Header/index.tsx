"use client";

import React from "react";
import { Moon, Languages } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // URL-ის მიხედვით სათაურების რუკა
  const titles: { [key: string]: string } = {
    "/": "მთავარი",
    "/statistics": "სტატისტიკა",
    "/events": "ივენთები",
    "/about": "ჩვენს შესახებ",
    "/faq": "ხშირად დასმული კითხვები",
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md fixed top-0 right-0 left-64 z-99999 px-8 flex items-center justify-between border-b border-gray-50">
      <h2 className="text-2xl font-bold text-slate-800 animate-in fade-in slide-in-from-left-4 duration-500">
        {titles[pathname] || "UNISTATS"}
      </h2>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all">
          <Languages size={18} className="text-slate-400 group-hover:text-blue-600" />
          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-800">ENG (US)</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all">
          <Moon size={18} className="text-slate-400 group-hover:text-blue-600" />
          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-800">მუქი თემა</span>
        </div>
      </div>
    </header>
  );
};

export default Header;