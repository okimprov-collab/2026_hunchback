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
 * 6. 點擊「部署」，授權存取 Google 試算表權限。
 * 7. 複製產生的「網頁應用程式網址 (Web app URL)」(以 /exec 結尾)。
 * 8. 將該網址填入前端專案的 `.env` 檔案中的 `VITE_GOOGLE_SCRIPT_URL`。
 * =========================================================================
 */

// 試算表工作表名稱
const SHEET_NAME = '觀眾回饋名單';

// 預設標題欄位
const HEADERS = [
  '時間戮記 (Timestamp)',
  '姓名 / 稱呼 (Name)',
  '電子郵件 (Email)',
  '手機號碼 (Phone)',
  '今晚想送給卡西莫多的一句話 (Message)',
  '送出來源 / IP資訊 (User Agent)',
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

    // 若工作表不存在則自動建立並寫入標題
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      // 美化標題列
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#0f172a');
      headerRange.setFontColor('#fbbf24');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    } else {
      // 確保第一列有標題
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
        headerRange.setBackground('#0f172a');
        headerRange.setFontColor('#fbbf24');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
      }
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
    const email = (payload.email || '').toString().trim();
    const phone = (payload.phone || '').toString().trim();
    const message = (payload.message || '').toString().trim();
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
    sheet.appendRow([timestamp, name, email, phone, message, userAgent]);

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
