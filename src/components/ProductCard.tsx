/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Eye, ShoppingCart, SlidersHorizontal, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/mockData';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, extraDetails?: string, priceAdjust?: number) => void;
  onQuickView: (product: Product) => void;
  onCustomize: (category: 'pc' | 'keyboard') => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView, onCustomize }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const displayPrice = formatPrice(product.price);
  const displayOrgPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCustomizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCustomize(product.category === 'pc-water' || product.category === 'pc-workstation' ? 'pc' : 'keyboard');
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-[#121214] border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col h-full"
    >
      {/* Badge container label */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-brand-orange text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
          {product.badge}
        </span>
      )}

      {/* Product Image Frame */}
      <div className="relative aspect-4/3 w-full bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay quick view mask */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white hover:bg-brand-orange text-black py-2 px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye size={14} /> CHI TIẾT
          </button>
          
          {(product.category === 'pc-water' || product.category === 'keyboard') && (
            <button
              onClick={handleCustomizeClick}
              className="bg-zinc-900 hover:bg-black border border-zinc-800 text-brand-orange py-2 px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <SlidersHorizontal size={14} /> TỰ BUILD
            </button>
          )}
        </div>
      </div>

      {/* Brief Spec Overlay (Appears on Hover) */}
      <div className="bg-zinc-950 px-4 py-2 border-y border-zinc-900 flex justify-between items-center select-none text-[10px] text-zinc-500 font-mono">
        <span className="uppercase text-brand-orange font-bold font-mono">
          {product.category === 'pc-water' ? 'PC LIQUID' : product.category === 'pc-workstation' ? 'WORKSTATION' : product.category === 'keyboard' ? 'CUSTOM KB' : 'COMPONENTS'}
        </span>
        <div className="flex items-center gap-1">
          <Star size={11} className="fill-brand-orange text-brand-orange" />
          <span className="text-zinc-300 font-bold font-sans">{product.rating}</span>
          <span className="text-zinc-600">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Title */}
          <h3 
            className="font-display font-bold text-sm text-zinc-100 group-hover:text-brand-orange transition-colors duration-200 line-clamp-2 uppercase cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            {product.name}
          </h3>

          <p className="font-sans text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Bullet Highlight Specs */}
          <div className="mt-3.5 space-y-1.5 border-t border-zinc-900/85 pt-3">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex justify-between items-start text-[11px]">
                <span className="text-zinc-500 font-mono text-[10px] uppercase">{key}:</span>
                <span className="text-zinc-300 font-semibold font-sans text-right max-w-[70%] line-clamp-1">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Call-to-action Row */}
        <div className="mt-5 border-t border-zinc-900/80 pt-4 flex items-end justify-between gap-2">
          {/* Price tags */}
          <div className="flex flex-col select-none">
            {displayOrgPrice && (
              <span className="text-xs text-zinc-500 line-through leading-none mb-0.5">{displayOrgPrice}</span>
            )}
            <span className="text-base font-extrabold uppercase font-mono text-white leading-none">
              {displayPrice}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddClick}
            disabled={added}
            className={`cursor-pointer font-sans text-xs font-black tracking-wider py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-all duration-300 ${
              added 
                ? 'bg-emerald-500 text-black font-extrabold shadow-md shadow-emerald-500/25' 
                : 'bg-zinc-900 hover:bg-brand-orange border border-zinc-800 hover:border-brand-orange text-zinc-200 hover:text-black shadow-lg shadow-black/30'
            }`}
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={3} /> ĐÃ THÊM
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> MUA NGAY
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
