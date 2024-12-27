const 字串工具 = require('../src/字串工具');
const 錯誤訊息 = require('../src/錯誤訊息');

describe('測試【重複】', function () {
	it('沒有傳入參數，應回傳 undefined', () => {
		expect(字串工具.重複()).toBeUndefined();
	});

	it('只傳入 pattern，應回傳 undefined', () => {
		expect(字串工具.重複('a')).toBeUndefined();
	});

	it('count < 0，應回傳 undefined', () => {
		expect(字串工具.重複('a', -1)).toBeUndefined();
	});

	it('count = 0，應回傳 ""', () => {
		expect(字串工具.重複('a', 0)).toBe('');
	});

	it('單一字元重複3次，應回傳3個字元', () => {
		expect(字串工具.重複('a', 3)).toBe('aaa');
	});

	it('三個字元重複3次，應回傳9個字元', () => {
		expect(字串工具.重複('abc', 3)).toBe('abcabcabc');
	});
});

describe('測試【格式化】', function () {
	it('沒有傳入參數，應拋出 Error', () => {
		expect(() => 字串工具.格式化()).toThrow(錯誤訊息.格式化.至少要有二個參數);
	});

	it('只有模板，沒有傳入值，應拋出 Error', () => {
		expect(() => 字串工具.格式化('{1}')).toThrow(錯誤訊息.格式化.至少要有二個參數);
	});

	it('模板裡面沒有變數，應拋出 Error', () => {
		expect(() => 字串工具.格式化('test', 1)).toThrow(錯誤訊息.格式化.模板裡面未設定變數);
	});

	it('參數比值多，應拋出 Error', () => {
		expect(() => 字串工具.格式化('{1}{2}', 1))
			.toThrow(錯誤訊息.格式化.參數與模板裡面的變數數量不同);
	});

	it('參數比值少，應拋出 Error', () => {
		expect(() => 字串工具.格式化('{1}', 1, 2))
			.toThrow(錯誤訊息.格式化.參數與模板裡面的變數數量不同);
	});

	it('沒有參數有值，應拋出 Error', () => {
		expect(() => 字串工具.格式化('', 1, 2)).toThrow(錯誤訊息.格式化.模板不可以是空值);
	});

	it('參數編號大於值的數目，應拋出 Error', () => {
		expect(() => 字串工具.格式化('{4}{5}{6}', 1, 2, 3)).toThrow(Error);
	});

	it('參數編號亂跳，應能正確取代變數', () => {
		expect(字串工具.格式化('{3}{2}{1}', 1, 2, 3)).toBe('321');
	});

	it('值為 null，應可取代變數', () => {
		expect(字串工具.格式化('{1}{2}{3}', null, null, null)).toBe('nullnullnull');
	});

	it('文字參數，應可取代變數', () => {
		expect(字串工具.格式化('{1}{2}{3}', 'A', 'B', 'C')).toBe('ABC');
	});
});

describe('測試【詞彙是否同時出現在句子中】', function () {
	it('["Hi", "There"] 應出現在 "Hi~ There"', () => {
		expect(字串工具.詞彙是否同時出現在句子中(['Hi', 'There'], 'Hi~ There')).toBe(true);
	});
});

describe('測試【移除空白字元】', function () {
	it('" 123 " 應回傳 "123" ', () => {
		expect(字串工具.移除空白字元(' 123 ')).toBe('123');
	});

	it('" 123 " 應回傳 "123" ', () => {
		expect(字串工具.移除空白字元()).toBe('');
	});
});
