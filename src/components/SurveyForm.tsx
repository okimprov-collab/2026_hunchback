import React, { useState } from 'react';
import { Send, AlertCircle, Sparkles, Heart, BellRing, Mail, User, Phone, MessageSquare, Loader2, RefreshCw } from 'lucide-react';
import { CONFIG } from '../config/constants';
import { SurveyFormData } from '../types';

export const SurveyForm: React.FC = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SurveyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SurveyFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '請填寫您的姓名或暱稱';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請填寫電子郵件信箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '請輸入正確的電子郵件格式 (例如: name@example.com)';
    }

    if (formData.phone && formData.phone.trim().length > 0) {
      if (!/^[0-9+()#\-.\s]{7,20}$/.test(formData.phone.trim())) {
        newErrors.phone = '請輸入有效的手機或電話號碼';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SurveyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    const scriptUrl = CONFIG.GOOGLE_SCRIPT_URL;

    // Payload to send
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      message: (formData.message || '').trim(),
      userAgent: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (scriptUrl && scriptUrl.length > 0) {
        // Send to Google Apps Script Web App
        // Using Content-Type text/plain and no-cors mode prevents CORS preflight failure
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        setIsDemoMode(false);
      } else {
        // Simulation / Local Preview Mode when GAS URL is not yet configured in .env
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsDemoMode(true);
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Survey submission error:', err);
      setErrorMessage(
        '送出失敗，請檢查網路連線或稍後再試。亦可直接透過官方粉專與我們聯繫！'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
    setSubmitSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section id="survey-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-obsidian-950/80 to-obsidian-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-serif text-amber-300 border-amber-500/30">
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>心聲投遞 · AUDIENCE SURVEY & REGISTRATION</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-slate-100">
            給卡西莫多的
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              信號與回響
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            不論您是準備購票的觀眾、或是剛步出劇場的旅人，寫下您心中的隻字片語。您的文字將可能在未來的鐘聲中被唱響。
          </p>
        </div>

        {/* Survey Form Card */}
        <div className="relative rounded-3xl glass-card border border-amber-500/30 p-8 sm:p-12 shadow-2xl bg-obsidian-900/90 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
            {/* Field 1: Name */}
            <div className="space-y-2">
              <label htmlFor="survey-name" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <User className="w-4 h-4 text-amber-400" />
                <span>姓名 / 稱呼 (Name) <span className="text-amber-400">*</span></span>
              </label>
              <input
                id="survey-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="如何稱呼您？（例如：鐘樓敲鐘人 / 旅人小安）"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.name ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Field 2: Email */}
            <div className="space-y-2">
              <label htmlFor="survey-email" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>電子郵件信箱 (Email) <span className="text-amber-400">*</span></span>
              </label>
              <input
                id="survey-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="用於接收最新演出與早鳥通告 (name@example.com)"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.email ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field 3: Phone (Optional) */}
            <div className="space-y-2">
              <label htmlFor="survey-phone" className="flex items-center justify-between text-sm font-medium text-slate-200">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>手機號碼 (Phone)</span>
                </span>
                <span className="text-xs text-slate-400 font-normal">選填 · 用於開賣簡訊通知</span>
              </label>
              <input
                id="survey-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="例如：0912-345-678"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.phone ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Field 4: Message (Optional Textarea) */}
            <div className="space-y-2">
              <label htmlFor="survey-message" className="flex items-center justify-between text-sm font-medium text-slate-200">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>今晚想送給卡西莫多的一句話 / 觀後共鳴</span>
                </span>
                <span className="text-xs text-slate-400 font-normal">選填 · 線索投遞</span>
              </label>
              <textarea
                id="survey-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="寫下您心中的一個秘密、一個未解的提問、或是對今晚演出的期待與觀後感..."
                className="w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/70 transition-all resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-obsidian-950 font-bold text-base tracking-wider shadow-glow-gold hover:shadow-glow-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>鐘聲傳遞中，正在送出...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>送出心聲 · 敲響鐘樓</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400/70" />
              <span>資料將以安全加密形式直接同步至劇團後端資料庫 (Google Sheets)</span>
            </div>
          </form>
        </div>
      </div>

      {/* Theatrical Thank You Modal (感謝卡風格) */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full rounded-3xl glass-card border-2 border-amber-400/60 p-8 sm:p-10 shadow-glow-gold bg-gradient-to-b from-slate-900 to-obsidian-950 text-center space-y-6">
            {/* Cathedral Decorative Arch Header */}
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/15 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shadow-glow-gold">
              <Heart className="w-10 h-10 fill-amber-400/20" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">
                Notre-Dame de Paris · Gratitude Card
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                致親愛的敲鐘人【{formData.name}】
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian-950/70 border border-amber-500/20 text-slate-300 text-sm leading-relaxed space-y-3 font-serif">
              <p className="italic text-amber-200">
                「鐘樓上的卡西莫多已收到你的信號。今晚的舞台上，每顆寂寞的音符都因你而有了歸宿。」
              </p>
              <p className="text-xs text-slate-400">
                感謝您寶貴的回饋與登記！若有最新加場或專屬票券權益，我們將第一時間透過 <span className="text-amber-300">{formData.email}</span> 與您聯繫。
              </p>
              {isDemoMode && (
                <div className="text-[11px] p-2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  提示：目前為前端預覽模式（尚未設定 VITE_GOOGLE_SCRIPT_URL）。部署 GAS 腳本後即可自動無縫寫入 Google 試算表！
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm tracking-wide transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>完成並關閉</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
