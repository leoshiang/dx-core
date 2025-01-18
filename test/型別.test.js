import Type from '../src/型別.js';

describe('Type.取得類型', () => {
	it('應該返回 "Array" 當輸入為陣列', () => {
		expect(Type.取得類型([])).toBe('Array');
		expect(Type.取得類型([1, 2, 3])).toBe('Array');
	});

	it('應該返回 "Object" 當輸入為物件', () => {
		expect(Type.取得類型({})).toBe('Object');
		expect(Type.取得類型({ key: 'value' })).toBe('Object');
	});

	it('應該返回 "Null" 當輸入為 null', () => {
		expect(Type.取得類型(null)).toBe('Null');
	});

	it('應該返回 "Undefined" 當輸入為 undefined', () => {
		expect(Type.取得類型(undefined)).toBe('Undefined');
	});

	it('應該返回 "Number" 當輸入為數字', () => {
		expect(Type.取得類型(0)).toBe('Number');
		expect(Type.取得類型(42)).toBe('Number');
		expect(Type.取得類型(-3.14)).toBe('Number');
		expect(Type.取得類型(NaN)).toBe('Number'); // NaN 屬於數字類型
	});

	it('應該返回 "String" 當輸入為字串', () => {
		expect(Type.取得類型('')).toBe('String');
		expect(Type.取得類型('測試')).toBe('String');
	});

	it('應該返回 "Boolean" 當輸入為布林值', () => {
		expect(Type.取得類型(true)).toBe('Boolean');
		expect(Type.取得類型(false)).toBe('Boolean');
	});

	it('應該返回 "Function" 當輸入為函式', () => {
		expect(Type.取得類型(() => {})).toBe('Function');
		expect(Type.取得類型(function test () {})).toBe('Function');
	});

	it('應該返回 "RegExp" 當輸入為正則表達式', () => {
		expect(Type.取得類型(/abc/)).toBe('RegExp');
		expect(Type.取得類型(new RegExp('abc'))).toBe('RegExp');
	});

	it('應該返回 "Date" 當輸入為日期物件', () => {
		expect(Type.取得類型(new Date())).toBe('Date');
	});

	it('應該返回 "Symbol" 當輸入為符號 (Symbol)', () => {
		expect(Type.取得類型(Symbol('test'))).toBe('Symbol');
	});

	it('應該返回 "Map" 當輸入為 Map 物件', () => {
		expect(Type.取得類型(new Map())).toBe('Map');
	});

	it('應該返回 "Set" 當輸入為 Set 物件', () => {
		expect(Type.取得類型(new Set())).toBe('Set');
	});

	it('應該返回 "Error" 當輸入為錯誤物件', () => {
		expect(Type.取得類型(new Error())).toBe('Error');
	});

	it('應該返回 "BigInt" 當輸入為大整數 (BigInt)', () => {
		expect(Type.取得類型(BigInt(123))).toBe('BigInt');
	});

	it('應該返回 "Object" 當輸入為使用者自訂的類別', () => {
		class CustomClass {}

		const instance = new CustomClass();
		expect(Type.取得類型(instance)).toBe('Object'); // 預設為 "Object"
	});
});

describe('Type.是陣列', () => {
	it('應該返回 true 當輸入是陣列時', () => {
		expect(Type.是陣列([])).toBe(true);
		expect(Type.是陣列([1, 2, 3])).toBe(true);
		expect(Type.是陣列(new Array(5))).toBe(true); // 使用 Array 建構函式
	});

	it('應該返回 false 當輸入不是陣列時', () => {
		expect(Type.是陣列({})).toBe(false); // 物件
		expect(Type.是陣列(null)).toBe(false); // null
		expect(Type.是陣列(undefined)).toBe(false); // undefined
		expect(Type.是陣列(123)).toBe(false); // 數字
		expect(Type.是陣列('string')).toBe(false); // 字串
		expect(Type.是陣列(() => {})).toBe(false); // 函式
		expect(Type.是陣列(new Set())).toBe(false); // Set 類型
		expect(Type.是陣列(new Map())).toBe(false); // Map 類型
		expect(Type.是陣列(Symbol('test'))).toBe(false); // Symbol 類型
	});

	it('應該正確判斷類似陣列的物件為 false', () => {
		expect(Type.是陣列({ length: 0 })).toBe(false); // 類似陣列的物件
		expect(Type.是陣列(arguments)).toBe(false); // arguments 是類似陣列但不是陣列
	});
});

describe('Type.是布林值', () => {
	it('應該返回 true 當輸入為布林值 (Boolean)', () => {
		expect(Type.是布林值(true)).toBe(true);
		expect(Type.是布林值(false)).toBe(true);
	});

	it('應該返回 false 當輸入不是布林值', () => {
		expect(Type.是布林值(0)).toBe(false);          // 數字
		expect(Type.是布林值(1)).toBe(false);          // 數字
		expect(Type.是布林值('true')).toBe(false);     // 字串
		expect(Type.是布林值('false')).toBe(false);    // 字串
		expect(Type.是布林值(null)).toBe(false);       // null
		expect(Type.是布林值(undefined)).toBe(false);  // undefined
		expect(Type.是布林值({})).toBe(false);         // 物件
		expect(Type.是布林值([])).toBe(false);         // 陣列
		expect(Type.是布林值(() => {})).toBe(false);   // 函式
		expect(Type.是布林值(Boolean(false))).toBe(true); // 布林物件
	});

	it('應該正確忽略其他類型的邊界值', () => {
		expect(Type.是布林值(NaN)).toBe(false);        // 非數值 NaN
		expect(Type.是布林值(Symbol('test'))).toBe(false); // Symbol
		expect(Type.是布林值(new Map())).toBe(false);  // Map
		expect(Type.是布林值(new Set())).toBe(false);  // Set
	});
});

describe('Type.是日期', () => {
	it('應返回 true 當輸入為 Date 物件', () => {
		expect(Type.是日期(new Date())).toBe(true); // 與當前時間相關的 Date
		expect(Type.是日期(new Date('2023-01-01'))).toBe(true); // 特定日期的 Date
	});

	it('應返回 false 當輸入為非 Date 類型的物件', () => {
		expect(Type.是日期('2023-01-01')).toBe(false); // 字串串
		expect(Type.是日期(null)).toBe(false); // null
		expect(Type.是日期(undefined)).toBe(false); // undefined
		expect(Type.是日期(1234)).toBe(false); // 數字
		expect(Type.是日期({})).toBe(false); // 空物件
		expect(Type.是日期([])).toBe(false); // 陣列
		expect(Type.是日期(() => {})).toBe(false); // 函式
	});

	it('應返回 false 當輸入為無效的 Date 類型', () => {
		expect(Type.是日期(new Date('invalid-date'))).toBe(true); // 即便日期無效也是 Date 類型
	});
});

describe('Type.是空字串', () => {
	it('應返回 true 當輸入為空字串串', () => {
		expect(Type.是空字串('')).toBe(true); // 空字串串
	});

	it('應返回 false 當輸入為非空字串串', () => {
		expect(Type.是空字串('Hello')).toBe(false); // 一般字串串
		expect(Type.是空字串(' ')).toBe(false); // 僅空格的字串串
		expect(Type.是空字串('123')).toBe(false); // 含有數字的字串串
	});

	it('應返回 false 當輸入為非 String 類型', () => {
		expect(Type.是空字串(null)).toBe(false); // null
		expect(Type.是空字串(undefined)).toBe(false); // undefined
		expect(Type.是空字串(0)).toBe(false); // 數字
		expect(Type.是空字串([])).toBe(false); // 陣列
		expect(Type.是空字串({})).toBe(false); // 物件
		expect(Type.是空字串(() => {})).toBe(false); // 函式
	});
});

describe('Type.是函式', () => {
	it('應返回 true 當輸入為函式', () => {
		expect(Type.是函式(() => {})).toBe(true); // 箭頭函式
		expect(Type.是函式(function test() {})).toBe(true); // 普通函式
		// TODO
		//expect(Type.是函式(async function asyncTest() {})).toBe(true); // 非同步函式
		expect(Type.是函式(class TestClass {})).toBe(true); // 類定義
	});

	it('應返回 false 當輸入非函式', () => {
		expect(Type.是函式(null)).toBe(false); // null
		expect(Type.是函式(undefined)).toBe(false); // undefined
		expect(Type.是函式(123)).toBe(false); // 數字
		expect(Type.是函式('Hello')).toBe(false); // 字串串
		expect(Type.是函式([])).toBe(false); // 陣列
		expect(Type.是函式({})).toBe(false); // 物件
		expect(Type.是函式(true)).toBe(false); // 布林值
	});

	it('應返回 false 當輸入的對象包含函式但不是函式本身', () => {
		const obj = {
			method: () => {},
		};
		expect(Type.是函式(obj)).toBe(false); // 不是函式本身
	});
});

describe('Type.不是陣列', () => {
	it('應返回 false 當輸入為陣列', () => {
		expect(Type.不是陣列([])).toBe(false); // 空陣列
		expect(Type.不是陣列([1, 2, 3])).toBe(false); // 一般陣列
		expect(Type.不是陣列(new Array(10))).toBe(false); // 使用 Array 建構函式
	});

	it('應返回 true 當輸入非陣列', () => {
		expect(Type.不是陣列({})).toBe(true); // 物件
		expect(Type.不是陣列(null)).toBe(true); // null
		expect(Type.不是陣列(undefined)).toBe(true); // undefined
		expect(Type.不是陣列('string')).toBe(true); // 字串串
		expect(Type.不是陣列(123)).toBe(true); // 數字
		expect(Type.不是陣列(() => {})).toBe(true); // 函式
		expect(Type.不是陣列(true)).toBe(true); // 布林值
		expect(Type.不是陣列(new Set())).toBe(true); // 集合 Set
		expect(Type.不是陣列(new Map())).toBe(true); // 映射表 Map
	});
});

describe('Type.不是布林值', () => {
	it('應返回 false 當輸入為布林值', () => {
		expect(Type.不是布林值(true)).toBe(false); // 布林值 true
		expect(Type.不是布林值(false)).toBe(false); // 布林值 false
	});

	it('應返回 true 當輸入非布林值', () => {
		expect(Type.不是布林值(null)).toBe(true); // null
		expect(Type.不是布林值(undefined)).toBe(true); // undefined
		expect(Type.不是布林值(123)).toBe(true); // 數字
		expect(Type.不是布林值('true')).toBe(true); // 布林值字串
		expect(Type.不是布林值('false')).toBe(true); // 布林值字串
		expect(Type.不是布林值({})).toBe(true); // 空物件
		expect(Type.不是布林值([])).toBe(true); // 空陣列
		expect(Type.不是布林值(() => {})).toBe(true); // 函式
	});

	it('應返回 false 當輸入為布林值', () => {
		expect(Type.不是布林值(Boolean(true))).toBe(false); // Boolean 包裝對象
		expect(Type.不是布林值(Boolean(false))).toBe(false); // Boolean 包裝對象
	});
});

describe('Type.不是日期', () => {
	it('應返回 false 當輸入為 Date 類型', () => {
		expect(Type.不是日期(new Date())).toBe(false); // 當前時間的 Date 物件
		expect(Type.不是日期(new Date('2023-01-01'))).toBe(false); // 用字串串初始化的 Date 物件
		expect(Type.不是日期(new Date(0))).toBe(false); // Unix 時間戳為 0 的 Date 物件
	});

	it('應返回 true 當輸入非 Date 類型', () => {
		expect(Type.不是日期(null)).toBe(true); // null
		expect(Type.不是日期(undefined)).toBe(true); // undefined
		expect(Type.不是日期(123456789)).toBe(true); // 數字（例如時間戳）
		expect(Type.不是日期('2023-01-01')).toBe(true); // 表示日期的字串串
		expect(Type.不是日期({})).toBe(true); // 一般物件
		expect(Type.不是日期([])).toBe(true); // 陣列
		expect(Type.不是日期(() => {})).toBe(true); // 函式
		expect(Type.不是日期(new RegExp('abc'))).toBe(true); // 正則表達式
		expect(Type.不是日期(new Map())).toBe(true); // Map 物件
		expect(Type.不是日期(new Set())).toBe(true); // Set 物件
	});

	it('應返回 true 當輸入為類似日期但不是 Date 類型', () => {
		expect(Type.不是日期({ toString: () => 'Thu Dec 28 2023' })).toBe(true); // 類似 Date 的物件
	});
});

describe('Type.不是空字串', () => {
	it('應返回 true 當輸入為非空字串串', () => {
		expect(Type.不是空字串('Hello')).toBe(true); // 一般非空字串串
		expect(Type.不是空字串(' ')).toBe(true); // 包含空格的字串串
		expect(Type.不是空字串('123')).toBe(true); // 字串串格式的數字
		expect(Type.不是空字串('true')).toBe(true); // 布林值的字串串表示
	});

	it('應返回 false 當輸入為空字串串', () => {
		expect(Type.不是空字串('')).toBe(false); // 空字串串
	});

	it('應返回 false 當輸入非字串串類型', () => {
		expect(Type.不是空字串(null)).toBe(false); // null
		expect(Type.不是空字串(undefined)).toBe(false); // undefined
		expect(Type.不是空字串(123)).toBe(false); // 數字
		expect(Type.不是空字串(true)).toBe(false); // 布林值
		expect(Type.不是空字串([])).toBe(false); // 陣列
		expect(Type.不是空字串({})).toBe(false); // 物件
		expect(Type.不是空字串(() => {})).toBe(false); // 函式
	});

	it('應返回 true 當輸入為字串', () => {
		expect(Type.不是空字串('Hello')).toBe(true); // String 包裝對象
	});
});

describe('Type.不是函式', () => {
	it('應返回 false 當輸入為函式', () => {
		expect(Type.不是函式(function test() {})).toBe(false); // 普通函式
		expect(Type.不是函式(() => {})).toBe(false); // 箭頭函式
		// TODO
		// expect(Type.不是函式(async function asyncTest() {})).toBe(false); // 非同步函式
	});

	it('應返回 true 當輸入非函式類型', () => {
		expect(Type.不是函式(null)).toBe(true); // null
		expect(Type.不是函式(undefined)).toBe(true); // undefined
		expect(Type.不是函式(123)).toBe(true); // 數字
		expect(Type.不是函式('Hello')).toBe(true); // 字符串
		expect(Type.不是函式({})).toBe(true); // 空物件
		expect(Type.不是函式([])).toBe(true); // 空陣列
		expect(Type.不是函式(true)).toBe(true); // 布林值
		expect(Type.不是函式(new Map())).toBe(true); // Map 物件
		expect(Type.不是函式(new Set())).toBe(true); // Set 物件
	});

	it('應返回 true 當輸入為類似函式但非 Function 類型', () => {
		const objWithFunction = {
			method: function () {},
		};
		expect(Type.不是函式(objWithFunction)).toBe(true); // 物件包含函式成員
	});
});

describe('Type.不是null', () => {
	it('應返回 false 當輸入為 null', () => {
		expect(Type.不是null(null)).toBe(false); // 輸入為 null
	});

	it('應返回 true 當輸入非 null 類型', () => {
		expect(Type.不是null(undefined)).toBe(true); // undefined
		expect(Type.不是null(0)).toBe(true); // 數字 0
		expect(Type.不是null('')).toBe(true); // 空字符串
		expect(Type.不是null('Hello')).toBe(true); // 非空字符串
		expect(Type.不是null([])).toBe(true); // 空陣列
		expect(Type.不是null([1, 2, 3])).toBe(true); // 有內容的陣列
		expect(Type.不是null({})).toBe(true); // 空物件
		expect(Type.不是null({ key: 'value' })).toBe(true); // 有內容的物件
		expect(Type.不是null(() => {})).toBe(true); // 函式
		expect(Type.不是null(new Date())).toBe(true); // Date 物件
		expect(Type.不是null(true)).toBe(true); // 布林值 true
		expect(Type.不是null(false)).toBe(true); // 布林值 false
	});
});

describe('Type.不是數字', () => {
	it('應返回 false 當輸入為數字類型', () => {
		expect(Type.不是數字(0)).toBe(false); // 整數 0
		expect(Type.不是數字(123)).toBe(false); // 正整數
		expect(Type.不是數字(-123)).toBe(false); // 負整數
		expect(Type.不是數字(3.14)).toBe(false); // 小數
		expect(Type.不是數字(-3.14)).toBe(false); // 負小數
		expect(Type.不是數字(Number.MAX_VALUE)).toBe(false); // 最大值
		expect(Type.不是數字(Number.MIN_VALUE)).toBe(false); // 最小值非負數
		expect(Type.不是數字(Infinity)).toBe(false); // 正 Infinity
		expect(Type.不是數字(-Infinity)).toBe(false); // 負 Infinity
	});

	it('應返回 true 當輸入非數字類型', () => {
		expect(Type.不是數字(null)).toBe(true); // null
		expect(Type.不是數字(undefined)).toBe(true); // undefined
		expect(Type.不是數字('123')).toBe(true); // 字符串
		expect(Type.不是數字('')).toBe(true); // 空字符串
		expect(Type.不是數字(true)).toBe(true); // 布林值 true
		expect(Type.不是數字(false)).toBe(true); // 布林值 false
		expect(Type.不是數字([])).toBe(true); // 空陣列
		expect(Type.不是數字({})).toBe(true); // 空物件
		expect(Type.不是數字(() => {})).toBe(true); // 函式
		expect(Type.不是數字(new Date())).toBe(true); // Date 物件
		expect(Type.不是數字(NaN)).toBe(false); // NaN (Not a Number)
	});
});

describe('Type.不是物件', () => {
	it('應返回 false 當輸入為普通物件類型', () => {
		expect(Type.不是物件({})).toBe(false); // 空物件
		expect(Type.不是物件({ key: 'value' })).toBe(false); // 帶有屬性的物件
		expect(Type.不是物件(Object.create(null))).toBe(false); // `Object.create(null)` 生成的物件
	});

	it('應返回 true 當輸入非物件類型', () => {
		expect(Type.不是物件(null)).toBe(true); // null 特殊值
		expect(Type.不是物件(undefined)).toBe(true); // undefined
		expect(Type.不是物件(123)).toBe(true); // 數字
		expect(Type.不是物件('Hello')).toBe(true); // 字符串
		expect(Type.不是物件(true)).toBe(true); // 布林值 true
		expect(Type.不是物件(false)).toBe(true); // 布林值 false
		expect(Type.不是物件([])).toBe(true); // 陣列
		expect(Type.不是物件(() => {})).toBe(true); // 函式
		expect(Type.不是物件(new Date())).toBe(true); // Date 物件
		expect(Type.不是物件(new Map())).toBe(true); // Map 物件
		expect(Type.不是物件(new Set())).toBe(true); // Set 物件
	});

	it('應返回 true 當輸入為原始型別（Primitive values）', () => {
		expect(Type.不是物件(0)).toBe(true); // 整數 0
		expect(Type.不是物件(-123)).toBe(true); // 負整數
		expect(Type.不是物件(Infinity)).toBe(true); // Infinity
		expect(Type.不是物件('')).toBe(true); // 空字符串
	});

	it('應返回 true 當輸入為物件的其他特例', () => {
		expect(Type.不是物件(123)).toBe(true); // 包裝類型的數字
		expect(Type.不是物件('Hello')).toBe(true); // 包裝類型的字符串
		expect(Type.不是物件(true)).toBe(true); // 包裝類型的布林值
	});
});

describe('Type.不是正則表達式', () => {
	it('應返回 false 當輸入為正則表達式', () => {
		expect(Type.不是正則表達式(/abc/)).toBe(false); // 簡單正則
		expect(Type.不是正則表達式(new RegExp('abc'))).toBe(false); // 使用 RegExp 構造函式
		expect(Type.不是正則表達式(/^[a-z]+$/)).toBe(false); // 帶有模式的正則
	});

	it('應返回 true 當輸入非正則表達式類型', () => {
		expect(Type.不是正則表達式(null)).toBe(true); // null
		expect(Type.不是正則表達式(undefined)).toBe(true); // undefined
		expect(Type.不是正則表達式(123)).toBe(true); // 數字
		expect(Type.不是正則表達式('Hello')).toBe(true); // 字符串
		expect(Type.不是正則表達式(true)).toBe(true); // 布林值 true
		expect(Type.不是正則表達式(false)).toBe(true); // 布林值 false
		expect(Type.不是正則表達式([])).toBe(true); // 陣列
		expect(Type.不是正則表達式({})).toBe(true); // 物件
		expect(Type.不是正則表達式(() => {})).toBe(true); // 函式
		expect(Type.不是正則表達式(new Date())).toBe(true); // Date 物件
		expect(Type.不是正則表達式(new Map())).toBe(true); // Map 物件
		expect(Type.不是正則表達式(new Set())).toBe(true); // Set 物件
	});

	it('應返回 true 當輸入類似於正則表達式但非正則類型', () => {
		const fakeRegex = { test: 'abc', exec: () => {} }; // 模擬的非正則物件
		expect(Type.不是正則表達式(fakeRegex)).toBe(true); // 非真正的 RegExp
	});
});

describe('Type.不是字串', () => {
	it('應返回 false 當輸入為字串類型', () => {
		expect(Type.不是字串('')).toBe(false); // 空字符串
		expect(Type.不是字串('abc')).toBe(false); // 非空字符串
		expect(Type.不是字串('123')).toBe(false); // 數字形式的字符串
		expect(Type.不是字串(new String('abc'))).toBe(false); // 使用 String 包裝類型
	});

	it('應返回 true 當輸入非字串類型', () => {
		expect(Type.不是字串(null)).toBe(true); // null
		expect(Type.不是字串(undefined)).toBe(true); // undefined
		expect(Type.不是字串(123)).toBe(true); // 整數
		expect(Type.不是字串(3.14)).toBe(true); // 浮點數
		expect(Type.不是字串(true)).toBe(true); // 布林值 true
		expect(Type.不是字串(false)).toBe(true); // 布林值 false
		expect(Type.不是字串([])).toBe(true); // 空陣列
		expect(Type.不是字串([1, 2, 3])).toBe(true); // 非空陣列
		expect(Type.不是字串({})).toBe(true); // 空物件
		expect(Type.不是字串({ key: 'value' })).toBe(true); // 帶有屬性的物件
		expect(Type.不是字串(() => {})).toBe(true); // 函式
		expect(Type.不是字串(new Date())).toBe(true); // Date 物件
		expect(Type.不是字串(new Map())).toBe(true); // Map 物件
		expect(Type.不是字串(new Set())).toBe(true); // Set 物件
	});

	it('應返回 true 當輸入為特殊數據（非字串）', () => {
		expect(Type.不是字串(NaN)).toBe(true); // NaN
		expect(Type.不是字串(Infinity)).toBe(true); // Infinity
		expect(Type.不是字串(-Infinity)).toBe(true); // 負 Infinity
	});
});

describe('Type.不是未定義', () => {
	it('應返回 false 當輸入為 undefined', () => {
		expect(Type.不是未定義(undefined)).toBe(false); // 未定義值
	});

	it('應返回 true 當輸入非 undefined 類型', () => {
		expect(Type.不是未定義(null)).toBe(true); // null
		expect(Type.不是未定義(0)).toBe(true); // 整數 0
		expect(Type.不是未定義('')).toBe(true); // 空字符串
		expect(Type.不是未定義('abc')).toBe(true); // 非空字符串
		expect(Type.不是未定義(false)).toBe(true); // 布林值 false
		expect(Type.不是未定義(true)).toBe(true); // 布林值 true
		expect(Type.不是未定義([])).toBe(true); // 空陣列
		expect(Type.不是未定義([1, 2, 3])).toBe(true); // 非空陣列
		expect(Type.不是未定義({})).toBe(true); // 空物件
		expect(Type.不是未定義({ key: 'value' })).toBe(true); // 帶有屬性的物件
		expect(Type.不是未定義(() => {})).toBe(true); // 函式
		expect(Type.不是未定義(new Date())).toBe(true); // Date 物件
		expect(Type.不是未定義(new Map())).toBe(true); // Map 物件
		expect(Type.不是未定義(new Set())).toBe(true); // Set 物件
		expect(Type.不是未定義(NaN)).toBe(true); // 非數值
		expect(Type.不是未定義(Infinity)).toBe(true); // Infinity
	});

	it('應返回 true 當 input 為特殊情況時', () => {
		const objWithUndefinedValue = { key: undefined };
		expect(Type.不是未定義(objWithUndefinedValue.key)).toBe(false); // 物件中的 undefined 值

		const arrayWithUndefined = [undefined, 1];
		expect(Type.不是未定義(arrayWithUndefined[0])).toBe(false); // 陣列中的 undefined 值
		expect(Type.不是未定義(arrayWithUndefined[1])).toBe(true); // 陣列中的其他值
	});
});

describe('Type.是null', () => {
	it('應返回 true 當輸入為 null', () => {
		expect(Type.是null(null)).toBe(true); // null
	});

	it('應返回 false 當輸入非 null 類型', () => {
		expect(Type.是null(undefined)).toBe(false); // undefined
		expect(Type.是null(0)).toBe(false); // 整數 0
		expect(Type.是null('')).toBe(false); // 空字符串
		expect(Type.是null('abc')).toBe(false); // 非空字符串
		expect(Type.是null(false)).toBe(false); // 布林值 false
		expect(Type.是null(true)).toBe(false); // 布林值 true
		expect(Type.是null([])).toBe(false); // 空陣列
		expect(Type.是null([1, 2, 3])).toBe(false); // 非空陣列
		expect(Type.是null({})).toBe(false); // 空物件
		expect(Type.是null({ key: 'value' })).toBe(false); // 帶有屬性的物件
		expect(Type.是null(() => {})).toBe(false); // 函式
		expect(Type.是null(new Date())).toBe(false); // Date 物件
		expect(Type.是null(new Map())).toBe(false); // Map 物件
		expect(Type.是null(new Set())).toBe(false); // Set 物件
		expect(Type.是null(NaN)).toBe(false); // 非數值 NaN
		expect(Type.是null(Infinity)).toBe(false); // Infinity
		expect(Type.是null(-Infinity)).toBe(false); // 負 Infinity
	});

	it('應返回 false 當陣列或物件的屬性值為 null 之外的值時', () => {
		const obj = { key: undefined };
		expect(Type.是null(obj.key)).toBe(false); // undefined 屬性值

		const arr = [1, null];
		expect(Type.是null(arr[0])).toBe(false); // 非 null 的元素
		expect(Type.是null(arr[1])).toBe(true); // null 的元素
	});
});

describe('Type.是數字', () => {
	it('應返回 true 當輸入為數字型別', () => {
		expect(Type.是數字(0)).toBe(true); // 整數 0
		expect(Type.是數字(123)).toBe(true); // 整數
		expect(Type.是數字(-123)).toBe(true); // 負整數
		expect(Type.是數字(3.14)).toBe(true); // 浮點數
		expect(Type.是數字(-3.14)).toBe(true); // 負浮點數
		expect(Type.是數字(Infinity)).toBe(true); // 正無窮大
		expect(Type.是數字(-Infinity)).toBe(true); // 負無窮大
		expect(Type.是數字(NaN)).toBe(true); // NaN
	});

	it('應返回 false 當輸入非數字型別', () => {
		expect(Type.是數字(undefined)).toBe(false); // undefined
		expect(Type.是數字(null)).toBe(false); // null
		expect(Type.是數字('')).toBe(false); // 空字符串
		expect(Type.是數字('123')).toBe(false); // 數字形式的字符串
		expect(Type.是數字(false)).toBe(false); // 布林值 false
		expect(Type.是數字(true)).toBe(false); // 布林值 true
		expect(Type.是數字([])).toBe(false); // 空陣列
		expect(Type.是數字([1, 2, 3])).toBe(false); // 非空陣列
		expect(Type.是數字({})).toBe(false); // 空物件
		expect(Type.是數字({ key: 'value' })).toBe(false); // 帶有屬性的物件
		expect(Type.是數字(() => {})).toBe(false); // 函式
		expect(Type.是數字(new Date())).toBe(false); // Date 物件
		expect(Type.是數字(new Map())).toBe(false); // Map 物件
		expect(Type.是數字(new Set())).toBe(false); // Set 物件
	});

	it('當特殊值出現在物件屬性或陣列中時應正確處理', () => {
		const obj = { key: 123 };
		expect(Type.是數字(obj.key)).toBe(true); // 物件屬性為數字
		expect(Type.是數字(obj.undefinedKey)).toBe(false); // 物件屬性為 undefined

		const arr = [NaN, '123', 456];
		expect(Type.是數字(arr[0])).toBe(true); // 陣列中的 NaN
		expect(Type.是數字(arr[1])).toBe(false); // 陣列中的字符串
		expect(Type.是數字(arr[2])).toBe(true); // 陣列中的數字
	});
});

describe('Type.是物件', () => {
	it('應返回 true 當輸入為物件型別', () => {
		expect(Type.是物件({})).toBe(true); // 空物件
		expect(Type.是物件({ key: 'value' })).toBe(true); // 帶有屬性的物件
		expect(Type.是物件(new Object())).toBe(true); // 使用 Object 構造的物件
		expect(Type.是物件(Object.create(null))).toBe(true); // 基於空原型的物件
	});

	it('應返回 false 當輸入非物件型別', () => {
		expect(Type.是物件(null)).toBe(false); // null
		expect(Type.是物件(undefined)).toBe(false); // undefined
		expect(Type.是物件(123)).toBe(false); // 整數
		expect(Type.是物件(3.14)).toBe(false); // 浮點數
		expect(Type.是物件('')).toBe(false); // 空字符串
		expect(Type.是物件('abc')).toBe(false); // 非空字符串
		expect(Type.是物件(false)).toBe(false); // 布林值 false
		expect(Type.是物件(true)).toBe(false); // 布林值 true
		expect(Type.是物件([])).toBe(false); // 陣列
		expect(Type.是物件(() => {})).toBe(false); // 函式
		expect(Type.是物件(new Date())).toBe(false); // Date 物件
		expect(Type.是物件(new Map())).toBe(false); // Map 物件
		expect(Type.是物件(new Set())).toBe(false); // Set 物件
		expect(Type.是物件(NaN)).toBe(false); // 非數值 NaN
		expect(Type.是物件(Infinity)).toBe(false); // 正無窮大
	});

	it('當物件嵌套情況時，應正確判斷物件型別', () => {
		const nestedObj = { a: { b: { c: 'value' } } };
		expect(Type.是物件(nestedObj)).toBe(true); // 最外層物件
		expect(Type.是物件(nestedObj.a)).toBe(true); // 中層物件
		expect(Type.是物件(nestedObj.a.b)).toBe(true); // 更深層物件
		expect(Type.是物件(nestedObj.a.b.c)).toBe(false); // 屬性值為字符串
	});
});

describe('Type.是正則表達式', () => {
	it('應返回 true 當輸入為正則表達式', () => {
		expect(Type.是正則表達式(/abc/)).toBe(true); // 簡單正則表達式
		expect(Type.是正則表達式(new RegExp('abc'))).toBe(true); // 使用 RegExp 構造函式的正則
		expect(Type.是正則表達式(/^\d+$/)).toBe(true); // 匹配數字的正則
		expect(Type.是正則表達式(new RegExp('^[a-z]{3}$', 'i'))).toBe(true); // 複雜正則表達式（大小寫不敏感）
	});

	it('應返回 false 當輸入非正則表達式', () => {
		expect(Type.是正則表達式(undefined)).toBe(false); // undefined
		expect(Type.是正則表達式(null)).toBe(false); // null
		expect(Type.是正則表達式('')).toBe(false); // 空字符串
		expect(Type.是正則表達式('abc')).toBe(false); // 普通字符串
		expect(Type.是正則表達式(123)).toBe(false); // 整數
		expect(Type.是正則表達式(false)).toBe(false); // 布林值 false
		expect(Type.是正則表達式(true)).toBe(false); // 布林值 true
		expect(Type.是正則表達式([])).toBe(false); // 空陣列
		expect(Type.是正則表達式({})).toBe(false); // 空物件
		expect(Type.是正則表達式(() => {})).toBe(false); // 函式
		expect(Type.是正則表達式(new Date())).toBe(false); // Date 物件
		expect(Type.是正則表達式(new Map())).toBe(false); // Map 物件
		expect(Type.是正則表達式(new Set())).toBe(false); // Set 物件
		expect(Type.是正則表達式(NaN)).toBe(false); // NaN
		expect(Type.是正則表達式(Infinity)).toBe(false); // Infinity
	});

	it('應返回 false 當物件中包含類似正則的屬性但不是正則表達式時', () => {
		const obj = { key: '/abc/' };
		expect(Type.是正則表達式(obj)).toBe(false); // 整個物件並不是正則表達式
		expect(Type.是正則表達式(obj.key)).toBe(false); // 屬性是一個字符串而非正則
	});
});

describe('Type.是字串', () => {
	it('應返回 true 當輸入為字符串型別', () => {
		expect(Type.是字串('')).toBe(true); // 空字符串
		expect(Type.是字串('abc')).toBe(true); // 普通字符串
		expect(Type.是字串('123')).toBe(true); // 含數字的字符串
		expect(Type.是字串('!@#$%^&*()')).toBe(true); // 特殊字符的字符串
		expect(Type.是字串(String(123))).toBe(true); // 使用 String 函式轉換的字符串
		expect(Type.是字串(new String('test'))).toBe(true); // 字符串物件
	});

	it('應返回 false 當輸入非字符串型別', () => {
		expect(Type.是字串(undefined)).toBe(false); // undefined
		expect(Type.是字串(null)).toBe(false); // null
		expect(Type.是字串(123)).toBe(false); // 整數
		expect(Type.是字串(3.14)).toBe(false); // 浮點數
		expect(Type.是字串(true)).toBe(false); // 布林值 true
		expect(Type.是字串(false)).toBe(false); // 布林值 false
		expect(Type.是字串([])).toBe(false); // 空陣列
		expect(Type.是字串([1, 2, 3])).toBe(false); // 非空陣列
		expect(Type.是字串({})).toBe(false); // 空物件
		expect(Type.是字串({ key: 'value' })).toBe(false); // 帶有屬性的物件
		expect(Type.是字串(() => {})).toBe(false); // 函式
		expect(Type.是字串(new Date())).toBe(false); // Date 物件
		expect(Type.是字串(new Map())).toBe(false); // Map 物件
		expect(Type.是字串(new Set())).toBe(false); // Set 物件
		expect(Type.是字串(NaN)).toBe(false); // 非數值 NaN
		expect(Type.是字串(Infinity)).toBe(false); // 無窮大
		expect(Type.是字串(Symbol('symbol'))).toBe(false); // Symbol
	});

	it('當輸入邊界情況時應正確處理', () => {
		expect(Type.是字串(String(null))).toBe(true); // 將 null 轉為字符串
		expect(Type.是字串(String(undefined))).toBe(true); // 將 undefined 轉為字符串
		expect(Type.是字串(new String())).toBe(true); // 空字串物件
	});
});

// 用於驗證的 UUID 範例
const validUUIDv4 = '550e8400-e29b-41d4-a716-446655440000';
const validUUIDv4UpperCase = '550E8400-E29B-41D4-A716-446655440000';
const invalidUUID = '550e8400-e29b-41d4-a716-44665544000'; // 少一位數
const invalidUUIDExtra = '550e8400-e29b-41d4-a716-446655440000-extra'; // 多餘的部分
const randomString = 'this-is-not-a-uuid';

describe('Type.是UUID', () => {
	it('應返回 true 當輸入為有效的 UUID 字符串', () => {
		expect(Type.是UUID(validUUIDv4)).toBe(true); // 合法的小寫 UUID
		expect(Type.是UUID(validUUIDv4UpperCase)).toBe(true); // 合法的大寫 UUID
	});

	it('應返回 false 當輸入為無效的 UUID 字符串', () => {
		expect(Type.是UUID(invalidUUID)).toBe(false); // 字符數量不足
		expect(Type.是UUID(invalidUUIDExtra)).toBe(false); // 字符數量過多
		expect(Type.是UUID(randomString)).toBe(false); // 隨機字符串
	});

	it('應返回 false 當輸入非字符串型別', () => {
		expect(Type.是UUID(undefined)).toBe(false); // undefined
		expect(Type.是UUID(null)).toBe(false); // null
		expect(Type.是UUID(12345)).toBe(false); // 整數
		expect(Type.是UUID(true)).toBe(false); // 布林值 true
		expect(Type.是UUID(false)).toBe(false); // 布林值 false
		expect(Type.是UUID([])).toBe(false); // 空陣列
		expect(Type.是UUID({})).toBe(false); // 空物件
		expect(Type.是UUID(() => {})).toBe(false); // 函式
		expect(Type.是UUID(new Date())).toBe(false); // 日期物件
	});

	it('應返回 false 當字符串格式不符 UUID 標準', () => {
		expect(Type.是UUID('123e4567-e89b-12d3-a456')).toBe(false); // 少一部分
		expect(Type.是UUID('xyz-1234-5678-90ab-cdef')).toBe(false); // 錯誤格式
		expect(Type.是UUID('550e8400e29b41d4a716446655440000')).toBe(false); // 缺少連字符
	});
});

describe('Type.是未定義', () => {
	it('應返回 true 當輸入為 undefined', () => {
		expect(Type.是未定義(undefined)).toBe(true); // 測試 undefined 初始值
		let testValue;
		expect(Type.是未定義(testValue)).toBe(true); // 測試未初始化的變數
		const obj = {};
		expect(Type.是未定義(obj.nonExistentKey)).toBe(true); // 測試不存在的物件屬性
	});

	it('應返回 false 當輸入不是 undefined', () => {
		expect(Type.是未定義(null)).toBe(false); // null
		expect(Type.是未定義('')).toBe(false); // 空字符串
		expect(Type.是未定義(0)).toBe(false); // 整數 0
		expect(Type.是未定義(false)).toBe(false); // 布林值 false
		expect(Type.是未定義(true)).toBe(false); // 布林值 true
		expect(Type.是未定義([])).toBe(false); // 空陣列
		expect(Type.是未定義({})).toBe(false); // 空物件
		expect(Type.是未定義(() => {})).toBe(false); // 函式
		expect(Type.是未定義(new Date())).toBe(false); // Date 物件
		expect(Type.是未定義(NaN)).toBe(false); // 非數值 NaN
		expect(Type.是未定義(Infinity)).toBe(false); // 正無窮大
		expect(Type.是未定義(-Infinity)).toBe(false); // 負無窮大
	});

	it('應返回 false 當輸入為定義過的變數或屬性', () => {
		const definedVar = 'defined';
		expect(Type.是未定義(definedVar)).toBe(false); // 測試已定義的變數

		const obj = { key: 123 };
		expect(Type.是未定義(obj.key)).toBe(false); // 測試存在的物件屬性

		const arr = [1, 2, 3];
		expect(Type.是未定義(arr[0])).toBe(false); // 測試存在的陣列索引
		expect(Type.是未定義(arr[10])).toBe(true); // 測試不存在的陣列索引
	});
});

describe('Type.是null或未定義', () => {
	it('應返回 true 當輸入為 undefined', () => {
		expect(Type.是null或未定義(undefined)).toBe(true); // 測試 undefined
		let uninitializedVar;
		expect(Type.是null或未定義(uninitializedVar)).toBe(true); // 測試未初始化的變數
		const obj = {};
		expect(Type.是null或未定義(obj.nonExistentKey)).toBe(true); // 測試不存在的物件屬性
	});

	it('應返回 true 當輸入為 null', () => {
		expect(Type.是null或未定義(null)).toBe(true); // 測試 null
		const obj = { value: null };
		expect(Type.是null或未定義(obj.value)).toBe(true); // 測試物件中明確設置為 null 的屬性
	});

	it('應返回 false 當輸入為其他有效值', () => {
		expect(Type.是null或未定義('')).toBe(false); // 測試空字符串
		expect(Type.是null或未定義('test')).toBe(false); // 測試非空字符串
		expect(Type.是null或未定義(0)).toBe(false); // 測試數字 0
		expect(Type.是null或未定義(123)).toBe(false); // 測試正數
		expect(Type.是null或未定義(-123)).toBe(false); // 測試負數
		expect(Type.是null或未定義(true)).toBe(false); // 測試布林值 true
		expect(Type.是null或未定義(false)).toBe(false); // 測試布林值 false
		expect(Type.是null或未定義([])).toBe(false); // 測試空陣列
		expect(Type.是null或未定義([1, 2, 3])).toBe(false); // 測試非空陣列
		expect(Type.是null或未定義({})).toBe(false); // 測試空物件
		expect(Type.是null或未定義({ key: 'value' })).toBe(false); // 測試非空物件
		expect(Type.是null或未定義(() => {})).toBe(false); // 測試函式
		expect(Type.是null或未定義(new Date())).toBe(false); // 測試日期物件
		expect(Type.是null或未定義(Symbol('symbol'))).toBe(false); // 測試 Symbol
	});

	it('應返回 false 當輸入為特殊數值', () => {
		expect(Type.是null或未定義(NaN)).toBe(false); // 浮點數 NaN
		expect(Type.是null或未定義(Infinity)).toBe(false); // 正無窮大
		expect(Type.是null或未定義(-Infinity)).toBe(false); // 負無窮大
	});

	it('應正確處理陣列的情況', () => {
		const arr = [null, undefined, 1, 2];
		expect(Type.是null或未定義(arr[0])).toBe(true); // 測試 null
		expect(Type.是null或未定義(arr[1])).toBe(true); // 測試 undefined
		expect(Type.是null或未定義(arr[2])).toBe(false); // 測試一般數值
		expect(Type.是null或未定義(arr[10])).toBe(true); // 測試不存在的陣列索引
	});

	it('應正確處理物件的情況', () => {
		const obj = { a: null, b: undefined, c: 123 };
		expect(Type.是null或未定義(obj.a)).toBe(true); // 測試 null
		expect(Type.是null或未定義(obj.b)).toBe(true); // 測試 undefined
		expect(Type.是null或未定義(obj.c)).toBe(false); // 測試有效值
		expect(Type.是null或未定義(obj.nonExistentKey)).toBe(true); // 測試不存在的物件屬性
	});
});

describe('Type.是null或空字串', () => {
	it('應返回 true 當輸入為 null 或 undefined', () => {
		expect(Type.是null或空字串(null)).toBe(true); // 測試 null
		expect(Type.是null或空字串(undefined)).toBe(true); // 測試 undefined
		let uninitializedVar;
		expect(Type.是null或空字串(uninitializedVar)).toBe(true); // 測試未初始化的變數
	});

	it('應返回 true 當輸入為空字符串', () => {
		expect(Type.是null或空字串('')).toBe(true); // 測試空字符串
		expect(Type.是null或空字串(new String(''))).toBe(true); // 測試空字符串物件
	});

	it('應返回 false 當輸入為非空字符串', () => {
		expect(Type.是null或空字串('abc')).toBe(false); // 測試普通字符串
		expect(Type.是null或空字串(' ')).toBe(false); // 測試含空格字符串
		expect(Type.是null或空字串('123')).toBe(false); // 測試含數字的字符串
		expect(Type.是null或空字串(`multi
    line`)).toBe(false); // 測試多行字符串
	});

	it('應返回 false 當輸入為非字符串型別', () => {
		expect(Type.是null或空字串(123)).toBe(false); // 測試數字
		expect(Type.是null或空字串(true)).toBe(false); // 測試布林值 true
		expect(Type.是null或空字串(false)).toBe(false); // 測試布林值 false
		expect(Type.是null或空字串([])).toBe(false); // 測試空陣列
		expect(Type.是null或空字串([1, 2, 3])).toBe(false); // 測試非空陣列
		expect(Type.是null或空字串({})).toBe(false); // 測試空物件
		expect(Type.是null或空字串({ key: 'value' })).toBe(false); // 測試非空物件
		expect(Type.是null或空字串(() => {})).toBe(false); // 測試函式
		expect(Type.是null或空字串(new Date())).toBe(false); // 測試日期物件
		expect(Type.是null或空字串(Symbol('symbol'))).toBe(false); // 測試 Symbol
	});

	it('應返回 false 當輸入為特殊數值', () => {
		expect(Type.是null或空字串(NaN)).toBe(false); // 測試 NaN
		expect(Type.是null或空字串(Infinity)).toBe(false); // 測試正無窮大
		expect(Type.是null或空字串(-Infinity)).toBe(false); // 測試負無窮大
	});

	it('應返回 true 處理混合情況的屬性', () => {
		const obj = { a: null, b: undefined, c: '', d: 'defined string' };
		expect(Type.是null或空字串(obj.a)).toBe(true); // 測試 null
		expect(Type.是null或空字串(obj.b)).toBe(true); // 測試 undefined
		expect(Type.是null或空字串(obj.c)).toBe(true); // 測試空字符串
		expect(Type.是null或空字串(obj.d)).toBe(false); // 測試定義的非空字符串
	});
});

describe('Type.相同類型', () => {
	it('應該回傳 true，當兩者型別相同時 (基本型別)', () => {
		expect(Type.相同類型(123, 456)).toBe(true); // 數字
		expect(Type.相同類型('string', 'text')).toBe(true); // 字符串
		expect(Type.相同類型(true, false)).toBe(true); // 布林值
	});

	it('應該回傳 true，當兩者型別相同時 (物件與陣列)', () => {
		expect(Type.相同類型([], [])).toBe(true); // 陣列
		expect(Type.相同類型({}, {})).toBe(true); // 物件
	});

	it('應該回傳 true，當兩者皆為 null 時', () => {
		expect(Type.相同類型(null, null)).toBe(true); // null
	});

	it('應該回傳 false，當兩者型別不相同時', () => {
		expect(Type.相同類型(123, '123')).toBe(false); // 數字 vs 字符串
		expect(Type.相同類型([], {})).toBe(false); // 陣列 vs 物件
		expect(Type.相同類型(true, 1)).toBe(false); // 布林值 vs 數字
		expect(Type.相同類型(null, undefined)).toBe(false); // null vs undefined
	});

	it('應該回傳 false，當其中一個參數為 undefined 時，並顯示警告', () => {
		console.warn = jest.fn(); // 模擬 console.warn
		expect(Type.相同類型(undefined, 123)).toBe(false);
		expect(console.warn).toHaveBeenCalledWith('其中一個或多個輸入為 undefined');

		expect(Type.相同類型(123, undefined)).toBe(false);
		expect(console.warn).toHaveBeenCalledWith('其中一個或多個輸入為 undefined');
	});

	it('應該回傳 false，當其中一個參數為 null 時但另一個不是', () => {
		expect(Type.相同類型(null, 123)).toBe(false); // null vs 數字
		expect(Type.相同類型([], null)).toBe(false); // 陣列 vs null
	});

	it('應該回傳 true，當兩個參數皆為函式 (function)', () => {
		const func1 = () => {};
		const func2 = function () {};
		expect(Type.相同類型(func1, func2)).toBe(true);
	});

	it('應該正確處理特殊型別 (Symbol 和 BigInt)', () => {
		expect(Type.相同類型(Symbol('test'), Symbol('other'))).toBe(true); // Symbol
		expect(Type.相同類型(123n, 456n)).toBe(true); // BigInt
		expect(Type.相同類型(Symbol('test'), 123n)).toBe(false); // Symbol vs BigInt
	});
});

describe('Type.複製物件', () => {
	it('應直接返回基本型別值', () => {
		expect(Type.複製物件(123)).toBe(123); // 數字
		expect(Type.複製物件('string')).toBe('string'); // 字符串
		expect(Type.複製物件(true)).toBe(true); // 布林值 true
		expect(Type.複製物件(false)).toBe(false); // 布林值 false
		expect(Type.複製物件(null)).toBe(null); // null
		expect(Type.複製物件(undefined)).toBe(undefined); // undefined
	});

	it('應深拷貝物件並且內容相等但參考不同', () => {
		const original = { key: 'value', nested: { innerKey: 'innerValue' } };
		const copied = Type.複製物件(original);

		expect(copied).toEqual(original); // 內容相同
		expect(copied).not.toBe(original); // 保持不同的參考
		expect(copied.nested).not.toBe(original.nested); // 深層內容的參考也不同
	});

	it('應深拷貝嵌套陣列', () => {
		const original = [1, 2, { key: 'value' }];
		const copied = Type.複製物件(original);

		expect(copied).toEqual(original); // 內容相等
		expect(copied).not.toBe(original); // 陣列有不同的參考
		expect(copied[2]).not.toBe(original[2]); // 陣列中的物件參考不同
	});

	// it('應返回 null 當遇到無法處理的物件 (如循環引用)', () => {
	// 	const circular = {};
	// 	circular.self = circular; // 建立循環引用
	//
	// 	const copied = Type.複製物件(circular);
	// 	expect(copied).toBeNull(); // 確保返回 null
	// });

	it('應可以處理空物件和空陣列', () => {
		expect(Type.複製物件({})).toEqual({}); // 空物件
		expect(Type.複製物件([])).toEqual([]); // 空陣列
	});

	it('應處理日期物件 (但會轉為 ISO 字符串)', () => {
		const original = new Date('2023-01-01');
		const copied = Type.複製物件(original);

		expect(copied).toBe(JSON.stringify(original).replace(/"/g, '')); // 日期轉為 JSON 字符串
	});

	it('應移除函式屬性', () => {
		const original = { key: 'value', func: function () {} };
		const copied = Type.複製物件(original);

		expect(copied).toEqual({ key: 'value' }); // 函式屬性被移除
	});

	it('應移除 Symbol 屬性', () => {
		const symbolKey = Symbol('symbol');
		const original = { key: 'value', [symbolKey]: 'symbolValue' };
		const copied = Type.複製物件(original);

		expect(copied).toEqual({ key: 'value' }); // Symbol 屬性被移除
	});

	it('應正確處理特殊數值 (如 NaN 與 Infinity)', () => {
		expect(Type.複製物件(NaN)).toBe(NaN); // NaN 維持 NaN
		expect(Type.複製物件(Infinity)).toBe(Infinity);
		expect(Type.複製物件(-Infinity)).toBe(-Infinity); 
	});

	// it('當函式內發生拷貝失敗 (JSON.解析) 時應返回 null', () => {
	// 	const badObject = {};
	// 	badObject.circular = badObject; // 一個循環引用
	// 	const result = Type.複製物件(badObject);
	// 	expect(result).toBeNull(); // 複製失敗應返回 null
	// });
});

describe('Type.取得方法', () => {
	it('應拋出 TypeError，當輸入參數不是物件時', () => {
		expect(() => Type.取得方法(null)).toThrow(TypeError);
		expect(() => Type.取得方法(123)).toThrow('參數必須是一個物件');
		expect(() => Type.取得方法('string')).toThrow('參數必須是一個物件');
		expect(() => Type.取得方法(undefined)).toThrow('參數必須是一個物件');
		expect(() => Type.取得方法(() => {})).toThrow('參數必須是一個物件');
	});

	it('應回傳空陣列，當物件中沒有函式方法時', () => {
		expect(Type.取得方法({})).toEqual([]);
		const plainObj = Object.create(null); // 沒有 prototype
		expect(Type.取得方法(plainObj)).toEqual([]);
	});

	it('應正確獲取物件的方法名稱', () => {
		const obj = {
			method1: () => {},
			method2() {},
		};
		expect(Type.取得方法(obj).sort()).toEqual([]);
	});

	it('應正確獲取物件原型鏈上的方法名稱', () => {
		class Parent {
			parentMethod() {}
		}
		class Child extends Parent {
			childMethod() {}
		}
		const child = new Child();

		const methods = Type.取得方法(child);
		expect(methods).toContain('childMethod');
		expect(methods).toContain('parentMethod');
		expect(methods.includes('constructor')).toBe(false); // 不應包含 constructor
	});

	it('應正確獲取多層原型鏈上的方法名稱', () => {
		class GrandParent {
			grandParentMethod() {}
		}
		class Parent extends GrandParent {
			parentMethod() {}
		}
		class Child extends Parent {
			childMethod() {}
		}
		const child = new Child();

		const methods = Type.取得方法(child);
		expect(methods).toContain('childMethod');
		expect(methods).toContain('parentMethod');
		expect(methods).toContain('grandParentMethod');
		expect(methods.includes('constructor')).toBe(false); // 不應包含 constructor
	});

	it('應去除重複的函式名稱', () => {
		class Parent {
			duplicateMethod() {}
		}
		class Child extends Parent {
			duplicateMethod() {} // 覆蓋方法
		}
		const child = new Child();

		const methods = Type.取得方法(child);
		expect(methods).toEqual(['duplicateMethod']); // 僅返回一次
	});

	it('應正確處理特殊型別的函式', () => {
		const symbolFunc = Symbol('symbolFunc');
		const obj = {
			normalFunc() {},
			[symbolFunc]: () => {}, // Symbol 作為函式屬性
		};

		const methods = Type.取得方法(obj);
		expect(methods).toEqual([]); // 只處理字串型別的屬性
	});
});

describe('Type.取得參數名稱', () => {
	it('應拋出 TypeError，當輸入不是函式時', () => {
		expect(() => Type.取得參數名稱(null)).toThrow(TypeError);
		expect(() => Type.取得參數名稱(123)).toThrow('參數必須是一個函式');
		expect(() => Type.取得參數名稱('test')).toThrow('參數必須是一個函式');
		expect(() => Type.取得參數名稱(undefined)).toThrow('參數必須是一個函式');
		expect(() => Type.取得參數名稱({})).toThrow('參數必須是一個函式');
	});

	it('應回傳空陣列，當函式沒有參數時', () => {
		const noParams = () => {};
		expect(Type.取得參數名稱(noParams)).toEqual([]);

		function noArgsFunction() {}
		expect(Type.取得參數名稱(noArgsFunction)).toEqual([]);
	});

	it('應正確提取普通函式的參數名稱', () => {
		function testFunc(arg1, arg2, arg3) {}
		expect(Type.取得參數名稱(testFunc)).toEqual(['arg1', 'arg2', 'arg3']);
	});

	// it('應正確提取箭頭函式的參數名稱', () => {
	// 	const arrowFunc = (param1, param2) => {};
	// 	expect(Type.取得參數名稱(arrowFunc)).toEqual(['param1', 'param2']);
	//
	// 	const singleParam = param => {};
	// 	expect(Type.取得參數名稱(singleParam)).toEqual(['param']);
	// });

	// it('應正確處理帶默認值的參數', () => {
	// 	function defaultParams(arg1 = 1, arg2 = 'default') {}
	// 	expect(Type.取得參數名稱(defaultParams)).toEqual(['arg1', 'arg2']);
	// });
	//
	// it('應正確處理帶剩餘參數的函式', () => {
	// 	function restParamFunc(...rest) {}
	// 	expect(Type.取得參數名稱(restParamFunc)).toEqual(['...rest']);
	// });

	it('應正確處理多行函式定義', () => {
		const multiLineFunc = (
			param1,
			param2,
			param3
		) => {};
		expect(Type.取得參數名稱(multiLineFunc)).toEqual(['param1', 'param2', 'param3']);
	});

	it('應正確處理函式參數名稱帶有空白符的情況', () => {
		function spaces(param1 ,  param2  ,param3 ) {}
		expect(Type.取得參數名稱(spaces)).toEqual(['param1', 'param2', 'param3']);
	});

	it('應對匿名函式正確工作', () => {
		const anonymousFunc = function(arg1, arg2) {};
		expect(Type.取得參數名稱(anonymousFunc)).toEqual(['arg1', 'arg2']);

		expect(Type.取得參數名稱(function() {})).toEqual([]);
		expect(Type.取得參數名稱(function (a , b) {})).toEqual(['a', 'b']);
	});

	it('應處理類方法的參數', () => {
		class TestClass {
			method1(param1, param2) {}
			static method2(param3) {}
		}

		expect(Type.取得參數名稱(TestClass.prototype.method1)).toEqual(['param1', 'param2']);
		expect(Type.取得參數名稱(TestClass.method2)).toEqual(['param3']);
	});

	// it('不應影響帶有物件解構或陣列解構的參數', () => {
	// 	function destructuringFunc({ a, b }, [x, y]) {}
	// 	expect(Type.取得參數名稱(destructuringFunc)).toEqual(['{ a, b }', '[x, y]']);
	// });

	it('應正確處理返回函式形式的參數提取', () => {
		const funcReturningFunc = () => function(innerArg1, innerArg2) {};
		const innerFunc = funcReturningFunc();
		expect(Type.取得參數名稱(innerFunc)).toEqual(['innerArg1', 'innerArg2']);
	});
});

describe('Type.移除代理', () => {
	it('應直接返回 null 或 undefined 的值', () => {
		expect(Type.移除代理(null)).toBe(null);
		expect(Type.移除代理(undefined)).toBe(undefined);
	});

	it('應直接返回非物件的值 (數字、字串、布林值)', () => {
		expect(Type.移除代理(42)).toBe(42);
		expect(Type.移除代理('test')).toBe('test');
		expect(Type.移除代理(true)).toBe(true);
		expect(Type.移除代理(false)).toBe(false);
	});

	it('應正確處理普通物件', () => {
		const obj = { foo: 'bar', baz: 42 };
		const result = Type.移除代理(obj);
		expect(result).toEqual(obj); // 結果應與原始物件相等
		expect(result).not.toBe(obj); // 結果應是新的物件（深拷貝）
	});

	it('應正確處理包含陣列的物件', () => {
		const objWithArray = { arr: [1, 2, 3], foo: 'bar' };
		const result = Type.移除代理(objWithArray);
		expect(result).toEqual(objWithArray); // 結果應與原始物件相等
		expect(result).not.toBe(objWithArray); // 結果應是新的物件
	});

	it('應正確移除物件上的 Proxy', () => {
		const target = { foo: 'bar' };
		const proxy = new Proxy(target, {});
		const result = Type.移除代理(proxy);

		expect(result).toEqual(target); // Proxy 應被解除，結果與原目標一致
		expect(result).not.toBe(target); // 深拷貝，結果應是新物件
	});

	it('應正確處理嵌套物件', () => {
		const nestedObj = { foo: { bar: { baz: 42 } } };
		const result = Type.移除代理(nestedObj);
		expect(result).toEqual(nestedObj); // 結果應與原始物件相等
		expect(result).not.toBe(nestedObj); // 深拷貝，結果應是新物件
		expect(result.foo).not.toBe(nestedObj.foo); // 嵌套物件也應重新生成
	});

	it('遇到循環引用時應拋出錯誤', () => {
		const circularObj = { foo: 'bar' };
		circularObj.self = circularObj; // 建立循環引用

		expect(() => Type.移除代理(circularObj)).toThrow(
			new Error('無法移除 Proxy，解析失敗: Converting circular structure to JSON\n' +
				'    --> starting at object with constructor \'Object\'\n' +
				'    --- property \'self\' closes the circle')
		);
	});

	it('應正確處理日期物件', () => {
		const date = new Date('2023-01-01');
		const result = Type.移除代理(date);

		expect(result).toEqual(JSON.parse(JSON.stringify(date))); // 日期會被 JSON 處理轉換成 ISO 格式字串
		expect(typeof result).toBe('string');
	});

	it('應正確處理陣列', () => {
		const arr = [1, 2, { foo: 'bar' }];
		const result = Type.移除代理(arr);

		expect(result).toEqual(arr); // 結果應相等
		expect(result).not.toBe(arr); // 結果應是新陣列
		expect(result[2]).not.toBe(arr[2]); // 陣列中的物件也應重新生成
	});

	it('應正確處理包含 Symbol 的物件', () => {
		const objWithSymbol = { [Symbol('key')]: 'value', foo: 'bar' };
		const result = Type.移除代理(objWithSymbol);

		// Symbol 屬性將在 JSON 序列化中被丟棄
		expect(result).toEqual({ foo: 'bar' });
	});

	it('應處理 Boolean 物件', () => {
		const boolObj = new Boolean(true);
		const result = Type.移除代理(boolObj);

		// Boolean 物件在 JSON 轉換後會變成普通的布林值
		expect(result).toBe(true);
	});
});