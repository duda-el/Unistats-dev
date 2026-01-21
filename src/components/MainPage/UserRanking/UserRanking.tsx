import React from "react";
import Image from "next/image";

const rankings = [
  { id: 1, user: "@user.user", university: "GAU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, user: "@user.user", university: "TSU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, user: "@user.user", university: "TSU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=3" },
  { id: 4, user: "@user.user", university: "KIU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=4" },
  { id: 5, user: "@user.user", university: "GTU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=5" },
  { id: 6, user: "@user.user", university: "SEU", gpa: "4.3", image: "https://i.pravatar.cc/150?u=6" },
  { id: 7, user: "@user.user", university: "FREE UNI", gpa: "4.2", image: "https://i.pravatar.cc/150?u=7" },
  { id: 8, user: "@user.user", university: "TSSU", gpa: "4.2", image: "https://i.pravatar.cc/150?u=8" },
];

const UserRanking = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-slate-800">რეიტინგი</h3>
        <button className="px-5 py-2 bg-brand-accent/30 text-brand-primary text-xs font-bold rounded-full hover:bg-brand-accent/50 transition-colors">
          ვრცლად
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-gray-50">
              <th className="pb-4 font-bold">სტუდენტი</th>
              <th className="pb-4 font-bold text-center">უნივერსიტეტი</th>
              <th className="pb-4 font-bold text-right">GPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {rankings.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.user}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.user}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="text-sm font-semibold text-slate-400 group-hover:text-brand-primary transition-colors">
                    {item.university}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-bold text-slate-700">{item.gpa}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRanking;