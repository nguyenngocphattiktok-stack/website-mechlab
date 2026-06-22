/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Phone, MapPin, Sparkles, SlidersHorizontal, Keyboard, Cpu, Layers } from 'lucide-react';
import Logo from './Logo';
import { CartItem } from '../types';
import { formatPrice } from '../data/mockData';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch: (query: string) => void;
}

export default function Header({ cart, onOpenCart, activeTab, setActiveTab, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => acc + (curr.product.price + (curr.customizations?.extraPrice || 0)) * curr.quantity, 0);

  const navItems = [
    { id: 'all', label: 'TẤT CẢ SẢN PHẨM', icon: Layers },
    { id: 'pc-water', label: 'PC TẢN NƯỚC CUSTOM', icon: Cpu },
    { id: 'pc-workstation', label: 'WORKSTATIONS', icon: Cpu },
    { id: 'keyboard', label: 'BÀN PHÍM CƠ CUSTOM', icon: Keyboard },
    { id: 'customizer', label: 'PHÒNG THÍ NGHIỆM PC (D.I.Y)', icon: SlidersHorizontal, highlight: true },
    { id: 'kb-builder', label: 'BẢN PHÍM CƠ BUILDER', icon: Sparkles, highlight: true },
    { id: 'setups', label: 'GÓC MÁY TRƯNG BÀY', icon: MapPin },
    { id: 'services', label: 'DỊCH VỤ LAB', icon: Phone },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900">
      {/* Top Banner Contact bar */}
      <div className="bg-brand-orange text-black px-4 py-1.5 text-xs font-bold flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-0 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={13} strokeWidth={2.5} /> HOTLINE: 0763 966 688 | KHIẾU NẠI: 0902 301 168
          </span>
          <span className="hidden md:inline-block">|</span>
          <span className="hidden md:flex items-center gap-1">
            <MapPin size={13} strokeWidth={2.5} /> ĐỊA CHỈ: 73 Khuông Việt, Phường Phú Trung, Quận Tân Phú, TP. Hồ Chí Minh
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-black text-brand-orange leading-none py-0.5 px-2 rounded-full font-mono text-[10px] animate-pulse">
            LAB ONLINE
          </span>
          <span className="tracking-wide">BẢO HÀNH CHUYÊN NGHIỆP TRỌN ĐỜI CÁC LIQUID LOOP</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex justify-between items-center gap-4">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => setActiveTab('all')}>
          <Logo size={42} />
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Tìm kiếm cấu hình PC, switch, keycap độc quyền..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-zinc-900 text-zinc-100 placeholder-zinc-500 rounded-lg pl-10 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-brand-orange text-sm font-sans"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold">CONTACT DIRECT</span>
            <a href="tel:0763966688" className="text-sm font-bold text-zinc-100 hover:text-brand-orange transition-colors">
              0763 966 688
            </a>
          </div>

          {/* Cart Icon trigger */}
          <button
            onClick={onOpenCart}
            id="header-cart-button"
            className="relative flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-brand-orange py-2 px-4 rounded-lg text-zinc-200 hover:text-white transition-all cursor-pointer font-sans"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-brand-orange text-black leading-none text-[10px] font-extrabold w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">GIỎ HÀNG</span>
              <span className="text-xs font-bold text-brand-orange">
                {cartCount > 0 ? formatPrice(cartTotal) : 'Liên hệ'}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile menu and cart trigger buttons */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg text-zinc-200"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-black leading-none text-[9px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg text-zinc-200"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Sub Header / Navigation Ribbon */}
      <div className="hidden lg:block bg-zinc-950/90 border-t border-zinc-900 py-1">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 py-2 px-3.5 rounded-md text-xs font-extrabold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-brand-orange text-black active-tab shadow-lg shadow-brand-orange/10'
                      : item.highlight
                      ? 'bg-zinc-900 border border-zinc-800 hover:border-brand-orange text-brand-orange'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <IconComp size={13} className={item.highlight && !isSelected ? 'animate-bounce' : ''} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 flex flex-col p-4 space-y-4 shadow-2xl">
          {/* Mobile search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-zinc-900 text-zinc-100 placeholder-zinc-500 rounded-lg pl-10 pr-4 py-2 border border-zinc-800 text-sm focus:outline-none focus:border-brand-orange"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-left text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-orange text-black'
                      : item.highlight
                      ? 'bg-zinc-900/50 border border-brand-orange/30 text-brand-orange'
                      : 'text-zinc-300 hover:bg-zinc-900/70 hover:text-white'
                  }`}
                >
                  <IconComp size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-zinc-900 pt-3 flex flex-col gap-2">
            <p className="text-xs text-zinc-500">LIÊN HỆ TRỰC TIẾP LAB</p>
            <a href="tel:0763966688" className="text-sm font-bold text-brand-orange flex items-center gap-2">
              <Phone size={14} /> Hotline: 0763 966 688
            </a>
            <a href="tel:0902301168" className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Phone size={12} /> Khiếu nại: 0902 301 168
            </a>
            <div className="text-xs text-zinc-400 flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-zinc-500 shrink-0" />
              <span>73 Khuông Việt, Phường Phú Trung, Quận Tân Phú, TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
