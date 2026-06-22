/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, SetupCorner } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'pc-01',
    name: 'MECHLAB TITAN - DUAL LOOP CUSTOM PC',
    category: 'pc-water',
    price: 139900000,
    originalPrice: 148900000,
    rating: 5,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    badge: 'LUXURY',
    description: 'Siêu phẩm Custom PC với hệ thống tản nhiệt nước Dual Loop độc lập cho CPU và GPU. Sử dụng các linh kiện đầu bảng và ống nước kim loại chrome bền bỉ.',
    specs: {
      'CPU': 'Intel Core i9-14900KS (Up to 6.2GHz)',
      'Mainboard': 'ROG MAXIMUS Z790 HERO BTF',
      'VGA': 'NVIDIA ROG Strix RTX 4090 OC 24GB',
      'RAM': '64GB G.Skill Trident Z5 RGB 7200MHz DDR5',
      'SSD': '2TB Samsung 990 Pro PCIe Gen5',
      'PSU': 'ROG Thor 1200W Platinum II OLED',
      'Cooler': 'MECHLAB Custom Dual-Loop Hardtube Chrome & Carbon',
      'Chassis': 'Lian Li O11 Vision Chrome'
    },
    features: [
      'Hai vòng tản nhiệt độc lập, sử dụng 2 bơm D5 thế hệ mới',
      'Ống đồng mạ chrome sáng bóng kết hợp fitting Brass sang trọng',
      'Sơn vỏ case custom và dán decal thương hiệu MECHLAB giới hạn',
      'Hiệu năng tối đa, luôn duy trì nhiệt độ dưới 55°C khi full load'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'pc-02',
    name: 'MECHLAB NEON PUNK - LIQUID SYSTEM',
    category: 'pc-water',
    price: 68500000,
    originalPrice: 75000000,
    rating: 4.9,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1598986644483-d052fb093315?auto=format&fit=crop&q=80&w=800',
    badge: 'BEST BUY',
    description: 'Dòng máy gaming hi-end trang bị tản nhiệt nước Hard-Loop neon sắc sảo. Tối ưu hóa tính thẩm mỹ và tản mát cho cấu hình RTX 4080 Super.',
    specs: {
      'CPU': 'AMD Ryzen 7 7800X3D (Vua Gaming)',
      'Mainboard': 'MSI MPG X670E Carbon WiFi',
      'VGA': 'ASUS TUF Gaming RTX 4080 Super 16GB',
      'RAM': '32GB Corsair Dominator Titanium DDR5',
      'SSD': '2TB Kingston KC3000 PCIe 4.0 M.2',
      'PSU': 'MSI MEG Ai1000P PCIe 5.0 (Platinum)',
      'Cooler': 'MECHLAB Distro Plate Hardtube Acrylic UV Orange',
      'Chassis': 'Phanteks NV5 Black'
    },
    features: [
      'Nước tản nhiệt đậm đặc UV Orange phản quang rực rỡ',
      'Tấm phân phối nước (Distro Plate) custom riêng theo case',
      'Quạt tản nhiệt đảo chiều vô cực Lian Li UNI Fan TL LCD',
      'Dây cáp bọc sleeves uốn nếp hoàn mỹ đúng chuẩn MECHLAB'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1598986644483-d052fb093315?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'pc-03',
    name: 'DEEP WORKSTATION XEON LAB V4',
    category: 'pc-workstation',
    price: 112000000,
    originalPrice: 112000000,
    rating: 4.8,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=800',
    badge: 'PRO WORK',
    description: 'Trạm làm việc chuyên nghiệp tối ưu cho render 3D, ảo hóa, AI training và xử lý dữ liệu nặng. Độ ổn định bền bỉ 24/7.',
    specs: {
      'CPU': 'Dual Intel Xeon Silver 4410Y (Tổng 24 nhân 48 luồng)',
      'Mainboard': 'ASUS Pro WS W790-ACE',
      'VGA': 'NVIDIA RTX 4500 Ada Generation 24GB GDDR6',
      'RAM': '128GB ECC Registered DDR5 4800MHz',
      'SSD': 'Enterprise 3.2TB NVMe SSD + 8TB Enterprise HDD',
      'PSU': 'Super Flower Leadex Platinum 1600W',
      'Cooler': 'Dual Noctua U14S DX-4677 Premium Air Coolers',
      'Chassis': 'Fractal Design North Charcoal Wood'
    },
    features: [
      'Hỗ trợ RAM sửa lỗi ECC triệt tiêu hoàn toàn màn hình xanh crash ứng dụng',
      'Thiết kế tối giản sang trọng với mặt lưới bằng gỗ óc chó thật cao cấp',
      'Card đồ họa chuyên dụng chuyên hỗ trợ tập lệnh AI và CAD chính xác',
      'Hệ thống lưu trữ bảo mật RAID 1 chống mất mát dữ liệu'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'kb-01',
    name: 'MECHLAB GALAXY 75 - CNC KEYBOARD',
    category: 'keyboard',
    price: 5490000,
    originalPrice: 6200000,
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
    badge: 'PRO SERIES',
    description: 'Bàn phím cơ thiết kế nguyên khối CNC nhôm cao cấp. Sở hữu âm thanh gõ trầm ấm và hành trình phím mượt mà không tỳ vết nhờ chế độ Lubing tiêu chuẩn tại Lab.',
    specs: {
      'Layout': '75% Compact (82 Keys) - Có núm xoay đa phương tiện',
      'Case': 'Nhôm CNC 6063 Anodized xám không gian nặng 1.8kg',
      'Switches': 'Gateron Oil King (Linear, Lube Krytox 205g0)',
      'Keycaps': 'PBT Double-Shot profile Cherry, MECHLAB exclusive',
      'Plate': 'FR4 Flex-cut với hệ Gasket Mount triệt tiếng vang',
      'Connection': '3-Mode (USB-C, Bluetooth 5.1, Wireless 2.4Ghz)'
    },
    features: [
      'Sơ chế bôi trơn Krytox 205g0 trên switch và Krytox XHT-BDZ trên stabilizer',
      'Silicon và Foam tiêu chấn xếp 4 lớp loại bỏ hoàn toàn âm vang kim loại rỗng',
      'Pin dung lượng khủng 4000mAh lên tới 150 giờ sử dụng',
      'Keycap phối màu MECHLAB đặc trưng (Cam nồng nhiệt phối xám carbon)'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'kb-02',
    name: 'MECHLAB RETRO CYBER 60',
    category: 'keyboard',
    price: 3650000,
    originalPrice: 3950000,
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    badge: 'PUNK',
    description: 'Phiên bản bàn phím cơ 60% siêu gọn nhẹ. Thiết kế vỏ acrylic mờ hắt sáng RGB huyền ảo phong cách Cyberpunk thập niên 80.',
    specs: {
      'Layout': '60% Ultra-compact (61 Keys)',
      'Case': 'Frosted Acrylic mờ nguyên khối tích hợp dải led gầm',
      'Switches': 'Kailh Box Jade (Clicky giòn giã có đệm thanh)',
      'Keycaps': 'Clear-Polycarbonate trong suốt, chống bám mồ hôi tay',
      'Plate': 'Polycarbonate Flexy cho độ đàn hồi cực cao',
      'Connection': 'Cổng USB-C rời tiện dụng mạ vàng'
    },
    features: [
      'Gõ phím với tiếng clicky sướng tai như máy đánh chữ cổ điển',
      'Led xuyên thấu từng nút phím tạo hiệu ứng thị giác rực rỡ buổi đêm',
      'Hỗ trợ Hot-swap thay thế nóng switch loại 3-pin và 5-pin dễ dàng',
      'Kèm theo dây xoắn cáp đồng bọc dù uốn tinh xảo'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'kc-01',
    name: 'KEYCAP MECHLAB OVERDRIVE SET',
    category: 'keycap',
    price: 1850000,
    originalPrice: 2200000,
    rating: 5,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&q=80&w=800',
    badge: 'LIMITED',
    description: 'Bộ keycaps phối màu lấy cảm hứng từ động cơ và máy móc bọc giáp thép. Sử dụng nhựa PBT dày 1.5mm cực cao cấp cho âm gõ trầm thocky cực kỳ khác biệt.',
    specs: {
      'Chất liệu': 'PBT Double-Shot cao cấp không phai ký tự',
      'Profile': 'Cherry (Độ cao tối ưu công thái học phản hồi tốt)',
      'Số lượng nút phím': '142 phím (Hỗ trợ hầu hết mọi layout phím cơ trên thị trường)',
      'Độ dày nút': '1.5 - 1.6mm đúc đặc dầy dặn'
    },
    features: [
      'Bề mặt ráp mịn chống bám vân tay mồ hôi kể cả sau năm dài sử dụng',
      'Có kèm súng nhổ nút phím Keycap Puller bằng thép không gỉ tiện lợi',
      'Kèm nút artisan MECHLAB đúc nổi 3D đặc biệt đại diện cho Lab của chúng tôi'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'gr-01',
    name: 'KHAY ĐỠ BÀN PHÍM COILED SLEEVED CABLE',
    category: 'gear',
    price: 490000,
    rating: 4.7,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800',
    badge: 'DECOR',
    description: 'Dây cáp bàn phím cơ dạng xoắn bọc lưới hai lớp cao cấp kết hợp đầu nối phi công Aviator GX16 kim loại mạ điện đen xám.',
    specs: {
      'Chất liệu': 'Paracord bọc lưới Techflex đàn hồi',
      'Đầu nối': 'Aviator GX16 4-pin mạ mờ tinh sảo',
      'Chiều dài phần xoắn': '20cm uốn trục đường kính 20mm cực chuẩn',
      'Tổng chiều dài dây': '1.8 mét'
    },
    features: [
      'Sử dụng sợi dây dẫn lõi đồng dầy truyền tải tín hiệu cực tốt không trễ',
      'Khớp nối aviator dễ tháo rời đem đi cơ động',
      'Tone màu Sunset kết hợp ánh cam đỏ và đen phong cách phi lộ'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const mockSetups: SetupCorner[] = [
  {
    id: 'corner-01',
    title: 'THE INDUSTRIAL MECHLAB CAVERN',
    author: 'Trần Minh Hoàng',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200',
    specs: [
      'Bàn gỗ sồi uốn mộc 160x80cm',
      'PC Custom Dual Loop Titan O11',
      'Màn hình LG 38GN950 UltraWide',
      'Loa kiểm âm Audioengine A2+',
      'Bàn phím custom Galaxy 75 Edition'
    ],
    hotspots: [
      {
        x: 25,
        y: 40,
        label: 'Siêu phẩm PC Titan',
        description: 'Vòng nước mạ kim loại sắc sảo ráp bởi MECHLAB với chip i9-14900KS và RTX 4095.',
        price: '139.900.000 đ'
      },
      {
        x: 55,
        y: 72,
        label: 'Galaxy 75 CNC Slate',
        description: 'Bàn phím cơ CNC mạ bạc nhám dầy thocky cực kỳ mượt sột soạt nhẹ từ switch lube tay.',
        price: '5.490.000 đ'
      },
      {
        x: 48,
        y: 85,
        label: 'Deskmat Da Bò Thuộc',
        description: 'Đệm trải bàn bọc da tự nhiên khâu chỉ nổi thương hiệu MECHLAB mác dập chìm.',
        price: '790.000 đ'
      }
    ]
  },
  {
    id: 'corner-02',
    title: 'RETRO CHROME NEON STATION',
    author: 'Nguyễn Khánh Linh',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200',
    specs: [
      'Bàn phím Retro Cyber 60 Acrylic',
      'PC Neon Punk UV Orange Loop',
      'Màn hình kép xoay dọc Asus ProArt',
      'Đèn thanh Lightbar Screenbar BenQ',
      'Tấm pegboard kim loại treo gear'
    ],
    hotspots: [
      {
        x: 30,
        y: 35,
        label: 'PC Neon Punk UV',
        description: 'Hệ thống custom lỏng cam dạ quang cực nổi hắt LED gầm dịu nhẹ.',
        price: '68.500.000 đ'
      },
      {
        x: 65,
        y: 76,
        label: 'Retro Cyber 60 Keyboard',
        description: 'Phát quang xuyên suốt mặt đáy cho bầu không khí hưng phấn tuyệt diệu.',
        price: '3.650.005 đ'
      }
    ]
  }
];

export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + ' đ';
};
