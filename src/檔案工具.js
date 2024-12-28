const fs = require('fs');
const path = require('path');

/**
 * 列出指定目錄及其子目錄中的所有檔案路徑。
 *
 * @function 列出目錄下所有檔案
 * @param {string} 起始路徑 - 要查詢的目錄路徑，作為遞迴的起始點。
 * @param {string[]} [檔案陣列=[]] - (可選) 用於存儲檔案路徑的陣列，主要在遞迴調用時使用。
 * @returns {string[]} 返回包含目錄內所有檔案絕對路徑的字串陣列。
 *
 * @description
 * 此函式會針對指定的目錄及其所有子目錄進行遞迴查詢，並收集所有檔案的完整路徑。
 * 若目錄中包含子目錄，將繼續遞迴深入其子目錄，直到將所有檔案的路徑都儲存在返回的陣列中。
 *
 * **注意**：
 * - 此函式採用同步方式處理檔案系統操作，若處理的目錄包含大量內容，可能導致主程序阻塞。
 * - 對於需要非阻塞行為的情況，應考慮使用對應的非同步函式來實現。
 *
 * @example
 * // 範例：列出當前目錄及其子目錄中的所有檔案絕對路徑
 * const 起始路徑 = './my-folder';
 * const 所有檔案 = 列出目錄下所有檔案(起始路徑);
 * console.log(所有檔案);
 * // 輸出可能為：
 * // [
 * //   '/my-folder/file1.txt',
 * //   '/my-folder/subfolder/file2.txt',
 * //   '/my-folder/subfolder/file3.jpg'
 * // ]
 *
 * @throws {Error}
 * 當提供的目錄無效或發生讀取錯誤時，該函式將拋出異常。例如：
 * - 提供的路徑不存在。
 * - 無法訪問指定的目錄（權限不足）。
 */
function 列出目錄下所有檔案(起始路徑, 檔案陣列 = []) {
	const files = fs.readdirSync(起始路徑); // 讀取目錄內容

	files.forEach((file) => {
		const fullPath = path.join(起始路徑, file); // 合成檔案的完整路徑
		const stats = fs.statSync(fullPath); // 獲取檔案或目錄的狀態

		if (stats.isDirectory()) {
			// 若是目錄，進行遞迴操作
			列出目錄下所有檔案(fullPath, 檔案陣列);
		} else {
			// 若是檔案，加入結果陣列
			檔案陣列.push(fullPath);
		}
	});

	return 檔案陣列;
}

module.exports = 列出目錄下所有檔案;

module.exports = {
	列出目錄下所有檔案
};
