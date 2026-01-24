"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import {
  ArrowLeft,
  Globe,
  BookOpen,
  Building2,
  ExternalLink,
  MapPin,
  GraduationCap,
  Sparkles,
  Link,
} from "lucide-react";
import { useSupabaseFetch } from "@/src/hooks/useSupabaseFetch";
import { universityQueries } from "@/src/api/api";
import type { University, Faculty } from "@/src/types";
import Loading from "@/src/components/Loading";

export default function UniversityPage() {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const query = useMemo(() => universityQueries.getAllFullData(), []);
  const {
    data: universities,
    loading,
    error,
  } = useSupabaseFetch<University[]>(query);

  const uni = useMemo(() => {
    if (!universities || !slug) return null;
    return (
      universities.find(
        (u) =>
          slugify(u.name, { lower: true, strict: true, locale: "ka" }) === slug,
      ) || null
    );
  }, [universities, slug]);

  if (loading) return <Loading />;

  if (error || !uni)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center p-8 bg-white rounded-[32px] shadow-sm border border-gray-100">
          <p className="text-slate-400 font-bold mb-6 italic">
            მონაცემები ვერ მოიძებნა
          </p>
          <button
            onClick={() => router.back()}
            className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          >
            <ArrowLeft size={16} /> უკან დაბრუნება
          </button>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Background Blur Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Navigation */}
        <div className="pt-8 mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-white shadow-sm group-hover:shadow-md border border-gray-50 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              უკან დაბრუნება
            </span>
          </button>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 mb-10 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={12} className="animate-pulse" />
                {uni.uni_type
                  ? "სახელმწიფო უნივერსიტეტი"
                  : "კერძო უნივერსიტეტი"}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#1B2559] leading-[1.1] uppercase tracking-tight max-w-2xl">
                {uni.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <MapPin size={16} className="text-brand-primary" />
                  <span className="text-xs font-bold uppercase">თბილისი</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <GraduationCap size={16} className="text-brand-primary" />
                  <span className="text-xs font-bold uppercase">
                    {uni.faculties?.length || 0} ფაკულტეტი
                  </span>
                </div>
              </div>
            </div>

            {uni.website_url && (
              <a
                href={uni.website_url}
                target="_blank"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-brand-primary text-white hover:shadow-xl hover:shadow-brand-primary/30 transition-all px-8 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.15em]"
              >
                ვებგვერდი <ExternalLink size={16} />
              </a>
            )}
          </div>
          {/* Subtle decor circle */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand-primary/5 rounded-full" />
        </div>

        {/* Faculties Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-[#1B2559] uppercase tracking-tight">
              ფაკულტეტები
            </h2>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {uni.faculties?.map((f: Faculty) => (
              <a
                key={f.id}
                href={`/universities/${slug}/${slugify(f.name, {
                  lower: true,
                  strict: true,
                  locale: "ka",
                })}`}
                className="group p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 hover:border-brand-primary/20 transition-all duration-300 flex flex-col items-start"
              >
                <div className="p-3 rounded-2xl bg-[#F4F7FE] text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-[#1B2559] text-base leading-snug group-hover:text-brand-primary transition-colors">
                  {f.name}
                </h3>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-brand-primary/50 transition-colors">
                  დეტალურად <ArrowLeft size={10} className="rotate-180" />
                </div>
              </a>
            ))}

            {(!uni.faculties || uni.faculties.length === 0) && (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                <BookOpen size={40} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">
                  ფაკულტეტები არ არის დამატებული
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
