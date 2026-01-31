"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Users,
  HelpCircle,
  Facebook,
  Instagram,
  Globe,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "მთავარი", icon: <LayoutDashboard size={20} />, href: "/" },
    { name: "სტატისტიკა", icon: <BarChart3 size={20} />, href: "/statistics" },
    { name: "ივენთები", icon: <Calendar size={20} />, href: "/events" },
    { name: "ჩვენს შესახებ", icon: <Users size={20} />, href: "/about" },
    { name: "FAQ", icon: <HelpCircle size={20} />, href: "/faq" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* მობილურის Toggle ღილაკი */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-30 p-2 bg-blue-600 z-[100000] text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[22] lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-[100000] h-screen w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 overflow-hidden relative">
              <Image
                src="/unistats-logo.svg"
                alt="Logo"
                fill
                priority
                className="object-contain p-2"
              />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              UNISTATS
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // ლინკზე დაჭერისას მენიუ დაიმალოს
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/25"
                    : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="relative mt-auto min-h-[230px] bg-blue-600 flex flex-col justify-end items-center pb-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full rotate-180 leading-0">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              className="h-[70px] w-full"
            >
              <path
                d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                className="fill-white"
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
          <div className="w-10/12 h-px bg-white/20 mb-4 relative z-10" />
          <p className="text-[11px] font-medium text-white/60 tracking-wider relative z-10 uppercase">
            Copyright © 2024 UNISTATS
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
