const fetch = require('sync-fetch');

/**
 *
 * @param {string} token Telegram Bot Token
 * @param {string} chatId Telegram Chat Id
 * @param {string} message 要傳送的訊息
 */
function 傳送Telegram訊息 (token, chatId, message) {
	const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&text=${message}`;
	fetch(url);
}

module.exports = {
	傳送Telegram訊息
};