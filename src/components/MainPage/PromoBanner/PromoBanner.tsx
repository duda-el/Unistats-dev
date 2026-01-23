"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";

const PromoBanner = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // ჩასვი შენი ვიდეოს ლინკი
  const videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  return (
    <div className="relative w-full bg-brand-primary rounded-[40px] overflow-hidden min-h-[340px] flex items-center shadow-2xl shadow-black/5 transition-all duration-500">
      
      {!isVideoPlaying ? (
        <>
          {/* --- საწყისი კონტენტი (შენი უცვლელი დიზაინით) --- */}
          <div className="relative z-10 max-w-lg p-12 animate-in fade-in duration-500">
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
              
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* მარჯვენა მხარე: 3D ილუსტრაცია (ზომა გასწორებულია) */}
          <div className="absolute right-15 bottom-5 h-full w-1/2 select-none pointer-events-none">
            <Image
              src="/assets/images/trophy.png" 
              alt="3D Illustrations"
              fill
              className="object-contain object-right-bottom scale-90 origin-bottom-right" 
              priority
            />
          </div>
        </>
      ) : (
        /* --- ვიდეო რეჟიმი --- */
        <div className="absolute inset-0 z-30 bg-black animate-in zoom-in-95 duration-500">
          <button 
            onClick={() => setIsVideoPlaying(false)}
            className="absolute top-6 right-6 z-40 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-xl"
          >
            <X size={24} />
          </button>
          
          <iframe
            src={videoSrc}
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default PromoBanner;