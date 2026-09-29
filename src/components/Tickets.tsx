import React from 'react';
import { Calendar, Clock, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { CONFIG, SHOW_SESSIONS, TICKET_TIERS } from '../config/constants';

interface TicketsProps {
  onOpenSurvey?: () => void;
}

export const Tickets: React.FC<TicketsProps> = () => {
  return (
    <section id="tickets-section" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-obsidian-950/60">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-serif text-amber-300 border-amber-500/30">
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>票務方案 · TICKETS & SCHEDULE</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-slate-100">
            敲響鐘樓之門 ·
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              席位預訂
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-serif">
            座位有限，全場採自由入座。建議提前 10 分鐘入場以投遞您的即興關鍵字線索！
          </p>
        </div>

        {/* Sessions & Venue Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Show Sessions Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 font-serif">正式演出場次</h3>
                <p className="text-xs text-slate-400">2026 年 11 月 週末午後限定呈現</p>
              </div>
            </div>

            <div className="space-y-4">
              {SHOW_SESSIONS.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 hover:border-amber-500/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-slate-200 flex items-center gap-2">
                      <span>{session.dateDisplay}</span>
                      <span className="px-2 py-0.5 text-xs rounded bg-amber-500/20 text-amber-300">
                        {session.dayOfWeek}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{session.note}</div>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-base bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                    <Clock className="w-4 h-4" />
                    <span>{session.timeDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venue & Location Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-serif">{CONFIG.VENUE.NAME}</h3>
                  <p className="text-xs text-slate-400">專業沉浸式喜劇與即興劇場</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-semibold min-w-16">詳細地址：</span>
                  <span>{CONFIG.VENUE.ADDRESS}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-semibold min-w-16">大眾運輸：</span>
                  <span>{CONFIG.VENUE.TRANSIT}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-semibold min-w-16">入場須知：</span>
                  <span>現場備有精緻飲品吧台，可攜帶無氣味外食與飲品進場。</span>
                </div>
              </div>
            </div>

            <a
              href={CONFIG.VENUE.MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl glass-card border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>開啟 Google Maps 導航前往</span>
            </a>
          </div>
        </div>

        {/* Ticket Tier Cards */}
        <div id="ticket-tiers-section" className="space-y-6 scroll-mt-28">
          <div className="text-center">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-200">
              票種等級與優惠
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              選擇適合您的方案，提前卡位即興之夜
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TICKET_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl glass-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  tier.isPopular
                    ? 'border-2 border-amber-400/80 shadow-glow-gold bg-slate-900/95 -translate-y-1'
                    : 'border-slate-800 hover:border-amber-500/40 hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-obsidian-950'
                          : 'bg-purple-900/90 text-purple-200 border border-purple-400/40'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <div className="text-center border-b border-slate-800/80 pb-4">
                    <h4 className="text-xl font-bold text-slate-100 font-serif">{tier.name}</h4>
                    
                    {/* Period badge if present */}
                    {tier.period && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium mt-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{tier.period}</span>
                      </div>
                    )}

                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="text-sm text-amber-400 font-bold">NT$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono">
                        {tier.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">/ {tier.unit}</span>
                    </div>
                    {tier.originalPrice && (
                      <div className="text-xs text-slate-500 line-through mt-0.5">
                        原價 NT$ {tier.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-10">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <a
                    href={tier.id === 'group-10' ? CONFIG.SOCIAL.FACEBOOK : (CONFIG.TICKETING_URL || 'https://comedyclub.kktix.cc/events/okimprovgroup1108')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian-950 shadow-glow-gold hover:brightness-110'
                        : 'glass-card border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400'
                    }`}
                  >
                    <span>{tier.id === 'group-10' ? '私訊粉專洽詢' : '前往 KKTIX 購票'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
