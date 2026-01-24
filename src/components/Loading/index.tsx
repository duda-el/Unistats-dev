"use client";

import React from "react";

export const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />

        <span className="text-brand-primary font-black uppercase text-xs tracking-[0.2em]">
          იტვირთება...
        </span>
      </div>
    </div>
  );
};

export default Loading;
