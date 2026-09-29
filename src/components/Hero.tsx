import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, MessageSquareHeart, Sparkles, AlertCircle, X, Bell, Maximize2 } from 'lucide-react';
import { CONFIG } from '../config/constants';
import posterImage from '../assets/poster.jpg';

interface HeroProps {
  onOpenSurvey: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSurvey }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [showTicketingModal, setShowTicketingModal] = useState(false);
  const [showPosterLightbox, setShowPosterLightbox] = useState(false);

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (CONFIG.TICKETING_URL && CONFIG.TICKETING_URL.length > 0) {
      window.open(CONFIG.TICKETING_URL, '_blank', 'noopener,noreferrer');
    } else {
      setShowTicketingModal(true);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-gradient-to-br from-amber-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Theatrical Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Troupe & Genre Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-glow-gold animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{CONFIG.TROUPE_NAME} · 2026 年度旗艦即興音樂劇</span>
          </div>

          {/* Slogan */}
          <p className="text-amber-400 font-serif text-lg sm:text-2xl tracking-widest font-semibold drop-shadow-md">
            {CONFIG.TAGLINE}
          </p>

          {/* Main Title */}
          <h1 className="font-cinzel text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 leading-tight">
            現代版<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent text-glow">
              《鐘樓怪人》
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-slate-300 mt-2">
              即興音樂劇
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-xl font-serif italic border-l-0 lg:border-l-2 border-amber-500/50 lg:pl-4 py-1 max-w-2xl">
            {CONFIG.SHOW_SUBTITLE}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 w-full justify-center lg:justify-start">
            {/* Date Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card border-slate-700/80 hover:border-amber-500/40 transition-colors text-left">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">演出日期時間</div>
                <div className="text-sm font-semibold text-slate-200">
                  2026 / 11 / 07 (六) - 11 / 08 (日) 14:30
                </div>
                <div className="text-[11px] text-amber-300/80">開演前 10 分鐘入場</div>
              </div>
            </div>

            {/* Venue Badge */}
            <a
              href={CONFIG.VENUE.MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card border-slate-700/80 hover:border-amber-500/40 hover:bg-slate-800/60 transition-all text-left group"
              title="點擊開啟 Google 地圖導航"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-amber-400 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  演出場地 (點擊導航)
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                  {CONFIG.VENUE.NAME}
                </div>
                <div className="text-[11px] text-slate-400">{CONFIG.VENUE.ADDRESS}</div>
              </div>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center lg:justify-start">
            {/* Ticketing CTA */}
            <button
              type="button"
              onClick={handleTicketClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-obsidian-950 font-bold text-base tracking-wide shadow-glow-gold hover:shadow-glow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Ticket className="w-5 h-5" />
              <span>立即前往購票 (超早鳥 500 起)</span>
            </button>

            {/* Survey CTA */}
            <button
              type="button"
              onClick={onOpenSurvey}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl glass-card border-amber-500/30 text-amber-300 font-medium text-base hover:bg-amber-500/10 hover:border-amber-400 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-5 h-5 text-amber-400" />
              <span>現場觀後感填寫</span>
            </button>
          </div>
        </div>

        {/* Right Column: Designer's Widescreen Poster with Cathedral Arch & Lightbox */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div className="relative group max-w-2xl w-full">
            {/* Ambient Background Halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/30 via-purple-600/30 to-amber-400/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* Poster Frame Container */}
            <div className="relative rounded-2xl overflow-hidden glass-card border-2 border-amber-500/40 shadow-2xl p-2.5 bg-obsidian-900/95">
              {/* Cathedral Arch Header Notch */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-amber-500/20 text-xs text-amber-300/80 font-serif mb-2">
                <span className="flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  官方正式主視覺海報 · Official Visual
                </span>
                <button
                  type="button"
                  onClick={() => setShowPosterLightbox(true)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-200 transition-colors cursor-pointer"
                  title="放大檢視"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">放大檢視</span>
                </button>
              </div>

              {/* 16:9 Widescreen Landscape Poster Image with Fallback */}
              <div
                onClick={() => setShowPosterLightbox(true)}
                className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 via-obsidian-950 to-purple-950/80 flex items-center justify-center cursor-pointer group/img"
              >
                {imageLoaded ? (
                  <img
                    src={posterImage}
                    alt="現代版鐘樓怪人 即興音樂劇 官方主視覺海報"
                    className="w-full h-full object-cover object-center transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    onError={() => setImageLoaded(false)}
                    loading="eager"
                  />
                ) : (
                  // Graceful Fallback if image fails or is missing
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-glow-gold animate-bounce">
                      <Bell className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-amber-300">現代版《鐘樓怪人》</h3>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                      「如果卡西莫多的『怪』，不是外貌缺陷，而是他不被理解的活法？」
                    </p>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-amber-300 text-sm font-serif">
                  <Maximize2 className="w-5 h-5 text-amber-400" />
                  <span>點擊放大檢視海報</span>
                </div>

                {/* Bottom Bar Info */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1 rounded-lg bg-obsidian-950/80 backdrop-blur-md border border-amber-500/20 text-[11px] text-amber-200 pointer-events-none">
                  <span>OK 的即興工作室 ｜ 旗艦製作</span>
                  <span className="text-amber-400 font-semibold">Comedy Plus+ (11/07-08)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Poster Lightbox Modal */}
      {showPosterLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/90 backdrop-blur-lg animate-fade-in"
          onClick={() => setShowPosterLightbox(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center rounded-2xl glass-card border border-amber-500/40 p-3 bg-obsidian-900/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-slate-800 text-sm text-slate-300">
              <span className="font-serif font-semibold text-amber-300 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                現代版《鐘樓怪人》即興音樂劇 · 官方主視覺海報
              </span>
              <button
                type="button"
                onClick={() => setShowPosterLightbox(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full overflow-auto p-2 flex justify-center">
              <img
                src={posterImage}
                alt="現代版鐘樓怪人 即興音樂劇 官方主視覺海報高清預覽"
                className="max-h-[78vh] w-auto object-contain rounded-lg shadow-glow-gold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Graceful Ticketing Modal (when ticketing URL is pending) */}
      {showTicketingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-md w-full rounded-2xl glass-card border-amber-500/40 p-6 shadow-2xl bg-obsidian-900/95 text-center space-y-5">
            <button
              type="button"
              onClick={() => setShowTicketingModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-glow-gold">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-amber-300 mb-2">
                即將正式開賣！
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                《現代版鐘樓怪人》票券即將於售票平台上架。請於下方預先登記「觀眾回饋與開賣通知」，我們將在開賣第一時間發送專屬早鳥提醒給您！
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowTicketingModal(false);
                  onOpenSurvey();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm transition-colors cursor-pointer"
              >
                前往預先登記
              </button>
              <button
                type="button"
                onClick={() => setShowTicketingModal(false)}
                className="py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm transition-colors cursor-pointer"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
