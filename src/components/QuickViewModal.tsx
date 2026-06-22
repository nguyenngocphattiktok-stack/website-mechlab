/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, SlidersHorizontal, Check, ShieldAlert } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/mockData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onCustomize: (category: 'pc' | 'keyboard') => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart, onCustomize }: QuickViewModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddClick = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  const handleCustomizeClick = () => {
    onClose();
    onCustomize(product.category === 'pc-water' || product.category === 'pc-workstation' ? 'pc' : 'keyboard');
  };

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
        {/* Dark backdrop mask */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black"
        />

        {/* Modal Main Frame Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#121214] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-55 max-h-[90vh] flex flex-col"
        >
          {/* Close button absolute top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-white p-2 bg-black/50 border border-zinc-900 rounded-xl hover:border-zinc-700 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Scrolling Container */}
          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Image Gallery Carousel Slider */}
              <div className="md:col-span-6 space-y-4">
                <div className="relative aspect-4/3 w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900">
                  <img
                    src={images[activeImageIdx]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-brand-orange text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnail Indicators list */}
                {images.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`h-11 w-15 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImageIdx === idx ? 'border-brand-orange scale-105 shadow-md shadow-brand-orange/10' : 'border-zinc-900 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Details, Specs and actions */}
              <div className="md:col-span-6 space-y-5">
                {/* Meta details */}
                <div className="space-y-1 select-none">
                  <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-widest block">
                    {product.category === 'pc-water' ? 'PC LIQUID WATERCOOLING' : product.category === 'pc-workstation' ? 'HIGH-END WORKSTATION' : product.category === 'keyboard' ? 'CUSTOM MECHANICAL KEYBOARD' : 'LABORATORY GEAR'}
                  </span>
                  <h2 className="font-display font-bold text-lg md:text-xl text-white leading-tight uppercase">
                    {product.name}
                  </h2>
                </div>

                {/* Ratings & brief descriptive */}
                <div className="flex items-center gap-3 select-none text-xs text-zinc-500 border-b border-zinc-900 pb-3">
                  <div className="flex text-brand-orange gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} className={s <= Math.floor(product.rating) ? 'fill-brand-orange' : 'text-zinc-800'} />
                    ))}
                  </div>
                  <span className="text-zinc-300 font-bold font-sans">{product.rating} / 5.0</span>
                  <span className="text-zinc-650">({product.reviewsCount} đánh giá từ khách hàng)</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-3">
                  {product.description}
                </p>

                {/* Detailed Spec table list representation */}
                <div className="space-y-2 border-t border-zinc-900 pt-4 bg-[#121214]">
                  <p className="text-[10px] text-zinc-550 font-mono tracking-widest font-bold uppercase mb-1.5">[ BẢNG THÔNG SỐ KỸ THUẬT ]</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start text-xs border-b border-zinc-900/50 pb-1.5 select-all">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase shrink-0 w-[35%]">{key}:</span>
                        <span className="text-zinc-200 font-sans font-semibold text-right w-[65%] leading-relaxed">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features bulletins */}
                <div className="space-y-1.5 select-none text-xs text-zinc-400 leading-relaxed">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-brand-orange mt-0.5 shrink-0 font-mono text-[11px]">▪</span>
                      <p>{f}</p>
                    </div>
                  ))}
                </div>

                {/* Guarantee claim */}
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 flex items-center gap-3">
                  <ShieldAlert size={16} className="text-brand-orange shrink-0 animate-pulse" />
                  <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                    Độc quyền ráp từ <strong>MECHLAB</strong>. Bảo hiểm sự cố rò rỉ nước, nứt gãy ống mica trong suốt 12 tháng kể cả cháy nổ chập do nước.
                  </p>
                </div>

                {/* Large Buy Frame controls */}
                <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between select-none bg-[#121214]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">ĐƠN GIÁ TRỌN GÓI VA</span>
                    <strong className="text-xl font-mono text-white tracking-tight">{formatPrice(product.price)}</strong>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddClick}
                      disabled={added}
                      className={`flex-1 sm:flex-none font-sans font-extrabold tracking-wider text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        added 
                          ? 'bg-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-500/20 animate-pulse' 
                          : 'bg-brand-orange text-black hover:bg-brand-orange-hover outline-none shadow-xl shadow-brand-orange/10'
                      }`}
                    >
                      {added ? <Check size={14} strokeWidth={3} /> : <ShoppingCart size={13} />}
                      <span>{added ? 'ĐÃ THÊM GIỎ HÀNG' : 'THÊM GIỎ HÀNG'}</span>
                    </button>

                    {(product.category === 'pc-water' || product.category === 'keyboard') && (
                      <button
                        onClick={handleCustomizeClick}
                        className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 p-3 rounded-xl hover:border-zinc-650 cursor-pointer transition-colors"
                        title="Tự tùy chọn màu sắc phụ kiện"
                      >
                        <SlidersHorizontal size={15} />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
