"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  MapPin,
  GraduationCap,
  Search,
  Filter,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useSupabaseFetch } from "@/src/hooks/useSupabaseFetch";
import { universityQueries } from "@/src/api/api";
import { University } from "@/src/types/index";
import Universityicon from "@/public/Universityicon.svg";
import slugify from "slugify";
import Loading from "@/src/components/Loading";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ყველა");

  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(1);

  const query = useMemo(() => universityQueries.getAllFullData(), []);
  const {
    data: universities,
    loading,
    error,
  } = useSupabaseFetch<University[]>(query);

  console.log("Supabase Data:", universities);
  console.log("Fetch Error:", error);
  console.log("Loading State:", loading);

  const filteredUnis = useMemo(() => {
    return (universities || [])
      .slice()
      .sort((a, b) => {
        if (a.trending !== b.trending) return a.trending ? -1 : 1;

        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      })
      .filter((uni) => {
        const matchesSearch = uni.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesFilter =
          filterType === "ყველა" ||
          (filterType === "სახელმწიფო" && uni.uni_type) ||
          (filterType === "კერძო" && !uni.uni_type);

        return matchesSearch && matchesFilter;
      });
  }, [universities, search, filterType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUnis.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(page, totalPages);

  const paginatedUnis = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredUnis.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUnis, safePage]);

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors mb-4 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                უკან დაბრუნება
              </span>
            </Link>
            <h1 className="text-3xl font-black text-[#1B2559] uppercase tracking-tight">
              კატალოგი
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="მოძებნე უნივერსიტეტი..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-medium text-[#1B2559]"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Type Filter */}
            <div className="relative w-full sm:w-48">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary"
                size={16}
              />
              <select
                className="w-full bg-white border-none rounded-2xl py-4 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-bold text-[11px] text-[#1B2559] appearance-none cursor-pointer uppercase tracking-tighter"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="ყველა">ყველა ტიპი</option>
                <option value="კერძო">კერძო</option>
                <option value="სახელმწიფო">სახელმწიფო</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
          </div>
        </div>

        {loading && <Loading />}
        {error && (
          <p className="text-center font-bold text-red-500">შეცდომა: {error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {paginatedUnis.map((uni) => (
            <div
              key={uni.id}
              className="group bg-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 border border-gray-50 transition-all duration-500 flex flex-col h-full relative"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-[#F4F7FE] rounded-2xl p-3 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                  <Image
                    width={64}
                    height={64}
                    src={uni.logo_url || Universityicon}
                    alt={uni.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <span
                  className={`text-[11px] font-bold px-4 py-1.5 rounded-2xl transition-colors ${
                    uni.uni_type
                      ? "bg-[#E9FFF3] text-[#22C55E]"
                      : "bg-[#EEF2FF] text-[#3B82F6]"
                  }`}
                >
                  {uni.uni_type ? "სახელმწიფო" : "კერძო"}
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
                    <span className="text-[10px] font-bold uppercase">
                      თბილისი
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <GraduationCap size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase">
                      {uni.faculties?.length || 0} ფაკულტეტი
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`/universities/${slugify(uni.name, {
                  lower: true,
                  strict: true,
                  locale: "ka",
                })}`}
                className="w-full py-4 bg-[#F4F7FE] text-brand-primary rounded-2xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"
              >
                სრულად
              </a>
            </div>
          ))}
        </div>

        {!loading && filteredUnis.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-4 py-2 rounded-2xl bg-[#F4F7FE] text-[#1B2559] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer "
            >
              წინა
            </button>

            <div className="text-xs font-black text-[#1B2559]">
              {safePage} / {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-4 py-2 rounded-2xl bg-[#F4F7FE] text-[#1B2559] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              შემდეგი
            </button>
          </div>
        )}

        {!loading && filteredUnis.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
              შედეგები არ მოიძებნა
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
