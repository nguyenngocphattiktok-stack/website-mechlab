/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ChevronRight, 
  Menu,
  Cpu, 
  Layers, 
  Monitor,
  Laptop,
  Server,
  Wind,
  Package,
  Keyboard, 
  MousePointer,
  Headphones,
  Gamepad2,
  Volume2,
  Settings,
  Wifi,
  Wrench,
  Database,
  Zap,
  Box,
  Disc
} from 'lucide-react';

interface VerticalMenuProps {
  onSelectCategory: (id: string) => void;
  activeTab: string;
}

export default function VerticalMenu({ onSelectCategory, activeTab }: VerticalMenuProps) {
  // 14 exact Vietnamese items with appropriate standard lucide-react icons
  const menuItems = [
    { id: 'linh-kien', label: 'LINH KIỆN PC', icon: Cpu, hasMegaMenu: true },
    { id: 'vga', label: 'VGA - CARD MÀN HÌNH', icon: Layers },
    { id: 'man-hinh', label: 'MÀN HÌNH', icon: Monitor },
    { id: 'laptop', label: 'LAPTOP', icon: Laptop },
    { id: 'nas', label: 'NAS SYNOLOGY VÀ PHỤ KIỆN', icon: Server },
    { id: 'tan-nhiet', label: 'TẢN NHIỆT - FAN CASE', icon: Wind },
    { id: 'phu-kien', label: 'PHỤ KIỆN', icon: Package },
    { id: 'ban-phim', label: 'BÀN PHÍM', icon: Keyboard },
    { id: 'chuot', label: 'CHUỘT + LÓT CHUỘT', icon: MousePointer },
    { id: 'tai-nghe', label: 'TAI NGHE', icon: Headphones },
    { id: 'ghe-gaming', label: 'GHẾ GAMING', icon: Gamepad2 },
    { id: 'sound', label: 'ÂM THANH - AUDIO', icon: Volume2 },
    { id: 'pc-mechlab', label: 'PC MECHLAB', icon: Settings },
    { id: 'network', label: 'THIẾT BỊ MẠNG', icon: Wifi },
  ];

  // 4 columns structure with top and bottom blocks for the Mega Menu (Exactly like TPLAB)
  const megaMenuData = [
    {
      top: {
        title: 'MAINBOARD - BO MẠCH CHỦ',
        items: [
          'ASUS ROG Maximus / Crosshair',
          'GIGABYTE AORUS Xtreme / Master',
          'MSI MEG & MPG High-end Series',
          'ASRock Taichi & Phantom Gaming',
          'Mainboard Workstation / Creator',
          'Mainboard block tản nước liền VRM'
        ]
      },
      bottom: {
        title: 'HDD',
        items: [
          'WD Purple Pro / Red NAS',
          'Seagate IronWolf / BarraCuda',
          'Seagate Exos Enterprise HDD',
          'Toshiba Enterprise Storage'
        ]
      }
    },
    {
      top: {
        title: 'CPU - BỘ VI XỬ LÝ',
        items: [
          'Intel Core Ultra 9 / i9-14900KS',
          'Intel Core Ultra 7 / i7-14700K',
          'AMD Ryzen 9 9950X / 7950X3D',
          'AMD Ryzen 7 9800X3D Gaming',
          'Dịch vụ Delid CPU & Kim loại lỏng',
          'Khung chống cong Thermalright'
        ]
      },
      bottom: {
        title: 'NGUỒN THEO HÃNG',
        items: [
          'Nguồn ASUS ROG Series',
          'Nguồn Corsair Premium',
          'Nguồn Seasonic Modular',
          'Nguồn MSI PCIe 5.0 ATX 3.0',
          'Nguồn FSP Hydro G Pro'
        ]
      }
    },
    {
      top: {
        title: 'RAM PC',
        items: [
          'G.Skill Trident Z5 RGB DDR5',
          'Corsair Dominator Titanium DDR5',
          'TeamGroup T-Force Delta RGB',
          'Kingston FURY Renegade Speed',
          'Kit RAM custom có Heatsink đồng',
          'RAM Sleeves RGB tản nhiệt'
        ]
      },
      bottom: {
        title: 'NGUỒN THEO CÔNG SUẤT',
        items: [
          'Nguồn dưới 750W',
          'Nguồn từ 750W đến 1000W',
          'Nguồn cao cấp trên 1000W',
          'Đạt chuẩn 80 Plus Platinum / Gold'
        ]
      }
    },
    {
      top: {
        title: 'SSD',
        items: [
          'Samsung 990 PRO M.2 PCIe Gen 5',
          'WD Black SN850X Heatsink',
          'Kingston KC3000 High-speed',
          'Crucial T700 Gen 5 12400MB/s',
          'SSD tản nhiệt block nước acrylic',
          'Crucial P5 Plus Gaming SSD'
        ]
      },
      bottom: {
        title: 'CASE - VỎ MÁY TÍNH',
        items: [
          'Lian Li O11 Vision Chrome / EVO',
          'Phanteks NV9 / NV7 Premium Glass',
          'HYTE Y70 Touch Infinite LCD Screen',
          'Fractal Design North Walnut Wood',
          'Vỏ case mod nhôm xước MECHLAB độc quyền',
          'Phụ kiện che nguồn dập lỗ CNC'
        ]
      }
    }
  ];

  return (
    <div className="relative w-full h-full bg-white border border-zinc-200 rounded-none p-2 flex flex-col justify-between overflow-visible group/main select-none">
      <div className="space-y-1 overflow-visible">
        {/* Strictly required Blue Header with standard Menu Icon */}
        <div className="pb-2 border-b border-zinc-100 px-2 flex items-center gap-2 text-[#0000FF] select-none">
          <Menu size={16} strokeWidth={2.5} />
          <h3 className="font-sans font-black text-xs tracking-wider uppercase">
            DANH MỤC SẢN PHẨM
          </h3>
        </div>

        {/* Categories Menu List - Made highly dense so 14 items fit beautifully */}
        <div className="pt-1.5 space-y-0 overflow-visible">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            
            return (
              <div 
                key={item.id} 
                className={`overflow-visible ${item.hasMegaMenu ? 'group/submenu' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (item.id !== 'linh-kien') {
                      onSelectCategory(item.id);
                    } else {
                      onSelectCategory('all');
                    }
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2 rounded-none text-[11px] font-bold transition-all duration-150 cursor-pointer text-left group/btn ${
                    isSelected 
                      ? 'text-[#0000FF] font-black bg-transparent'
                      : 'text-zinc-700 hover:text-[#0000FF] bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon size={14} className={`transition-colors duration-150 shrink-0 ${isSelected ? 'text-[#0000FF]' : 'text-zinc-400 group-hover/btn:text-[#0000FF]'}`} />
                    <span className="uppercase tracking-wide text-[10.5px] truncate">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={11} className={`transition-colors duration-150 shrink-0 ${isSelected ? 'text-[#0000FF]' : 'text-zinc-300 group-hover/btn:text-[#0000FF]'}`} />
                </button>

                {/* Absolutely positioned Mega Menu, triggered only when hovering over parent 'LINH KIỆN PC' */}
                {item.hasMegaMenu && (
                  <div 
                    id="linh-kien-mega-menu"
                    className="absolute top-0 left-[250px] w-[960px] bg-white border border-zinc-200 rounded-none p-6 hidden group-hover/submenu:grid grid-cols-4 gap-[30px] z-[999] shadow-xl transition-all duration-200 pointer-events-auto overflow-hidden animate-fade-in text-[#333333] before:absolute before:content-[''] before:top-0 before:bottom-0 before:left-[-15px] before:w-[15px] before:bg-transparent before:z-[-1]"
                  >
                    {/* Left side brand outline strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0000FF]" />

                    {megaMenuData.map((col, index) => {
                      return (
                        <div key={index} className="flex flex-col justify-between h-full space-y-6 font-sans">
                          {/* Top Block */}
                          <div>
                            <h4 className="font-sans font-bold text-[11px] text-[#0000FF] tracking-wider uppercase mb-[15px] select-none border-b border-zinc-100 pb-1.5">
                              {col.top.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {col.top.items.map((subItem, sIdx) => (
                                <li key={sIdx}>
                                  <a 
                                    href="#all-products"
                                    onClick={() => onSelectCategory('all')}
                                    className="block text-[10.5px] text-[#333333] hover:text-[#0000FF] transition-colors duration-150 leading-relaxed truncate"
                                  >
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bottom Block */}
                          <div>
                            <h4 className="font-sans font-bold text-[11px] text-[#0000FF] tracking-wider uppercase mb-[15px] select-none border-b border-zinc-100 pb-1.5">
                              {col.bottom.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {col.bottom.items.map((subItem, sIdx) => (
                                <li key={sIdx}>
                                  <a 
                                    href="#all-products"
                                    onClick={() => onSelectCategory('all')}
                                    className="block text-[10.5px] text-[#333333] hover:text-[#0000FF] transition-colors duration-150 leading-relaxed truncate"
                                  >
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Humble, flat footer indicator */}
      <div className="pt-2 border-t border-zinc-100 px-2 select-none">
        <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-mono leading-none font-bold uppercase tracking-wider">
          <Wrench size={10} className="text-[#0000FF]" />
          <span>MECHLAB PLATFORM</span>
        </div>
      </div>
    </div>
  );
}
