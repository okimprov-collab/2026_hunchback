import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tickets } from './components/Tickets';
import { TeamCast } from './components/TeamCast';
import { SurveyForm } from './components/SurveyForm';
import { Footer } from './components/Footer';
import { Bell, Menu, X, Ticket, MessageSquareHeart } from 'lucide-react';
import { CONFIG } from './config/constants';

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSurvey = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById('survey-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian-900 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-obsidian-950">
      {/* HTML5 Native Golden Embers & Starlight Canvas */}
      <BackgroundCanvas />

      {/* Sticky Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-obsidian-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-glow-gold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <span className="font-cinzel text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                鐘樓怪人
              </span>
              <span className="text-[10px] block tracking-widest text-amber-400 font-sans -mt-1">
                {CONFIG.TROUPE_NAME}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              type="button"
              onClick={() => scrollToSection('about-section')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              創作概念
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('tickets-section')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              演出場次
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cast-section')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              演出陣容
            </button>
            <button
              type="button"
              onClick={scrollToSurvey}
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquareHeart className="w-4 h-4 text-amber-400" />
              <span>觀後感投遞</span>
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('ticket-tiers-section')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian-950 text-xs font-bold tracking-wide shadow-glow-gold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>立即購票</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-400 glass-card"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-b border-amber-500/20 bg-obsidian-950/95 px-6 py-5 space-y-4 animate-fade-in">
            <button
              type="button"
              onClick={() => scrollToSection('about-section')}
              className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-amber-300"
            >
              創作概念
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('tickets-section')}
              className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-amber-300"
            >
              演出場次與票價
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cast-section')}
              className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-amber-300"
            >
              即興演員與創作團隊
            </button>
            <button
              type="button"
              onClick={scrollToSurvey}
              className="block w-full text-left py-2 text-base font-medium text-amber-400"
            >
              現場觀後感與名單登記
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('ticket-tiers-section')}
                className="w-full py-3 rounded-xl bg-amber-500 text-obsidian-950 font-bold text-center text-sm shadow-glow-gold"
              >
                前往預訂席位
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Sections */}
      <main className="flex-1 relative z-10">
        <Hero onOpenSurvey={scrollToSurvey} />
        <About />
        <Tickets onOpenSurvey={scrollToSurvey} />
        <TeamCast />
        <SurveyForm />
      </main>

      {/* Troupe Footer */}
      <Footer />
    </div>
  );
};

export default App;
