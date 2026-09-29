import { CastMember, CreativeMember, ShowSession, TicketTier } from '../types';
import pinguPhoto from '../assets/宣傳照/Pingu.png';
import miuPhoto from '../assets/宣傳照/MIU.png';
import bookPhoto from '../assets/宣傳照/BOOK.png';
import allenPhoto from '../assets/宣傳照/Allen.png';
import xiaoBPhoto from '../assets/宣傳照/小B.png';
import caihongPhoto from '../assets/宣傳照/彩虹.png';
import kubiPhoto from '../assets/宣傳照/Kubi.png';
import ramenPhoto from '../assets/宣傳照/拉麵.png';
import codPhoto from '../assets/宣傳照/鱈魚.png';
import xiaoHuiPhoto from '../assets/宣傳照/小慧.png';
import cuggiPhoto from '../assets/宣傳照/Cuggi.png';


/**
 * External Platform URLs & Configuration
 */
export const CONFIG = {
  TROUPE_NAME: 'OK 的即興工作室',
  SHOW_TITLE: '現代版《鐘樓怪人》即興音樂劇',
  SHOW_SUBTITLE: '鐘聲一響，今晚的故事由你決定。',
  TAGLINE: '你給我們一個線索，我們唱出整座鐘樓。',

  // Official Troupe Website (Wix Site)
  OFFICIAL_WEBSITE: 'https://okimprov2022.wixsite.com/okimprov',

  // Strict Social Links (Per user requirements)
  SOCIAL: {
    WEBSITE: 'https://okimprov2022.wixsite.com/okimprov',
    FACEBOOK: 'https://www.facebook.com/okimpro',
    INSTAGRAM: 'https://www.instagram.com/ok_improvgroup/?hl=zh-tw',
  },

  // Ticketing URL from environment or empty fallback
  TICKETING_URL: (import.meta.env.VITE_TICKETING_URL || 'https://comedyclub.kktix.cc/events/okimprovgroup1108').trim(),

  // Google Apps Script Web App URL for receiving survey data
  GOOGLE_SCRIPT_URL: (import.meta.env.VITE_GOOGLE_SCRIPT_URL || '').trim(),

  // Venue & Google Maps Navigation
  VENUE: {
    NAME: 'Comedy Plus+ 喜劇俱樂部',
    ADDRESS: '臺北市中山區下埤里復興北路 480 號',
    MAPS_URL: 'https://maps.google.com/?q=Comedy+Plus+%E5%96%9C%E5%8A%87%E4%BF%B1%E6%A8%82%E9%83%A8+%E8%87%BA%E5%8C%97%E5%B8%82%E4%B8%AD%E5%B1%B1%E5%8D%80%E5%BE%A9%E8%88%88%E5%8C%97%E8%B7%AF480%E8%99%9F',
    TRANSIT: '捷運中山國中站步行約 3-5 分鐘',
  },
};

/**
 * Show Schedule Sessions
 */
export const SHOW_SESSIONS: ShowSession[] = [
  {
    dateDisplay: '2026 / 11 / 07',
    dayOfWeek: '週六',
    timeDisplay: '14:30 (2:30 PM)',
    note: '14:20 開放入場，自由入座',
  },
  {
    dateDisplay: '2026 / 11 / 08',
    dayOfWeek: '週日',
    timeDisplay: '14:30 (2:30 PM)',
    note: '14:20 開放入場，自由入座',
  },
];

/**
 * Creative Team Roster
 */
export const CREATIVE_TEAM: CreativeMember[] = [
  { role: '導演 / 音樂製作', name: 'Kubi', highlight: '現場即興琴鍵與即興敘事架構靈魂', image: kubiPhoto },
  { role: '製作人 / 音控', name: 'Cuggi', highlight: '聲景共鳴與現場精準聲光把關', image: cuggiPhoto },
  { role: '燈光', name: '廣翰', highlight: '哥德式大教堂光影與情感氛圍刻畫' },
  { role: '動作設計', name: '柚子、曼達', highlight: '肢體隱喻與即興空間張力引導' },
  { role: '服裝顧問', name: '曼達', highlight: '現代街頭與古典哥德美學解構' },
];

/**
 * Improvisational Actors / Cast Roster
 */
export const CAST_MEMBERS: CastMember[] = [
  {
    name: 'Pingu',
    role: '卡西莫多 Quasimodo',
    persona: '卡西莫多 Quasimodo',
    archetype: '敲鐘人，情感的容器',
    image: pinguPhoto,
    avatarGradient: 'from-amber-600/30 via-orange-900/40 to-obsidian-950',
    borderGlow: 'hover:border-amber-400/60',
  },
  {
    name: 'Miu',
    role: '愛斯梅拉達 Esmeralda',
    persona: '愛斯梅拉達 Esmeralda',
    archetype: '流浪舞者，自由的象徵',
    image: miuPhoto,
    avatarGradient: 'from-purple-600/30 via-violet-900/40 to-obsidian-950',
    borderGlow: 'hover:border-purple-400/60',
  },
  {
    name: 'BOOK',
    role: '克洛德・弗侯洛 Claude Frollo',
    persona: '克洛德・弗侯洛 Claude Frollo',
    archetype: '副主教，秩序與慾望的掙扎',
    image: bookPhoto,
    avatarGradient: 'from-blue-600/30 via-slate-900/40 to-obsidian-950',
    borderGlow: 'hover:border-blue-400/60',
  },
  {
    name: 'Allen',
    role: '菲比斯 Phoebus',
    persona: '菲比斯 Phoebus',
    archetype: '衛隊隊長，膚淺與表象的代表',
    image: allenPhoto,
    avatarGradient: 'from-yellow-600/30 via-amber-900/40 to-obsidian-950',
    borderGlow: 'hover:border-yellow-400/60',
  },
  {
    name: '小B',
    role: '克洛平 Clopin',
    persona: '克洛平 Clopin',
    archetype: '吉普賽之王，反叛集體的領袖',
    image: xiaoBPhoto,
    avatarGradient: 'from-rose-600/30 via-pink-900/40 to-obsidian-950',
    borderGlow: 'hover:border-rose-400/60',
  },
  {
    name: '彩虹',
    role: '百合 Fleur-de-Lys',
    persona: '百合 Fleur-de-Lys',
    archetype: '菲比斯的未婚妻，社會體制的守門人',
    image: caihongPhoto,
    avatarGradient: 'from-teal-600/30 via-emerald-900/40 to-obsidian-950',
    borderGlow: 'hover:border-teal-400/60',
  },
  {
    name: 'Kubi',
    role: '葛林果 Gringoire',
    persona: '葛林果 Gringoire',
    archetype: '詩人／旁白，連接觀眾與劇情的橋樑',
    image: kubiPhoto,
    avatarGradient: 'from-indigo-600/30 via-purple-900/40 to-obsidian-950',
    borderGlow: 'hover:border-indigo-400/60',
  },
  {
    name: '鱈魚',
    role: '石像 Gargoyle',
    persona: '石像 Gargoyle',
    archetype: '卡西莫多內心聲音的化身 : 憤怒',
    image: codPhoto,
    avatarGradient: 'from-indigo-600/30 via-purple-900/40 to-obsidian-950',
    borderGlow: 'hover:border-indigo-400/60',
  },
  {
    name: '拉麵',
    role: '石像 Gargoyle',
    persona: '石像 Gargoyle',
    archetype: '卡西莫多內心聲音的化身 : 畏懼',
    image: ramenPhoto,
    avatarGradient: 'from-orange-600/30 via-amber-950 to-obsidian-950',
    borderGlow: 'hover:border-orange-400/60',
  },
  {
    name: '小慧',
    role: '石像 Gargoyle',
    persona: '石像 Gargoyle',
    archetype: '卡西莫多內心聲音的化身 : 鼓勵',
    image: xiaoHuiPhoto,
    avatarGradient: 'from-fuchsia-600/30 via-purple-900/40 to-obsidian-950',
    borderGlow: 'hover:border-fuchsia-400/60',
  },
];

/**
 * Ticket Category Cards (Updated with exact designer prices)
 */
export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'super-early-bird',
    name: '超早鳥票',
    price: 500,
    originalPrice: 650,
    unit: '單人',
    period: '即日起 ～ 9/30 23:59',
    badge: '限時首推 · 現省 $150',
    badgeType: 'hot',
    description: '首波限定早鳥超殺優惠！搶先入駐鐘樓最佳視角，感受即興無可複製的開場震顫。',
    isPopular: true,
  },
  {
    id: 'early-bird',
    name: '十月早鳥票',
    price: 600,
    originalPrice: 650,
    unit: '單人',
    period: '10/1 ～ 10/31 23:59',
    badge: '十月預售 92 折',
    badgeType: 'primary',
    description: '十月限定早鳥席位，在鐘聲正式敲響前為自己留下一席難忘的劇場夜。',
  },
  {
    id: 'duo-pack',
    name: '雙人套票',
    price: 1100,
    originalPrice: 1300,
    unit: '雙人同行 (每人 $550)',
    badge: '現省 $200 · 雙人共鳴',
    badgeType: 'value',
    description: '尋找你心中願意一同聆聽鐘聲的卡西莫多或愛斯梅拉達，兩人同行現省 200 元。',
  },
  {
    id: 'quad-pack',
    name: '四人套票',
    price: 2100,
    originalPrice: 2600,
    unit: '四人同行 (每人 $525)',
    badge: '現省 $500 · 揪團推薦',
    badgeType: 'value',
    description: '四人結伴同行最划算！平均每人僅 $525，在笑聲與感動中度過絕無僅有的午後。',
  },
  {
    id: 'group-10',
    name: '10人以上團體票',
    price: 500,
    originalPrice: 650,
    unit: '每人 (10人起成團)',
    badge: '最優低價 · 每人 $500',
    badgeType: 'hot',
    description: '劇團、社團、親朋好友大包場專屬優惠！10 人以上享有每人 $500 優惠（請洽粉專或 IG 洽詢）。',
  },
  {
    id: 'regular',
    name: '現場原價票',
    price: 650,
    unit: '單人',
    period: '11/7、11/8 演出現場',
    badge: '標準票券',
    badgeType: 'primary',
    description: '即興就是當下的決定。推開門，隨時加入這場未知的鐘樓之夜。',
  },
];
