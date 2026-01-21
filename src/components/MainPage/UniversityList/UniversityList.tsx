import React from "react";
import Image from "next/image";

const universities = [
  { id: 1, name: "GAU", city: "თბილისი", type: "კერძო", logo: "/uni_pics/gau-logo.png" },
  {
    id: 2,
    name: "Free Uni",
    city: "თბილისი",
    type: "კერძო",
    logo: "/uni_pics/free-uni-logo.jpg",
  },
  {
    id: 3,
    name: "TSU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/tsu-logo.png",
  },
  {
    id: 4,
    name: "KIU",
    city: "ქუთაისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/kiu-logo.jpg",
  },
  { id: 5, name: "CU", city: "თბილისი", type: "კერძო", logo: "/uni_pics/cu-logo.jpg" },
  {
    id: 6,
    name: "ISU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/isu-logo.png",
  },
  { id: 7, name: "SEU", city: "თბილისი", type: "კერძო", logo: "/uni_pics/seu-logo.png" },
  {
    id: 8,
    name: "GTU",
    city: "თბილისი",
    type: "სახელმწიფო",
    logo: "/uni_pics/gtu-logo.jpg",
  },
];

const UniversityList = () => {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#1B2559]">უნივერსიტეტები</h3>
          <p className="text-xs font-medium text-[#A3AED0]">საქართველო</p>
        </div>
        <button className="px-5 py-2 bg-brand-accent/20 text-brand-primary text-[10px] font-bold rounded-full hover:bg-brand-accent/40 transition-all uppercase tracking-wider">
          ყველა
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest border-b border-gray-50">
              <th className="pb-4 font-bold">სახელი</th>
              <th className="pb-4 font-bold text-center">მდებარეობა</th>
              <th className="pb-4 font-bold text-right">ტიპი</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {universities.map((uni) => (
              <tr
                key={uni.id}
                className="group hover:bg-[#F4F7FE]/50 transition-colors"
              >
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl bg-[#F4F7FE] flex items-center justify-center p-1.5 overflow-hidden border border-gray-100 group-hover:bg-white transition-colors">
                      <Image
                        src={uni.logo}
                        alt={uni.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-[#1B2559] group-hover:text-brand-primary transition-colors uppercase">
                      {uni.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-center">
                  <span className="text-xs font-semibold text-[#A3AED0]">
                    {uni.city}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      uni.type === "კერძო"
                        ? "bg-brand-accent/10 text-brand-primary"
                        : "bg-emerald-50 text-emerald-500"
                    }`}
                  >
                    {uni.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityList;
