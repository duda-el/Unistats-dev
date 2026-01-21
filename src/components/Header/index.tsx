import React from "react";
import { Moon, Languages } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 bg-surface-bg/80 backdrop-blur-md fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">მთავარი</h2>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-lg hover:bg-white transition-all">
          <Languages
            size={18}
            className="text-slate-400 group-hover:text-brand-primary"
          />
          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-800">
            ENG (US)
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-lg hover:bg-white transition-all">
          <Moon
            size={18}
            className="text-slate-400 group-hover:text-brand-primary"
          />
          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-800">
            მუქი თემა
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
