"use client";

import React, { useState } from "react";
import {
  Calculator,
  X,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GrantPredictor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: არჩევა, 2: ქულები

  const [selections, setSelections] = useState({
    language: "ინგლისური",
    major: "მათემატიკა",
    elective: "ისტორია",
  });

  const [scores, setScores] = useState({
    georgian: 0,
    language: 0,
    major: 0,
    elective: 0,
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* მთავარი ქარდი რომელიც გვერდზე ჩანს */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
          <Calculator size={32} />
        </div>
        <h3 className="text-xl font-bold text-[#1B2559] mb-2">
          გრანტის კალკულატორი
        </h3>
        <p className="text-xs font-medium text-[#A3AED0] mb-8 max-w-50">
          გაიგე შენი დაფინანსების შანსები საგნების მიხედვით
        </p>
        <button
          onClick={() => {
            setIsOpen(true);
            setStep(1);
          }}
          className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/25 hover:scale-[1.02] transition-all"
        >
          კალკულატორის გახსნა
        </button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1B2559]/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-[#1B2559]">
                    გრანტის AI
                  </h3>
                  <p className="text-sm text-slate-400 font-medium">
                    ნაბიჯი {step} / 2
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8">
                {step === 1 ? (
                  /* Step 1: საგნების არჩევა */
                  <div className="space-y-6">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                      <CheckCircle2 className="text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-700 uppercase">
                        ქართული ენა (სავალდებულო)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <label className="block">
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-2 block">
                          უცხო ენა
                        </span>
                        <select
                          className="w-full p-4 bg-[#F4F7FE] rounded-2xl border-none font-bold text-[#1B2559] focus:ring-2 focus:ring-brand-primary/20 outline-none"
                          onChange={(e) =>
                            setSelections({
                              ...selections,
                              language: e.target.value,
                            })
                          }
                        >
                          <option>ინგლისური</option>
                          <option>გერმანული</option>
                          <option>ფრანგული</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-2 block">
                          მთავარი საგანი
                        </span>
                        <select
                          className="w-full p-4 bg-[#F4F7FE] rounded-2xl border-none font-bold text-[#1B2559] focus:ring-2 focus:ring-brand-primary/20 outline-none"
                          onChange={(e) =>
                            setSelections({
                              ...selections,
                              major: e.target.value,
                            })
                          }
                        >
                          <option>მათემატიკა</option>
                          <option>ისტორია</option>
                          <option>ბიოლოგია</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-2 block">
                          დამატებითი საგანი
                        </span>
                        <select
                          className="w-full p-4 bg-[#F4F7FE] rounded-2xl border-none font-bold text-[#1B2559] focus:ring-2 focus:ring-brand-primary/20 outline-none"
                          onChange={(e) =>
                            setSelections({
                              ...selections,
                              elective: e.target.value,
                            })
                          }
                        >
                          <option>გეოგრაფია</option>
                          <option>ლიტერატურა</option>
                          <option>ფიზიკა</option>
                        </select>
                      </label>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      ქულების შეყვანა <ChevronRight size={20} />
                    </button>
                  </div>
                ) : (
                  /* Step 2: ქულების შეყვანა */
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "georgian", label: "ქართული", max: 60 },
                        { id: "language", label: selections.language, max: 70 },
                        { id: "major", label: selections.major, max: 51 },
                        { id: "elective", label: selections.elective, max: 60 },
                      ].map((s) => (
                        <div
                          key={s.id}
                          className="bg-[#F4F7FE] p-4 rounded-2xl"
                        >
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">
                            {s.label}
                          </p>
                          <input
                            type="number"
                            placeholder={`max ${s.max}`}
                            className="w-full bg-white border-none rounded-xl p-3 text-center font-black text-brand-primary outline-none"
                            onChange={(e) =>
                              setScores({
                                ...scores,
                                [s.id]: parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="bg-linear-to-br from-brand-primary to-[#5E37FF] p-8 rounded-4xl text-white text-center">
                      <Sparkles className="mx-auto mb-2 text-amber-300" />
                      <p className="text-[10px] font-bold uppercase opacity-70 mb-1">
                        თქვენი გრანტი
                      </p>
                      <h2 className="text-5xl font-black mb-4">
                        {totalScore >= 180
                          ? "100%"
                          : totalScore >= 150
                            ? "70%"
                            : totalScore >= 120
                              ? "50%"
                              : "0%"}
                      </h2>
                      <p className="text-xs opacity-80 leading-relaxed">
                        ჯამური ქულა: <b>{totalScore}</b>. ამ ქულებით თქვენი
                        დაფინანსების შანსი საკმაოდ მაღალია!
                      </p>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest"
                    >
                      უკან დაბრუნება
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GrantPredictor;
