import React, { useState } from 'react';
import {
  Send,
  AlertCircle,
  Sparkles,
  Heart,
  BellRing,
  Mail,
  User,
  Phone,
  MessageSquare,
  Loader2,
  RefreshCw,
  ArrowLeft,
  CheckSquare,
  Square,
  Star,
  Film,
  Lightbulb,
  Users,
  Compass,
} from 'lucide-react';
import { CONFIG } from '../config/constants';
import { SurveyFormData } from '../types';

interface SurveyFormProps {
  onBackHome?: () => void;
}

const FAVORITE_PARTS_OPTIONS = [
  '演員的戲劇表演',
  '演員默契與反應',
  '故事情節的創意',
  '即興互動的部分',
];

const FAVORITE_SCENES_OPTIONS = [
  '1\t葛林果開唱，奠定故事基礎',
  '2\t卡西莫多的自卑',
  '3\t克洛平與城市角落的人對待卡西莫多的眼光',
  '4\t愛斯梅拉達自信表達',
  '5\t弗侯洛注意到失控，要求菲比斯管理',
  '6\t卡西莫多第一次被看見',
  '7\t菲比斯與百合：主流世界',
  '8\t弗侯洛設局，愛斯梅拉達與克洛平被抓',
  '9\t葛林果下半場序曲：灰暗時代',
  '10\t菲比斯救出卡西莫多：不要再躲',
  '11\t卡西莫多救出克洛平，集結眾人',
  '12\t弗侯洛對愛絲梅拉達的愛戀',
  '13\t眾人遏止弗侯洛，救下愛斯梅拉達',
  '14\t重新定義怪人：一起同樂',
];

const SATISFACTION_OPTIONS = [
  '非常滿意 😂',
  '滿意 😁',
  '普通 😀',
  '不滿意 🤔',
  '非常不滿意 🙄',
];

const FORMAT_SUGGESTIONS_OPTIONS = [
  '更加互動 (紙條或道具)',
  '更多短篇單元',
  '更多音樂',
  '更多舞蹈元素',
];

const CHARACTER_OPTIONS = [
  '卡西莫多 (Pingu)',
  '愛斯梅拉達 (Miu)',
  '弗侯洛 (BOOK)',
  '菲比斯 (Allen)',
  '克洛平 (小B)',
  '百合 (彩虹)',
  '葛林果 (Kubi)',
  '三個石像 (小慧、鱈魚、拉麵)',
];

const REFERRAL_OPTIONS = [
  'FB 粉專',
  'IG 粉專',
  'Youtube',
  'Accupass',
  'KKTIX',
  '朋友動態',
  '朋友推薦',
  '團員親友',
  '實體傳單',
  '電子郵件',
  '其他',
];

const INITIAL_FORM_DATA: SurveyFormData = {
  name: '',
  favoriteParts: [],
  favoriteScenes: [],
  satisfaction: '',
  formatSuggestions: [],
  message: '',
  targetCharacter: '',
  characterMessage: '',
  referralSource: '',
  referralOther: '',
  email: '',
  phone: '',
};

export const SurveyForm: React.FC<SurveyFormProps> = ({ onBackHome }) => {
  const [formData, setFormData] = useState<SurveyFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof SurveyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const toggleMultiSelect = (
    field: 'favoriteParts' | 'favoriteScenes' | 'formatSuggestions',
    option: string
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [field]: next };
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SurveyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SurveyFormData, string>> = {};

    // 1. 姓名 / 綽號 (必填)
    if (!formData.name.trim()) {
      newErrors.name = '請填寫您的姓名或綽號';
    }

    // 2. 最喜歡哪一部分 (多選, 必填)
    if (formData.favoriteParts.length === 0) {
      newErrors.favoriteParts = '請至少選擇一項您喜歡的部分';
    }

    // 3. 最喜歡/有印象是哪些幕 (多選, 必填)
    if (formData.favoriteScenes.length === 0) {
      newErrors.favoriteScenes = '請至少選擇一幕您喜歡或有印象的段落';
    }

    // 4. 整體滿意度 (下拉單選, 必填)
    if (!formData.satisfaction) {
      newErrors.satisfaction = '請選擇整體滿意度';
    }

    // 5. 形式建議 (多選, 必填)
    if (formData.formatSuggestions.length === 0) {
      newErrors.formatSuggestions = '請至少選擇一項建議';
    }

    // 6. 今晚想送我們的一句話/觀後共鳴 (必填)
    if (!formData.message.trim()) {
      newErrors.message = '請寫下您想送我們的一句話或觀後共鳴';
    }

    // 8. 從哪裡得知表演 (下拉單選, 必填; 若選其他則必須填寫)
    if (!formData.referralSource) {
      newErrors.referralSource = '請選擇您從哪裡得知本次表演';
    } else if (formData.referralSource === '其他' && !formData.referralOther?.trim()) {
      newErrors.referralOther = '請填寫「其他」得知管道';
    }

    // 9. 電子郵件信箱 (必填，一定要有 @)
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = '請填寫電子郵件信箱';
    } else if (!trimmedEmail.includes('@') || !/^[^\s@]+@[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = '電子郵件信箱必須包含 @ 符號 (例如: name@example.com)';
    }

    // 10. 手機號碼 (選填，若有填寫必須是 09 開頭且共 10 碼數字)
    const trimmedPhone = (formData.phone || '').trim();
    if (trimmedPhone.length > 0) {
      if (!/^09\d{8}$/.test(trimmedPhone)) {
        newErrors.phone = '手機號碼須為 09 開頭且共 10 碼數字 (例如：0912345678)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const scriptUrl = CONFIG.GOOGLE_SCRIPT_URL;
    const finalReferral =
      formData.referralSource === '其他'
        ? `其他：${(formData.referralOther || '').trim()}`
        : formData.referralSource;

    const characterNote =
      formData.targetCharacter || formData.characterMessage?.trim()
        ? `${formData.targetCharacter ? `【致 ${formData.targetCharacter}】` : ''}${(formData.characterMessage || '').trim()}`
        : '';

    const payload = {
      name: formData.name.trim(),
      favoriteParts: formData.favoriteParts.join('、'),
      favoriteScenes: formData.favoriteScenes.map((s) => s.replace('\t', ' ')).join('；'),
      satisfaction: formData.satisfaction,
      formatSuggestions: formData.formatSuggestions.join('、'),
      message: formData.message.trim(),
      targetCharacter: formData.targetCharacter || '',
      characterMessage: (formData.characterMessage || '').trim(),
      characterNote,
      referralSource: finalReferral,
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      userAgent: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (scriptUrl && scriptUrl.length > 0) {
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
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section
      id="survey-section"
      className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-obsidian-950/80 to-obsidian-900"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {onBackHome && (
          <div>
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card border-slate-700/80 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>返回演出介紹主頁</span>
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-sans text-amber-300 border-amber-500/30">
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>觀後回饋 · AUDIENCE FEEDBACK SURVEY</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-slate-100">
            給卡西莫多的
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              信號與回響
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            感謝您走進今晚的鐘樓。請留下您的觀後共鳴與寶貴建議，您的每一個回饋都將成為下一次鐘聲響起的養分。
          </p>
        </div>

        {/* Survey Form Card */}
        <div className="relative rounded-3xl glass-card border border-amber-500/30 p-6 sm:p-12 shadow-2xl bg-obsidian-900/90 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10" noValidate>
            {/* 1. 姓名 / 綽號 (必填) */}
            <div className="space-y-2.5">
              <label htmlFor="survey-name" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <User className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  1. 姓名 / 綽號 <span className="text-amber-400">*</span>
                </span>
              </label>
              <input
                id="survey-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="如何稱呼您？（例如：鐘樓敲鐘人 / 小安）"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.name ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* 2. 您最喜歡本次表演的哪一部分？ (多選, 必填) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    2. 您最喜歡本次表演的哪一部分？ <span className="text-amber-400 text-xs font-normal">(多選)</span>{' '}
                    <span className="text-amber-400">*</span>
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FAVORITE_PARTS_OPTIONS.map((option) => {
                  const checked = formData.favoriteParts.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMultiSelect('favoriteParts', option)}
                      disabled={isSubmitting}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                        checked
                          ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-glow-gold'
                          : 'bg-obsidian-950/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {errors.favoriteParts && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.favoriteParts}</span>
                </p>
              )}
            </div>

            {/* 3. 您最有喜歡/有印象是哪些幕？ (多選, 必填) */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Film className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  3. 您最有喜歡/有印象是哪些幕？ <span className="text-amber-400 text-xs font-normal">(多選)</span>{' '}
                  <span className="text-amber-400">*</span>
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FAVORITE_SCENES_OPTIONS.map((option) => {
                  const checked = formData.favoriteScenes.includes(option);
                  const [num, title] = option.split('\t');
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMultiSelect('favoriteScenes', option)}
                      disabled={isSubmitting}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                        checked
                          ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-glow-gold'
                          : 'bg-obsidian-950/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                        {num}
                      </span>
                      <span className="leading-snug">{title}</span>
                    </button>
                  );
                })}
              </div>
              {errors.favoriteScenes && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.favoriteScenes}</span>
                </p>
              )}
            </div>

            {/* 4. 您對於我們本次即興表演的整體滿意度如何？ (下拉單選, 必填) */}
            <div className="space-y-2.5">
              <label htmlFor="survey-satisfaction" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  4. 您對於我們本次即興表演的整體滿意度如何？ <span className="text-amber-400">*</span>
                </span>
              </label>
              <select
                id="survey-satisfaction"
                name="satisfaction"
                value={formData.satisfaction}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/90 border text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all cursor-pointer ${
                  errors.satisfaction ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
              >
                <option value="" disabled className="bg-obsidian-950 text-slate-500">
                  請選擇您的整體滿意度...
                </option>
                {SATISFACTION_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-obsidian-950 text-slate-100">
                    {option}
                  </option>
                ))}
              </select>
              {errors.satisfaction && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.satisfaction}</span>
                </p>
              )}
            </div>

            {/* 5. 您對我們即興表演的形式有什麼建議嗎？ (多選, 必填) */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  5. 您對我們即興表演的形式有什麼建議嗎？ <span className="text-amber-400 text-xs font-normal">(多選)</span>{' '}
                  <span className="text-amber-400">*</span>
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FORMAT_SUGGESTIONS_OPTIONS.map((option) => {
                  const checked = formData.formatSuggestions.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMultiSelect('formatSuggestions', option)}
                      disabled={isSubmitting}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                        checked
                          ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-glow-gold'
                          : 'bg-obsidian-950/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {errors.formatSuggestions && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.formatSuggestions}</span>
                </p>
              )}
            </div>

            {/* 6. 今晚想送我們的一句話/觀後共鳴 (必填) */}
            <div className="space-y-2.5">
              <label htmlFor="survey-message" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  6. 今晚想送我們的一句話/觀後共鳴 <span className="text-amber-400">*</span>
                </span>
              </label>
              <textarea
                id="survey-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="寫下您對今晚演出的感動、想法或觀後共鳴..."
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all resize-none ${
                  errors.message ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* 7. 有什麼話要對特定角色說? (選填, 單選下拉選單 + 留言輸入) */}
            <div className="space-y-3">
              <label htmlFor="survey-character" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  7. 有什麼話要對特定角色說? <span className="text-amber-400 text-xs font-normal">(選填)</span>
                </span>
              </label>
              <select
                id="survey-character"
                name="targetCharacter"
                value={formData.targetCharacter}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3.5 rounded-xl bg-obsidian-950/90 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/70 transition-all cursor-pointer"
              >
                <option value="" className="bg-obsidian-950 text-slate-500">
                  請選擇特定角色（選填）...
                </option>
                {CHARACTER_OPTIONS.map((char) => (
                  <option key={char} value={char} className="bg-obsidian-950 text-slate-100">
                    {char}
                  </option>
                ))}
              </select>
              <textarea
                id="survey-character-message"
                name="characterMessage"
                rows={3}
                value={formData.characterMessage}
                onChange={handleChange}
                placeholder={
                  formData.targetCharacter
                    ? `想對【${formData.targetCharacter}】說什麼呢？（選填）`
                    : '選好角色後，可以在這裡寫下想對他說的話（選填）...'
                }
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/70 transition-all resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* 8. 從哪裡得知表演? (下拉單選, 必填; 選其他時需填寫) */}
            <div className="space-y-3">
              <label htmlFor="survey-referral" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  8. 從哪裡得知表演? <span className="text-amber-400">*</span>
                </span>
              </label>
              <select
                id="survey-referral"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/90 border text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all cursor-pointer ${
                  errors.referralSource ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
              >
                <option value="" disabled className="bg-obsidian-950 text-slate-500">
                  請選擇得知管道...
                </option>
                {REFERRAL_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-obsidian-950 text-slate-100">
                    {option === '其他' ? '其他：（請填寫）' : option}
                  </option>
                ))}
              </select>
              {errors.referralSource && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.referralSource}</span>
                </p>
              )}

              {formData.referralSource === '其他' && (
                <div className="space-y-1.5 pt-1">
                  <input
                    id="survey-referral-other"
                    name="referralOther"
                    type="text"
                    value={formData.referralOther}
                    onChange={handleChange}
                    placeholder="請填寫您得知本表演的管道 *"
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                      errors.referralOther ? 'border-rose-500/80' : 'border-amber-500/40 focus:border-amber-400'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.referralOther && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.referralOther}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 9. 電子郵件信箱 (必填) */}
            <div className="space-y-2.5">
              <label htmlFor="survey-email" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  9. 電子郵件信箱 <span className="text-amber-400">*</span>
                </span>
              </label>
              <input
                id="survey-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="用於接收最新演出與活動通知 (name@example.com)"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.email ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* 10. 手機號碼 (選填) */}
            <div className="space-y-2.5">
              <label htmlFor="survey-phone" className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-200">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  10. 手機號碼 <span className="text-amber-400 text-xs font-normal">(選填 · 用於開賣簡訊通知)</span>
                </span>
              </label>
              <input
                id="survey-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="例如：0912345678"
                className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                  errors.phone ? 'border-rose-500/80' : 'border-slate-800 focus:border-amber-400/70'
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
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
                    <span>送出觀後回饋 · 敲響鐘樓</span>
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
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/15 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shadow-glow-gold">
              <Heart className="w-10 h-10 fill-amber-400/20" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">
                Notre-Dame de Paris · Gratitude Card
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                致親愛的敲鐘人【{formData.name}】
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian-950/70 border border-amber-500/20 text-slate-300 text-sm leading-relaxed space-y-3 font-sans">
              <p className="italic text-amber-200">
                「鐘樓上的卡西莫多已收到你的信號。今晚的舞台上，每顆寂寞的音符都因你而有了歸宿。」
              </p>
              <p className="text-xs text-slate-400">
                感謝您寶貴的觀後回饋！若有最新演出或專屬活動資訊，我們將第一時間透過{' '}
                <span className="text-amber-300">{formData.email}</span> 與您聯繫。
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
