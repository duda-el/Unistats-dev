import React from "react";
import Image from "next/image";

const universities = [
  {
    id: "01",
    name: 'ქართულ-ამერიკული უნივერსიტეტი "GAU"',
    logo: "/uni_pics/gau-logo.png", 
    employmentRate: 45,
  },
  {
    id: "02",
    name: "სსიპ ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი",
    logo: "/uni_pics/tsu-logo.png",
    employmentRate: 29,
  },
  {
    id: "03",
    name: "თბილისის თავისუფალი უნივერსიტეტი",
    logo: "/uni_pics/free-uni-logo.jpg",
    employmentRate: 25,
  },
  {
    id: "04",
    name: "კავკასიის უნივერსიტეტი",
    logo: "/uni_pics/cu-logo.jpg",
    employmentRate: 20,
  },
];

const UniversityRanking = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold text-slate-800">რეიტინგი</h3>
        <button className="px-5 py-2 bg-brand-accent/30 text-brand-primary text-xs font-bold rounded-full hover:bg-brand-accent/50 transition-colors">
          ვრცლად
        </button>
      </div>

      <div className="w-full">
        {/* ცხრილის ჰედერი */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">უნივერსიტეტი</div>
          <div className="col-span-4">დასაქმების მაჩვენებელი</div>
          <div className="col-span-2 text-right"></div>
        </div>

        {/* ცხრილის სხეული */}
        <div className="divide-y divide-gray-50">
          {universities.map((uni) => (
            <div key={uni.id} className="grid grid-cols-12 gap-4 py-6 items-center group">
              <div className="col-span-1 text-center text-sm font-bold text-slate-500">
                {uni.id}
              </div>
              
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 p-1.5 flex-shrink-0">
                  <div className="w-full h-full relative">
                    <img 
                      src={uni.logo} 
                      alt={uni.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700 leading-tight">
                  {uni.name}
                </span>
              </div>

              <div className="col-span-4 px-2">
                <div className="h-1.5 w-full bg-indigo-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                    style={{ width: `${uni.employmentRate}%` }}
                  />
                </div>
              </div>

              <div className="col-span-2 text-right">
                <span className="px-4 py-1.5 rounded-lg border-2 border-brand-primary/20 text-brand-primary text-xs font-bold inline-block min-w-[60px] text-center">
                  {uni.employmentRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityRanking;