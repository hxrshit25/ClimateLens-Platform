import React, { useState } from 'react';
import { RegionData, RiskLevel } from '../types/climate';
import { REGIONS_DATA, getRegionById } from '../data/climateData';
import {
  Flame,
  Droplets,
  Sun,
  Waves,
  ChevronDown,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface ClimateRisksViewProps {
  initialRegionId?: string;
}

export const ClimateRisksView: React.FC<ClimateRisksViewProps> = ({
  initialRegionId = 'in',
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialRegionId);
  const region = getRegionById(selectedRegionId);

  // SVG Circular Gauge calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (region.risk.overallScore / 10) * circumference;

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Country Selector matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Climate Risk Index
          </h1>
          <p className="text-xs text-slate-400">
            Explore climate-related risks and vulnerabilities by region.
          </p>
        </div>

        {/* Region Selector dropdown matching reference */}
        <div className="relative min-w-[180px]">
          <select
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none appearance-none cursor-pointer pr-8 font-mono"
          >
            {REGIONS_DATA.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Main Grid: Left Map Shape + Right Risk Indicators matching reference */}
      <div className="rounded-3xl bg-[#070d19] border border-slate-800/90 p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Highlighted Country Map Graphic (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#040813] border border-slate-900 min-h-[340px] relative overflow-hidden">
          <svg viewBox="0 0 240 280" className="w-64 h-72 overflow-visible">
            <defs>
              <linearGradient id="india-thermal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="35%" stopColor="#f97316" />
                <stop offset="70%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {/* Illustrated Subcontinent / Country Geometry with Thermal Heat styling */}
            <path
              d="M 120 20 L 145 35 L 170 30 L 160 65 L 190 75 L 210 110 L 180 125 L 165 160 L 150 190 L 125 250 L 110 245 L 85 180 L 60 145 L 45 120 L 70 85 L 90 75 L 85 45 Z"
              fill="url(#india-thermal)"
              stroke="#f97316"
              strokeWidth="1.5"
              className="drop-shadow-lg"
            />
            {/* Pulsing hazard pin */}
            <circle cx="125" cy="110" r="14" fill="#ef4444" opacity="0.3" className="animate-ping" />
            <circle cx="125" cy="110" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          </svg>

          <div className="text-center font-mono pt-2">
            <span className="text-sm font-bold text-white block">{region.name}</span>
            <span className="text-[11px] text-slate-400">Regional Risk Vector</span>
          </div>
        </div>

        {/* Right Side: Risk Indicators & Overall Arc Gauge (lg:col-span-7) matching reference */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Risk Indicators
            </h3>

            {/* Heat Risk (Flame icon, orange bar, 82%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  Heat Risk
                </span>
                <span className="font-mono text-orange-400 font-bold">82%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="w-[82%] h-full bg-[#f97316] rounded-full" />
              </div>
            </div>

            {/* Flood Risk (Water drop icon, blue bar, 64%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  Flood Risk
                </span>
                <span className="font-mono text-blue-400 font-bold">64%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="w-[64%] h-full bg-[#3b82f6] rounded-full" />
              </div>
            </div>

            {/* Drought Risk (Sun icon, yellow bar, 71%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                  Drought Risk
                </span>
                <span className="font-mono text-yellow-400 font-bold">71%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="w-[71%] h-full bg-[#eab308] rounded-full" />
              </div>
            </div>

            {/* Sea Level Risk (Wave icon, cyan bar, 42%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                    <Waves className="w-3.5 h-3.5" />
                  </div>
                  Sea Level Risk
                </span>
                <span className="font-mono text-cyan-400 font-bold">42%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="w-[42%] h-full bg-[#06b6d4] rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Arc Gauge: Overall Risk 7.4 / 10 matching reference */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius / 1.5}
                    stroke="#1e293b"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius / 1.5}
                    stroke="#f97316"
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * (radius / 1.5)}
                    strokeDashoffset={
                      2 * Math.PI * (radius / 1.5) -
                      (region.risk.overallScore / 10) * (2 * Math.PI * (radius / 1.5))
                    }
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400 block">
                  Overall Risk
                </span>
                <div className="text-2xl font-extrabold text-white font-mono">
                  {region.risk.overallScore} / 10
                </div>
              </div>
            </div>

            {/* Scale Bar: Low - Moderate - High - Very High matching reference */}
            <div className="space-y-1.5 w-full sm:w-56">
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-red-500" />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Low</span>
                <span>Moderate</span>
                <span className="text-orange-400 font-bold">High</span>
                <span>Very High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
