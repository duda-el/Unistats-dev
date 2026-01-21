"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  GitCompare, Plus, DollarSign, Briefcase, 
  Trophy, Coffee, Book, ChevronRight, ArrowLeft, Edit3, X,
  TrendingUp, AlertCircle, CheckCircle2
} from "lucide-react";

const universities = [
  { 
    id: 1, name: "GAU", logo: "/uni_pics/gau-logo.png", type: "კერძო",
    faculties: [
      { id: "f1", name: "ინფორმატიკა", stats: { price: 4500, jobRate: 95, salary: 2000, social: 88, library: 85 } },
      { id: "f2", name: "ბიზნესი", stats: { price: 4000, jobRate: 88, salary: 1500, social: 92, library: 80 } }
    ]
  },
  { 
    id: 2, name: "Free Uni", logo: "/uni_pics/free-uni-logo.jpg", type: "კერძო",
    faculties: [
      { id: "f3", name: "კომპიუტერული მეცნიერება", stats: { price: 8500, jobRate: 99, salary: 3000, social: 95, library: 99 } },
      { id: "f4", name: "მართვა და თერაპია", stats: { price: 7500, jobRate: 94, salary: 2200, social: 90, library: 98 } }
    ]
  }
];

const CompareUniversities = () => {
  const [slot1, setSlot1] = useState<{uni: any, faculty: any}>({ uni: null, faculty: null });
  const [slot2, setSlot2] = useState<{uni: any, faculty: any}>({ uni: null, faculty: null });
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [selectedUniForModal, setSelectedUniForModal] = useState<any>(null);

  const handleFinalSelection = (faculty: any) => {
    const selection = { uni: selectedUniForModal, faculty };
    if (activeModal === 1) setSlot1(selection);
    else setSlot2(selection);
    setActiveModal(null);
    setSelectedUniForModal(null);
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 relative">
      {/* Header */}
      <div className="mb-10">
        <h3 className="text-2xl font-black text-[#1B2559]">ანალიტიკური შედარება</h3>
        <p className="text-sm font-medium text-[#A3AED0]">დაინახე რეალური სხვაობა ფაკულტეტებს შორის</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mb-12">
        <div className="lg:col-span-5">
          {slot1.uni ? (
            <SelectedDisplay slot={slot1} onClear={() => setSlot1({ uni: null, faculty: null })} onEdit={() => { setSelectedUniForModal(slot1.uni); setActiveModal(1); }} />
          ) : (
            <EmptySlot onClick={() => setActiveModal(1)} />
          )}
        </div>
        <div className="lg:col-span-1 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-[#F4F7FE] flex items-center justify-center border-4 border-white shadow-sm">
                <GitCompare size={20} className="text-brand-primary" />
            </div>
        </div>
        <div className="lg:col-span-5">
          {slot2.uni ? (
            <SelectedDisplay slot={slot2} onClear={() => setSlot2({ uni: null, faculty: null })} onEdit={() => { setSelectedUniForModal(slot2.uni); setActiveModal(2); }} />
          ) : (
            <EmptySlot onClick={() => setActiveModal(2)} />
          )}
        </div>
      </div>

      {/* Stats Section */}
      {slot1.faculty && slot2.faculty && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <ComparisonMetric 
            label="დასაქმების შანსი" 
            desc="კურსდამთავრებულთა პროცენტული რაოდენობა, ვინც მუშაობს პროფესიით"
            v1={slot1.faculty.stats.jobRate} 
            v2={slot2.faculty.stats.jobRate} 
            unit="%"
            icon={<Briefcase size={18}/>}
          />

          <ComparisonMetric 
            label="საშუალო ანაზღაურება" 
            desc="პირველი წლის საშუალო თვიური ხელფასი"
            v1={slot1.faculty.stats.salary} 
            v2={slot2.faculty.stats.salary} 
            unit="₾"
            icon={<TrendingUp size={18}/>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BadgeStat 
                label="წლიური ფასი" 
                v1={`${slot1.faculty.stats.price}₾`} 
                v2={`${slot2.faculty.stats.price}₾`}
                isLowerBetter={true}
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

      {/* Modal & Custom Scrollbar logic remains similar but UI updated */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h4 className="font-bold text-[#1B2559]">{selectedUniForModal ? 'აირჩიე მიმართულება' : 'აირჩიე უნივერსიტეტი'}</h4>
                <button onClick={() => {setActiveModal(null); setSelectedUniForModal(null)}}><X size={20} className="text-gray-300" /></button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {!selectedUniForModal ? (
                    universities.map(uni => (
                        <button key={uni.id} onClick={() => setSelectedUniForModal(uni)} className="w-full flex items-center gap-4 p-4 hover:bg-[#F4F7FE] rounded-2xl transition-all mb-2 border border-transparent hover:border-brand-primary/20 group">
                            <div className="w-10 h-10 relative bg-white rounded-lg p-1 shadow-sm"><Image src={uni.logo} alt="" fill className="object-contain" /></div>
                            <span className="font-bold text-[#1B2559] group-hover:text-brand-primary uppercase text-sm">{uni.name}</span>
                        </button>
                    ))
                ) : (
                    selectedUniForModal.faculties.map((f: any) => (
                        <button key={f.id} onClick={() => handleFinalSelection(f)} className="w-full text-left p-4 hover:bg-brand-primary hover:text-white rounded-2xl mb-2 transition-all font-bold text-sm">
                            {f.name}
                        </button>
                    ))
                )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>
    </div>
  );
};

// --- Updated UI Components for Clarity ---

const ComparisonMetric = ({ label, desc, v1, v2, unit, icon }: any) => {
    const diff = Math.abs(v1 - v2);
    const winner = v1 > v2 ? 1 : 2;

    return (
        <div className="group">
            <div className="flex items-center gap-2 mb-1">
                <div className="text-brand-primary bg-brand-primary/5 p-1.5 rounded-lg">{icon}</div>
                <span className="font-bold text-[#1B2559] text-sm uppercase tracking-tight">{label}</span>
            </div>
            <p className="text-[11px] text-[#A3AED0] mb-4 pl-9">{desc}</p>
            
            <div className="grid grid-cols-11 items-center gap-4">
                <div className="col-span-5">
                    <div className="flex justify-between mb-2 items-end">
                        <span className={`text-xl font-black ${winner === 1 ? 'text-brand-primary' : 'text-slate-400'}`}>{v1}{unit}</span>
                        {winner === 1 && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10}/> ლიდერი</span>}
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${winner === 1 ? 'bg-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-200'}`} style={{ width: `${v1}%` }} />
                    </div>
                </div>

                <div className="col-span-1 flex justify-center pt-6">
                    <span className="text-[10px] font-bold text-slate-300">VS</span>
                </div>

                <div className="col-span-5">
                    <div className="flex justify-between mb-2 items-end flex-row-reverse">
                        <span className={`text-xl font-black ${winner === 2 ? 'text-brand-primary' : 'text-slate-400'}`}>{v2}{unit}</span>
                        {winner === 2 && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10}/> ლიდერი</span>}
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${winner === 2 ? 'bg-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-200'}`} style={{ width: `${v2}%` }} />
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
            <span className="text-[10px] font-black text-[#A3AED0] uppercase block mb-4 tracking-widest">{label}</span>
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <p className={`text-base font-black ${isV1Better ? 'text-[#1B2559]' : 'text-slate-400'}`}>{v1}</p>
                    <div className={`h-1 w-8 mx-auto mt-1 rounded-full ${isV1Better ? 'bg-brand-primary' : 'bg-transparent'}`} />
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-center">
                    <p className={`text-base font-black ${!isV1Better ? 'text-[#1B2559]' : 'text-slate-400'}`}>{v2}</p>
                    <div className={`h-1 w-8 mx-auto mt-1 rounded-full ${!isV1Better ? 'bg-brand-primary' : 'bg-transparent'}`} />
                </div>
            </div>
        </div>
    )
}

const SelectedDisplay = ({ slot, onClear, onEdit }: any) => (
    <div className="bg-[#F4F7FE] p-5 rounded-[32px] border border-white shadow-sm relative group">
        <button onClick={onClear} className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-slate-300 hover:text-red-500 transition-all z-10"><X size={14}/></button>
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 relative bg-white rounded-2xl p-2 shadow-sm border border-gray-50"><Image src={slot.uni.logo} alt="" fill className="object-contain p-1" /></div>
            <h4 className="font-black text-[#1B2559] uppercase text-xs">{slot.uni.name}</h4>
        </div>
        <div onClick={onEdit} className="bg-white rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:ring-2 ring-brand-primary/10 transition-all">
            <div className="overflow-hidden">
                <p className="text-[9px] font-black text-brand-primary uppercase opacity-60">ფაკულტეტი</p>
                <p className="text-xs font-bold text-[#1B2559] truncate">{slot.faculty.name}</p>
            </div>
            <Edit3 size={14} className="text-brand-primary ml-2" />
        </div>
    </div>
)

const EmptySlot = ({ onClick }: any) => (
    <button onClick={onClick} className="w-full h-32 border-2 border-dashed border-[#E0E5F2] rounded-[32px] flex flex-col items-center justify-center gap-3 hover:bg-[#F4F7FE]/50 transition-all group">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform"><Plus size={20}/></div>
        <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">დამატება</span>
    </button>
)

export default CompareUniversities;