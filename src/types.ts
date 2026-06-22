/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'pc-water' | 'pc-workstation' | 'keyboard' | 'gear' | 'component' | 'keycap';
  price: number; // in VND
  originalPrice?: number; // for discount display
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string; // e.g., "HOT", "-15%", "BESTSELLER"
  specs: { [key: string]: string };
  features: string[];
  description: string;
  gallery: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: {
    type: 'pc' | 'keyboard';
    details: string;
    extraPrice: number;
  };
}

export interface CustomPC {
  cpu: string;
  vga: string;
  ram: string;
  case: string;
  tubingStyle: 'Hardtube Dual-Loop' | 'Hardtube Single-Loop' | 'Soft-tube HighFlex' | 'No-Watercooling';
  coolantColor: 'Neon Red' | 'Cosmic Blue' | 'Acid Green' | 'UV Orange' | 'Milky White' | 'Deep Purple';
  fittingColor: 'Matte Black' | 'Chrome Silver' | 'Liquid Gold' | 'Ruby Red';
  sleevedCables: 'Black-Red' | 'Carbon-Gray' | 'Sunset-Orange' | 'Pure-White' | 'Neon-RGB';
  activeFansColor: string; // Hex color or descriptive color
}

export interface CustomKeyboard {
  layout: '60% Ultra-compact' | '75% Compact' | '80% TKL' | '100% Full-size';
  caseMaterial: 'Frosted Acrylic' | 'CNC Aluminum Anodized' | 'Premium Solid Walnut' | 'Polycarbonate';
  switchType: 'Cherry MX Brown (Tactile)' | 'Gateron Oil King (Linear)' | 'Kailh Box White (Clicky)' | 'Alpaca V2 (Silent Linear)';
  keycapTheme: 'Retro Cyberpunk' | 'Carbon Industrial' | 'Lunar Landing' | 'Botanical Garden' | 'MECHLAB Signature (Orange/Gray)';
  lubingService: boolean;
  soundProfile: 'Thocky & Deep' | 'Clacky & Crisp' | 'Smooth & Silent';
}

export interface ServiceRequest {
  fullName: string;
  phone: string;
  email: string;
  serviceType: 'custom-pc' | 'keyboard-mod' | 'pc-cleaning' | 'sleeve-cables' | 'on-site-setup';
  budget: 'low' | 'medium' | 'high' | 'god-mode';
  message: string;
}

export interface SetupCorner {
  id: string;
  title: string;
  author: string;
  image: string;
  specs: string[];
  hotspots: {
    x: number; // percentage from left
    y: number; // percentage from top
    label: string;
    description: string;
    price: string;
  }[];
}
