"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  GitCompare,
  Plus,
  Briefcase,
  Edit3,
  X,
  TrendingUp,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/src/lib/supabaseClient";
import { useSupabaseFetch } from "@/src/hooks/useSupabaseFetch";
import Universityicon from "@/public/Universityicon.svg";
import slugify from "slugify";

interface Faculty {
  id: number;
  name: string;
  total_places: number;
  avg_salary?: number;
  price: number;
}

interface University {
  id: number;
  name: string;
  logo_url?: string;
  faculties: Faculty[];
}

interface SlotSelection {
  uni: University | null;
  faculty: Faculty | null;
}

export default function CompareUniversities() {
  const params = useParams();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const uniQuery = useMemo(
    () =>
      supabase
        .from("universities")
        .select("id, name, logo_url, faculties(id, name, price, total_places)"),
    [],
  );

  const {
    data: universities,
    loading,
    error,
  } = useSupabaseFetch<University[]>(uniQuery);

  const [slot1, setSlot1] = useState<SlotSelection>({
    uni: null,
    faculty: null,
  });
  const [slot2, setSlot2] = useState<SlotSelection>({
    uni: null,
    faculty: null,
  });

  const [modal, setModal] = useState<{
    open: boolean;
    slot: 1 | 2 | null;
    step: "chooseUni" | "chooseFaculty";
    uni: University | null;
  }>({ open: false, slot: null, step: "chooseUni", uni: null });

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-brand-primary">
        <Loader2 className="animate-spin" size={40} />
        <span className="font-bold text-sm uppercase tracking-widest opacity-60">
          მონაცემები იტვირთება...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-8 text-center bg-red-50 rounded-3xl">
        შეცდომა: {error}
      </div>
    );

  const canCompare = slot1.faculty && slot2.faculty;

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 relative">
      {/* Header */}
      <div className="mb-10">
        <h3 className="text-2xl font-black text-[#1B2559]">
          ანალიტიკური შედარება
        </h3>
        <p className="text-sm font-medium text-[#A3AED0]">
          შეადარე უნივერსიტეტები რეალური მონაცემების მიხედვით
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mb-12">
        <div className="lg:col-span-5">
          <SlotCard
            slot={slot1}
            onOpen={() =>
              setModal({ open: true, slot: 1, step: "chooseUni", uni: null })
            }
            onClear={() => setSlot1({ uni: null, faculty: null })}
            onEdit={() =>
              setModal({
                open: true,
                slot: 1,
                step: "chooseFaculty",
                uni: slot1.uni,
              })
            }
          />
        </div>

        <div className="lg:col-span-1 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-[#F4F7FE] flex items-center justify-center border-4 border-white shadow-sm">
            <GitCompare size={20} className="text-brand-primary" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <SlotCard
            slot={slot2}
            onOpen={() =>
              setModal({ open: true, slot: 2, step: "chooseUni", uni: null })
            }
            onClear={() => setSlot2({ uni: null, faculty: null })}
            onEdit={() =>
              setModal({
                open: true,
                slot: 2,
                step: "chooseFaculty",
                uni: slot2.uni,
              })
            }
          />
        </div>
      </div>

      {canCompare && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ComparisonMetric
            label="ადგილების რაოდენობა"
            desc="კურსზე ჩასარიცხი ადგილების რაოდენობა"
            v1={slot1.faculty?.total_places || 0}
            v2={slot2.faculty?.total_places || 0}
            icon={<Briefcase size={18} />}
            invert={false}
          />

          <ComparisonMetric
            label="წლიური გადასახადი"
            desc="სწავლის საფასურის წლიური გადასახადი"
            v1={slot1.faculty?.price || 2250}
            v2={slot2.faculty?.price || 2250}
            unit="₾"
            icon={<TrendingUp size={18} />}
            invert={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-[#F4F7FE]/50 p-5 rounded-3xl border border-gray-50/50 flex flex-col justify-center items-center">
              <span className="text-[10px] font-black text-[#A3AED0] uppercase block mb-3">
                დეტალური ინფორმაცია
              </span>
              <div className="flex items-center gap-6">
                <a
                  href={`/universities/${slugify(slot1.uni?.name || "", { lower: true, strict: true, locale: "ka" })}/${slugify(
                    slot1.faculty?.name || "",
                    {
                      lower: true,
                      strict: true,
                      locale: "ka",
                    },
                  )}`}
                  target="_blank"
                  className="flex items-center gap-1 text-brand-primary text-xs font-bold hover:underline"
                >
                  <ExternalLink size={12} /> {slot1.uni?.name}
                </a>

                <div className="w-px h-4 bg-gray-200" />

                <a
                  href={`/universities/${slugify(slot2.uni?.name || "", { lower: true, strict: true, locale: "ka" })}/${slugify(
                    slot2.faculty?.name || "",
                    {
                      lower: true,
                      strict: true,
                      locale: "ka",
                    },
                  )}`}
                  target="_blank"
                  className="flex items-center gap-1 text-brand-primary text-xs font-bold hover:underline"
                >
                  <ExternalLink size={12} /> {slot2.uni?.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal.open && (
        <CompareModal
          step={modal.step}
          uni={modal.uni}
          universities={universities || []}
          onClose={() => setModal({ ...modal, open: false })}
          onPickUni={(uni: University) =>
            setModal({ ...modal, step: "chooseFaculty", uni })
          }
          onPickFaculty={(faculty: Faculty) => {
            const selection = { uni: modal.uni!, faculty };
            if (modal.slot === 1) setSlot1(selection);
            else setSlot2(selection);
            setModal({ ...modal, open: false });
          }}
        />
      )}
    </div>
  );
}

const SlotCard = ({ slot, onOpen, onClear, onEdit }: any) => {
  if (slot.uni && slot.faculty) {
    return (
      <div className="bg-[#F4F7FE] p-5 rounded-[32px] border border-white shadow-sm relative">
        <button
          onClick={onClear}
          className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-slate-300 hover:text-red-500 z-10 transition-colors"
        >
          <X size={14} />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 relative bg-white rounded-2xl p-2 shadow-sm shrink-0">
            <Image
              src={slot.uni.logo_url}
              alt={slot.uni.name}
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </div>
          <h4 className="font-black text-[#1B2559] uppercase text-[10px] leading-tight flex-1">
            {slot.uni.name}
          </h4>
        </div>
        <div
          onClick={onEdit}
          className="bg-white rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:ring-2 ring-brand-primary/10 transition-all"
        >
          <div className="overflow-hidden">
            <p className="text-[9px] font-black text-brand-primary uppercase opacity-60">
              მიმართულება
            </p>
            <p className="text-[11px] font-bold text-[#1B2559] truncate">
              {slot.faculty.name}
            </p>
          </div>
          <Edit3 size={14} className="text-brand-primary ml-2 shrink-0" />
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={onOpen}
      className="w-full h-32 border-2 border-dashed border-[#E0E5F2] rounded-[32px] flex flex-col items-center justify-center gap-3 hover:bg-[#F4F7FE]/50 transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
        <Plus size={20} />
      </div>
      <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">
        დამატება
      </span>
    </button>
  );
};

const CompareModal = ({
  step,
  uni,
  universities,
  onClose,
  onPickUni,
  onPickFaculty,
}: any) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm">
    <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h4 className="font-bold text-[#1B2559]">
          {step === "chooseFaculty"
            ? "აირჩიე ფაკულტეტი"
            : "აირჩიე უნივერსიტეტი"}
        </h4>
        <button onClick={onClose}>
          <X size={20} className="text-gray-300 hover:text-[#1B2559]" />
        </button>
      </div>
      <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {step === "chooseUni"
          ? universities.map((u: University) => (
              <button
                key={u.id}
                onClick={() => onPickUni(u)}
                className="w-full flex items-center gap-4 p-4 hover:bg-[#F4F7FE] rounded-2xl transition-all mb-2 border border-transparent group"
              >
                <div className="w-10 h-10 relative bg-white rounded-lg p-1 shadow-sm shrink-0">
                  <Image
                    src={u.logo_url || Universityicon}
                    alt={u.name}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-[#1B2559] group-hover:text-brand-primary uppercase text-xs text-left">
                  {u.name}
                </span>
              </button>
            ))
          : uni?.faculties.map((f: Faculty) => (
              <button
                key={f.id}
                onClick={() => onPickFaculty(f)}
                className="w-full text-left p-4 hover:bg-brand-primary hover:text-white rounded-2xl mb-2 transition-all font-bold text-sm"
              >
                {f.name}
              </button>
            ))}
      </div>
    </div>
  </div>
);

const ComparisonMetric = ({
  label,
  desc,
  v1,
  v2,
  unit,
  icon,
  invert = false,
}: any) => {
  const winner = invert ? (v1 < v2 ? 1 : 2) : v1 > v2 ? 1 : 2;

  const max = Math.max(v1, v2) || 1;
  const w1 = (v1 / max) * 100;
  const w2 = (v2 / max) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-brand-primary bg-brand-primary/5 p-1.5 rounded-lg">
          {icon}
        </div>
        <span className="font-bold text-[#1B2559] text-sm uppercase tracking-tight">
          {label}
        </span>
      </div>
      <p className="text-[11px] text-[#A3AED0] mb-4 pl-9">{desc}</p>

      <div className="grid grid-cols-11 items-center gap-4">
        {/* მარცხენა მხარე (v1) */}
        <div className="col-span-5">
          <div className="flex justify-between mb-2 items-end px-1">
            <span
              className={`text-xl font-black ${winner === 1 ? "text-brand-primary" : "text-slate-400"}`}
            >
              {v1}
              {unit}
            </span>
            {winner === 1 && (
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={10} /> ლიდერი
              </span>
            )}
          </div>
          <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${winner === 1 ? "bg-brand-primary" : "bg-slate-200"}`}
              style={{ width: `${w1}%` }}
            />
          </div>
        </div>

        <div className="col-span-1 flex justify-center pt-6">
          <span className="text-[10px] font-bold text-slate-300">VS</span>
        </div>

        {/* მარჯვენა მხარე (v2) */}
        <div className="col-span-5">
          <div className="flex justify-between mb-2 items-end flex-row-reverse px-1">
            <span
              className={`text-xl font-black ${winner === 2 ? "text-brand-primary" : "text-slate-400"}`}
            >
              {v2}
              {unit}
            </span>
            {winner === 2 && (
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={10} /> ლიდერი
              </span>
            )}
          </div>
          <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${winner === 2 ? "bg-brand-primary" : "bg-slate-200"}`}
              style={{ width: `${w2}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BadgeStat = ({ label, v1, v2, isLowerBetter, rawV1, rawV2 }: any) => {
  const isV1Better = isLowerBetter ? rawV1 < rawV2 : rawV1 > rawV2;
  return (
    <div className="bg-[#F4F7FE]/50 p-5 rounded-3xl border border-gray-50/50">
      <span className="text-[10px] font-black text-[#A3AED0] uppercase block mb-4 tracking-widest text-center">
        {label}
      </span>
      <div className="flex justify-between items-center px-4">
        <div className="text-center flex-1">
          <p
            className={`text-base font-black ${isV1Better ? "text-[#1B2559]" : "text-slate-400"}`}
          >
            {v1}
          </p>
          <div
            className={`h-1 w-8 mx-auto mt-1 rounded-full ${isV1Better ? "bg-brand-primary" : "bg-transparent"}`}
          />
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2" />
        <div className="text-center flex-1">
          <p
            className={`text-base font-black ${!isV1Better ? "text-[#1B2559]" : "text-slate-400"}`}
          >
            {v2}
          </p>
          <div
            className={`h-1 w-8 mx-auto mt-1 rounded-full ${!isV1Better ? "bg-brand-primary" : "bg-transparent"}`}
          />
        </div>
      </div>
    </div>
  );
};
