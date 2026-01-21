import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <div className="relative w-full bg-brand-primary rounded-[40px] overflow-hidden min-h-[340px] flex items-center p-12">
      {/* ტექსტური კონტენტი */}
      <div className="relative z-10 max-w-lg">
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
          რა შეუძლია ჩვენ <br /> პლატფორმას?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-[340px] leading-relaxed">
          აღმოაჩინე ახალი სტატისტიკები და გაიმარტივე სტუდენტური არჩევანი
        </p>
        
        <div className="flex items-center gap-6">
          <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-opacity-90 transition-all shadow-lg shadow-black/10">
            შეიტყვე მეტი
          </button>
          
          <button className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all">
            <Play size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* მარჯვენა მხარე: 3D ილუსტრაციები */}
      <div className="absolute right-0 top-0 h-full w-1/2 select-none pointer-events-none">
        {/* აქ ჩასვი შენი ატვირთული სურათი (მაგ: promo-elements.png) */}
        <Image
          src="/promo-elements.png" 
          alt="3D Illustrations"
          fill
          className="object-contain object-right-bottom scale-110"
          priority
        />
      </div>
    </div>
  );
};

export default PromoBanner;