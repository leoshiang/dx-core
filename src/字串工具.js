/** @module 字串工具 **/

const 錯誤訊息 = require('./錯誤訊息');

function 格式化 (模板) {
	if (arguments.length < 2) {
		throw new Error(錯誤訊息.格式化.至少要有二個參數);
	}

	if (!模板) {
		throw new Error(錯誤訊息.格式化.模板不可以是空值);
	}

	let variables = 模板.match(/{([0-9]+)}/gi);
	if (!variables) {
		throw new Error(錯誤訊息.格式化.模板裡面未設定變數);
	}

	if (variables.length !== arguments.length - 1) {
		throw new Error(錯誤訊息.格式化.參數與模板裡面的變數數量不同);
	}

	let result = 模板;
	for (let i = 1; i < arguments.length; i++) {
		let regex = new RegExp('\\{' + i + '\\}', 'gi');
		if (!regex.test(模板)) {
			throw new Error('在模板裡面沒有 ' + i + 1 + ' 的變數');
		}
		result = result.replace(regex, arguments[i]);
	}

	return result;
}

/**
 *
 * @param pattern
 * @param count
 * @returns {string}
 */
function 重複 (pattern, count) {
	if (arguments.length < 2 || count < 0 || (!pattern)) {
		return undefined;
	}
	return new Array(count + 1).join(pattern);
}

/**
 * 判斷詞彙是否同時出現在句子中。
 * @param {string[]} 詞彙 詞彙陣列，["new", "york"]
 * @param {string} 句子 句子
 * @returns {boolean}
 */
const 詞彙是否同時出現在句子中 = (詞彙, 句子) => {
	return 詞彙.filter(x => 句子.indexOf(x) >= 0).length > 0;
};

/**
 * 移除空白字元(\r\t\n\f)。
 * @param 字串 {string}
 * @returns {string}
 */
const 移除空白字元 = (字串 = '') => {
	return 字串.replace(/\s/g, '');
};

module.exports = {
	格式化,
	重複,
	詞彙是否同時出現在句子中,
	移除空白字元,
}
