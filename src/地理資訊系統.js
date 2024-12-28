const fetch = require('sync-fetch');

/**
 * 將地址轉換為地理座標。
 *
 * @function 地址轉座標
 * @param {string[]} addresses - 一個包含地址的字串陣列，所有地址將被用於查詢其對應的地理座標（緯度與經度）。
 * @returns {string[]} 返回一個字串陣列，其中每個條目包括地址與其對應的緯度與經度，格式為 `地址,緯度,經度`。
 *
 * @description
 * 此函式接受一組地址，透過 Google Maps 的地址查詢功能獲取其地理座標 (緯度和經度)。
 * 每個地址會被轉換成對應的 URL，從 Google Maps 獲取內部 HTML 內容，並通過正則表達 (Regex)
 * 解析緯度與經度數據，然後返回結果陣列。
 *
 * @example
 * // 範例 1: 單一地址查詢
 * const addresses = ['台北 101', '台中車站'];
 * const results = 地址轉座標(addresses);
 * console.log(results);
 * // 可能輸出:
 * // [
 * //   '台北 101,25.0339639,121.5644722',
 * //   '台中車站,24.136829,120.685031'
 * // ]
 *
 * @example
 * // 範例 2: 空地址陣列
 * const emptyAddresses = [];
 * const results = 地址轉座標(emptyAddresses);
 * console.log(results); // 輸出: []
 *
 * @note
 * 使用此函式會依賴 Google Maps 的網址結構與資料回應，若 Google Maps 網址格式
 * 或 HTML 結構變更，此函式可能需要調整。
 *
 * @throws {Error} 若 `addresses` 不是陣列，或陣列中包含非字串的元素，可能導致函式行為異常。
 */
function 地址轉座標 (addresses) {
	const output = [];
	for (let i = 0, l = addresses.length; i < l; i++) {
		const address = addresses[i];
		const url = (new URL('https://www.google.com.tw/maps/place/' + address)).toString();
		const data = fetch(url).text();
		const reg = /@(\d+\.\d+),(\d+\.\d+)/g;
		const match = reg.exec(data);
		if (match) {
			output.push(`${address},${match[1]},${match[2]}`);
		}
	}

	return output;
}

module.exports = {
	地址轉座標
};