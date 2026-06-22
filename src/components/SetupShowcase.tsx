/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Camera, Info, ShoppingCart, User, Cpu, Tag, ExternalLink } from 'lucide-react';
import { SetupCorner, Product } from '../types';
import { mockSetups, formatPrice } from '../data/mockData';

interface SetupShowcaseProps {
  onAddToCart: (dummyProduct: Product) => void;
}

export default function SetupShowcase({ onAddToCart }: SetupShowcaseProps) {
  const [activeSetup, setActiveSetup] = useState<SetupCorner>(mockSetups[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const handleBuyComponent = (label: string, priceStr: string) => {
    const rawPriceNum = parseInt(priceStr.replace(/[^0-9]/g, '')) || 500000;
    
    const dummyProduct: Product = {
      id: 'setup-component-' + Date.now(),
      name: `${label.toUpperCase()} - (TRONG GÓC SETUP LAB)`,
      category: 'gear',
      price: rawPriceNum,
      rating: 5,
      reviewsCount: 16,
      image: activeSetup.image,
      badge: 'SETUP',
      specs: { 'Xuất xứ': 'Setup trưng bày của ' + activeSetup.author },
      features: ['Hàng trưng bày thực tế tại show-setup', 'Hỗ trợ đồng bộ thiết bị ARGB'],
      description: `Sản phẩm và linh kiện trang trí xuất phẩm từ phòng setup thực tế của Lab: ${label}.`,
      gallery: []
    };

    onAddToCart(dummyProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      {/* Title block */}
      <div className="mb-8">
        <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-widest block mb-2">
          ★ SHOWROOM PORTFOLIO
        </span>
        <h2 className="font-display font-black text-3xl md:text-4xl text-white">
          Ý TƯỞNG THIẾT KẾ <span className="text-brand-orange">GÓC MÁY GAMING</span>
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl font-sans mt-1">
          Khám phá và tham khảo các tuyệt phẩm góc máy custom đầy sáng tạo được setup thi công trọn gói bởi đội ngũ kỹ sư MECHLAB phối hợp cùng khách hàng trên mọi miền tổ quốc.
        </p>
      </div>

      {/* Choice Buttons selectors */}
      <div className="flex flex-wrap gap-3 mb-6 select-none">
        {mockSetups.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setActiveSetup(s);
              setActiveHotspot(null);
            }}
            className={`cursor-pointer font-sans text-xs font-bold py-3 px-6 rounded-xl border flex items-center gap-2.5 transition-all ${
              activeSetup.id === s.id
                ? 'bg-brand-orange text-black border-brand-orange font-extrabold shadow-lg shadow-brand-orange/10'
                : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800'
            }`}
          >
            <Camera size={14} />
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main interactive Showcase Panel split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Canvas Area (Hotspots) */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl h-[360px] md:h-[480px] lg:h-[520px]">
          <img
            src={activeSetup.image}
            alt={activeSetup.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none brightness-95"
          />
          {/* Subtle vignette gradient cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

          {/* Hotspots Render Overlay */}
          {activeSetup.hotspots.map((hs, idx) => {
            const isOpened = activeHotspot === idx;
            return (
              <div
                key={idx}
                className="absolute"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                {/* Glowing hot-spot circle button */}
                <button
                  onClick={() => setActiveHotspot(isOpened ? null : idx)}
                  className={`relative flex items-center justify-center h-7 w-7 rounded-full border cursor-pointer transition-all ${
                    isOpened
                      ? 'bg-brand-orange text-black border-brand-orange scale-110'
                      : 'bg-black/85 text-brand-orange border-brand-orange animate-pulse shadow-xl'
                  }`}
                >
                  <Tag size={12} strokeWidth={2.5} />
                  
                  {/* Outer pulse indicator */}
                  <span className="absolute -inset-1.5 rounded-full border border-brand-orange/20 animate-ping -z-10" />
                </button>

                {/* Popover tooltip overlay */}
                <AnimatePresence>
                  {isOpened && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-40 bottom-9 left-1/2 -translate-x-[45%] w-56 bg-zinc-950 p-3.5 border border-zinc-800 rounded-xl shadow-2xl select-none"
                    >
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="text-[11px] font-bold text-zinc-100 uppercase tracking-tight truncate leading-tight">
                          {hs.label}
                        </span>
                        <span className="bg-brand-orange/20 text-brand-orange font-mono text-[9px] font-extrabold px-1 rounded">
                          HOT
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed mb-3">
                        {hs.description}
                      </p>
                      
                      <div className="flex items-center justify-between gap-2 border-t border-zinc-900 pt-2 bg-zinc-950">
                        <span className="text-[11px] font-extrabold text-white font-mono">{hs.price}</span>
                        <button
                          onClick={() => handleBuyComponent(hs.label, hs.price)}
                          className="bg-brand-orange hover:bg-brand-orange-hover text-black p-1.5 rounded cursor-pointer transition-colors"
                          title="Mua linh kiện này"
                        >
                          <ShoppingCart size={11} strokeWidth={2.5} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Bottom visual overlay bar */}
          <div className="absolute bottom-5 left-5 right-5 bg-zinc-950/80 backdrop-blur border border-zinc-900 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-2 select-none">
            <div className="flex items-center gap-3">
              <div className="bg-brand-orange text-black p-2 rounded-lg">
                <User size={15} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{activeSetup.title}</h4>
                <p className="text-[10px] text-zinc-400 font-sans mt-0.5">Sở hữu bởi: <span className="text-brand-orange font-bold font-mono">{activeSetup.author}</span></p>
              </div>
            </div>
            
            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded border border-zinc-900">
              <Info size={12} className="text-brand-orange" />
              <span>Chỉ vào các nhãn dán trong ảnh để khám phá cấu hình chi tiết</span>
            </div>
          </div>
        </div>

        {/* Right Details Items Side list */}
        <div className="lg:col-span-4 bg-[#121214] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xs tracking-wider text-zinc-100 uppercase pb-2.5 border-b border-zinc-900 font-mono">
              DANH SÁCH CHI TIẾT SETUP
            </h3>
            
            <ul className="space-y-3 select-none">
              {activeSetup.specs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <span className="h-4.5 w-4.5 rounded-full bg-zinc-900 border border-zinc-850 text-[10px] text-brand-orange font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-zinc-300 font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-zinc-950 p-4 border border-zinc-900/60 rounded-xl space-y-2 mt-6">
              <span className="text-[10px] text-brand-orange font-mono font-bold tracking-widest block uppercase">
                ★ KHẢO SÁT ONLINE TRỌN GÓI
              </span>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Lab nhận thiết kế, đo đạc mặt bằng dựng 3D, cắt xẻ gỗ tự nhiên, bọc da lót, đi dây ống nếp rãnh gầm giấu kín tuyệt đối theo yêu cầu.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const bookingElement = document.getElementById('contact-form-section');
              if (bookingElement) {
                bookingElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full mt-6 bg-transparent hover:bg-zinc-900 text-brand-orange hover:text-white border border-brand-orange/40 hover:border-white font-sans font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>LIÊN HỆ KHẢO SÁT KHÔNG GIAN</span>
            <ExternalLink size={13} />
          </button>
        </div>

      </div>

    </div>
  );
}
