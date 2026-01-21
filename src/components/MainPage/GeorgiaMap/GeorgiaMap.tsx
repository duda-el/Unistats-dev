"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  MapPin, Clock, Navigation, ExternalLink, 
  Phone, Sparkles, ChevronDown, Search 
} from "lucide-react";

const universities = [
  {
    id: 1,
    name: "თავისუფალი უნივერსიტეტი",
    shortName: "Free Uni",
    coords: [41.8058, 44.7677] as [number, number],
    address: "დავით აღმაშენებლის ხეივანი 240",
    workingHours: "09:00 - 20:00",
    phone: "032 2 20 09 01",
    image: "/uni_pics/free-uni-logo.jpg",
    tags: ["MACS", "მართვა"]
  },
  {
    id: 2,
    name: "ქართულ-ამერიკული უნივერსიტეტი",
    shortName: "GAU",
    coords: [41.7166, 44.7831] as [number, number],
    address: "მერაბ ალექსიძის ქ. 10",
    workingHours: "10:00 - 19:00",
    phone: "032 2 20 65 20",
    image: "/uni_pics/gau-logo.png",
    tags: ["ბიზნესი", "ინფორმატიკა"]
  },
  {
    id: 3,
    name: "თბილისის სახელმწიფო უნივერსიტეტი",
    shortName: "TSU",
    coords: [41.7093, 44.7785] as [number, number],
    address: "ილია ჭავჭავაძის გამზ. 1",
    workingHours: "09:00 - 18:00",
    phone: "032 2 25 04 84",
    image: "/uni_pics/tsu-logo.png",
    tags: ["ეკონომიკა", "მედიცინა"]
  }
];

// ფუნქცია რუკის გადასაადგილებლად
const MapController = ({ targetCoords }: { targetCoords: [number, number] | null }) => {
  const map = useMap();
  if (targetCoords) {
    map.flyTo(targetCoords, 16, { duration: 1.5 });
  }
  return null;
};

const createCustomIcon = (url: string) => {
  return new L.DivIcon({
    html: `<div class="w-10 h-10 bg-white rounded-xl shadow-lg border-2 border-white overflow-hidden flex items-center justify-center p-1">
             <img src="${url}" class="w-full h-full object-contain" />
           </div>`,
    className: "custom-div-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

const MapSection = () => {
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-gray-50 relative">
      {/* Header & Dropdown Control */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-[20]">
        <div>
          <h3 className="text-2xl font-black text-[#1B2559] tracking-tight">კამპუსების რუკა</h3>
          <p className="text-sm text-slate-400 font-medium">იპოვე შენი ლოკაცია</p>
        </div>

        {/* Custom Modern Dropdown */}
        <div className="relative w-full md:w-72">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#F4F7FE] hover:bg-white border border-transparent hover:border-brand-primary/20 p-4 rounded-2xl flex items-center justify-between transition-all group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Search size={18} className="text-brand-primary" />
              <span className="text-xs font-bold text-[#1B2559] uppercase tracking-tighter">სწრაფი ძიება...</span>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[50]">
              <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
                {universities.map((uni) => (
                  <button
                    key={uni.id}
                    onClick={() => {
                      setSelectedCoords(uni.coords);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#F4F7FE] rounded-2xl transition-all group text-left"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-sm group-hover:scale-110 transition-transform">
                      <img src={uni.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1B2559] uppercase tracking-tighter">{uni.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold">{uni.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Body */}
      <div className="h-[500px] w-full rounded-[32px] overflow-hidden border-4 border-white shadow-2xl relative z-[10]">
        <MapContainer 
          center={[41.7151, 44.7870]} 
          zoom={13} 
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          
          <MapController targetCoords={selectedCoords} />

          {universities.map((uni) => (
            <Marker key={uni.id} position={uni.coords} icon={createCustomIcon(uni.image)}>
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={uni.image} className="w-10 h-10 rounded-lg object-contain bg-slate-50 p-1" />
                    <h4 className="font-black text-[#1B2559] text-sm leading-tight uppercase tracking-tighter">{uni.shortName}</h4>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={12} className="text-brand-primary" />
                        <span className="text-[10px] font-bold">{uni.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={12} className="text-brand-primary" />
                        <span className="text-[10px] font-bold">{uni.workingHours}</span>
                    </div>
                  </div>
                  <button className="w-full bg-brand-primary text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    ნახვა <ExternalLink size={12} />
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        .leaflet-popup-content-wrapper { border-radius: 24px; padding: 8px; }
      `}</style>
    </div>
  );
};

export default MapSection;