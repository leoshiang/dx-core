const fetch = require('sync-fetch');

/**
 * 地址轉座標(WGS84)
 * @param {string[]} addresses
 * @return {string[]}
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