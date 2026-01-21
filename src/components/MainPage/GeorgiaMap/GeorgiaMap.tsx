import React from "react";
import Image from "next/image";

const GeorgiaMap = () => {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex flex-col items-center">
      <h3 className="text-lg font-bold text-slate-800 mb-4 self-start">
        უნივერსიტეტები საქართველოში
      </h3>
      
      <div className="relative w-full h-auto" style={{ paddingTop: '100%' }}> {/* შეინარჩუნებს პროპორციებს */}
        <Image
          src="/georgia-map.png" // დარწმუნდი, რომ ეს სურათი public ფოლდერში გაქვს
          alt="უნივერსიტეტები საქართველოში"
          fill
          className="object-contain opacity-80"
          priority
        />
      </div>
    </div>
  );
};

export default GeorgiaMap;