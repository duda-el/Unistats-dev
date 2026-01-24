"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GitCompare,
  Plus,
  Briefcase,
  Edit3,
  X,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import { universities } from "@/src/data/universities";
import type { University, Faculty } from "@/src/data/universities";

type ModalSlot = 1 | 2;
type Unit = "%" | "₾";

interface SlotSelection {
  uni: University | null;
  faculty: Faculty | null;
}

interface SlotFilled {
  uni: University;
  faculty: Faculty;
}

const isSlotFilled = (s: SlotSelection): s is SlotFilled =>
  s.uni !== null && s.faculty !== null;

type ModalStep = "chooseUni" | "chooseFaculty";

interface ModalState {
  open: boolean;
  slot: ModalSlot | null;
  step: ModalStep;
  uni: University | null;
}

const initialModal: ModalState = {
  open: false,
  slot: null,
  step: "chooseUni",
  uni: null,
};

export default function CompareUniversities() {
  const [slot1, setSlot1] = useState<SlotSelection>({
    uni: null,
    faculty: null,
  });
  const [slot2, setSlot2] = useState<SlotSelection>({
    uni: null,
    faculty: null,
  });

  const [modal, setModal] = useState<ModalState>(initialModal);

  const openModal = (slot: ModalSlot) => {
    setModal({ open: true, slot, step: "chooseUni", uni: null });
  };

  const closeModal = () => setModal(initialModal);

  const pickUni = (uni: University) => {
    setModal((m) => ({ ...m, step: "chooseFaculty", uni }));
  };

  const pickFaculty = (faculty: Faculty) => {
    if (!modal.open || !modal.slot || !modal.uni) return;

    const selection: SlotSelection = { uni: modal.uni, faculty };

    if (modal.slot === 1) setSlot1(selection);
    else setSlot2(selection);

    closeModal();
  };

  const canCompare = isSlotFilled(slot1) && isSlotFilled(slot2);

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 relative">
      {/* Header */}
      <div className="mb-10">
        <h3 className="text-2xl font-black text-[#1B2559]">
          ანალიტიკური შედარება
        </h3>
        <p className="text-sm font-medium text-[#A3AED0]">
          დაინახე რეალური სხვაობა ფაკულტეტებს შორის
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mb-12">
        <div className="lg:col-span-5">
          <SlotCard
            slot={slot1}
            modalSlot={1}
            onOpen={openModal}
            onClear={() => setSlot1({ uni: null, faculty: null })}
            onEdit={(uni) =>
              setModal({ open: true, slot: 1, step: "chooseFaculty", uni })
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
            modalSlot={2}
            onOpen={openModal}
            onClear={() => setSlot2({ uni: null, faculty: null })}
            onEdit={(uni) =>
              setModal({ open: true, slot: 2, step: "chooseFaculty", uni })
            }
          />
        </div>
      </div>

      {/* Stats Section */}
      {canCompare && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ComparisonMetric
            label="დასაქმების შანსი"
            desc="კურსდამთავრებულთა პროცენტული რაოდენობა, ვინც მუშაობს პროფესიით"
            v1={slot1.faculty.stats.jobRate}
            v2={slot2.faculty.stats.jobRate}
            unit="%"
            icon={<Briefcase size={18} />}
          />

          <ComparisonMetric
            label="საშუალო ანაზღაურება"
            desc="პირველი წლის საშუალო თვიური ხელფასი"
            v1={slot1.faculty.stats.salary}
            v2={slot2.faculty.stats.salary}
            unit="₾"
            icon={<TrendingUp size={18} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BadgeStat
              label="წლიური ფასი"
              v1={`${slot1.faculty.stats.price}₾`}
              v2={`${slot2.faculty.stats.price}₾`}
              isLowerBetter
              rawV1={slot1.faculty.stats.price}
              rawV2={slot2.faculty.stats.price}
            />
            <BadgeStat
              label="რესურსები / ბიბლიოთეკა"
              v1={`${slot1.faculty.stats.library}/100`}
              v2={`${slot2.faculty.stats.library}/100`}
              rawV1={slot1.faculty.stats.library}
              rawV2={slot2.faculty.stats.library}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <CompareModal
          step={modal.step}
          uni={modal.uni}
          universities={universities}
          onClose={closeModal}
          onPickUni={pickUni}
          onPickFaculty={pickFaculty}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

/* ---------- Small Components ---------- */

interface SlotCardProps {
  slot: SlotSelection;
  modalSlot: ModalSlot;
  onOpen: (slot: ModalSlot) => void;
  onClear: () => void;
  onEdit: (uni: University) => void;
}

const SlotCard = ({
  slot,
  modalSlot,
  onOpen,
  onClear,
  onEdit,
}: SlotCardProps) => {
  if (isSlotFilled(slot)) {
    return (
      <SelectedDisplay
        slot={slot}
        onClear={onClear}
        onEdit={() => onEdit(slot.uni)}
      />
    );
  }
  return <EmptySlot onClick={() => onOpen(modalSlot)} />;
};

interface CompareModalProps {
  step: ModalStep;
  uni: University | null;
  universities: University[];
  onClose: () => void;
  onPickUni: (uni: University) => void;
  onPickFaculty: (faculty: Faculty) => void;
}

const CompareModal = ({
  step,
  uni,
  universities,
  onClose,
  onPickUni,
  onPickFaculty,
}: CompareModalProps) => {
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-4xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h4 className="font-bold text-[#1B2559]">
            {step === "chooseFaculty"
              ? "აირჩიე მიმართულება"
              : "აირჩიე უნივერსიტეტი"}
          </h4>
          <button onClick={onClose}>
            <X
              size={20}
              className="text-gray-300 cursor-pointer hover:text-[#1B2559] transition-all duration-200 ease-in-out"
            />
          </button>
        </div>

        <div className="p-4 max-h-100 overflow-y-auto custom-scrollbar">
          {step === "chooseUni" ? (
            universities.map((u) => (
              <button
                key={u.id}
                onClick={() => onPickUni(u)}
                className="w-full flex items-center gap-4 p-4 hover:bg-[#F4F7FE] rounded-2xl transition-all mb-2 border border-transparent hover:border-brand-primary/20 group cursor-pointer"
              >
                <div className="w-10 h-10 relative bg-white rounded-lg p-1 shadow-sm">
                  <Image
                    src={u.logo}
                    alt={u.name}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-[#1B2559] group-hover:text-brand-primary uppercase text-sm">
                  {u.name}
                </span>
              </button>
            ))
          ) : (
            <>
              {uni?.faculties.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onPickFaculty(f)}
                  className="w-full text-left p-4 hover:bg-brand-primary hover:text-white rounded-2xl mb-2 transition-all font-bold text-sm"
                >
                  {f.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface ComparisonMetricProps {
  label: string;
  desc: string;
  v1: number;
  v2: number;
  unit: Unit;
  icon: React.ReactNode;
}

const ComparisonMetric = ({
  label,
  desc,
  v1,
  v2,
  unit,
  icon,
}: ComparisonMetricProps) => {
  const winner = v1 > v2 ? 1 : 2;

  const max = Math.max(v1, v2) || 1;
  const w1 = unit === "%" ? v1 : (v1 / max) * 100;
  const w2 = unit === "%" ? v2 : (v2 / max) * 100;

  return (
    <div className="group">
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
        <div className="col-span-5">
          <div className="flex justify-between mb-2 items-end">
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
          <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                winner === 1
                  ? "bg-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "bg-slate-200"
              }`}
              style={{ width: `${w1}%` }}
            />
          </div>
        </div>

        <div className="col-span-1 flex justify-center pt-6">
          <span className="text-[10px] font-bold text-slate-300">VS</span>
        </div>

        <div className="col-span-5">
          <div className="flex justify-between mb-2 items-end flex-row-reverse">
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
          <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                winner === 2
                  ? "bg-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "bg-slate-200"
              }`}
              style={{ width: `${w2}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface BadgeStatProps {
  label: string;
  v1: string;
  v2: string;
  rawV1: number;
  rawV2: number;
  isLowerBetter?: boolean;
}

const BadgeStat = ({
  label,
  v1,
  v2,
  isLowerBetter = false,
  rawV1,
  rawV2,
}: BadgeStatProps) => {
  const isV1Better = isLowerBetter ? rawV1 < rawV2 : rawV1 > rawV2;

  return (
    <div className="bg-[#F4F7FE]/50 p-5 rounded-3xl border border-gray-50/50">
      <span className="text-[10px] font-black text-[#A3AED0] uppercase block mb-4 tracking-widest">
        {label}
      </span>

      <div className="flex justify-between items-center">
        <div className="text-center">
          <p
            className={`text-base font-black ${isV1Better ? "text-[#1B2559]" : "text-slate-400"}`}
          >
            {v1}
          </p>
          <div
            className={`h-1 w-8 mx-auto mt-1 rounded-full ${isV1Better ? "bg-brand-primary" : "bg-transparent"}`}
          />
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="text-center">
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

interface SelectedDisplayProps {
  slot: SlotFilled;
  onClear: () => void;
  onEdit: () => void;
}

const SelectedDisplay = ({ slot, onClear, onEdit }: SelectedDisplayProps) => (
  <div className="bg-[#F4F7FE] p-5 rounded-4xl border border-white shadow-sm relative group">
    <button
      onClick={onClear}
      className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-slate-300 hover:text-red-500 transition-all z-10"
    >
      <X size={14} />
    </button>

    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 relative bg-white rounded-2xl p-2 shadow-sm border border-gray-50">
        <Image
          src={slot.uni.logo}
          alt={slot.uni.name}
          fill
          sizes="48px"
          className="object-contain p-1"
        />
      </div>
      <h4 className="font-black text-[#1B2559] uppercase text-xs">
        {slot.uni.name}
      </h4>
    </div>

    <div
      onClick={onEdit}
      className="bg-white rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:ring-2 ring-brand-primary/10 transition-all"
    >
      <div className="overflow-hidden">
        <p className="text-[9px] font-black text-brand-primary uppercase opacity-60">
          ფაკულტეტი
        </p>
        <p className="text-xs font-bold text-[#1B2559] truncate">
          {slot.faculty.name}
        </p>
      </div>
      <Edit3 size={14} className="text-brand-primary ml-2" />
    </div>
  </div>
);

interface EmptySlotProps {
  onClick: () => void;
}

const EmptySlot = ({ onClick }: EmptySlotProps) => (
  <button
    onClick={onClick}
    className="w-full h-32 border-2 border-dashed border-[#E0E5F2] rounded-4xl flex flex-col items-center justify-center gap-3 hover:bg-[#F4F7FE]/50 transition-all group cursor-pointer"
  >
    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
      <Plus size={20} />
    </div>
    <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">
      დამატება
    </span>
  </button>
);
