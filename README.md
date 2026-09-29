# 《現代版鐘樓怪人》即興音樂劇 官方推廣與觀眾回饋系統

> **「你給我們一個線索，我們唱出整座鐘樓。」**  
> **「鐘聲一響，今晚的故事由你決定。」**

本專案為台灣即興劇團 **「OK 的即興工作室」** 2026 年度旗艦即興音樂劇 **《現代版鐘樓怪人》（Modern Notre-Dame de Paris）** 打造的高沉浸感現代哥德風宣傳網站與觀眾問卷系統。

採用 **Vite + React 18 + TypeScript + Tailwind CSS** 建構，搭配原生 **HTML5 Canvas 粒子引擎**（上升流金灰燼與音樂符號微粒），並透過 **Google Apps Script (GAS)** 與 **Google Sheets** 建立無伺服器問卷資料庫，支援以 **GitHub Actions** 自動化部署至 **GitHub Pages**。

---

## 視覺風格與特色亮點

- **現代哥德劇院美學 (Modern Gothic Theatricality)**：
  - 以暗曜黑 (`#0a0c13`) 與深午夜藍 (`#0f172a`) 為基底，點綴溫暖琥珀流金 (`#f59e0b`) 與聖殿玫瑰彩繪玻璃紫光。
  - 精緻毛玻璃質感卡片（`backdrop-blur-md`）、客製化夜幕捲軸與微光暈動畫。
- **HTML5 Canvas 氛圍粒子畫布**：
  - 向上升騰的金色星塵、溫暖灰燼與隨機出現的五線譜音符（♪, ♫, ♩）。
  - 支援滑鼠游標與觸控軌跡的微斥力與發光吸引互動，具備完備的 `requestAnimationFrame` 銷毀機制。
- **即興音樂劇三大支柱**：
  - 【無固定台詞】×【無重複旋律】×【今晚僅此一次】。
- **十位即興演員與主創互動陣容**：
  - 互動式演員卡片與人物原形哲思，點擊即可探索角色在鐘樓中的孤獨與光芒。
- **票務與場地導航**：
  - 完整演出場次、Comedy Plus+ 喜劇俱樂部 Google Maps 導航整合。
  - 早鳥票、雙人共鳴套票、五人同響團體票與現場原價票方案。
  - 未配置售票網址時提供優雅的即將開賣預約登記彈窗。
- **觀眾問卷與名單收集 (Google Sheets 無伺服器串接)**：
  - 收集觀眾姓名、Email、手機與給卡西莫多的悄悄話。
  - 具備表單格式驗證、載入中狀態、劇院燙金感謝卡彈窗與本地模擬模式。
  - 採用 `fetch` + `Content-Type: text/plain`，完美規避 GAS 重定向與 CORS 限制。

---

## 專案目錄結構

```text
notre-dame-improv/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 自動化編譯部署到 GitHub Pages
├── backend/
│   └── Code.gs                  # Google Apps Script 後端代碼 (接收問卷寫入試算表)
├── public/
│   └── favicon.svg              # 哥德尖拱金色鐘樓圖標
├── src/
│   ├── assets/
│   │   └── poster.jpg           # 主視覺海報 (搭配離線漸層備援)
│   ├── components/
│   │   ├── BackgroundCanvas.tsx # 原生 HTML5 金色灰燼與音符粒子畫布
│   │   ├── Hero.tsx             # 英雄區塊 (Slogan, Badges, 票務/問卷按鈕)
│   │   ├── About.tsx            # 現代卡西莫多概念與即興三大特點
│   │   ├── Tickets.tsx          # 演出場次、地點導航與票價方案卡片
│   │   ├── TeamCast.tsx         # 即興演員互動卡片與主創製作群
│   │   ├── SurveyForm.tsx       # 觀眾回饋與名單登記表單 (GAS 串接)
│   │   └── Footer.tsx           # 劇團簡介與官方 Facebook / Instagram 連結
│   ├── config/
│   │   └── constants.ts         # 全域設定、官方社群與環境變數
│   ├── types/
│   │   └── index.ts             # 嚴格 TypeScript 型別定義
│   ├── App.tsx                  # 主頁面佈局與導航平滑滾動
│   ├── main.tsx                 # React DOM 掛載點
│   └── index.css                # Tailwind Directives、字體與 Gothic 動畫風格
├── .env.example                 # 環境變數設定範本
├── index.html                   # 劇院 SEO、Meta 標籤與 Google Fonts
├── package.json                 # 專案依賴與腳本
├── tailwind.config.js           # 哥德暗黑與流金色系配置
├── postcss.config.js            # PostCSS 設定
├── tsconfig.json                # TypeScript 編譯設定
├── vite.config.ts               # GitHub Pages subpath base 支援
└── README.md                    # 本指南文件
```

---

## 本地快速啟動 (Local Development)

### 1. 安裝依賴套件
確保本地環境已安裝 Node.js (推薦 v18+ 或 v20+)：
```bash
npm install
```

### 2. 環境變數設定
複製 `.env.example` 為 `.env`：
```bash
cp .env.example .env
```
檔案內容說明：
```env
# 售票平台外部連結 (如 OPENTIX、ACCUPASS)
# 若留空，點選購票按鈕時會彈出「即將開賣，請於下方預先登記！」的貼心提示
VITE_TICKETING_URL=https://www.opentix.life/

# 部署後的 Google Apps Script Web App URL (用於收集觀眾問卷回饋與名單)
# 若留空，表單將以本地示範模式順暢運作並彈出感謝卡
VITE_GOOGLE_SCRIPT_URL=
```

### 3. 啟動開發伺服器
```bash
npm run dev
```
啟動後瀏覽器開啟 `http://localhost:5173/` 即可即時預覽。

### 4. 產品打包測試
```bash
npm run build
npm run preview
```

---

## 後端設置：Google Apps Script (GAS) 部署指南

本專案使用 Google 試算表作為完全免費且高可靠的 Serverless 資料庫。請依照以下步驟部署：

1. **建立 Google 試算表**：
   - 前往 [Google Drive](https://drive.google.com/)，新增一個 Google 試算表。
   - 命名為例如：`現代版鐘樓怪人-觀眾回饋名單`。
2. **開啟 Apps Script 編輯器**：
   - 在試算表上方選單點選 **「擴充功能 (Extensions)」 > 「Apps Script」**。
3. **貼上後端程式碼**：
   - 清空編輯器內原有的程式碼，打開專案中的 `backend/Code.gs`。
   - 將整份 `backend/Code.gs` 的內容完整複製並貼入編輯器中，按 `Ctrl + S` 存檔。
4. **發佈網頁應用程式 (Deploy as Web App)**：
   - 點選編輯器右上角的 **「部署 (Deploy)」 > 「新增部署 (New deployment)」**。
   - 點選左側齒輪圖示，選擇 **「網頁應用程式 (Web app)」**：
     - **說明 (Description)**：現代版鐘樓怪人問卷接收端
     - **執行身分 (Execute as)**：我 (Me / 您的 Google 帳號)
     - **誰可以存取 (Who has access)**：**所有人 (Anyone)** *(★非常重要！必須選「所有人」，前端網頁才能公開提交問卷)*
5. **授權並取得網址**：
   - 點擊「部署」，依提示授權 Google 試算表寫入權限。
   - 複製產生的 **「網頁應用程式網址 (Web app URL)」**（結尾為 `/exec`）。
6. **填入專案環境變數**：
   - 將複製的網址貼入 `.env` 中的 `VITE_GOOGLE_SCRIPT_URL`。

> 💡 **自動初始化**：當第一筆問卷送出時，腳本會自動建立名為 `觀眾回饋名單` 的工作表，並寫入暗黑深藍底、燙金字的高質感標題列！

---

## 部署至 GitHub Pages (GitHub Actions CI/CD)

專案已內建 `.github/workflows/deploy.yml`，推送代碼後即可自動發佈至 GitHub Pages。

### 部署步驟：
1. **建立 GitHub Repository**：
   - 將本地專案推送到您的 GitHub 儲存庫（例如 `username/notre-dame-improv`）。
2. **開啟 GitHub Pages 權限**：
   - 進入 GitHub 專案頁面，點選 **「Settings」 > 「Pages」**。
   - 在 **「Build and deployment」 > 「Source」** 中，選擇 **「GitHub Actions」**。
3. **推送至 main 分支觸發自動建置**：
   ```bash
   git add .
   git commit -m "feat: complete Modern Notre-Dame de Paris landing page"
   git push origin main
   ```
4. **檢視部署結果**：
   - 在 GitHub 的 **「Actions」** 標籤頁可查看建置進度。
   - 完成後即可在 `https://<username>.github.io/<repo-name>/` 瀏覽正式上線網站。

*(註：`vite.config.ts` 已配置 `base: './'`，可完美支援根網域或任何 GitHub Pages 子路徑，資源皆能正常加載。)*

---

## 官方演出與劇團資訊

- **劇團名稱**：OK 的即興工作室
- **官方 Facebook**：[https://www.facebook.com/okimpro](https://www.facebook.com/okimpro)
- **官方 Instagram**：[https://www.instagram.com/ok_improvgroup/?hl=zh-tw](https://www.instagram.com/ok_improvgroup/?hl=zh-tw)
- **演出時間**：2026 / 11 / 07 (六) - 11 / 08 (日) 14:30
- **演出地點**：Comedy Plus+ 喜劇俱樂部 (臺北市中山區復興北路 480 號)

---

© 2026 **OK 的即興工作室**. All rights reserved.
