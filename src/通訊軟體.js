import fetch from 'sync-fetch';

/**
 * 傳送訊息至指定的 Telegram 聊天。
 *
 * @function 傳送Telegram訊息
 * @param {string} token - Telegram 機器人 (bot) 的 API Token。
 * @param {string|number} chatId - Telegram 聊天的唯一識別碼，可以是聊天群組或用戶的 ID。
 * @param {string} message - 要傳送的訊息內容。
 *
 * @returns {void}
 *
 * @description
 * 此函式使用 Telegram Bot API，透過 HTTP 請求 (GET 方法) 傳送一則訊息到指定的聊天或用戶。
 * 需確保機器人擁有相應聊天的發送權限，並且提供正確的 `token` 和 `chatId`。
 *
 * @example
 * // 範例: 傳送一則訊息至指定的用戶或群組
 * const botToken = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
 * const chatId = 987654321; // 可以是用戶的 ID 或群組的 ID
 * const message = '您好，這是一則測試訊息！';
 * 傳送Telegram訊息(botToken, chatId, message);
 *
 * @note
 * 此函式使用的是 Telegram Bot 的 HTTP API，`fetch` 默認使用異步，
 * 若需處理回應（成功與失敗），應考慮使用 `await` 或 `then()`。
 *
 * @throws {Error}
 * - 若 `token` 不正確或無效，請求將失敗。
 * - 若機器人未加入到指定的聊天，或者無權限，請求亦會失敗。
 */
function 傳送Telegram訊息(token, chatId, message) {
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
    fetch(url);
}

export default {
    傳送Telegram訊息,
};