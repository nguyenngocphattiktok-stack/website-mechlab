/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShieldCheck, Sparkles, Sliders, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../data/mockData';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartSidebarProps) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [custName, setCustName] = useState('');

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + (curr.product.price + (curr.customizations?.extraPrice || 0)) * curr.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !phone) return;
    setCheckingOut(false);
    setCompleted(true);
  };

  const handleCompleteClose = () => {
    setCompleted(false);
    onClearCart();
    onClose();
  };

  // Static mockup QR code and wire instructions
  const mockBankWire = {
    bank: 'Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam (Vietcombank)',
    accountNo: '102374829374',
    accountName: 'CONG TY TNHH MECHLAB VIETNAM',
    branch: 'Chi nhánh Nam Sài Gòn'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-55 bg-black"
          />

          {/* Right Drawer Sliding Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-55 w-full max-w-md bg-[#0c0c0e] border-l border-zinc-900 shadow-2xl flex flex-col justify-between"
          >
            {/* Header portion */}
            <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-widest block">
                  ★ MECHLAB BAG
                </span>
                <span className="bg-brand-orange text-black font-extrabold text-[10px] leading-none py-0.5 px-2 rounded-full font-mono">
                  {cartCount} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Middle portion: Cart Item loop & forms */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="wait">
                {completed ? (
                  /* ORDER COMPLETED VIEW */
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center items-center text-center py-6 px-2 space-y-4 font-sans"
                  >
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-full animate-bounce">
                      <CheckCircle size={36} />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-white">ĐẶT HÀNG THÀNH CÔNG</h3>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                        Cảm ơn <strong className="text-zinc-250">{custName}</strong>, Lab của chúng tôi đã ghi nhận vận đơn ráp máy/linh kiện của bạn.
                      </p>
                    </div>

                    {/* QR Code and bank wire instructions */}
                    <div className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-xl text-left text-[11px] font-mono space-y-3 pt-3 select-none">
                      <p className="text-[10px] text-brand-orange font-bold text-center border-b border-zinc-900 pb-1.5 uppercase">
                        HƯỚNG DẪN CHUYỂN KHOẢN THANH TOÁN (MOCKUP)
                      </p>
                      
                      {/* Interactive mock QR Code */}
                      <div className="flex justify-center my-2">
                        <div className="p-2 border border-zinc-800 bg-white rounded-lg flex flex-col items-center">
                          <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] text-black">
                            {/* QR Schematic design mockup */}
                            <path d="M 5 5 H 35 V 35 H 5 Z" fill="currentColor" />
                            <path d="M 12 12 H 28 V 28 H 12 Z" fill="white" />
                            <path d="M 65 5 H 95 V 35 H 65 Z" fill="currentColor" />
                            <path d="M 72 12 H 88 V 28 H 72 Z" fill="white" />
                            <path d="M 5 65 H 35 V 95 H 5 Z" fill="currentColor" />
                            <path d="M 12 72 H 28 V 88 H 12 Z" fill="white" />
                            
                            {/* Dot matrix */}
                            {[42, 48, 54, 60, 66, 72, 78, 84, 90].map((x) => 
                              [42, 48, 54, 60, 66, 72, 78, 84, 90].map((y) => (
                                (x+y) % 3 === 0 && <rect key={`${x}-${y}`} x={x-2} y={y-2} width="4" height="4" fill="currentColor" />
                              ))
                            )}
                          </svg>
                          <span className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase mt-1 font-mono">VIET_QR PAY</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-zinc-500 text-[10px]">TỔNG SỐ TIỀN CẦN CHUYỂN:</span>
                        <strong className="text-brand-orange text-sm font-black font-mono block">{formatPrice(cartSubtotal)}</strong>
                      </div>
                      
                      <div className="space-y-1 border-t border-zinc-900 pt-1.5 text-zinc-400">
                        <p>🏦 {mockBankWire.bank}</p>
                        <p>💳 STK: <strong className="text-white select-all">{mockBankWire.accountNo}</strong></p>
                        <p>👤 Tên TK: <strong className="text-zinc-200">{mockBankWire.accountName}</strong></p>
                        <p>📍 Nội dung: <strong className="text-brand-orange italic select-all">LAB MECHLAB_PAY  {Math.floor(Math.random() * 899 + 100)}</strong></p>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteClose}
                      className="w-full bg-brand-orange hover:bg-brand-orange-hover text-black py-3 px-4 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      BÀN GIAO THU DỌN GIỎ HÀNG
                    </button>
                  </motion.div>
                ) : checkingOut ? (
                  /* CHECKOUT DIRECT FORM VIEW */
                  <motion.form
                    key="checkout"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-4"
                  >
                    <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl space-y-1.5 select-none">
                      <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">KIỂM KÊ HOÁ ĐƠN</p>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Giá trị hàng hóa:</span>
                        <span className="text-zinc-200 font-mono font-bold">{formatPrice(cartSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Lắp đặt & Vận chuyển:</span>
                        <span className="text-emerald-500 font-semibold uppercase">MIỄN PHÍ</span>
                      </div>
                      <div className="flex justify-between text-sm text-white font-extrabold border-t border-zinc-900/80 pt-2">
                        <span>ĐƠN GIÁ TOÀN BỘ:</span>
                        <span className="text-brand-orange font-mono font-black">{formatPrice(cartSubtotal)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1">TÊN KHÁCH HÀNG *</label>
                        <input
                          type="text"
                          required
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1">SĐT NHẬN HÀNG *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0909xxxxxx"
                          className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest font-bold uppercase mb-1">ĐỊA CHỈ PHÁT VẬN *</label>
                        <textarea
                          rows={3}
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Nhập địa chỉ nhận hàng cụ thể chi nhánh phát..."
                          className="w-full bg-zinc-950 text-zinc-200 rounded-lg p-3 text-xs border border-zinc-900 focus:border-brand-orange focus:outline-none resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setCheckingOut(false)}
                        className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 py-3 rounded-xl text-xs font-bold transition-all border border-zinc-800 cursor-pointer"
                      >
                        QUAY LẠI GIỎ
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] bg-brand-orange hover:bg-brand-orange-hover text-black py-3 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer uppercase"
                      >
                        XÁC NHẬN CHUYỂN KHOẢN
                      </button>
                    </div>
                  </motion.form>
                ) : cart.length === 0 ? (
                  /* EMPTY CART VIEW */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-2 select-none"
                  >
                    <span className="text-zinc-700 text-3xl font-mono">[ ∅ ]</span>
                    <h4 className="text-xs font-extrabold uppercase text-zinc-400">GIỎ HÀNG TRỐNG RỖNG</h4>
                    <p className="text-[11px] text-zinc-600 font-sans max-w-[200px] leading-relaxed">
                      Chưa có cấu hình tản nước hay keycaps nào được đưa vào phòng sấy.
                    </p>
                  </motion.div>
                ) : (
                  /* NORMAL CART ITERATOR LIST */
                  <motion.div key="list" className="space-y-3.5">
                    {cart.map((item) => {
                      const finalItemPrice = item.product.price + (item.customizations?.extraPrice || 0);
                      return (
                        <div
                          key={item.product.id}
                          className="bg-zinc-950/70 border border-zinc-90 w-full p-3.5 rounded-xl flex gap-3 relative select-none"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="h-14 w-18 object-cover rounded-lg bg-zinc-900 shrink-0"
                          />

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="text-zinc-200 text-xs font-bold uppercase truncate leading-tight mb-0.5">
                                {item.product.name}
                              </h4>
                              {item.customizations ? (
                                <p className="text-[10px] text-brand-orange leading-tight font-mono font-semibold max-w-full truncate">
                                  ▸ Custom: {item.customizations.details}
                                </p>
                              ) : (
                                <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest font-bold">
                                  {item.product.category}
                                </p>
                              )}
                            </div>

                            {/* Controls row */}
                            <div className="flex justify-between items-center mt-2 bg-zinc-950 pt-1">
                              <span className="text-[11px] font-extrabold font-mono text-zinc-100">
                                {formatPrice(finalItemPrice)}
                              </span>

                              <div className="flex items-center gap-2.5 bg-zinc-900 rounded border border-zinc-805 px-1 py-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Minus size={11} strokeWidth={2.5} />
                                </button>
                                <span className="text-[11px] font-bold font-mono text-zinc-300 w-4 block text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Plus size={11} strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-300 p-1 rounded transition-colors cursor-pointer"
                            title="Xóa khỏi giỏ"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom summary and checkouts controls */}
            {!completed && cart.length > 0 && (
              <div className="p-4 border-t border-zinc-900 bg-zinc-950">
                <div className="flex justify-between items-end mb-4 select-none">
                  <div className="leading-tight">
                    <span className="block text-[10px] text-zinc-500 font-mono uppercase font-bold tracking-wider">TỔNG TOÀN BỘ GÓC HÀNG</span>
                    <span className="text-xs text-zinc-400">Miễn phí giao hàng & lắp đặt loops</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-brand-orange leading-none">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {!checkingOut && (
                  <button
                    onClick={() => setCheckingOut(true)}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-black font-extrabold tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/15 cursor-pointer"
                  >
                    <Sliders size={14} strokeWidth={2.5} />
                    <span>TIẾN HÀNH BÀN GIAO THANH TOÁN</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
