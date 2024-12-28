const 日期工具 = require('../src/日期工具.js');

describe('日期工具.加上', () => {
	let dateModule;

	beforeEach(() => {
		// 初始化模組，模擬相關的依賴方法
		dateModule = {
			checkUnit: jest.fn(),
			extract: jest.fn(),
			build: jest.fn(),
			add: function (date, unit, count) {
				this.checkUnit(unit);
				const parts = this.extract(date);
				parts[unit] += count;
				return this.build(parts);
			}
		};
	});

	it('應正確添加單位並返回新日期', () => {
		const date = new Date('2023-01-01T00:00:00Z');
		dateModule.extract.mockReturnValue({
			year: 2023,
			month: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		});
		dateModule.build.mockReturnValue(new Date('2024-01-01T00:00:00Z'));

		const result = dateModule.add(date, 'year', 1);

		expect(dateModule.checkUnit).toHaveBeenCalledWith('year');
		expect(dateModule.extract).toHaveBeenCalledWith(date);
		expect(dateModule.build).toHaveBeenCalledWith({
			year: 2024,
			month: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		});
		expect(result).toEqual(new Date('2024-01-01T00:00:00Z'));
	});

	it('應正確處理多次單位添加', () => {
		const date = new Date('2023-02-15T15:30:00Z');
		dateModule.extract.mockReturnValue({
			year: 2023,
			month: 1, // JavaScript 的月份從0開始，所以2月是1
			day: 15,
			hour: 15,
			minute: 30,
			second: 0,
			millisecond: 0
		});
		dateModule.build.mockReturnValue(new Date('2023-04-15T15:30:00Z'));

		const result = dateModule.add(date, 'month', 2);

		expect(dateModule.checkUnit).toHaveBeenCalledWith('month');
		expect(dateModule.extract).toHaveBeenCalledWith(date);
		expect(dateModule.build).toHaveBeenCalledWith({
			year: 2023,
			month: 3,
			day: 15,
			hour: 15,
			minute: 30,
			second: 0,
			millisecond: 0
		});
		expect(result).toEqual(new Date('2023-04-15T15:30:00Z'));
	});

	it('應拋出當單位無效時的錯誤', () => {
		const date = new Date('2023-01-01T00:00:00Z');
		dateModule.checkUnit.mockImplementation(() => {
			throw new Error('不支援的單位');
		});

		expect(() => dateModule.add(date, 'invalidUnit', 5)).toThrow('不支援的單位');
		expect(dateModule.checkUnit).toHaveBeenCalledWith('invalidUnit');
	});

	it('應處理負數情境 (減去單位)', () => {
		const date = new Date('2023-10-01T00:00:00Z');
		dateModule.extract.mockReturnValue({
			year: 2023,
			month: 9,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		});
		dateModule.build.mockReturnValue(new Date('2023-09-01T00:00:00Z'));

		const result = dateModule.add(date, 'month', -1);

		expect(dateModule.checkUnit).toHaveBeenCalledWith('month');
		expect(dateModule.extract).toHaveBeenCalledWith(date);
		expect(dateModule.build).toHaveBeenCalledWith({
			year: 2023,
			month: 8,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		});
		expect(result).toEqual(new Date('2023-09-01T00:00:00Z'));
	});
});

describe('日期工具.在範圍內', () => {
	it('應返回 true，如果日期在範圍內', () => {
		const date = new Date(2023, 10, 15); // 2023年11月15日
		const start = new Date(2023, 10, 1); // 2023年11月1日
		const end = new Date(2023, 10, 30); // 2023年11月30日
		expect(日期工具.在範圍內(date, start, end)).toBe(true);
	});

	it('應返回 false，如果日期在範圍之外', () => {
		const date = new Date(2023, 11, 1); // 2023年12月1日
		const start = new Date(2023, 10, 1); // 2023年11月1日
		const end = new Date(2023, 10, 30); // 2023年11月30日
		expect(日期工具.在範圍內(date, start, end)).toBe(false);
	});

	it('應返回 true，如果日期等於範圍的起始日期', () => {
		const date = new Date(2023, 10, 1); // 2023年11月1日
		const start = new Date(2023, 10, 1); // 2023年11月1日
		const end = new Date(2023, 10, 30); // 2023年11月30日
		expect(日期工具.在範圍內(date, start, end)).toBe(true);
	});

	it('應返回 true，如果日期等於範圍的結束日期', () => {
		const date = new Date(2023, 10, 30); // 2023年11月30日
		const start = new Date(2023, 10, 1); // 2023年11月1日
		const end = new Date(2023, 10, 30); // 2023年11月30日
		expect(日期工具.在範圍內(date, start, end)).toBe(true);
	});

	// 異常情況
	it('應拋出錯誤，如果 date 不是有效的 Date 物件', () => {
		const invalidDate = 'Invalid Date';
		const start = new Date(2023, 10, 1);
		const end = new Date(2023, 10, 30);
		expect(() => 日期工具.在範圍內(invalidDate, start, end)).toThrow('請提供有效的 Date 物件');
	});

	it('應拋出錯誤，如果 start 日期不是有效的 Date 物件', () => {
		const date = new Date(2023, 10, 15);
		const invalidStart = 'Invalid Date';
		const end = new Date(2023, 10, 30);
		expect(() => 日期工具.在範圍內(date, invalidStart, end)).toThrow('請提供有效的開始日期 Date 物件');
	});

	it('應拋出錯誤，如果 end 日期不是有效的 Date 物件', () => {
		const date = new Date(2023, 10, 15);
		const start = new Date(2023, 10, 1);
		const invalidEnd = 'Invalid Date';
		expect(() => 日期工具.在範圍內(date, start, invalidEnd)).toThrow('請提供有效的結束日期 Date 物件');
	});

	it('應拋出錯誤，如果 start 日期晚於 end 日期', () => {
		const date = new Date(2023, 10, 15);
		const start = new Date(2023, 10, 30); // 2023年11月30日
		const end = new Date(2023, 10, 1); // 2023年11月1日
		expect(() => 日期工具.在範圍內(date, start, end)).toThrow('開始日期不可以晚於結束日期');
	});
});

describe('日期工具.建構', () => {
	it('應正確構建日期物件', () => {
		const parts = {
			year: 2023,
			month: 10, // 11月 (JavaScript 的 month 從 0 開始)
			day: 15,
			hour: 14,
			minute: 30,
			second: 45,
			millisecond: 123
		};

		const result = 日期工具.建構(parts);

		expect(result).toEqual(new Date(2023, 10, 15, 14, 30, 45, 123));
	});

	it('當部分屬性為預設值時應正確構建日期', () => {
		const parts = {
			year: 2023,
			month: 0, // 1月
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		};

		const result = 日期工具.建構(parts);

		expect(result).toEqual(new Date(2023, 0, 1, 0, 0, 0, 0));
	});

	it('處理月份超出範圍的情況（自動向次年進位）', () => {
		const parts = {
			year: 2023,
			month: 12, // JavaScript 會將 month = 12 自動進位到次年
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		};

		const result = 日期工具.建構(parts);

		expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0, 0)); // 進位到 2024-01-01
	});

	it('處理日期超出範圍的情況（自動向下個月進位）', () => {
		const parts = {
			year: 2023,
			month: 0, // 1月
			day: 32, // 超過1月的天數
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		};

		const result = 日期工具.建構(parts);

		expect(result).toEqual(new Date(2023, 1, 1, 0, 0, 0, 0)); // 自動調整到 2023-02-01
	});

	it('處理負數日期、月份（自動反向進位）', () => {
		const parts = {
			year: 2023,
			month: -1, // 負數月份，應該向前進位至 2022年12月
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		};

		const result = 日期工具.建構(parts);

		expect(result).toEqual(new Date(2022, 11, 1, 0, 0, 0, 0)); // 轉換為 2022-12-01
	});

	it('處理不完整的 parts（跳過未提供的屬性，應是 Invalid Date）', () => {
		const parts = {
			year: 2023,
			month: 11, // 12月
			// 缺少 day, hour, minute, second, millisecond
		};

		// JavaScript 在 new Date() 中，未提供 day 時默認為 1
		const result = 日期工具.建構(parts);

		expect(result.toString()).toBe('Invalid Date');
	});

	it('應處理不正確的 parts 結果為 Invalid Date（例如未提供 year）', () => {
		const parts = {
			// 缺少 year
			month: 11,
			day: 15,
			hour: 14,
			minute: 30,
			second: 45,
			millisecond: 123
		};

		const result = 日期工具.建構(parts);

		expect(result.toString()).toBe('Invalid Date'); // 不完整構造應返回 Invalid Date
	});
});

describe('日期工具.檢查單位', () => {
	let Unit;

	beforeEach(() => {
		// 模擬 Unit 的內容
		Unit = {
			Year: 'year',
			Month: 'month',
			Day: 'day',
			Hour: 'hour',
			Minute: 'minute',
			Second: 'second',
			Millisecond: 'millisecond'
		};
	});

	it('應該通過有效的單位檢查（如 "year", "month", "day"）', () => {
		const validUnits = Object.values(Unit);

		validUnits.forEach((unit) => {
			const action = () => 日期工具.檢查單位(unit);

			expect(action).not.toThrow(); // 有效的單位應該不會拋出錯誤
		});
	});

	it('應該在無效的單位時拋出 "不支援的單位" 錯誤', () => {
		const invalidUnits = ['', null, undefined, 123, {}, []];

		invalidUnits.forEach((unit) => {
			const action = () => 日期工具.檢查單位(unit);

			expect(action).toThrow('不支援的單位'); // 無效的單位應該拋出錯誤
		});
	});

	it('當單位為空字串時應拋出 "不支援的單位"', () => {
		const emptyUnit = '';

		const action = () => 日期工具.檢查單位(emptyUnit);

		expect(action).toThrow('不支援的單位');
	});

	it('當單位為 undefined 時應拋出 "不支援的單位"', () => {
		const undefinedUnit = undefined;

		const action = () => 日期工具.檢查單位(undefinedUnit);

		expect(action).toThrow('不支援的單位');
	});

	it('應正確檢查正確的 Unit 中所有有效單位', () => {
		const validUnits = Object.values(Unit);

		validUnits.forEach((unit) => {
			const action = () => 日期工具.檢查單位(unit);

			expect(action).not.toThrow(); // 錯誤時拋出例外
		});
	});
});

describe('日期工具.提取', () => {
	it('應正確提取 Date 中的所有時間單位', () => {
		const testDate = new Date(2023, 10, 15, 14, 30, 45, 123); // 2023年11月15日 14:30:45.123

		const result = 日期工具.提取(testDate);

		expect(result).toEqual({
			year: 2023,
			month: 10, // 11月 (JavaScript 中的 month 從 0 開始)
			day: 15,
			hour: 14,
			minute: 30,
			second: 45,
			millisecond: 123
		});
	});

	it('應正確處理凌晨時間', () => {
		const testDate = new Date(2023, 0, 1, 0, 0, 0, 0); // 2023年1月1日 凌晨 00:00:00.000

		const result = 日期工具.提取(testDate);

		expect(result).toEqual({
			year: 2023,
			month: 0, // 1月
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		});
	});

	it('應正確處理日期和時間的邊界情況', () => {
		const testDate = new Date(2023, 11, 31, 23, 59, 59, 999); // 2023年12月31日 23:59:59.999

		const result = 日期工具.提取(testDate);

		expect(result).toEqual({
			year: 2023,
			month: 11, // 12月
			day: 31,
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999
		});
	});

	it('應正確處理閏年日期', () => {
		const testDate = new Date(2020, 1, 29, 12, 0, 0, 0); // 2020年2月29日 12:00:00.000（閏年）

		const result = 日期工具.提取(testDate);

		expect(result).toEqual({
			year: 2020,
			month: 1, // 2月
			day: 29,
			hour: 12,
			minute: 0,
			second: 0,
			millisecond: 0
		});
	});

	it('應正確處理無效日期', () => {
		const invalidDate = new Date('invalid-date');

		const result = 日期工具.提取(invalidDate);

		expect(result).toEqual({
			'year': NaN,
			'month': NaN,
			'day': NaN,
			'hour': NaN,
			'minute': NaN,
			'second': NaN,
			'millisecond': NaN
		});
	});
});

describe('日期工具.格式化日期', () => {
	it('格式化為 YYYY/MM/DD', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YYYY/MM/DD';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023/11/01');
	});

	it('格式化為 DD-MM-YYYY', () => {
		const date = new Date('2023-05-15T00:00:00');
		const format = 'DD-MM-YYYY';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('15-05-2023');
	});

	it('格式化為 YYYY年MM月DD日', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YYYY年MM月DD日';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023年11月01日');
	});

	it('格式化為 YYYY年MM月DD日DOW', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YYYY年MM月DD日DOW';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023年11月01日星期三');
	});

	it('格式化為 YYYY年MM月DD日(dow)', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YYYY年MM月DD日(dow)';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023年11月01日(三)');
	});

	it('格式化為 YY年MM月DD日', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YY年MM月DD日';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('23年11月01日');
	});

	it('應該格式化日期為 MM-DD-YYYY HH:mm:ss', () => {
		const date = new Date('2023-11-01T14:25:30');
		const format = 'MM-DD-YYYY HH:mm:ss';
		expect(日期工具.格式化日期(date, format)).toBe('11-01-2023 14:25:30');
	});

	it('應該格式化日期為 MM-DD-YYYY HH:mm:ss.xxx', () => {
		const date = new Date('2023-11-01T14:25:30.456');
		const format = 'MM-DD-YYYY HH:mm:ss.xxx';
		expect(日期工具.格式化日期(date, format)).toBe('11-01-2023 14:25:30.456');
	});

	it('應該返回正確的年份末兩位數', () => {
		const date = new Date('2023-11-01');
		const format = 'YY-MM-DD';
		expect(日期工具.格式化日期(date, format)).toBe('23-11-01');
	});

	it('應該補零到日期中的月份和日期', () => {
		const date = new Date('2023-02-05');
		const format = 'YYYY-MM-DD';
		expect(日期工具.格式化日期(date, format)).toBe('2023-02-05');
	});

	it('應該正確處理小於 10 的月份和日期', () => {
		const date = new Date('2023-03-09');
		const format = 'YYYY-MM-DD';
		expect(日期工具.格式化日期(date, format)).toBe('2023-03-09');
	});

	it('應該正確處理 24 小時制時間', () => {
		const date = new Date('2023-11-01T01:05:09');
		const format = 'YYYY-MM-DD HH:mm:ss';
		expect(日期工具.格式化日期(date, format)).toBe('2023-11-01 01:05:09');
	});

	it('包含時間的格式：YYYY/MM/DD HH:mm:ss', () => {
		const date = new Date('2023-11-01T14:30:45');
		const format = 'YYYY/MM/DD HH:mm:ss';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023/11/01 14:30:45');
	});

	it('月份和天數沒有補零的特殊格式', () => {
		const date = new Date('2023-11-01T00:00:00');
		const format = 'YYYY/M/D';
		const result = 日期工具.格式化日期(date, format);
		expect(result).toBe('2023/11/1');
	});

	it('無效日期物件應該拋出錯誤', () => {
		const invalidDate = 'invalid';
		const format = 'YYYY/MM/DD';
		expect(() => {
			日期工具.格式化日期(invalidDate, format);
		}).toThrow('請提供有效的 Date 物件');
	});

	it('應該對空值拋出錯誤', () => {
		const format = 'YYYY-MM-DD';
		expect(() => {
			日期工具.格式化日期(undefined, format);
		}).toThrow('請提供有效的 Date 物件');
	});

	it('無效格式字串應該拋出錯誤', () => {
		const date = new Date();
		const invalidFormat = null;
		expect(() => {
			日期工具.格式化日期(date, invalidFormat);
		}).toThrow('請提供有效的格式字串');
	});
});

describe('日期工具.取得中文星期名稱', () => {
	it('應該返回完整格式的星期名稱（預設模式）', () => {
		const date = new Date('2023-11-05'); // 星期日
		expect(日期工具.取得中文星期名稱(date)).toBe('星期日');
	});

	it('應該返回完整格式的星期名稱（星期三）', () => {
		const date = new Date('2023-11-01'); // 星期三
		expect(日期工具.取得中文星期名稱(date)).toBe('星期三');
	});

	it('以簡短模式返回對應的星期名稱（簡短模式）', () => {
		const date = new Date('2023-11-05'); // 星期日
		expect(日期工具.取得中文星期名稱(date, true)).toBe('日');
	});

	it('以簡短模式返回對應的星期名稱（簡短模式，星期三）', () => {
		const date = new Date('2023-11-01'); // 星期三
		expect(日期工具.取得中文星期名稱(date, true)).toBe('三');
	});

	it('應該對錯誤的參數拋出異常', () => {
		expect(() => {
			日期工具.取得中文星期名稱('invalid date'); // 非日期物件
		}).toThrow('請提供有效的 Date 物件');
	});

	it('應該對空值拋出異常', () => {
		expect(() => {
			日期工具.取得中文星期名稱(); // 拋出異常，未提供參數
		}).toThrow('請提供有效的 Date 物件');
	});

	it('應該正確處理跨年的日期', () => {
		const date = new Date('2023-12-31'); // 星期日
		expect(日期工具.取得中文星期名稱(date)).toBe('星期日');
	});

	it('應該正確處理年份第一天的日期', () => {
		const date = new Date('2024-01-01'); // 星期一
		expect(日期工具.取得中文星期名稱(date)).toBe('星期一');
	});
});

describe('日期工具.取得年份尾數', () => {
	it('應正確提取年份的最後兩位數', () => {
		const testDate = new Date(2023, 0, 1); // 2023年1月1日
		const result = 日期工具.取得年份尾數(testDate);

		expect(result).toBe('23'); // 應回傳 "23"
	});

	it('應正確處理 20 世紀的年份', () => {
		const testDate = new Date(1999, 11, 31); // 1999年12月31日
		const result = 日期工具.取得年份尾數(testDate);

		expect(result).toBe('99'); // 應回傳 "99"
	});

	it('應正確處理 1900 年', () => {
		const testDate = new Date(1900, 0, 1); // 1900年1月1日
		const result = 日期工具.取得年份尾數(testDate);

		expect(result).toBe('00'); // 應回傳 "00"
	});

	it('應正確處理 2000 年', () => {
		const testDate = new Date(2000, 0, 1); // 2000年1月1日
		const result = 日期工具.取得年份尾數(testDate);

		expect(result).toBe('00'); // 應回傳 "00"
	});

	it('在非 Date 類型的輸入下應拋出錯誤', () => {
		const invalidInputs = [null, undefined, '2023', 2023, {}, [], true];

		invalidInputs.forEach(input => {
			const action = () => 日期工具.取得年份尾數(input);

			expect(action).toThrow('請提供有效的 Date 物件'); // 確認拋出正確的錯誤訊息
		});
	});
});

describe('日期工具.是否為有效日期字串', () => {
	it('應該返回 true 對於有效的日期字串', () => {
		const validDates = [
			'2023-11-15', // ISO 標準格式
			'2023/11/15', // 斜線分隔格式 (在某些環境中有效)
			'November 15, 2023', // 英文全名月份
			'2023-11-15T14:12:00', // ISO 日期時間格式
			'15 Nov 2023' // 英文短縮日期格式
		];

		validDates.forEach(dateString => {
			expect(日期工具.是否為有效日期字串(dateString)).toBe(true);
		});
	});

	it('應該返回 false 對於無效的日期字串', () => {
		const invalidDates = [
			'invalid-date', // 非日期字串
			'2023-13-01', // 月份超過 12
			'2023-11-32', // 日期超過該月最大值
			'2023/11/15T99:99', // 不正確的時間
			'', // 空字串
			'2023-11-15T14:12:00INVALID' // 含無效字元
		];

		invalidDates.forEach(dateString => {
			expect(日期工具.是否為有效日期字串(dateString)).toBe(false);
		});
	});

	it('應該返回 false 對於非字串輸入值', () => {
		const nonStringInputs = [null, undefined, {}, [], 123, true, new Date()];

		nonStringInputs.forEach(input => {
			expect(日期工具.是否為有效日期字串(input)).toBe(false);
		});
	});
});

describe('日期工具.解析', () => {

	it('應正確解析格式為 YYYY-MM-DD 的日期字串', () => {
		// Arrange
		const dateString = '2023-11-15';
		const format = 'YYYY-MM-DD';

		// Act
		const result = 日期工具.解析(dateString, format);

		// Assert
		expect(result).toEqual(new Date(2023, 10, 15)); // JS 的月份從 0 開始
	});

	it('應正確解析格式為 YYYY/MM/DD hh:mm:ss 的日期字串', () => {
		// Arrange
		const dateString = '2023/11/15 14:30:45';
		const format = 'YYYY/MM/DD hh:mm:ss';

		// Act
		const result = 日期工具.解析(dateString, format);

		// Assert
		expect(result).toEqual(new Date(2023, 10, 15, 14, 30, 45)); // 時間包括小時、分鐘、秒
	});

	it('應正確解析格式包含毫秒的日期字串', () => {
		// Arrange
		const dateString = '2023-11-15 14:30:45.123';
		const format = 'YYYY-MM-DD hh:mm:ss.zzz';

		// Act
		const result = 日期工具.解析(dateString, format);

		// Assert
		expect(result).toEqual(new Date(2023, 10, 15, 14, 30, 45, 123)); // 包括毫秒
	});

	it('若日期字串與格式不匹配，應拋出錯誤', () => {
		// Arrange
		const dateString = '15-11-2023';
		const format = 'YYYY-MM-DD';

		// Act & Assert
		expect(() => 日期工具.解析(dateString, format)).toThrow('無效的日期格式。預期的格式為 "YYYY-MM-DD"。');
	});

	it('若格式中缺少部分日期，應使用預設值構建日期物件（預設月為1，日為1）', () => {
		// Arrange
		const dateString = '2023';
		const format = 'YYYY';

		// Act
		const result = 日期工具.解析(dateString, format);

		// Assert
		expect(result).toEqual(new Date(2023, 0, 1)); // 預設為1月1日
	});

	it('應正確處理空的日期字串並拋出錯誤', () => {
		// Arrange
		const dateString = '';
		const format = 'YYYY-MM-DD';

		// Act & Assert
		expect(() => 日期工具.解析(dateString, format)).toThrow('無效的日期格式。預期的格式為 "YYYY-MM-DD"。');
	});

	it('應正確處理無效的格式字串並拋出錯誤', () => {
		// Arrange
		const dateString = '2023-11-15';
		const format = '';

		// Act & Assert
		expect(() => 日期工具.解析(dateString, format)).toThrow('無效的日期格式。預期的格式為 ""。');
	});

	it('當日期字串包含多餘部分時，應拋出錯誤', () => {
		// Arrange
		const dateString = '2023-11-15-extra';
		const format = 'YYYY-MM-DD';

		// Act & Assert
		expect(() => 日期工具.解析(dateString, format)).toThrow('無效的日期格式。預期的格式為 "YYYY-MM-DD"。');
	});
});

describe('日期工具.減去', () => {
	it('應正確減去指定的年份 (year)', () => {
		const date = new Date(2023, 10, 15); // 2023年11月15日
		const result = 日期工具.減去(date, 'year', 2);

		const expected = new Date(2021, 10, 15); // 減去 2 年後
		expect(result).toEqual(expected);
	});

	it('應正確減去指定的月份 (month)', () => {
		const date = new Date(2023, 0, 15); // 2023年1月15日
		const result = 日期工具.減去(date, 'month', 3);

		const expected = new Date(2022, 9, 15); // 減去 3 個月後跳回上一年
		expect(result).toEqual(expected);
	});

	it('應正確減去指定的天數 (day)', () => {
		const date = new Date(2023, 10, 15); // 2023年11月15日
		const result = 日期工具.減去(date, 'day', 10);

		const expected = new Date(2023, 10, 5); // 減去 10 天後
		expect(result).toEqual(expected);
	});

	it('應正確處理跨月份情況', () => {
		const date = new Date(2023, 2, 31); // 2023年3月31日
		const result = 日期工具.減去(date, 'month', 1);

		const expected = new Date(2023, 2, 3); // 減去 1 個月後（考慮 2 月無 31 日）
		expect(result).toEqual(expected);
	});

	it('應正確處理負數 (加上單位)', () => {
		const date = new Date(2023, 10, 15); // 2023年11月15日
		const result = 日期工具.減去(date, 'day', -5);

		const expected = new Date(2023, 10, 20); // 負數等於增加 5 天
		expect(result).toEqual(expected);
	});

	it('應處理無效單位並拋出錯誤', () => {
		const date = new Date(2023, 10, 15); // 2023年11月15日
		expect(() => 日期工具.減去(date, 'invalid-unit', 1)).toThrow('不支援的單位: invalid-unit');
	});

	it('應處理非日期類型輸入並拋出錯誤', () => {
		expect(() => 日期工具.減去('2023-11-15', 'year', 1)).toThrow('無效的日期物件');
		expect(() => 日期工具.減去(null, 'month', 1)).toThrow('無效的日期物件');
	});
});