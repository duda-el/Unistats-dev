import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Users,
  HelpCircle,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const menuItems = [
    { name: "მთავარი", icon: <LayoutDashboard size={20} />, active: true },
    { name: "სტატისტიკა", icon: <BarChart3 size={20} />, active: false },
    { name: "კალენდარი", icon: <Calendar size={20} />, active: false },
    { name: "ჩვენს შესახებ", icon: <Users size={20} />, active: false },
    { name: "FAQ", icon: <HelpCircle size={20} />, active: false },
  ];

  return (
    <aside className="w-64 h-screen bg-surface-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30 overflow-hidden">
            <Image
              src="/unistats-logo.svg"
              alt="Unistats Logo"
              width={26}
              height={26}
              priority
            />
          </div>

          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            UNISTATS
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
              item.active
                ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/25"
                : "text-slate-400 hover:bg-brand-accent/20 hover:text-brand-primary"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="relative mt-auto min-h-[230px] bg-brand-primary flex flex-col justify-end items-center pb-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full rotate-180 leading-[0]">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="h-[70px] w-full"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-surface-white"
            ></path>
          </svg>
        </div>

        <div className="flex gap-5 mb-4 relative z-10 text-white/90">
          <Facebook
            size={20}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <Instagram
            size={20}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <Globe
            size={20}
            className="hover:text-white cursor-pointer transition-colors"
          />
        </div>

        <div className="w-12/12 h-[1px] bg-white/20 mb-4 relative z-10" />

        <p className="text-[11px] font-medium text-white/60 tracking-wider relative z-10 uppercase">
          Copyright © 2024 UNISTATS
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
