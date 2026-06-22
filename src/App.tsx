/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import VerticalMenu from './components/VerticalMenu';
import ProductCard from './components/ProductCard';
import PCCustomizer from './components/PCCustomizer';
import KeyboardBuilder from './components/KeyboardBuilder';
import SetupShowcase from './components/SetupShowcase';
import ServiceInquiry from './components/ServiceInquiry';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import QuickViewModal from './components/QuickViewModal';

import { Product, CartItem } from './types';
import { mockProducts } from './data/mockData';
import { Sparkles, Sliders, Server, HardHat, Cpu, Check, Layers, AlertCircle } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, extraDetails?: string, priceAdjust = 0) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.customizations?.details === extraDetails
      );

      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      } else {
        const customObj = extraDetails 
          ? { type: (product.category === 'pc-water' ? 'pc' : 'keyboard') as any, details: extraDetails, extraPrice: priceAdjust }
          : undefined;

        return [...prevCart, { product, quantity: 1, customizations: customObj }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCustomizeNavigate = (type: 'pc' | 'keyboard') => {
    if (type === 'pc') {
      setActiveTab('customizer');
    } else {
      setActiveTab('kb-builder');
    }
  };

  // Searching & Category filtering logic
  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(p.specs).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'customizer' || activeTab === 'kb-builder' || activeTab === 'setups' || activeTab === 'services') {
      return false; // These display dedicated interactive components instead of direct product grids
    } else {
      // category page match
      return p.category === activeTab && matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between">
      
      {/* Header element */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearchQuery}
      />

      {/* Hero portion & Left Categories, only rendering on main browsing tabs */}
      {(activeTab === 'all' || activeTab === 'pc-water' || activeTab === 'pc-workstation' || activeTab === 'keyboard') && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full pt-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] lg:gap-0.5 items-stretch relative">
          {/* Left Main Menu (250px wide) */}
          <div className="hidden lg:block relative z-[35] h-full">
            <VerticalMenu
              onSelectCategory={(id) => setActiveTab(id)}
              activeTab={activeTab}
            />
          </div>
          {/* Right Banner Slider */}
          <div className="overflow-hidden rounded-none border border-zinc-900 bg-[#09090b] h-full flex flex-col justify-stretch">
            <HeroSlider
              onCustomizePC={() => setActiveTab('customizer')}
              onCustomizeKB={() => setActiveTab('kb-builder')}
              onShopNow={() => setActiveTab('pc-workstation')}
            />
          </div>
        </div>
      )}

      {/* Main body viewport */}
      <main className="flex-1 pb-16">
        
        {/* INTERACTIVE BUILDER TAB: PC CUSTOMIZER */}
        {activeTab === 'customizer' && (
          <PCCustomizer
            onAddToCart={(dummy, details, adjust) => {
              handleAddToCart(dummy, details, adjust);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* INTERACTIVE BUILDER TAB: KEYBOARD BUILDER */}
        {activeTab === 'kb-builder' && (
          <KeyboardBuilder
            onAddToCart={(dummy, details, adjust) => {
              handleAddToCart(dummy, details, adjust);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* INTERACTIVE GALLERY EXHIBIT: SETUPS */}
        {activeTab === 'setups' && (
          <SetupShowcase
            onAddToCart={(dummyProduct) => {
              handleAddToCart(dummyProduct);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* LAB BOOKING FORMS: SERVICES */}
        {activeTab === 'services' && (
          <ServiceInquiry />
        )}

        {/* STANDARD PRODUCT GRID PORTFOLIO TABS */}
        {activeTab !== 'customizer' && activeTab !== 'kb-builder' && activeTab !== 'setups' && activeTab !== 'services' && (
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            
            {/* Section description */}
            <div className="flex justify-between items-end mb-8 select-none border-b border-zinc-900 pb-5">
              <div>
                <span className="text-[10px] text-brand-orange font-mono font-bold tracking-widest block mb-1">
                  ★ MECHLAB SPECIALTY STOCK
                </span>
                <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white">
                  {activeTab === 'all' ? 'TOÀN BỘ SẢN PHẨM PHÒNG LAB' : activeTab === 'pc-water' ? 'CẤU HÌNH PC LIQUID CUSTOM' : activeTab === 'pc-workstation' ? 'TRẠM MÁY CHUYÊN NGHIỆP WORKSTATIONS' : 'BÀN PHÍM CƠ CUSTOM'}
                </h2>
              </div>
              
              <span className="text-xs text-zinc-500 font-mono hidden md:inline">
                SẮP XẾP: <strong className="text-zinc-300">LINH HOẠT SỐ LƯỢNG ({filteredProducts.length})</strong>
              </span>
            </div>

            {/* Empty state handles if filter returns empty */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <AlertCircle size={44} className="text-zinc-600" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-300">KHÔNG TÌM THẤY SẢN PHẨM KHỚP</h4>
                  <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                    Không có kết quả nào ứng với truy vấn "{searchQuery}". Hãy thử tìm kiếm switch, keycap độc quyền hoặc RTX GPU khác.
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-4 py-2 rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  [ ĐẶT LẠI TÌM KIẾM ]
                </button>
              </div>
            ) : (
              /* Product Grid layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod)}
                    onQuickView={setQuickViewProduct}
                    onCustomize={handleCustomizeNavigate}
                  />
                ))}
              </div>
            )}

            {/* Bottom Service Form Section shortcut for visual completeness */}
            <div className="mt-20 bg-gradient-to-r from-[#121214] to-[#0a0a0c] border border-zinc-900 p-8 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left space-y-2 select-none">
                <div className="inline-flex items-center gap-1 bg-brand-orange/15 text-brand-orange border border-brand-orange/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider">
                  <Server size={10} /> ONSITE LAB SERVICES
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white">BẠN CÓ Ý TƯỞNG THIẾT KẾ RIÊNG KHÁC BIỆT?</h3>
                <p className="text-xs text-zinc-500 max-w-xl leading-relaxed">
                  Đội ngũ kỹ sư Lab luôn sẵn sàng đón nhận uốn cong dập tản dán ống mica, mạ chrome hoặc thiết lập foam gỗ, uốn nẹp kim loại theo yêu cầu lập tức của bạn.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('services')}
                className="w-full lg:w-auto bg-brand-orange hover:bg-brand-orange-hover text-black font-extrabold tracking-wider text-xs py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-orange/15"
              >
                <Sliders size={14} strokeWidth={2.5} />
                <span>LIÊN HỆ PHÁC THẢO 3D NGAY</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer layout */}
      <Footer />

      {/* Slideout Shopping Cart sidebar drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View detailed item popover modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod) => handleAddToCart(prod)}
        onCustomize={handleCustomizeNavigate}
      />

    </div>
  );
}
