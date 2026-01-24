"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import {
  ArrowLeft,
  Search,
  Wallet,
  Users,
  CheckCircle2,
  Award,
  Info,
} from "lucide-react";
import { useSupabaseFetch } from "@/src/hooks/useSupabaseFetch";
import { universityQueries } from "@/src/api/api";
import type { University } from "@/src/types";
import Loading from "@/src/components/Loading";

export default function FacultySubjectsPage() {
  const params = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const uniSlug = params?.slug as string;
  const facultySlug = params?.facultySlug as string;

  const query = useMemo(() => universityQueries.getAllFullData(), []);
  const { data: universities, loading } = useSupabaseFetch<University[]>(query);

  const facultyData = useMemo(() => {
    if (!universities || !uniSlug || !facultySlug) return null;
    const uni = universities.find(
      (u) =>
        slugify(u.name, { lower: true, strict: true, locale: "ka" }) ===
        uniSlug,
    );
    const faculty = uni?.faculties?.find(
      (f) =>
        slugify(f.name, { lower: true, strict: true, locale: "ka" }) ===
        facultySlug,
    );
    return { uni, faculty };
  }, [universities, uniSlug, facultySlug]);

  const filteredSubjects = useMemo(() => {
    if (!facultyData?.faculty?.subjects) return [];
    return facultyData.faculty.subjects.filter((s: any) =>
      s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [facultyData, searchTerm]);

  if (loading) return <Loading />;

  const { faculty } = facultyData || {};

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-all font-black uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} /> უკან დაბრუნება
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <InfoCard
            label="აკრედიტაცია"
            value={faculty?.accreditation}
            icon={<Award size={18} className="text-red-400" />}
          />
          <InfoCard
            label="წლიური საფასური"
            value={`${faculty?.price} ₾`}
            icon={<Wallet size={18} className="text-red-400" />}
          />
          <InfoCard
            label="ადგილების რ-ობა"
            value={faculty?.total_places}
            icon={<Users size={18} className="text-red-400" />}
          />
          <InfoCard
            label="დაფინანსება"
            value={faculty?.funding}
            icon={<CheckCircle2 size={18} className="text-red-400" />}
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-black text-[#1B2559] mb-4 uppercase leading-tight max-w-4xl mx-auto">
            {faculty?.name}
          </h1>
          <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full mb-8" />

          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="მოძებნე საგანი..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* საგნების ცხრილი */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F4F7FE]/60 border-b border-gray-100">
                  <th className="p-6 text-[10px] font-black text-[#1B2559] uppercase tracking-widest border-r border-gray-100">
                    საგანი
                  </th>
                  <th className="p-6 text-[10px] font-black text-[#1B2559] uppercase tracking-widest text-center border-r border-gray-100">
                    კოეფიციენტი
                  </th>
                  <th className="p-6 text-[10px] font-black text-[#1B2559] uppercase tracking-widest text-center border-r border-gray-100">
                    მინ. ზღვარი
                  </th>
                  <th className="p-6 text-[10px] font-black text-[#1B2559] uppercase tracking-widest text-center border-r border-gray-100">
                    პრიორიტეტი
                  </th>
                  <th className="p-6 text-[10px] font-black text-[#1B2559] uppercase tracking-widest text-center">
                    ადგილები
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject: any, idx: number) => (
                  <tr
                    key={subject.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-[#FDFDFF]"} border-b border-gray-50 hover:bg-brand-primary/5 transition-colors`}
                  >
                    <td className="p-6 text-[11px] font-bold text-[#1B2559] border-r border-gray-50">
                      {subject.subject_name}
                    </td>
                    <td className="p-6 text-[11px] font-bold text-[#1B2559] text-center border-r border-gray-50">
                      {subject.coefficient}
                    </td>
                    <td className="p-6 text-[11px] font-bold text-red-500 text-center border-r border-gray-50">
                      {subject.min_barrier}
                    </td>
                    <td className="p-6 text-[11px] font-bold text-[#1B2559] text-center border-r border-gray-50">
                      {subject.priority}
                    </td>
                    <td className="p-6 text-[11px] font-bold text-slate-400 text-center italic">
                      {subject.subject_places === "nan"
                        ? "-"
                        : subject.subject_places}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubjects.length === 0 && (
            <div className="p-20 text-center">
              <Info size={40} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                მონაცემები არ მოიძებნა
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
          {label}
        </span>
      </div>
      <span className="text-[11px] font-black text-[#1B2559] uppercase">
        {value || "არ არის"}
      </span>
    </div>
  );
}
