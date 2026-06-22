/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sliders, ShieldCheck, Sparkles, Cpu } from 'lucide-react';

interface HeroSliderProps {
  onCustomizePC: () => void;
  onCustomizeKB: () => void;
  onShopNow: () => void;
}

export default function HeroSlider({ onCustomizePC, onCustomizeKB, onShopNow }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'MECHLAB LABORATORY',
      subtitle: 'ĐỈNH CAO CUSTOM LIQUID PC & MODDING',
      desc: 'Thiết kế tản nhiệt nước Hardloop kim loại sáng loáng, uốn cong chính xác đến từng milimet bởi đội ngũ kỹ sư hàng đầu Việt Nam. Nâng tầm cá nhân hóa thiết bị gaming của bạn.',
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1600',
      action: onCustomizePC,
      actionText: 'THỬ NGHIỆM THIẾT KẾ PC',
      tag: 'CÁ NHÂN HÓA ĐẶC BIỆT',
      badgeIcon: Sliders
    },
    {
      title: 'THOCKY MECHLAB KEYBOARDS',
      subtitle: 'XƯỞNG BUILD BÀN PHÍM CƠ TIÊU CHUẨN HI-END',
      desc: 'Quy trình rã hàn tỉ mỉ, lót foam tiêu âm cao cấp và dịch vụ Lube tay chuyên nghiệp từng con switch bằng Krytox chính hãng. Mang lại xúc giác hoàn mỹ trên từng đầu ngón tay.',
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1600',
      action: onCustomizeKB,
      actionText: 'BẮT ĐẦU BUILD PHÍM CƠ',
      tag: 'NÚT BẤM THUẦN KHIẾT',
      badgeIcon: Sparkles
    },
    {
      title: 'LABORATORY WORKSTATIONS',
      subtitle: 'TRẠM MÁY CHUYÊN NGHIỆP CHO NHÀ SÁNG TẠO',
      desc: 'Cấu hình xử lý tuyệt mật tối đa hóa hiệu năng trí tuệ nhân tạo, thiết lập đa luồng xử lý đồ họa nâng cao. Bảo hành onsite 24 tháng phản hồi trong vòng 2 giờ đồng hồ.',
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=1600',
      action: onShopNow,
      actionText: 'KHÁM PHÁ CẤU HÌNH WORKSTATION',
      tag: 'CÔNG SUẤT VƯỢT TRỘI',
      badgeIcon: Cpu
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8200);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[460px] md:h-[580px] lg:h-[650px] bg-zinc-950 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image with high-end dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 z-10" />
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40"
          />

          {/* Slide Text Content Framed in Center left */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 flex flex-col items-start text-left space-y-4 md:space-y-6">
                
                {/* Special Tag badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 bg-neutral-900/90 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full text-xs font-mono font-extrabold tracking-wider"
                >
                  {React.createElement(slides[currentSlide].badgeIcon, { size: 12 })}
                  {slides[currentSlide].tag}
                </motion.div>

                {/* Subtitle */}
                <motion.h4
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-mono text-sm md:text-base tracking-[0.25em] text-zinc-400 font-extrabold"
                >
                  {slides[currentSlide].subtitle}
                </motion.h4>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white tracking-tight leading-tight uppercase font-bold"
                >
                  {slides[currentSlide].title.split(" ").map((word, idx) => {
                    const isLast = idx === slides[currentSlide].title.split(" ").length - 1 && word === "CORE";
                    return (
                      <span key={idx} className={isLast ? "text-brand-orange orange-glow" : ""}>
                        {word}{" "}
                      </span>
                    )
                  })}
                </motion.h1>

                {/* Desc */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-2xl text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed font-sans"
                >
                  {slides[currentSlide].desc}
                </motion.p>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <button
                    onClick={slides[currentSlide].action}
                    className="group bg-brand-orange hover:bg-brand-orange-hover text-black font-extrabold tracking-wider text-xs md:text-sm py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-brand-orange/15 hover:shadow-brand-orange/30 active:scale-95 cursor-pointer font-sans"
                  >
                    <span>{slides[currentSlide].actionText}</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" strokeWidth={2.5} />
                  </button>
                  
                  <div className="hidden sm:flex items-center gap-2 text-zinc-500 font-mono text-xs">
                    <ShieldCheck size={14} className="text-brand-orange" />
                    <span>Cam kết chuẩn kỹ thuật quốc tế</span>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Left/Right Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-brand-orange border border-zinc-900 hover:border-brand-orange hover:text-black py-3 px-3 rounded-full text-zinc-400 transition-all cursor-pointer"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-brand-orange border border-zinc-900 hover:border-brand-orange hover:text-black py-3 px-3 rounded-full text-zinc-400 transition-all cursor-pointer"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      {/* Slide Pagination Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-brand-orange' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
