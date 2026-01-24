"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, ExternalLink, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { mapData } from "@/src/data/mapData";

const MapController = ({
  targetCoords,
}: {
  targetCoords: [number, number] | null;
}) => {
  const map = useMap();
  if (targetCoords) {
    map.flyTo(targetCoords, 16, { duration: 1.5 });
  }
  return null;
};

const createCustomIcon = (url: string) => {
  return new L.DivIcon({
    html: `<div class="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-lg border-2 border-white overflow-hidden flex items-center justify-center p-1 hover:scale-110 transition-transform">
             <img src="${url}" class="w-full h-full object-contain" />
           </div>`,
    className: "custom-div-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const MapSection = () => {
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl xl:rounded-[40px] p-4 md:p-6 shadow-sm border border-gray-50 relative flex flex-col h-full">
      {/* Header Section - More compact for smaller screens */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6 relative z-1000">
        <div className="shrink-0">
          <h3 className="text-lg md:text-xl xl:text-2xl font-black text-[#1B2559] tracking-tight">
            კამპუსების რუკა
          </h3>
          <p className="text-[10px] md:text-xs text-slate-400 font-medium">
            იპოვე შენი ლოკაცია
          </p>
        </div>

        {/* Dropdown Control - Responsive width */}
        <div className="relative w-full sm:w-56 xl:w-72">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#F4F7FE] hover:bg-white border border-transparent hover:border-brand-primary/20 p-2 md:p-3 xl:p-4 rounded-xl xl:rounded-2xl flex items-center justify-between transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Search size={14} className="text-brand-primary" />
              <span className="text-[10px] xl:text-xs font-bold text-[#1B2559] uppercase tracking-tighter">
                სწრაფი ძიება...
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-50 overflow-hidden z-1001 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="p-1 max-h-40 xl:max-h-60 overflow-y-auto custom-scrollbar">
                {mapData.map((uni) => (
                  <button
                    key={uni.id}
                    onClick={() => {
                      setSelectedCoords(uni.coords);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-[#F4F7FE] rounded-lg transition-all group text-left"
                  >
                    <div className="w-7 h-7 bg-white rounded-md p-0.5 shadow-sm shrink-0">
                      <Image
                        src={uni.image}
                        alt=""
                        width={7}
                        height={7}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] xl:text-[10px] font-black text-[#1B2559] uppercase tracking-tighter truncate">
                        {uni.name}
                      </p>
                      <p className="text-[7px] xl:text-[8px] text-slate-400 font-bold truncate">
                        {uni.address}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Body - Height is constrained for 13-14 inch laptop screens */}
      <div className="h-70 sm:h-80 lg:h-95 xl:h-112.5 w-full rounded-xl xl:rounded-4xl overflow-hidden border-2 xl:border-4 border-white shadow-xl relative z-10">
        <MapContainer
          center={[41.7151, 44.787]}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <MapController targetCoords={selectedCoords} />

          {mapData.map((uni) => (
            <Marker
              key={uni.id}
              position={uni.coords}
              icon={createCustomIcon(uni.image)}
            >
              <Popup className="custom-popup">
                <div className="p-0 min-w-40">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={uni.image}
                      alt={uni.image}
                      className="w-6 h-6 rounded-md object-contain bg-slate-50 p-1"
                    />
                    <h4 className="font-black text-[#1B2559] text-[10px] uppercase tracking-tighter leading-tight">
                      {uni.shortName}
                    </h4>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin size={8} className="text-brand-primary" />
                      <span className="text-[8px] font-bold leading-tight">
                        {uni.address}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-brand-primary text-white py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-1">
                    ნახვა <ExternalLink size={8} />
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4318ff;
          border-radius: 10px;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default MapSection;
