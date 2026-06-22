/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Clock, HelpCircle, CheckCircle, Sliders, Shield, Award, Sparkles } from 'lucide-react';
import { ServiceRequest } from '../types';

export default function ServiceInquiry() {
  const [form, setForm] = useState<ServiceRequest>({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'custom-pc',
    budget: 'medium',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const servicesMap = {
    'custom-pc': 'TƯ VẤN & BUILD PC LIQUID LOOP TRỌN GÓI',
    'keyboard-mod': 'DỊCH VỤ MODDING & LUBE BÀN PHÍM CƠ',
    'pc-cleaning': 'BẢO TRÌ & THAY NƯỚC TẢN HI-END ĐỊNH KỲ',
    'sleeve-cables': 'BỌC DÂY CÁP SLEEVE THEO PHÒNG THEME',
    'on-site-setup': 'DỰNG GÓC SETUP & ÁNH SÁNG PHÒNG GAME CHUYÊN NGHIỆP'
  };

  const budgetMap = {
    'low': 'Dưới 20 triệu VNĐ',
    'medium': 'Từ 20 đến 50 triệu VNĐ',
    'high': 'Từ 50 đến 100 triệu VNĐ',
    'god-mode': 'Trên 100 triệu VNĐ (God Mode)'
  };

  return (
    <div id="contact-form-section" className="max-w-7xl mx-auto px-4 lg:px-6 py-12 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Direct Address details, features & guarantees */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-widest block mb-2">
              ★ PROFESSIONAL MODDING LAB
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">
              ĐĂNG KÝ <span className="text-brand-orange">DỊCH VỤ LAB</span>
            </h2>
            <p className="text-zinc-400 text-sm font-sans mt-3 leading-relaxed">
              Bạn muốn sở hữu một cấu hình tản nước cực phẩm? Hay chiếc bàn phím cơ gõ "thocky" êm tai nhất? Điền thông tin yêu cầu của bạn, các kỹ sư MECHLAB sẽ liên hệ phác thảo bản vẽ kỹ thuật 3D và báo giá chi tiết trong vòng 30 phút.
            </p>
          </div>

          {/* Guarantees listings mimicking mechlab.vn professional services */}
          <div className="space-y-4 select-none">
            <div className="flex gap-3">
              <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">CHẾ ĐỘ BẢO HÀNH RÒ RỈ TRỌN ĐỜI</h4>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5 leading-relaxed">
                  MECHLAB bảo hành trọn đời sự cố tràn, rò rỉ dung dịch, bong tróc nứt ống sần cho toàn bộ liquid loops do chúng tôi thi công lắp đặt.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">HỖ TRỢ LINH ĐỘNG ONSITE TRÊN TOÀN QUỐC</h4>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5 leading-relaxed">
                  Với trạm kỹ thuật phủ sóng tại 3 miền Bắc trung Nam, kỹ sư sẵn sàng có mặt tại nhà hỗ trợ khắc phục bảo trì trong vòng 2-4 giờ làm việc.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">100% PHỤ KIỆN CHÍNH HÃNG NHẬP KHẨU</h4>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5 leading-relaxed">
                  Cam kết chỉ sử dụng block nước nước khoáng mát EK Water Blocks, Alphacool, Barrow, Bitspower, mỡ bôi trơn Krytox 205g0 chính hãng châu Âu.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl inline-flex items-center gap-3 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-zinc-400 font-sans leading-none">
              Kỹ sư tư vấn đang trực tuyến: <strong className="text-brand-orange font-mono">03 Kỹ sư</strong>
            </p>
          </div>
        </div>

        {/* Right Column: Custom Submission Form with success views */}
        <div className="lg:col-span-7 bg-[#121214] border border-zinc-900 rounded-2xl p-6 md:p-8 flex items-stretch">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-between space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                      HỌ VÀ TÊN KHÁCH HÀNG <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                      SỐ ĐIỆN THOẠI LIÊN HẠ <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0909xxxxxx"
                      className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                    ĐỊA CHỈ EMAIL LIÊN HỆ
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nguyenvana@gmail.com"
                    className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                      DỊCH VỤ CẦN TƯ VẤN
                    </label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value as any })}
                      className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                    >
                      {Object.entries(servicesMap).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                      MỨC KINH PHÍ DỰ KIẾN (BUDGET)
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value as any })}
                      className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                    >
                      {Object.entries(budgetMap).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1.5">
                    Ý TƯỞNG / MÔ TẢ CỤ THỂ YÊU CẦU CỦA BẠN
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hãy mô tả chi tiết: Thích phối màu gì, thùng case uốn ống kim loại hay ống đồng, dòng phím cơ nào bạn thích nhất..."
                    className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none font-sans leading-relaxed resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-black font-extrabold tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-brand-orange/10 cursor-pointer"
                  >
                    <Sliders size={14} strokeWidth={2.5} />
                    <span>{loading ? 'ĐANG ĐĂNG KÝ THÔNG TIN PHÒNG LAB...' : 'GỬI YÊU CẦU THIẾT KẾ CHO LAB'}</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col justify-center items-center text-center p-6 space-y-4"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-full text-emerald-500 animate-bounce">
                  <CheckCircle size={44} strokeWidth={2} />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-center items-center gap-1.5 text-xs text-brand-orange font-mono font-bold tracking-widest uppercase">
                    <Sparkles size={14} /> LAB APPOINTMENT SECURED
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">YÊU CẦU ĐÃ ĐẠT TIÊU CHUẨN ĐĂNG KÝ!</h3>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto font-sans leading-relaxed">
                    Chào <strong className="text-zinc-150">{form.fullName}</strong>, kỹ sư trưởng phòng tản custom sẽ lập tức chuẩn bị sơ đồ cấu trúc mộc và điện thoại tư vấn ngay đến SĐT <strong className="text-zinc-150 font-mono">{form.phone}</strong>.
                  </p>
                </div>

                {/* Simulated ticket card details */}
                <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 p-4 rounded-xl text-left text-[11px] font-mono space-y-2 mt-4 select-none">
                  <div className="flex justify-between items-center text-zinc-500 uppercase tracking-widest pb-1 border-b border-zinc-900">
                    <span>LAB RECEIPT</span>
                    <span className="text-brand-orange">ID: #{Math.floor(Math.random() * 89999 + 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">KHÁCH HÀNG:</span>
                    <span className="text-zinc-300 font-bold">{form.fullName.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DỊCH VỤ:</span>
                    <span className="text-brand-orange font-bold font-sans">{servicesMap[form.serviceType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DỰ TOÁN CHI PHÍ:</span>
                    <span className="text-zinc-300 font-bold">{budgetMap[form.budget]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TRẠM BÀN GIAO:</span>
                    <span className="text-zinc-300 font-bold">MECHLAB - HCM</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ fullName: '', phone: '', email: '', serviceType: 'custom-pc', budget: 'medium', message: '' });
                  }}
                  className="text-xs font-mono text-zinc-500 hover:text-brand-orange transition-colors cursor-pointer"
                >
                  [ ĐĂNG KÝ MỘT DỰ ÁN KHÁC ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
