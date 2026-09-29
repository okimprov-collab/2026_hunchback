import React, { useState, useEffect, useCallback } from 'react';
import { Users, Sparkles, Wand2, Clapperboard, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CAST_MEMBERS, CREATIVE_TEAM } from '../config/constants';
import { CastMember } from '../types';

export const TeamCast: React.FC = () => {
  const [activeCast, setActiveCast] = useState<CastMember | null>(null);
  const [previewCast, setPreviewCast] = useState<CastMember | null>(null);

  // Keyboard navigation for image lightbox preview
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!previewCast) return;
      if (e.key === 'Escape') {
        setPreviewCast(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = CAST_MEMBERS.findIndex((c) => c.name === previewCast.name);
        const prevIndex = (currentIndex - 1 + CAST_MEMBERS.length) % CAST_MEMBERS.length;
        setPreviewCast(CAST_MEMBERS[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = CAST_MEMBERS.findIndex((c) => c.name === previewCast.name);
        const nextIndex = (currentIndex + 1) % CAST_MEMBERS.length;
        setPreviewCast(CAST_MEMBERS[nextIndex]);
      }
    },
    [previewCast]
  );

  useEffect(() => {
    if (previewCast) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [previewCast, handleKeyDown]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewCast) return;
    const currentIndex = CAST_MEMBERS.findIndex((c) => c.name === previewCast.name);
    const prevIndex = (currentIndex - 1 + CAST_MEMBERS.length) % CAST_MEMBERS.length;
    setPreviewCast(CAST_MEMBERS[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewCast) return;
    const currentIndex = CAST_MEMBERS.findIndex((c) => c.name === previewCast.name);
    const nextIndex = (currentIndex + 1) % CAST_MEMBERS.length;
    setPreviewCast(CAST_MEMBERS[nextIndex]);
  };

  return (
    <section id="cast-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-serif text-amber-300 border-amber-500/30">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>陣容亮點 · CAST & CREATIVE TEAM</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-slate-100">
            舞台上的
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              敲鐘人與靈魂
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-serif">
            即興音樂劇是群體的無畏冒險。每位演員既是編劇、也是歌手，更是彼此在未知舞台上的救生索。
          </p>
        </div>

        {/* Improvisational Cast Grid (10 Actors) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-200">
                即興演員陣容 (Cast)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">10 位現場即興演員</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {CAST_MEMBERS.map((actor, idx) => (
              <div
                key={idx}
                onClick={() => setActiveCast(actor === activeCast ? null : actor)}
                className={`group relative rounded-2xl p-5 glass-card border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  actor.borderGlow
                } ${
                  activeCast?.name === actor.name
                    ? 'border-amber-400 shadow-glow-gold bg-slate-900/95 -translate-y-2'
                    : 'border-slate-800/80 hover:-translate-y-1.5'
                }`}
              >
                {/* Character Silhouette / Theatrical Avatar Photo Container */}
                <div
                  onClick={(e) => {
                    if (actor.image) {
                      e.stopPropagation();
                      setPreviewCast(actor);
                    }
                  }}
                  title={actor.image ? '點擊放大預覽照片' : undefined}
                  className={`w-full aspect-square rounded-xl bg-gradient-to-br ${actor.avatarGradient} border border-white/10 relative overflow-hidden group/img transition-transform duration-500 ${
                    actor.image ? 'hover:scale-[1.02] cursor-zoom-in' : ''
                  }`}
                >
                  {actor.image ? (
                    <>
                      <img
                        src={actor.image}
                        alt={actor.name}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Hover Zoom Overlay Badge */}
                      <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px]">
                        <div className="p-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-glow-gold transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-200 tracking-wider">
                          放大預覽
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-300 drop-shadow">
                        {actor.name.charAt(0)}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-mono">
                        Improviser
                      </span>
                    </div>
                  )}

                  {/* Theatrical Vignette Gradient Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-obsidian-950/80 via-obsidian-950/20 to-transparent pointer-events-none" />

                  {/* Ambient Glow Corner */}
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-amber-500/20 rounded-full blur-xl group-hover/img:bg-amber-400/40 transition-colors pointer-events-none" />
                </div>

                {/* Actor Info */}
                <div className="mt-4 space-y-1 text-center">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {actor.name}
                  </h4>
                  <div className="text-xs text-amber-400 font-semibold tracking-wide">
                    {actor.role || actor.persona}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {actor.archetype}
                  </p>
                </div>

                {/* Micro indicator */}
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-center text-[10px] text-slate-400 group-hover:text-amber-300">
                  <span>點擊了解心聲</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Actor Detail Drawer / Callout */}
        {activeCast && (
          <div className="rounded-2xl glass-card border border-amber-500/40 p-6 sm:p-8 bg-obsidian-900/95 shadow-glow-gold animate-fade-in flex flex-col sm:flex-row items-center gap-6">
            {activeCast.image ? (
              <div
                onClick={() => setPreviewCast(activeCast)}
                title="點擊放大預覽照片"
                className="relative group/drawer-img cursor-zoom-in shrink-0"
              >
                <img
                  src={activeCast.image}
                  alt={activeCast.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-amber-400/60 shadow-md group-hover/drawer-img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-obsidian-950/40 opacity-0 group-hover/drawer-img:opacity-100 transition-opacity flex items-center justify-center text-amber-300">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-purple-600/20 border border-amber-400/40 flex items-center justify-center text-2xl sm:text-3xl font-cinzel font-bold text-amber-300 shrink-0">
                {activeCast.name.charAt(0)}
              </div>
            )}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h4 className="font-serif text-2xl font-bold text-slate-100">
                  {activeCast.name}
                </h4>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  飾演 · {activeCast.role || activeCast.persona}
                </span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                「在《現代版鐘樓怪人》的即興舞台上，化身為【{activeCast.role || activeCast.persona}】——{activeCast.archetype}。今晚你所提供的任何一句話，都可能成為我唱響命運的起手式。」
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveCast(null)}
              className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              收合
            </button>
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {previewCast && previewCast.image && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/90 backdrop-blur-md animate-fade-in"
            onClick={() => setPreviewCast(null)}
          >
            <div
              className="relative max-w-xl w-full flex flex-col items-center rounded-2xl glass-card border border-amber-500/40 p-4 sm:p-5 bg-obsidian-900/95 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-lg font-bold text-slate-100">
                    {previewCast.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {previewCast.role || previewCast.persona}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCast(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close"
                  title="關閉 (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Frame with Navigation */}
              <div className="relative w-full aspect-square max-h-[70vh] rounded-xl overflow-hidden border border-amber-500/30 shadow-glow-gold bg-obsidian-950 flex items-center justify-center">
                <img
                  src={previewCast.image}
                  alt={`${previewCast.name} 宣傳照`}
                  className="w-full h-full object-cover object-top"
                />

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-obsidian-950/70 hover:bg-amber-500/80 text-slate-200 hover:text-obsidian-950 border border-slate-700/60 hover:border-amber-400 transition-all shadow-lg cursor-pointer"
                  title="上一位演員 (←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-obsidian-950/70 hover:bg-amber-500/80 text-slate-200 hover:text-obsidian-950 border border-slate-700/60 hover:border-amber-400 transition-all shadow-lg cursor-pointer"
                  title="下一位演員 (→)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Footer with Role Archetype & Keyboard Hints */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="text-amber-400/90 font-medium">
                  {previewCast.archetype}
                </span>
                <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
                  可使用 ← / → 切換，ESC 關閉
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Creative & Production Team */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clapperboard className="w-5 h-5 text-purple-400" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-200">
              主創與幕後製作群 (Creative & Production)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CREATIVE_TEAM.map((crew, cIdx) => (
              <div
                key={cIdx}
                className="glass-card rounded-xl p-5 border-slate-800/80 hover:border-purple-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-300/80 font-medium">
                    {crew.role}
                  </span>
                  <Wand2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="flex items-center gap-3">
                  {crew.image && (
                    <img
                      src={crew.image}
                      alt={crew.name}
                      className="w-10 h-10 rounded-lg object-cover object-top border border-purple-400/30 shrink-0"
                    />
                  )}
                  <div className="text-lg font-bold text-slate-100 font-serif">
                    {crew.name}
                  </div>
                </div>
                {crew.highlight && (
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {crew.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
