/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Keyboard, HelpCircle, Check, Volume2, ShoppingBag, Sparkles, Sliders } from 'lucide-react';
import { CustomKeyboard, Product } from '../types';
import { formatPrice } from '../data/mockData';

interface KeyboardBuilderProps {
  onAddToCart: (dummyProduct: Product, details: string, extraPrice: number) => void;
}

export default function KeyboardBuilder({ onAddToCart }: KeyboardBuilderProps) {
  const [kbConfig, setKbConfig] = useState<CustomKeyboard>({
    layout: '75% Compact',
    caseMaterial: 'CNC Aluminum Anodized',
    switchType: 'Gateron Oil King (Linear)',
    keycapTheme: 'MECHLAB Signature (Orange/Gray)',
    lubingService: true,
    soundProfile: 'Thocky & Deep'
  });

  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [playAudio, setPlayAudio] = useState(true);

  // Keycap themes preset colors mapped for visualization
  const themePresets = {
    'MECHLAB Signature (Orange/Gray)': {
      bg: 'bg-zinc-800',
      case: 'border-zinc-700 bg-zinc-900',
      escKey: 'bg-[#ff4a11] text-black',
      modKey: 'bg-zinc-900 text-zinc-300',
      alphaKey: 'bg-zinc-700 text-zinc-100',
      spaceKey: 'bg-[#ff4a11] text-black'
    },
    'Retro Cyberpunk': {
      bg: 'bg-indigo-950',
      case: 'border-pink-500 bg-purple-950',
      escKey: 'bg-yellow-400 text-black',
      modKey: 'bg-pink-600 text-white',
      alphaKey: 'bg-indigo-800 text-cyan-200',
      spaceKey: 'bg-cyan-400 text-black'
    },
    'Carbon Industrial': {
      bg: 'bg-stone-900',
      case: 'border-orange-600/70 bg-stone-950',
      escKey: 'bg-amber-500 text-black',
      modKey: 'bg-stone-800 text-stone-200',
      alphaKey: 'bg-stone-700 text-stone-100',
      spaceKey: 'bg-stone-800 text-amber-500'
    },
    'Lunar Landing': {
      bg: 'bg-zinc-300',
      case: 'border-zinc-400 bg-zinc-200',
      escKey: 'bg-red-500 text-white',
      modKey: 'bg-zinc-400 text-zinc-900',
      alphaKey: 'bg-zinc-100 text-zinc-800',
      spaceKey: 'bg-zinc-100 text-zinc-800'
    },
    'Botanical Garden': {
      bg: 'bg-stone-900',
      case: 'border-emerald-800/80 bg-zinc-900',
      escKey: 'bg-[#ff4a11] text-white',
      modKey: 'bg-emerald-900 text-emerald-100',
      alphaKey: 'bg-emerald-950 text-emerald-200',
      spaceKey: 'bg-stone-100 text-emerald-900'
    }
  };

  const layouts = [
    { name: '100% Full-size', extraPrice: 1200000, desc: 'Đầy đủ mọi phím chức năng và hàng phím số Numpad.' },
    { name: '80% TKL', extraPrice: 600000, desc: 'Lược bỏ hàng Numpad bên phải, giải phóng không gian chuột.' },
    { name: '75% Compact', extraPrice: 400000, desc: 'Bố cục gọn nhẹ tối giản nhưng giữ đủ phím mũi tên độc lập.' },
    { name: '60% Ultra-compact', extraPrice: 0, desc: 'Siêu tí hon, lược bỏ tối đa hàng phím F và phím di chuyển.' }
  ];

  const caseMaterials = [
    { name: 'CNC Aluminum Anodized', extraPrice: 2200000, desc: 'Nhôm nguyên lý chống rỉ dập CNC nguyên khối cực nặng.' },
    { name: 'Premium Solid Walnut', extraPrice: 1800000, desc: 'Gỗ óc chó sấy thật siêu vững chãi, tone trầm ấm trầm ấm.' },
    { name: 'Frosted Acrylic', extraPrice: 900000, desc: 'Nhựa đục hắt led phản quang neon huyễn hoặc xịn xò.' },
    { name: 'Polycarbonate', extraPrice: 500050, desc: 'Khung dẻo chống va đập, truyền sáng chuẩn.' }
  ];

  const switchTypes = [
    { name: 'Gateron Oil King (Linear)', desc: 'Cực kỳ mượt tinh khiết, lube sẵn mỡ EK béo ngậy.' },
    { name: 'Cherry MX Brown (Tactile)', desc: 'Xúc giác nảy lực vừa phải, gõ lách cách thân quen.' },
    { name: 'Kailh Box White (Clicky)', desc: 'Giòn sắc sảo thanh âm vang rực rỡ như mưa rào.' },
    { name: 'Alpaca V2 (Silent Linear)', desc: 'Thì thầm trầm ấm, chống ồn cho không gian văn phòng.' }
  ];

  const currentTheme = themePresets[kbConfig.keycapTheme as keyof typeof themePresets] || themePresets['MECHLAB Signature (Orange/Gray)'];

  // Audio synthethizer using the Web Audio API to play keyboard sounds on clicking keys
  const emitKeySound = (profile: string) => {
    if (!playAudio) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (profile.includes('Thocky')) {
        // Deep low frequency thock rumble code
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
        
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (profile.includes('Clacky')) {
        // High pitch metallic clack snappy click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else {
        // Silent dump thud
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.05);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (err) {
      console.warn('Audio synthesis failed', err);
    }
  };

  const handleKeyTap = (key: string) => {
    setKeyPressed(key);
    emitKeySound(kbConfig.soundProfile);
    setTimeout(() => setKeyPressed(null), 120);
  };

  const baseKBPrice = 1450000; // Base cost for PCB, stabilizers, foams
  const layoutPrice = layouts.find(l => l.name.includes(kbConfig.layout.substring(0, 5)))?.extraPrice || 400000;
  const materialPrice = caseMaterials.find(m => m.name.includes(kbConfig.caseMaterial.substring(0, 10)))?.extraPrice || 0;
  const lubePrice = kbConfig.lubingService ? 450000 : 0;
  
  const totalKeyboardPrice = baseKBPrice + layoutPrice + materialPrice + lubePrice;

  const handleBuildKeyboard = () => {
    setBuilding(true);
    
    const configurations = `Custom KB - Layout: ${kbConfig.layout}, Material: ${kbConfig.caseMaterial}, Switch: ${kbConfig.switchType}, Theme: ${kbConfig.keycapTheme}, Lube: ${kbConfig.lubingService}`;
    
    const dummyProduct: Product = {
      id: 'custom-kb-build-' + Date.now(),
      name: `MECHLAB CUSTOM KEYBOARD LAB - V.${(totalKeyboardPrice/1000000).toFixed(1)}`,
      category: 'keyboard',
      price: totalKeyboardPrice,
      rating: 5,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
      badge: 'BUILDER',
      specs: {
        'Bố cục': kbConfig.layout,
        'Vỏ case': kbConfig.caseMaterial,
        'Trục phím': kbConfig.switchType,
        'Keycaps': kbConfig.keycapTheme
      },
      features: ['Sản phẩm thủ công tự lựa phím ráp', 'Được lube switch tay chuẩn Krytox 205g0', 'Cân chỉnh lube stab chống rung lắc lóc cóc'],
      description: 'Bàn phím cơ tùy biến hoàn hảo được lắp đặt, dán lube từ đầu ngón nắp phím đến phần foam đệm lót rỗng bởi chính bạn.',
      gallery: []
    };

    setTimeout(() => {
      onAddToCart(dummyProduct, configurations, 0);
      setBuilding(false);
    }, 1500);
  };

  const kbRows = [
    ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BACK'],
    ['TAB', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', 'ENTER'],
    ['L-SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'FN', 'R-SHIFT'],
    ['CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', 'MENU', 'CTRL']
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-brand-orange font-extrabold uppercase">
            <Sparkles size={14} /> ACOUSTIC ENGINE STUDIO
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            CUSTOM MECHANICAL <span className="text-brand-orange">KEYBOARD BUILDER</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl font-sans mt-1">
            Bộ cấu hình bàn phím cơ ảo hóa trực tiếp đầu tiên. Tự cấu hình bo mạch, lựa chọn switch, thiết lập keycaps, nghe thử mô phỏng âm gõ và đặt mua sản phẩm hoàn thiện.
          </p>
        </div>

        {/* Audio control button */}
        <button
          onClick={() => setPlayAudio(!playAudio)}
          className={`flex items-center gap-2 text-xs font-mono font-bold py-2 px-4 rounded-xl border cursor-pointer select-none transition-all ${
            playAudio 
              ? 'bg-brand-orange/15 border-brand-orange text-brand-orange' 
              : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800'
          }`}
        >
          <Volume2 size={15} />
          {playAudio ? 'MÔ PHỎNG ÂM THANH: BẬT' : 'MÔ PHỎNG ÂM THANH: TẮT'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Mechanical Keyboard Virtual Model Layout */}
        <div className="lg:col-span-7 bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden orange-box-glow min-h-[460px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,74,17,0.05)_0%,transparent_70%)]" />
          
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase select-none">
            <span>ACOUSTICS PRESET: {kbConfig.soundProfile}</span>
            <span>LAYOUT SELECTED: {kbConfig.layout}</span>
          </div>

          {/* Interactive Keyboard Case Visual */}
          <div className={`my-8 p-4 rounded-xl border-4 ${currentTheme.case} shadow-2xl relative transition-all duration-300 w-full`}>
            
            {/* Key Grid mapping with presets coloring */}
            <div className="space-y-2">
              {kbRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-between items-center gap-1.5 md:gap-2">
                  {row.map((ch) => {
                    const isSpace = ch === 'SPACE';
                    const isEsc = ch === 'ESC';
                    const isMod = ['TAB', 'ENTER', 'L-SHIFT', 'R-SHIFT', 'BACK', 'CTRL', 'WIN', 'ALT', 'FN', 'MENU'].includes(ch);
                    const isAct = keyPressed === ch;

                    let keycapStyle = currentTheme.alphaKey;
                    if (isEsc) keycapStyle = currentTheme.escKey;
                    else if (isMod) keycapStyle = currentTheme.modKey;
                    else if (isSpace) keycapStyle = currentTheme.spaceKey;

                    return (
                      <button
                        key={ch}
                        onClick={() => handleKeyTap(ch)}
                        className={`flex-1 ${isSpace ? 'flex-grow-[4] md:flex-grow-[5]' : ''} py-2.5 sm:py-3.5 rounded font-mono font-bold text-[9px] md:text-xs transition-all duration-75 select-none focus:outline-none cursor-pointer text-center ${keycapStyle} ${
                          isAct ? 'keyboard-cap-pressed mr-0.5' : 'keyboard-cap-base hover:brightness-110 active:brightness-95'
                        }`}
                      >
                        <span className="block truncate px-0.5">{ch}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="absolute -bottom-1 left-1.5 right-1.5 text-center">
              <span className="bg-zinc-950 px-2 py-0.5 text-[8px] font-mono text-zinc-600 rounded uppercase">
                Gõ thử các phím trên để nghe mô phỏng âm thanh gõ thực tế
              </span>
            </div>
          </div>

          {/* Details Spec summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] font-mono select-none border-t border-zinc-900 pt-4">
            <div className="bg-zinc-950 py-1.5 px-2 rounded border border-zinc-900 leading-tight">
              <span className="block text-zinc-600">SOUND TYPE</span>
              <span className="font-extrabold text-brand-orange mt-0.5 block">{kbConfig.soundProfile.split(' ')[0]}</span>
            </div>
            <div className="bg-zinc-950 py-1.5 px-2 rounded border border-zinc-900 leading-tight">
              <span className="block text-zinc-600">SWITCH ACTUATION</span>
              <span className="font-extrabold text-zinc-300 mt-0.5 block truncate max-w-full">{kbConfig.switchType.split(' ')[0]}</span>
            </div>
            <div className="bg-zinc-950 py-1.5 px-2 rounded border border-zinc-900 leading-tight">
              <span className="block text-zinc-600">CASE MATERIAL</span>
              <span className="font-extrabold text-zinc-300 mt-0.5 block truncate max-w-full">{kbConfig.caseMaterial.split(' ')[0]}</span>
            </div>
            <div className="bg-zinc-950 py-1.5 px-2 rounded border border-zinc-900 leading-tight">
              <span className="block text-zinc-600">KEYCAP PLATES</span>
              <span className="font-extrabold text-zinc-300 mt-0.5 block truncate max-w-full">{kbConfig.keycapTheme.split(' ')[0]}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Key Options Custom Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6 space-y-5">
            
            {/* 1. Layout Selection */}
            <div>
              <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                CHỌN BỐ CỤC KHUNG PHÍM (LAYOUT FACTOR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {layouts.map((l) => {
                  const isSel = kbConfig.layout === l.name;
                  return (
                    <button
                      key={l.name}
                      onClick={() => setKbConfig({ ...kbConfig, layout: l.name as any })}
                      className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                        isSel 
                          ? 'bg-zinc-900 border-brand-orange text-white' 
                          : 'bg-zinc-950/80 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-zinc-200">{l.name.split(' ')[0]}</span>
                        {isSel && <Check size={12} className="text-brand-orange shrink-0" />}
                      </div>
                      <span className="block text-[9px] text-zinc-500 leading-tight line-clamp-1">{l.desc}</span>
                      <span className="block text-brand-orange font-mono text-[9px] font-bold mt-1">
                        {l.extraPrice === 0 ? 'Mặc định' : `+${formatPrice(l.extraPrice)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Switch type Selection */}
            <div>
              <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                CHỌN TRỤC SWICH CÔNG TẮC (SWITCH ACTUATOR)
              </label>
              <select
                value={kbConfig.switchType}
                onChange={(e) => setKbConfig({ ...kbConfig, switchType: e.target.value as any })}
                className="w-full bg-zinc-950 text-zinc-300 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
              >
                {switchTypes.map((sw) => (
                  <option key={sw.name} value={sw.name}>
                    {sw.name} - {sw.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. KeyCap Color Theme Selector */}
            <div>
              <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                CHỌN CHỦ ĐỀ MÀU NÚT KEYCAPS (THEME SKIN)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(themePresets).map((themeName) => {
                  const isSel = kbConfig.keycapTheme === themeName;
                  const item = themePresets[themeName as keyof typeof themePresets];
                  return (
                    <button
                      key={themeName}
                      onClick={() => setKbConfig({ ...kbConfig, keycapTheme: themeName as any })}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSel 
                          ? 'bg-zinc-900 border-brand-orange text-white' 
                          : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="text-xs font-semibold">{themeName}</span>
                      <div className="flex gap-1">
                        <span className={`h-3 w-4.5 rounded ${item.escKey.split(' ')[0]}`} />
                        <span className={`h-3 w-4.5 rounded ${item.alphaKey.split(' ')[0]}`} />
                        <span className={`h-3 w-4.5 rounded ${item.modKey.split(' ')[0]}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Case Material Selection */}
            <div>
              <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-2">
                CHẤT LIỆU VỎ KHUNG CASE (MATERIAL FRAME)
              </label>
              <select
                value={kbConfig.caseMaterial}
                onChange={(e) => setKbConfig({ ...kbConfig, caseMaterial: e.target.value as any })}
                className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
              >
                {caseMaterials.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} (+{formatPrice(m.extraPrice)})
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Sound Profile & Premium Lube Checkbox */}
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1">
                  XỬ LÝ AKOUSTIC ÂM GÕ
                </label>
                <select
                  value={kbConfig.soundProfile}
                  onChange={(e) => setKbConfig({ ...kbConfig, soundProfile: e.target.value as any })}
                  className="w-full bg-zinc-950 text-zinc-300 rounded-lg p-2 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                >
                  <option value="Thocky & Deep">Trầm Thocky trầm béo</option>
                  <option value="Clacky & Crisp">Vang Clacky đập đanh</option>
                  <option value="Smooth & Silent">Silent mượt câm lặng</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={() => setKbConfig({ ...kbConfig, lubingService: !kbConfig.lubingService })}
                  className={`w-full text-left p-2 border rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    kbConfig.lubingService 
                      ? 'border-brand-orange/45 bg-zinc-900/60 text-brand-orange' 
                      : 'border-zinc-900 bg-zinc-950 text-zinc-550 hover:border-zinc-805'
                  }`}
                >
                  <span className="text-[10px]">LUBE TOÀN BỘ PHÍM</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-zinc-500 font-mono">+450k</span>
                    {kbConfig.lubingService ? <Check size={14} strokeWidth={2.5} /> : <div className="h-4.5 w-4.5 border border-zinc-800 rounded bg-zinc-950" />}
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Buy Bottom Summary Bar */}
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left select-none">
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1">TỔNG GIÁ PHÍM HOÀN THIỆN</span>
              <span className="text-2xl font-black font-mono text-brand-orange">
                {formatPrice(totalKeyboardPrice)}
              </span>
              <span className="block text-[10px] text-zinc-500 mt-1">Gồm chi phí gạt keo lót foam, bọc chống rò nhiễu</span>
            </div>

            <button
              onClick={handleBuildKeyboard}
              disabled={building}
              className={`w-full md:w-auto font-sans font-extrabold tracking-wider text-xs py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                building
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-brand-orange text-black hover:bg-brand-orange-hover active:scale-95 shadow-xl shadow-brand-orange/15'
              }`}
            >
              <ShoppingBag size={15} strokeWidth={2.5} />
              <span>{building ? 'ĐANG ĐÚC PIN COIL...' : 'ĐẶT QUY TRÌNH BUILD LAB'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
