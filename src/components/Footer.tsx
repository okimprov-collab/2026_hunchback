import React from 'react';
import { ArrowUp, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { CONFIG } from '../config/constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-obsidian-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Troupe Branding */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <a
                href={CONFIG.OFFICIAL_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-sans font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 group"
                title="前往 OK 的即興工作室 官方網站"
              >
                <span>{CONFIG.TROUPE_NAME}</span>
                <ExternalLink className="w-4 h-4 text-amber-400/80 group-hover:text-amber-300 transition-colors" />
              </a>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-sans">
              「OK 的即興工作室」致力於推動台灣即興劇與即興音樂劇的藝術邊界。無預設劇本、無固定台詞，擁抱當下的錯誤與靈光，在每一次的現場共振中，打造僅此一次的劇場奇蹟。
            </p>
            <div className="text-xs text-amber-400/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>《現代版鐘樓怪人》即興音樂劇 · Comedy Plus+ 喜劇俱樂部</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-cinzel">
              探索演出
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about-section" className="hover:text-amber-400 transition-colors">
                  創作概念
                </a>
              </li>
              <li>
                <a href="#tickets-section" className="hover:text-amber-400 transition-colors">
                  場次與票價
                </a>
              </li>
              <li>
                <a href="#cast-section" className="hover:text-amber-400 transition-colors">
                  演員與劇組陣容
                </a>
              </li>
              <li>
                <a href="#survey-section" className="hover:text-amber-400 transition-colors">
                  觀眾回饋與開賣登記
                </a>
              </li>
            </ul>
          </div>

          {/* Strict Official Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-cinzel">
              追蹤官方社群
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              即時追蹤排練花絮、即興小品與最新加場通知：
            </p>
            <div className="flex flex-col gap-2.5">
              {/* Official Facebook Link */}
              <a
                href={CONFIG.SOCIAL.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card border-slate-700/80 hover:border-amber-400 text-slate-200 hover:text-amber-300 transition-all text-sm group"
              >
                {/* Custom Facebook SVG Icon */}
                <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-medium">Facebook 官方粉絲專頁</span>
              </a>

              {/* Official Instagram Link */}
              <a
                href={CONFIG.SOCIAL.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card border-slate-700/80 hover:border-amber-400 text-slate-200 hover:text-amber-300 transition-all text-sm group"
              >
                {/* Custom Instagram SVG Icon */}
                <svg className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="font-medium">Instagram 官方粉絲專頁</span>
              </a>

              {/* Official Troupe Website Link */}
              <a
                href={CONFIG.OFFICIAL_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card border-slate-700/80 hover:border-amber-400 text-slate-200 hover:text-amber-300 transition-all text-sm group"
              >
                <Globe className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">OK的即興工作室 官方網站</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 </span><a href={CONFIG.OFFICIAL_WEBSITE} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">{CONFIG.TROUPE_NAME}</a><span>. All rights reserved.</span>
            <span className="hidden sm:inline">｜</span>
            <span className="hidden sm:inline">現代版《鐘樓怪人》即興音樂劇</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-slate-400 hover:text-amber-300 hover:border-amber-400/40 transition-colors cursor-pointer"
          >
            <span>回到頂端</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
