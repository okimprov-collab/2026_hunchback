import React from 'react';
import { Sparkles, Mic2, Music4, Flame, Compass, HeartHandshake, Eye } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <Mic2 className="w-7 h-7 text-amber-400" />,
      title: '無固定台詞',
      enTitle: 'No Fixed Script',
      desc: '沒有提詞機、沒有預排的對白。全場觀眾隨機拋出的物件、秘密或情緒關鍵字，將在三秒內被演員接下，化為推動命運的台詞。',
      accentColor: 'border-amber-500/30 group-hover:border-amber-400',
    },
    {
      icon: <Music4 className="w-7 h-7 text-purple-400" />,
      title: '無重複旋律',
      enTitle: 'No Reused Melody',
      desc: '現場樂手即時捕捉舞台上的呼吸與張力，從澎湃的哥德大合唱到耳邊低語的詠嘆調，每一顆和弦、每一個主題旋律，皆是現場誕生。',
      accentColor: 'border-purple-500/30 group-hover:border-purple-400',
    },
    {
      icon: <Flame className="w-7 h-7 text-rose-400" />,
      title: '今晚僅此一次',
      enTitle: 'Only Once Tonight',
      desc: '昨天的笑聲無法複製，明天的結局尚未誕生。今晚散場時，這齣長達 80 分鐘的音樂劇將徹底消失在空氣中，只留在你我心底。',
      accentColor: 'border-rose-500/30 group-hover:border-rose-400',
    },
  ];

  return (
    <section id="about-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Cathedral Arch Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 rose-window-radial blur-2xl pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-sans text-amber-300 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>創作概念 · THEATRICAL CONCEPT</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-slate-100 tracking-wide">
            走進心靈深處的
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              現代鐘樓
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            我們不再重複百年前巴黎聖母院的古典悲劇，而是將鏡頭對準當代都市中每一顆孤單的靈魂。
          </p>
        </div>

        {/* Central Theatrical Philosophical Manifesto */}
        <div className="relative rounded-2xl glass-card border border-amber-500/30 p-8 sm:p-12 shadow-2xl bg-gradient-to-b from-slate-900/90 to-obsidian-950/90 overflow-hidden">
          {/* Gothic Decorative Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/60" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <blockquote className="font-sans text-xl sm:text-2xl text-amber-200 leading-relaxed font-semibold italic border-l-4 border-amber-400 pl-4 py-1">
                「如果卡西莫多的『怪』，不是外貌缺陷，而是他不被理解的活法？」
              </blockquote>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                在社群媒體與精緻人設充斥的今天，我們每個人是否都曾躲進自築的高牆，深怕一旦展露真實脆弱，就會被世界定義為「怪人」？
              </p>
            </div>

            <div className="space-y-6 md:border-l md:border-slate-800 md:pl-8">
              <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <blockquote className="font-sans text-xl sm:text-2xl text-purple-200 leading-relaxed font-semibold italic border-l-4 border-purple-400 pl-4 py-1">
                「『鐘樓』不是建築，而是心中不敢走出的角落；『怪人』不是怪物，而是尚未被看見的人。」
              </blockquote>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                今晚，我們邀請你成為敲鐘人。拋出你最真實的經歷、那些未曾對人言說的困惑，讓我們在當下即興的歌聲中，為彼此點亮一盞接納的燈火。
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Improv Musical */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-200 flex items-center justify-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              三大即興現場特點
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              挑戰極限舞台張力，見證無與倫比的即時創作
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl glass-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-gold ${pillar.accentColor}`}
              >
                <div className="w-14 h-14 rounded-xl bg-obsidian-900 border border-slate-700/80 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>

                <div className="text-xs uppercase tracking-widest text-slate-400 font-cinzel mb-1">
                  {pillar.enTitle}
                </div>

                <h4 className="text-xl font-bold text-slate-100 mb-3 font-sans flex items-center gap-2">
                  <span>{pillar.title}</span>
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
