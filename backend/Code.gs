/**
 * =========================================================================
 * 《現代版鐘樓怪人》即興音樂劇 - 觀眾回饋與名單登記系統 (GAS 後端)
 * Theatre Troupe: OK 的即興工作室
 * =========================================================================
 *
 * 【部署說明 Step-by-Step Instructions】
 * 1. 前往 Google Drive (https://drive.google.com) 新增一個「Google 試算表」，命名為例如《現代版鐘樓怪人-觀眾回饋名單》。
 * 2. 點選上方選單「擴充功能 (Extensions)」 > 「Apps Script」。
 * 3. 將原編輯器中的內容清空，完整貼上本檔案全部程式碼。
 * 4. 點選右上角「部署 (Deploy)」 > 「新增部署 (New deployment)」。
 * 5. 類型選擇「網頁應用程式 (Web app)」：
 *    - 說明 (Description)：現代版鐘樓怪人問卷接收端
 *    - 執行身分 (Execute as)：我 (Me / 您的 Google 帳號)
 *    - 誰可以存取 (Who has access)：所有人 (Anyone)  <-- ★非常重要！必須選「所有人」以允許外部公開送出
 * 6. 點擊「部署」，授權存取 Google 試算表權限。Load older messages
 Conversation Log
 我有設定會把回覆發送到 google excel ，我看這邊題目還是舊的，我需要改那些呢?
 正在強化 
 Code.gs
 ，讓腳本在發現試算表第一列還是舊版 6 欄標題時，自動覆寫更新為新版 13 欄標題並套用黑底金字樣式。
 
 因為 Google 試算表裡的 Apps Script 是跑在 Google 雲端上，不會自動讀取你電腦裡的檔案，所以只要把新版 
 Code.gs
  貼回 Google 試算表的 Apps Script 並更新部署版本即可（網址不會變，不用改 .env）！
 
 3 步完成更新（不用改網址）
 清空舊測試資料（可選）： 在你的 Google 試算表把第 1～3 列選起來右鍵「刪除列」（就算不刪，我也已經在下方新版程式碼加上「自動把第 1 列舊標題覆蓋更新成新版 13 欄標題」的邏輯）。
 貼上新版程式碼： 在 Google 試算表上方點選 「擴充功能」 > 「Apps Script」，把裡面的程式碼全選刪除，貼上這段最新版的 
 Code.gs
  後按 Ctrl + S 存檔：
 javascript
 
 
 const SHEET_NAME = '觀眾回饋名單';
 const HEADERS = [
   '時間戳記 (Timestamp)',
   '1. 姓名 / 綽號',
   '2. 最喜歡本次表演的哪一部分',
   '3. 最喜歡/有印象是哪些幕',
   '4. 整體滿意度',
   '5. 即興表演形式建議',
   '6. 今晚想送我們的一句話/觀後共鳴',
   '7. 對特定角色說的話 (角色)',
   '7. 對特定角色說的話 (內容)',
   '8. 從哪裡得知表演',
   '9. 電子郵件信箱',
   '10. 手機號碼',
   '送出來源 / 裝置資訊 (User Agent)',
 ];
 function doGet(e) {
   return ContentService.createTextOutput(
     JSON.stringify({
       status: 'success',
       message: '《現代版鐘樓怪人》即興音樂劇問卷服務正常運行中 (OK 的即興工作室)',
       timestamp: new Date().toISOString(),
     })
   ).setMimeType(ContentService.MimeType.JSON);
 }
 function doPost(e) {
   const lock = LockService.getScriptLock();
   lock.tryLock(30000);
   try {
     const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
     let sheet = spreadsheet.getSheetByName(SHEET_NAME);
     if (!sheet) {
       sheet = spreadsheet.insertSheet(SHEET_NAME);
     }
     // 自動建立或將舊版 6 欄標題更新為最新 13 欄
     const currentFirstCell = sheet.getLastRow() > 0 ? sheet.getRange(1, 2).getValue() : '';
     if (sheet.getLastRow() === 0 || currentFirstCell !== HEADERS[1]) {
       const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
       headerRange.setValues([HEADERS]);
       headerRange.setBackground('#0f172a');
       headerRange.setFontColor('#fbbf24');
       headerRange.setFontWeight('bold');
       headerRange.setHorizontalAlignment('center');
       sheet.setFrozenRows(1);
     }
     let payload = {};
     if (e.postData && e.postData.contents) {
       try {
         payload = JSON.parse(e.postData.contents);
       } catch (parseError) {
         payload = e.parameter || {};
       }
     } else if (e.parameter) {
       payload = e.parameter;
     }
     const timestamp = Utilities.formatDate(
       new Date(),
       'Asia/Taipei',
       'yyyy/MM/dd HH:mm:ss'
     );
     const name = (payload.name || '').toString().trim();
     const favoriteParts = (payload.favoriteParts || '').toString().trim();
     const favoriteScenes = (payload.favoriteScenes || '').toString().trim();
     const satisfaction = (payload.satisfaction || '').toString().trim();
     const formatSuggestions = (payload.formatSuggestions || '').toString().trim();
     const message = (payload.message || '').toString().trim();
     const targetCharacter = (payload.targetCharacter || '').toString().trim();
     const characterMessage = (payload.characterMessage || '').toString().trim();
     const referralSource = (payload.referralSource || '').toString().trim();
     const email = (payload.email || '').toString().trim();
     const phone = (payload.phone || '').toString().trim();
     const userAgent = (payload.userAgent || e.parameter?.userAgent || '').toString().trim();
     if (!name || !email) {
       return ContentService.createTextOutput(
         JSON.stringify({
           success: false,
           error: '姓名與電子郵件為必填欄位。',
         })
       ).setMimeType(ContentService.MimeType.JSON);
     }
     sheet.appendRow([
       timestamp,
       name,
       favoriteParts,
       favoriteScenes,
       satisfaction,
       formatSuggestions,
       message,
       targetCharacter,
       characterMessage,
       referralSource,
       email,
       phone,
       userAgent,
     ]);
     return ContentService.createTextOutput(
       JSON.stringify({
         success: true,
         message: '感謝您的回饋！鐘聲已為您敲響。',
         data: { name, email, timestamp },
       })
     ).setMimeType(ContentService.MimeType.JSON);
   } catch (error) {
     return ContentService.createTextOutput(
       JSON.stringify({
         success: false,
         error: error.toString(),
       })
     ).setMimeType(ContentService.MimeType.JSON);
   } finally {
     lock.releaseLock();
   }
 }
 發佈新版本（★最關鍵一步，沒按這個只按存檔不會生效）：
 點選 Apps Script 右上角藍色按鈕 「部署」 > 「管理部署作業」
 點選右上角的 「鉛筆圖示（編輯）」
 在「版本 (Version)」下拉選單選擇 「建立新版本 (New version)」
 點擊底部 「部署」
 做完這步後去填一次表單送出，Google 試算表的
 * 7. 複製產生的「網頁應用程式網址 (Web app URL)」(以 /exec 結尾)。
 * 8. 將該網址填入前端專案的 `.env` 檔案中的 `VITE_GOOGLE_SCRIPT_URL`。
 * =========================================================================
 */

// 試算表工作表名稱
const SHEET_NAME = '觀眾回饋名單';

// 預設標題欄位
const HEADERS = [
  '時間戳記 (Timestamp)',
  '1. 姓名 / 綽號',
  '2. 最喜歡本次表演的哪一部分',
  '3. 最喜歡/有印象是哪些幕',
  '4. 整體滿意度',
  '5. 即興表演形式建議',
  '6. 今晚想送我們的一句話/觀後共鳴',
  '7. 對特定角色說的話 (角色)',
  '7. 對特定角色說的話 (內容)',
  '8. 從哪裡得知表演',
  '9. 電子郵件信箱',
  '10. 手機號碼',
  '送出來源 / 裝置資訊 (User Agent)',
];

/**
 * 處理 GET 請求 (可用於瀏覽器快速健康檢查)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'success',
      message: '《現代版鐘樓怪人》即興音樂劇問卷服務正常運行中 (OK 的即興工作室)',
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 處理 POST 請求 (接收問卷送出資料)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // 最多等待 30 秒鎖定，避免多位觀眾同時送出造成資料競爭衝突
  lock.tryLock(30000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // 若工作表不存在則自動建立
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // 自動建立或更新第一列標題為最新 13 欄
    const currentFirstCell = sheet.getLastRow() > 0 ? sheet.getRange(1, 2).getValue() : '';
    if (sheet.getLastRow() === 0 || currentFirstCell !== HEADERS[1]) {
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setValues([HEADERS]);
      headerRange.setBackground('#0f172a');
      headerRange.setFontColor('#fbbf24');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }

    // 解析收到的資料 (相容 JSON body 與 URL encoded parameter)
    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseError) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const timestamp = Utilities.formatDate(
      new Date(),
      'Asia/Taipei',
      'yyyy/MM/dd HH:mm:ss'
    );
    const name = (payload.name || '').toString().trim();
    const favoriteParts = (payload.favoriteParts || '').toString().trim();
    const favoriteScenes = (payload.favoriteScenes || '').toString().trim();
    const satisfaction = (payload.satisfaction || '').toString().trim();
    const formatSuggestions = (payload.formatSuggestions || '').toString().trim();
    const message = (payload.message || '').toString().trim();
    const targetCharacter = (payload.targetCharacter || '').toString().trim();
    const characterMessage = (payload.characterMessage || '').toString().trim();
    const referralSource = (payload.referralSource || '').toString().trim();
    const email = (payload.email || '').toString().trim();
    const rawPhone = (payload.phone || '').toString().trim();
    const phone = rawPhone ? "'" + rawPhone : '';
    const userAgent = (payload.userAgent || e.parameter?.userAgent || '').toString().trim();

    // 必填欄位驗證
    if (!name || !email) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: '姓名與電子郵件為必填欄位。',
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 寫入資料行
    sheet.appendRow([
      timestamp,
      name,
      favoriteParts,
      favoriteScenes,
      satisfaction,
      formatSuggestions,
      message,
      targetCharacter,
      characterMessage,
      referralSource,
      email,
      phone,
      userAgent,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: '感謝您的回饋！鐘聲已為您敲響。',
        data: { name, email, timestamp },
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
