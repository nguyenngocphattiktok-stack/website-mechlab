/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Check, ShoppingBag, Terminal, Sparkles, Droplet, Eye, HelpCircle } from 'lucide-react';
import { CustomPC, Product } from '../types';
import { formatPrice } from '../data/mockData';

interface PCCustomizerProps {
  onAddToCart: (dummyProduct: Product, details: string, extraPrice: number) => void;
}

export default function PCCustomizer({ onAddToCart }: PCCustomizerProps) {
  const [config, setConfig] = useState<CustomPC>({
    cpu: 'Intel Core i9-14900KS',
    vga: 'NVIDIA RTX 4095 Super OC 24GB',
    ram: '32GB G.Skill Trident Z5 7200MHz',
    case: 'Lian Li O11 Dynamic EVO XL',
    tubingStyle: 'Hardtube Dual-Loop',
    coolantColor: 'UV Orange',
    fittingColor: 'Matte Black',
    sleevedCables: 'Sunset-Orange',
    activeFansColor: '#ff4a11'
  });

  const [activeTab, setActiveTab] = useState<'liquid' | 'specs'>('liquid');
  const [adding, setAdding] = useState(false);

  // Coolant colors preset mapping to CSS styles for visualization
  const coolantPresets = {
    'Neon Red': { hex: '#ff0055', glow: 'rgba(255, 0, 85, 0.65)' },
    'Cosmic Blue': { hex: '#00aeff', glow: 'rgba(0, 174, 255, 0.65)' },
    'Acid Green': { hex: '#39ff14', glow: 'rgba(57, 255, 20, 0.65)' },
    'UV Orange': { hex: '#ff4a11', glow: 'rgba(255, 74, 17, 0.65)' },
    'Milky White': { hex: '#f4f4f5', glow: 'rgba(244, 244, 245, 0.45)' },
    'Deep Purple': { hex: '#a855f7', glow: 'rgba(168, 85, 247, 0.65)' }
  };

  const sleevePresets = {
    'Black-Red': { primary: '#000000', stripe: '#dc2626' },
    'Carbon-Gray': { primary: '#1e293b', stripe: '#cbd5e1' },
    'Sunset-Orange': { primary: '#ff4a11', stripe: '#000000' },
    'Pure-White': { primary: '#ffffff', stripe: '#e2e8f0' },
    'Neon-RGB': { primary: '#38bdf8', stripe: '#ec4899' }
  };

  const tubingChoices = [
    { name: 'Hardtube Dual-Loop', extraPrice: 15500000, desc: 'Hai vòng nước cứng Acrylic kép cao cấp cho CPU và GPU biệt lập.' },
    { name: 'Hardtube Single-Loop', extraPrice: 8500000, desc: 'Vòng ống cứng Acrylic đơn đi nối tiếp tối giản, bẻ góc vuông vắn.' },
    { name: 'Soft-tube HighFlex', extraPrice: 4500000, desc: 'Ống nước dẻo siêu đàn hồi cao, dễ bảo trì, linh động.' },
    { name: 'No-Watercooling', extraPrice: 0, desc: 'Sử dụng tản nhiệt khí hoặc AIO tiêu chuẩn, không độ tản custom.' }
  ];

  const cpus = [
    { name: 'Intel Core i9-14900KS (Up to 6.2GHz)', basePrice: 19500000 },
    { name: 'AMD Ryzen 9 7950X3D (Vua Đa Nhiệm)', basePrice: 16800000 },
    { name: 'AMD Ryzen 7 7800X3D (Vua Gaming)', basePrice: 11900000 },
    { name: 'Intel Core i7-14700K (Gaming & Render)', basePrice: 10900000 }
  ];

  const vgas = [
    { name: 'NVIDIA ROG Strix RTX 4090 OC 24GB', basePrice: 62500000 },
    { name: 'NVIDIA RTX 4080 Super OC 16GB', basePrice: 32900000 },
    { name: 'NVIDIA RTX 4070 Ti Super 16GB', basePrice: 24500000 }
  ];

  const basePCPrice = 28000000; // Motherboard, Case, RAM, SSD, Fan, PSU standard sum.

  // Dynamically compute total price of configuration
  const currentCPUPrice = cpus.find(c => c.name.includes(config.cpu.substring(0, 10)))?.basePrice || 11900000;
  const currentVGAPrice = vgas.find(v => v.name.includes(config.vga.substring(0, 10)))?.basePrice || 32900000;
  const currentTubingPrice = tubingChoices.find(t => t.name === config.tubingStyle)?.extraPrice || 0;
  
  const totalConfigPrice = basePCPrice + currentCPUPrice + currentVGAPrice + currentTubingPrice;

  const handleBuildSubmit = () => {
    setAdding(true);
    
    const configurationSummary = `Custom Built PC - CPU: ${config.cpu}, VGA: ${config.vga}, Tubing: ${config.tubingStyle}, Coolant: ${config.coolantColor}, Fitt: ${config.fittingColor}, Sleeve: ${config.sleevedCables}`;
    
    const dummyProduct: Product = {
      id: 'custom-pc-build-' + Date.now(),
      name: `PC CUSTOMIZED CORLAB SYSTEM V.${totalConfigPrice.toString().substring(0, 2)}`,
      category: 'pc-water',
      price: totalConfigPrice,
      rating: 5,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
      badge: 'D.I.Y',
      specs: {
        'Cấu hình': config.cpu + ' / ' + config.vga,
        'Hệ tản nước': config.tubingStyle,
        'Màu nước': config.coolantColor,
        'Màu cáp': config.sleevedCables
      },
      features: ['Sản phẩm tự tùy biến cấu hình và màu sắc', 'Cân chỉnh và uốn thủ công chính xác', 'Đi cáp sleeve thẩm mỹ chuẩn MECHLAB'],
      description: 'Cấu hình máy tính cao cấp độ tản nhiệt nước custom chính hãng nước nôi rực rỡ được chế lập trực tuyến bởi chính bạn.',
      gallery: []
    };

    setTimeout(() => {
      onAddToCart(dummyProduct, configurationSummary, 0);
      setAdding(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-brand-orange font-extrabold uppercase">
            <Sparkles size={14} /> MECHLAB RESEARCH & DEVELOPMENT
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            PC WATERCOOLING <span className="text-brand-orange">DESIGN LABORATORY</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl font-sans mt-1">
            Hệ thống thiết lập máy tính tản nhiệt nước custom tương tác đột phá đầu tiên tại Việt Nam. Tự chọn linh kiện phần cứng, thiết kế đường ống dẫn lỏng dạ quang và tạo nên tuyệt tác của riêng bạn.
          </p>
        </div>

        {/* Status Indicators representing lab details */}
        <div className="hidden lg:flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-[11px] font-mono select-none">
          <div className="flex items-center gap-2 pr-4 border-r border-zinc-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-zinc-400 font-bold">FLOW SENSOR ACCURACY: 99.8%</span>
          </div>
          <p className="text-zinc-500">LAB ROOM TEMP: <span className="text-brand-orange font-bold font-mono">22.5 °C</span></p>
        </div>
      </div>

      {/* Main interactive grid splitting preview and panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Visual Generator Simulation of Liquid Cooled Chassis */}
        <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden orange-box-glow min-h-[450px]">
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Top Panel metadata overlay */}
          <div className="relative z-10 flex justify-between items-center bg-zinc-900/60 border border-zinc-800 py-2 px-4 rounded-lg select-none text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Terminal size={12} className="text-brand-orange" /> INTERACTIVE PREVIEW
            </span>
            <span className="text-brand-orange font-bold">STATUS: STABLE</span>
          </div>

          {/* Interactive Schematic Diagram of liquid cooling inside Lian Li Case */}
          <div className="relative w-full h-[320px] my-6 flex items-center justify-center">
            {/* Animated PC Case lines */}
            <svg viewBox="0 0 400 300" className="w-full max-w-[400px] h-full">
              {/* Outer Case Chassis Boundary */}
              <rect x="30" y="20" width="340" height="260" rx="10" fill="rgba(9, 9, 11, 0.95)" stroke="#27272a" strokeWidth="5" />
              <rect x="33" y="23" width="334" height="254" rx="7" fill="none" stroke="#ff4a11" strokeWidth="1" opacity="0.15" />
              
              {/* Tempered Glass Frame lines */}
              <line x1="30" y1="20" x2="370" y2="280" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              
              {/* Motherboard Tray Outline */}
              <rect x="70" y="45" width="220" height="195" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="2" />
              
              {/* CPU Waterblock block */}
              <rect x="150" y="100" width="50" height="50" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
              <circle cx="175" cy="125" r="14" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
              {/* CPU glowing LED indicator */}
              <circle cx="175" cy="125" r="4" fill={coolantPresets[config.coolantColor].hex} className="animate-pulse" />
              <text x="175" y="90" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CPU BLOCK</text>

              {/* Graphics Card (GPU) Block */}
              <rect x="90" y="165" width="180" height="32" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
              {/* GPU Waterblock Acrylic glow channel */}
              <rect x="110" y="177" width="130" height="8" rx="2" fill="none" stroke={coolantPresets[config.coolantColor].hex} strokeWidth="2" style={{ filter: `drop-shadow(0px 0px 5px ${coolantPresets[config.coolantColor].hex})` }} />
              <text x="180" y="210" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RTX WATERBLOCK</text>

              {/* RAM Bars with customized glowing LEDs */}
              {[215, 225, 235, 245].map((x) => (
                <rect key={x} x={x} y="98" width="4" height="42" fill="#09090b" stroke="#27272a" strokeWidth="1">
                  {/* Glowing dynamic top rgb bar */}
                  <rect x={x} y="98" width="4" height="6" fill={config.activeFansColor} />
                </rect>
              ))}

              {/* Distro plate panel (Acrylic water reservoir) on the right side */}
              <rect x="310" y="45" width="40" height="210" rx="4" fill="rgba(24, 24, 27, 0.85)" stroke="#3f3f46" strokeWidth="2" />
              {/* Fluid in Distro plate */}
              <rect x="316" y="55" width="28" height="190" rx="2" fill={coolantPresets[config.coolantColor].hex} fillOpacity="0.4" stroke={coolantPresets[config.coolantColor].hex} strokeWidth="1.5" style={{ filter: `drop-shadow(0px 0px 4px ${coolantPresets[config.coolantColor].hex})` }} />
              <text x="330" y="38" fill="#71717a" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DISTRO PLATE</text>

              {/* Loop Tubing Paths representing hard tubing custom setups */}
              {config.tubingStyle !== 'No-Watercooling' && (
                <g style={{ stroke: coolantPresets[config.coolantColor].hex, filter: `drop-shadow(0px 0px 5.5px ${coolantPresets[config.coolantColor].hex})` }}>
                  {/* Tubing 1: CPU Inlet from Distro plate */}
                  <path d="M 315 85 L 185 85 L 185 105" fill="none" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Tubing 2: CPU outlet to GPU block */}
                  <path d="M 165 145 L 165 165" fill="none" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Tubing 3: GPU outlet return to Distro plate */}
                  <path d="M 270 181 L 315 181" fill="none" strokeWidth="3" strokeLinecap="round" />

                  {/* Dual Loop second loop representation */}
                  {config.tubingStyle === 'Hardtube Dual-Loop' && (
                    <path d="M 315 125 L 240 125 L 240 165" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 0px 4px #2563eb)' }} />
                  )}
                </g>
              )}

              {/* Custom Sleeved Cables (Primary GPU power cables sleeved) */}
              <g strokeWidth="2" opacity="0.85">
                {[135, 140, 145, 150].map((x, idx) => (
                  <path
                    key={x}
                    d={`M ${x} 230 Q ${x - 5} 250, ${x - 15} 270`}
                    fill="none"
                    stroke={idx % 2 === 0 ? sleevePresets[config.sleevedCables].primary : sleevePresets[config.sleevedCables].stripe}
                  />
                ))}
              </g>

              {/* Fan indicators (Top 120mm fans) */}
              <g transform="translate(80, 25)">
                <rect x="0" y="0" width="180" height="14" rx="2" fill="#18181b" stroke="#3f3f46" />
                <circle cx="30" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
                <circle cx="90" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
                <circle cx="150" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
              </g>
              
              {/* Fan indicators (Bottom 120mm fans) */}
              <g transform="translate(80, 250)">
                <rect x="0" y="0" width="180" height="14" rx="2" fill="#18181b" stroke="#3f3f46" />
                <circle cx="30" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
                <circle cx="90" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
                <circle cx="150" cy="7" r="5" fill="none" stroke={config.activeFansColor} strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Bottom dynamic legends displaying selected options */}
          <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs border-t border-zinc-900 pt-4 font-sans select-none">
            <div className="bg-zinc-950/70 py-2 border border-zinc-900/60 rounded">
              <span className="block text-[10px] text-zinc-500 font-mono tracking-wider">COOLANT COLOR</span>
              <span className="font-extrabold text-zinc-300" style={{ color: coolantPresets[config.coolantColor].hex }}>
                {config.coolantColor}
              </span>
            </div>
            <div className="bg-zinc-950/70 py-2 border border-zinc-900/60 rounded">
              <span className="block text-[10px] text-zinc-500 font-mono tracking-wider">TUBING TYPE</span>
              <span className="font-extrabold text-zinc-200 text-xs truncate block max-w-full px-1">
                {config.tubingStyle}
              </span>
            </div>
            <div className="bg-zinc-950/70 py-2 border border-zinc-900/60 rounded">
              <span className="block text-[10px] text-zinc-500 font-mono tracking-wider">CABLE SLEEVES</span>
              <span className="font-extrabold text-white">
                {config.sleevedCables}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Configuration Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6 space-y-6">
            
            {/* Tab switcher */}
            <div className="flex border-b border-zinc-900 pb-px">
              <button
                onClick={() => setActiveTab('liquid')}
                className={`flex-1 py-2.5 text-xs font-extrabold tracking-wider border-b-2 text-center transition-colors cursor-pointer ${
                  activeTab === 'liquid'
                    ? 'border-brand-orange text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                1. TÙY CHỌN TẢN NƯỚC (CUSTOM FLUID)
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2.5 text-xs font-extrabold tracking-wider border-b-2 text-center transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-brand-orange text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                2. CẤU HÌNH PHẦN CỨNG (SPECS)
              </button>
            </div>

            {/* TAB CONTENT: LIQUID SETUP */}
            {activeTab === 'liquid' && (
              <div className="space-y-5">
                {/* 1. System Tubing Style */}
                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                    DẠNG ỐNG DẪN NƯỚC (TUBING LAYOUT)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {tubingChoices.map((t) => {
                      const isSel = config.tubingStyle === t.name;
                      return (
                        <button
                          key={t.name}
                          onClick={() => setConfig({ ...config, tubingStyle: t.name as any })}
                          className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                            isSel 
                              ? 'bg-zinc-900 border-brand-orange text-white' 
                              : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-extrabold truncate">{t.name.split(' ')[0]}</span>
                            {isSel && <Check size={12} className="text-brand-orange shrink-0 ml-1" />}
                          </div>
                          <span className="block text-[10px] text-zinc-500 line-clamp-1">{t.desc}</span>
                          <span className="block text-brand-orange font-mono text-[10px] mt-1.5 font-bold">
                            {t.extraPrice === 0 ? 'Mặc định' : `+${formatPrice(t.extraPrice)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Liquid Coolant Color */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase">
                      MÀU NƯỚC TẢN DẠ QUANG (COOLANT FLUID)
                    </label>
                    <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
                      <Droplet size={10} className="text-brand-orange" /> SỬ DỤNG EK-CRYOFUEL
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(coolantPresets).map(([color, preset]) => {
                      const isSel = config.coolantColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setConfig({ ...config, coolantColor: color as any })}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col items-center gap-1.5 transition-all text-center ${
                            isSel 
                              ? 'bg-zinc-900 border-brand-orange text-white' 
                              : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                          }`}
                        >
                          <span 
                            className="h-4.5 w-4.5 rounded-full border border-zinc-700 block shrink-0 cursor-pointer"
                            style={{ 
                              backgroundColor: preset.hex,
                              boxShadow: `0 0 8px ${preset.glow}` 
                            }}
                          />
                          <span className="font-semibold text-[10px] tracking-tight truncate w-full">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Sleaved Cables Pattern */}
                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                    BỌC CÁP NGUỒN SLEEVES D.I.Y (CABLE MODS)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Object.keys(sleevePresets).map((val) => {
                      const isSel = config.sleevedCables === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setConfig({ ...config, sleevedCables: val as any })}
                          title={val}
                          className={`p-1.5 rounded-lg border cursor-pointer focus:outline-none flex flex-col items-center gap-1.5 transition-all ${
                            isSel ? 'border-brand-orange bg-zinc-900' : 'border-zinc-900 bg-zinc-950'
                          }`}
                        >
                          {/* Stripe color visualizer block */}
                          <div className="h-6 w-full rounded flex overflow-hidden border border-zinc-850">
                            <span className="flex-1" style={{ backgroundColor: sleevePresets[val as keyof typeof sleevePresets].primary }} />
                            <span className="w-1.5" style={{ backgroundColor: sleevePresets[val as keyof typeof sleevePresets].stripe }} />
                          </div>
                          <span className="text-[9px] text-zinc-500 font-mono tracking-tighter truncate w-full block text-center">
                            {val.split('-')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Active Fan Lighting */}
                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                    MÀU LED HỆ THỐNG QUẠT (ARGB FANS)
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      value={config.activeFansColor}
                      onChange={(e) => setConfig({ ...config, activeFansColor: e.target.value })}
                      className="w-11 h-9 rounded cursor-pointer bg-zinc-950 border border-zinc-800"
                    />
                    <div className="flex-1 flex flex-col justify-center leading-tight">
                      <span className="text-xs font-bold text-zinc-300">Tùy biến LED quạt LIAN LI UNI FAN</span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">Hex value: {config.activeFansColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SPECS BUILD */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                {/* CPU Selector */}
                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                    CHỌN BỘ VI XỬ LÝ (CPU SENSOR)
                  </label>
                  <select
                    value={config.cpu}
                    onChange={(e) => setConfig({ ...config, cpu: e.target.value })}
                    className="w-full bg-zinc-950 text-zinc-300 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                  >
                    {cpus.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} (+{formatPrice(c.basePrice)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* VGA Selector */}
                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                    CHỌN ĐỒ HỌA ENGINE GPU (VGA SENSOR)
                  </label>
                  <select
                    value={config.vga}
                    onChange={(e) => setConfig({ ...config, vga: e.target.value })}
                    className="w-full bg-zinc-950 text-zinc-300 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                  >
                    {vgas.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} (+{formatPrice(v.basePrice)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Static Components Info */}
                <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg space-y-1.5">
                  <p className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1">
                    CÁC LINH KIỆN MẶC ĐỊNH SẴN CÓ TRONG LAB:
                  </p>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Bo Mạch:</span>
                    <span className="font-semibold text-zinc-300">ASUS ROG Z790 HERO BTF</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Lưu Trữ SSD:</span>
                    <span className="font-semibold text-zinc-300">2TB Samsung 990 Pro PCIe Gen 5</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Phần Nguồn:</span>
                    <span className="font-semibold text-zinc-300">ROG Thor II 1200w Platinum</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Tổng Quạt Lót:</span>
                    <span className="font-semibold text-zinc-300">9x Lian Li UNI reverse fans</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Add to cart button */}
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left select-none">
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-0.5">TỔNG GIÁ CONFIGURATION</span>
              <span className="text-2xl font-black font-mono text-brand-orange">
                {formatPrice(totalConfigPrice)}
              </span>
              <span className="block text-[10px] text-zinc-500 mt-1">Bao gôm lắp ráp thủ công + test tản áp suất nước 12h</span>
            </div>

            <button
              onClick={handleBuildSubmit}
              disabled={adding}
              className={`w-full md:w-auto font-sans font-extrabold tracking-wider text-xs py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                adding
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-brand-orange text-black hover:bg-brand-orange-hover active:scale-95 shadow-xl shadow-brand-orange/15'
              }`}
            >
              <ShoppingBag size={15} strokeWidth={2.5} />
              <span>{adding ? 'ĐANG KHỞI CHẾ PHÒNG LAB...' : 'MUA NGAY BẢN THEO THIẾT KẾ'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
