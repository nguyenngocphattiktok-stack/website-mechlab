/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Mail, Phone, MapPin, Cpu, Facebook, Youtube, ShieldAlert, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-zinc-900 text-zinc-400 text-xs font-sans">
      
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 border-b border-zinc-900 grid grid-cols-1 md:grid-cols-4 gap-8 select-none">
        <div className="flex items-start gap-4">
          <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-brand-orange shrink-0">
            <Cpu size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-100 text-[11px] tracking-wider uppercase mb-1">KIÊN ĐỊNH CHẤT LƯỢNG</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Mọi mối nối uốn dập liquid được rà soát tỉ mỉ 100%. Đảm bảo sự hoàn mỹ trong mọi góc máy.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-brand-orange shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-100 text-[11px] tracking-wider uppercase mb-1">BẢO CHÂN EK CHÍNH HÃNG</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">100% block tản nước nhập khẩu chính ngạch EKWB châu Âu đầy đủ chứng chỉ nguồn gốc nhập CO/CQ.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-brand-orange shrink-0">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-100 text-[11px] tracking-wider uppercase mb-1">BẢO HIỂM SỰ CỐ TOÀN DIỄN</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Cam kết đền bù bảo hành mới 100% linh kiện phần cứng nếu sự cố rò rỉ nước do bên Lab ráp gây ra.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-brand-orange shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-zinc-100 text-[11px] tracking-wider uppercase mb-1">KỸ THUẬT VIÊN TRỰC 24/7</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Liên hệ cứu hộ tản custom khẩn cấp mọi thời điểm bất kể đêm khuya hay ngày nghỉ lễ.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Branches lists & menu */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Branch 1: Brand intro */}
        <div className="md:col-span-5 space-y-4">
          <Logo size={42} />
          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-3">
            <strong>MECHLAB</strong> là thương hiệu thiết kế Custom PC Watercooling và Modding cơ khí cao cấp đi đầu tại Việt Nam. Chúng tôi nâng tầm máy tính và góc đặt làm việc của người dùng thành những tuyệt phẩm kỹ nghệ nghệ thuật.
          </p>

          <div className="flex gap-3 pt-2">
            <a href="#" className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-orange border border-zinc-800 transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-orange border border-zinc-800 transition-colors">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Branch 2: Branch Location lists mapping typical vietnam showrooms */}
        <div className="md:col-span-4 space-y-4 select-none">
          <h4 className="font-display font-black text-xs text-white tracking-widest uppercase">HỆ THỐNG PHÒNG THÍ NGHIỆM MECHLAB</h4>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-300 font-extrabold text-[11px]">TRỤ SỞ CHÍNH HỒ CHÍ MINH (HEAD LAB)</p>
                <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">73 Khuông Việt, Phường Phú Trung, Quận Tân Phú, Thành Phố Hồ Chí Minh</p>
                <p className="text-[10px] text-brand-orange font-mono font-semibold">Hotline: 0763 966 688</p>
                <p className="text-[10px] text-zinc-400 font-mono font-semibold">Hotline Khiếu Nại: 0902 301 168</p>
              </div>
            </div>

            <div className="flex gap-2">
              <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-300 font-extrabold text-[11px]">CHI NHÁNH HÀ NỘI SHOW LAB</p>
                <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">12 Chùa Bộc, Đống Đa, Hà Nội</p>
                <p className="text-[10px] text-brand-orange font-mono font-semibold">Hotline: 0909.888.666</p>
              </div>
            </div>
          </div>
        </div>

        {/* Branch 3: Policies details and contact lines */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display font-black text-xs text-white tracking-widest uppercase">CHÍNH SÁCH BÁN HÀNG</h4>
          
          <ul className="space-y-2 text-zinc-500 text-[11px]">
            <li className="hover:text-brand-orange transition-colors cursor-pointer">▶ Chính sách bàn giao PC dán Loop</li>
            <li className="hover:text-brand-orange transition-colors cursor-pointer">▶ Đăng ký vệ sinh tản định kỳ</li>
            <li className="hover:text-brand-orange transition-colors cursor-pointer">▶ Chính sách bảo mật thông tin</li>
            <li className="hover:text-brand-orange transition-colors cursor-pointer">▶ Quy chế đổi trả bàn phím switch</li>
            <li className="hover:text-brand-orange transition-colors cursor-pointer">▶ Quy trình thanh toán trả góp 0%</li>
          </ul>

          <div className="border-t border-zinc-900 pt-3">
            <p className="text-[10px] text-zinc-600 font-mono">LAB EMAIL INQUIRIES</p>
            <a href="mailto:support@mechlab.vn" className="text-[11px] font-bold text-zinc-300 hover:text-brand-orange flex items-center gap-1.5 mt-1">
              <Mail size={12} /> support@mechlab.vn
            </a>
          </div>
        </div>
      </div>

      {/* Copy-right banner */}
      <div className="bg-[#020203] py-4 border-t border-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center gap-1.5 text-[10px] text-zinc-600 font-mono">
          <p>© 2026 MECHLAB LABORATORY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Mã số thuế: 0317589623</span>
            <span>|</span>
            <span className="hover:text-zinc-400 cursor-pointer">Thiết kế bởi MECHLAB Team</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
