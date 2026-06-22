/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export default function Logo({ className = '', size = 48, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center bg-zinc-950/80 p-2 rounded-xl border border-zinc-800/80 orange-box-glow"
        style={{ width: size, height: size }}
      >
        {/* SVG representation of the MECHLAB logo: */}
        {/* Abstract dual liquid cooling loops forming high-tech "M" and "L" monograms */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-zinc-300 transition-transform duration-700 hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gentle back glow inside the logo */}
          <circle cx="50" cy="50" r="35" fill="rgba(255, 74, 17, 0.12)" />
          
          {/* Cyan/Orange LED tracer paths */}
          <path d="M 15 50 Q 50 15, 85 50" stroke="#ff4a11" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M 15 50 Q 50 85, 85 50" stroke="#ff8c00" strokeWidth="1" fill="none" opacity="0.3" />

          {/* Outer futuristic hexagon framing */}
          <polygon 
            points="50,12 83,31 83,69 50,88 17,69 17,31" 
            fill="none" 
            stroke="#ff4a11" 
            strokeWidth="2.5" 
            opacity="0.85"
            strokeLinejoin="round"
          />

          {/* Core Custom cooling tube layout representing 'M' */}
          {/* M-tube (Accent Orange #ff4a11) */}
          <g opacity="0.95">
            <path 
              d="M 24 64 V 32 L 40 48 L 56 32 V 64" 
              stroke="#ff4a11" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            {/* Glowing bubble/fluid effect inside M-tube */}
            <path 
              d="M 24 64 V 32 L 40 48 L 56 32 V 64" 
              stroke="#ffa07a" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <circle cx="24" cy="64" r="3" fill="#18181b" stroke="#ff4a11" strokeWidth="1.5" />
            <circle cx="56" cy="64" r="3" fill="#18181b" stroke="#ff4a11" strokeWidth="1.5" />
          </g>

          {/* Core Custom cooling tube layout representing 'L' */}
          {/* L-tube (Deep Yellow-Orange #ff8c00) */}
          <g opacity="0.95">
            <path 
              d="M 68 32 V 64 H 82" 
              stroke="#ff8c00" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            {/* Glowing bubble/fluid effect inside L-tube */}
            <path 
              d="M 68 32 V 64 H 82" 
              stroke="#ffe4b5" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <circle cx="68" cy="32" r="3" fill="#18181b" stroke="#ff8c00" strokeWidth="1.5" />
            <circle cx="82" cy="64" r="3" fill="#18181b" stroke="#ff8c00" strokeWidth="1.5" />
          </g>

          {/* Laser-dot connection pin nodes */}
          <circle cx="40" cy="48" r="2.5" fill="#ffffff" />
          <circle cx="17" cy="50" r="2.5" fill="#ffffff" />
          <circle cx="83" cy="50" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <span className="font-display font-extrabold tracking-widest text-lg lg:text-xl text-white leading-none">
            MECHLAB
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-orange font-bold uppercase leading-tight orange-glow">
            HI-END PC & GEAR
          </span>
        </div>
      )}
    </div>
  );
}
