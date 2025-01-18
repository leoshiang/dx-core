/**
 * 判斷數值是否相同的容許值。如果兩個數值相減的結果小於 TOLERANCE，則視為相同。
 * @const
 * @type {number}
 */
let TOLERANCE = 1.0E-8; // Number.EPSILON = 1.0E-150
/**
 * 用於描述 JavaScript 基本數據類型的名稱物件。
 *
 * @constant
 * @type {Object}
 * @property {string} Array - 表示陣列類型的名稱。
 * @property {string} Boolean - 表示布林值類型的名稱。
 * @property {string} Date - 表示日期類型的名稱。
 * @property {string} Function - 表示函式類型的名稱。
 * @property {string} Null - 表示空值類型的名稱。
 * @property {string} Number - 表示數字類型的名稱。
 * @property {string} Object - 表示物件類型的名稱。
 * @property {string} RegExp - 表示正則表達式類型的名稱。
 * @property {string} String - 表示字串串類型的名稱。
 * @property {string} Undefined - 表示未定義類型的名稱。
 */
const TypeNames = {
	Array: 'Array',
	Boolean: 'Boolean',
	Date: 'Date',
	Function: 'Function',
	Null: 'Null',
	Number: 'Number',
	Object: 'Object',
	RegExp: 'RegExp',
	String: 'String',
	Undefined: 'Undefined',
};

/**
 * 用於檢測 UUID 格式的正則表達式。
 * 支援標準 UUID（包括所有 0 值的 UUID）。
 *
 * @constant
 * @type {RegExp}
 */
const regexUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

/**
 * 取得指定物件的類型名稱。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {string} 物件的類型名稱，如 "Array", "String", "Number" 等。
 *
 * @example
 * 取得類型([]); // "Array"
 * 取得類型(123); // "Number"
 */
const 取得類型 = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * 判斷是否為陣列類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果參數是陣列類型則返回 `true`，否則返回 `false`。
 *
 * @example
 * 是陣列([]); // true
 * 是陣列({}); // false
 */
const 是陣列 = (obj) => 取得類型(obj) === TypeNames.Array;

/**
 * 判斷指定物件是否為布林值類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是布林值類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是布林值(true); // true
 * 是布林值(false); // true
 * 是布林值(0); // false
 * 是布林值("true"); // false
 */
const 是布林值 = (obj) => 取得類型(obj) === TypeNames.Boolean;

/**
 * 判斷是否為合法的日期類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果參數是合法的日期類型則返回 `true`，否則返回 `false`。
 *
 * @example
 * 是日期(new Date()); // true
 * 是日期("2023-01-01"); // false
 */
const 是日期 = (obj) => 取得類型(obj) === TypeNames.Date;

/**
 * 判斷物件是否為空字串串。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是空字串串，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是空字串(""); // true
 * 是空字串("Hello"); // false
 * 是空字串(null); // false
 */
const 是空字串 = (obj) => 取得類型(obj) === TypeNames.String && obj.length === 0;

/**
 * 判斷物件是否為函式類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是函式類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是函式(() => {}); // true
 * 是函式(function test() {}); // true
 * 是函式(123); // false
 */
const 是函式 = (obj) => 取得類型(obj) === TypeNames.Function;

/**
 * 判斷物件是否不是陣列類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是陣列類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是陣列([]); // false
 * 不是陣列({}); // true
 */
const 不是陣列 = (obj) => 取得類型(obj) !== TypeNames.Array;

/**
 * 判斷物件是否不是布林值類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是布林值類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是布林值(true); // false
 * 不是布林值(0); // true
 */
const 不是布林值 = (obj) => 取得類型(obj) !== TypeNames.Boolean;

/**
 * 判斷物件是否不是日期類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是日期類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是日期(new Date()); // false
 * 不是日期("2023-01-01"); // true
 */
const 不是日期 = (obj) => 取得類型(obj) !== TypeNames.Date;

/**
 * 判斷物件是否為非空字串串。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是非空字串串，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是空字串("Hello"); // true
 * 不是空字串(""); // false
 * 不是空字串(123); // false
 */
const 不是空字串 = (obj) => 取得類型(obj) === TypeNames.String && obj.length > 0;

/**
 * 判斷物件是否不是函式類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是函式類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是函式(123); // true
 * 不是函式(() => {}); // false
 */
const 不是函式 = (obj) => 取得類型(obj) !== TypeNames.Function;

/**
 * 判斷物件是否不是 `null`。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是 `null`，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是null(null); // false
 * 不是null(123); // true
 */
const 不是null = (obj) => 取得類型(obj) !== TypeNames.Null;

/**
 * 判斷物件是否不是數字類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是數字類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是數字(123); // false
 * 不是數字("123"); // true
 */
const 不是數字 = (obj) => 取得類型(obj) !== TypeNames.Number;

/**
 * 判斷物件是否不是物件類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是物件類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是物件({}); // false
 * 不是物件([]); // true
 */
const 不是物件 = (obj) => 取得類型(obj) !== TypeNames.Object;

/**
 * 判斷物件是否不是正則表達式類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是正則表達式，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是正則表達式(/abc/); // false
 * 不是正則表達式("abc"); // true
 */
const 不是正則表達式 = (obj) => 取得類型(obj) !== TypeNames.RegExp;

/**
 * 判斷物件是否不是字串串類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是字串串類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是字串("Hello"); // false
 * 不是字串(123); // true
 */
const 不是字串 = (obj) => 取得類型(obj) !== TypeNames.String;

/**
 * 判斷物件是否不是 `undefined`。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件不是 `undefined`，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 不是未定義(undefined); // false
 * 不是未定義(null); // true
 */
const 不是未定義 = (obj) => 取得類型(obj) !== TypeNames.Undefined;

/**
 * 判斷物件是否為 `null`。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是 `null`，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是null(null); // true
 * 是null(123); // false
 */
const 是null = (obj) => 取得類型(obj) === TypeNames.Null;

/**
 * 判斷物件是否為數字類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是數字類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是數字(123); // true
 * 是數字("123"); // false
 */
const 是數字 = (obj) => 取得類型(obj) === TypeNames.Number;

/**
 * 判斷物件是否為物件（非陣列）類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是對像類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是物件({}); // true
 * 是物件([]); // false
 */
const 是物件 = (obj) => 取得類型(obj) === TypeNames.Object;

/**
 * 判斷物件是否為正則表達式類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是正則表達式，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是正則表達式(/abc/); // true
 * 是正則表達式("abc"); // false
 */
const 是正則表達式 = (obj) => 取得類型(obj) === TypeNames.RegExp;

/**
 * 判斷物件是否為字串串類型。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是字串串類型，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是字串("Hello"); // true
 * 是字串(123); // false
 */
const 是字串 = (obj) => 取得類型(obj) === TypeNames.String;

/**
 * 判斷是否為有效的 UUID 格式字串串。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果是合法的 UUID，則返回 `true`，否則返回 `false`。
 *
 * @example
 * 是UUID("123e4567-e89b-12d3-a456-426655440000"); // true
 * 是UUID("invalid-uuid"); // false
 */
const 是UUID = (obj) => 取得類型(obj) === TypeNames.String && regexUUID.test(obj);

/**
 * 判斷物件是否為 `undefined`。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是 `undefined`，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是未定義(undefined); // true
 * 是未定義(null); // false
 * 是未定義(123); // false
 */
const 是未定義 = (obj) => 取得類型(obj) === TypeNames.Undefined;

/**
 * 判斷物件是否為 `null` 或 `undefined`。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是 `null` 或 `undefined`，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是null或未定義(null); // true
 * 是null或未定義(undefined); // true
 * 是null或未定義(""); // false
 * 是null或未定義(0); // false
 */
const 是null或未定義 = (obj) => 取得類型(obj) === TypeNames.Undefined || 是null(obj);

/**
 * 判斷物件是否為 `null`、`undefined` 或空字串串。
 *
 * @param {*} obj - 要檢測的物件。
 * @returns {boolean} 如果物件是 `null`、`undefined` 或空字串串，則返回 `true`；否則返回 `false`。
 *
 * @example
 * 是null或空字串(null); // true
 * 是null或空字串(undefined); // true
 * 是null或空字串(""); // true
 * 是null或空字串("text"); // false
 * 是null或空字串(123); // false
 */
const 是null或空字串 = (obj) => {
	if (是null(obj) || 是未定義(obj)) {
		return true;
	}
	if (取得類型(obj) !== TypeNames.String) {
		return false;
	}
	return obj.length === 0;
};

/**
 * 比較兩個值是否為相同的資料型別。
 * 此函式會對輸入值的 '型別' 進行檢查，而非僅檢查是否相等。
 * 使用 `Object.prototype.toString.call()` 以確保型別判斷準確，避免 `typeof` 無法正確判斷物件或陣列的問題。
 *
 * @function 相同類型
 * @param {*} obj1 - 第一個值，用於比較的參數。
 * @param {*} obj2 - 第二個值，用於比較的參數。
 * @returns {boolean} 若兩個值的型別相同則返回 `true`；若型別不同或無效輸入則返回 `false`。
 * @example
 * // 基本型別相同
 * 相同類型(123, 456); // true
 *
 * // 不同型別：物件 vs 陣列
 * 相同類型([], {}); // false
 *
 * // 兩者皆為 null
 * 相同類型(null, null); // true
 *
 * // 一個為 undefined
 * 相同類型(undefined, null); // false，並顯示警告
 */
const 相同類型 = (obj1, obj2) => {
	if (obj1 === undefined || obj2 === undefined) {
		console.warn('其中一個或多個輸入為 undefined');
		return false;
	}

	if (obj1 === null && obj2 === null) {
		return true; // 都為 null 時型別相同
	}

	return 取得類型(obj1) === 取得類型(obj2);
};

/**
 * 深拷貝一個物件。
 *
 * @param {Object} object - 要拷貝的物件。
 * @returns {Object} 返回物件的深拷貝。
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copy = 複製物件(obj);
 * console.log(copy); // { a: 1, b: { c: 2 } }
 */
const 複製物件 = (object) => {
	if (object === undefined || object === null || typeof object !== 'object') {
		return object; // 如果不是物件或為 null，直接返回原來的值
	}

	try {
		return JSON.parse(JSON.stringify(object));
	} catch (error) {
		console.error('無法拷貝物件:', error);
		return null; // 如果拷貝過程失敗，返回 null 作為默認值
	}
};

/**
 * 獲取物件及其原型鏈中所有非構造函式的函式名稱列表。
 *
 * @param {Object} obj - 傳入的物件。
 * @returns {string[]} 包含所有函式名稱的陣列 (不重複)。
 */
const 取得方法 = (obj) => {
	if (obj === null || typeof obj !== 'object') {
		throw new TypeError('參數必須是一個物件');
	}

	const methods = new Set();
	let proto = Object.getPrototypeOf(obj);

	while (proto && proto !== Object.prototype) {
		Object.getOwnPropertyNames(proto)
			.filter(name => typeof proto[name] === 'function' && name !== 'constructor')
			.forEach(name => methods.add(name));
		proto = Object.getPrototypeOf(proto);
	}

	return [...methods];
};

/**
 * 提取函式的參數名稱列表。
 *
 * @param {Function} func - 要提取參數名稱的函式。
 * @returns {string[]} 包含參數名稱的陣列；若輸入無效或無參數則返回空陣列。
 */
const 取得參數名稱 = (func) => {
	if (typeof func !== 'function') {
		throw new TypeError('參數必須是一個函式');
	}

	const fnStr = func.toString().replace(/\s+/g, ' '); // 移除不必要的多餘空白
	const match = fnStr.match(/^[^(]*\(([^)]*)\)/); // 提取參數部分
	if (!match || !match[1]) {
		return [];
	}

	return match[1]
		.split(',')
		.map(param => param.trim()) // 去除多餘空白
		.filter(param => param);   // 過濾空值
};

/**
 * 深拷貝物件以移除 Proxy 並返回新的物件。
 *
 * @param {*} obj - 需要移除 Proxy 的物件。
 * @returns {*} 返回新的深拷貝物件；null 和 undefined 將直接返回。
 */
const 移除代理 = (obj) => {
	if (obj === null || obj === undefined) {
		return obj; // 無需處理 null 或 undefined
	}

	if (typeof obj !== 'object') {
		return obj; // 非物件類型直接返回（例如數字、字串、布林值）
	}

	// 使用 JSON 方法進行深拷貝
	try {
		return JSON.parse(JSON.stringify(obj));
	} catch (error) {
		// 當無法序列化物件時拋出錯誤（例如循環引用會導致問題）
		throw new Error(`無法移除 Proxy，解析失敗: ${error.message}`);
	}
};

/**
 * 修正精確度誤差，移除小數點後多餘的零並精確到指定的小數位數。
 *
 * @param {number} x - 要修正的數值。
 * @param {number} [精確度=10] - 指定修正的小數位數範圍，預設為 10。
 * @returns {number} 返回修正後的數值。
 *
 * @example
 * // 修正後的小數結果
 * 修正精確度誤差(1.2300000000); // 1.23
 * 修正精確度誤差(0.0000001, 7); // 0.0000001
 * 修正精確度誤差(1.01111111, 4); // 1.0111
 */
const 修正精確度誤差 = (x, 精確度 = 10) => parseFloat(x.toFixed(精確度).toString());

/**
 * 判斷數值是否為很小的值（小於容差範圍）。
 *
 * 此函式用於檢查數值的絕對值是否小於指定的容差值 (`TOLERANCE`)，
 * 通常用於判斷數值是否接近於零。
 *
 * @param {number} x - 要檢查的數值。
 * @returns {boolean} 如果數值的絕對值小於 `TOLERANCE`，返回 `true`；否則返回 `false`。
 *
 * @example
 * // 範例 1：很小的值
 * const 是小值 = 是很小的值(0.0001); // true (當 TOLERANCE 為預設值，例如 0.001)
 *
 * @example
 * // 範例 2：不是很小的值
 * const 不是小值 = 是很小的值(0.01); // false
 */
const 是很小的值 = (x) => Math.abs(x) < TOLERANCE;

/**
 * 驗證兩個數值是否相等（在允許的誤差範圍內）。
 *
 * 該函式使用給定的容差值 (`TOLERANCE`) 來檢查兩個數值之間的差異是否小於或等於容差，
 * 如果是，則認為它們相等。
 *
 * @param {number} a - 第一個數值。
 * @param {number} b - 第二個數值。
 * @returns {boolean} 如果兩個數值在允許的容差範圍內相等，返回 `true`；否則返回 `false`。
 *
 * @example
 * // 範例 1：兩數相等
 * const 相等 = 兩個數值相等(0.1 + 0.2, 0.3); // true (考慮浮點數舍入誤差)
 *
 * @example
 * // 範例 2：兩數不相等
 * const 不相等 = 兩個數值相等(0.1, 0.2); // false
 */

const 兩個數值相等 = (a, b) => Math.abs(a - b) <= TOLERANCE;
/**
 * 驗證輸入是否為函式。
 *
 * 該函式會檢查輸入是否為有效的函式，若輸入不是函式，則拋出 `型別錯誤`。
 *
 * @param {Function} 函式 - 要驗證的目標值。
 * @throws {型別錯誤} 如果輸入既存在且不是函式時，拋出型別錯誤。
 *
 * @example
 * // 範例 1：正確的函式
 * 必須是函式(() => console.log('這是一個函式')); // 不會拋出錯誤
 *
 * @example
 * // 範例 2：錯誤的非函式輸入
 * 必須是函式(123); // 拋出型別錯誤
 *
 * @example
 * // 範例 3：無輸入（允許不傳值）
 * 必須是函式(); // 不會拋出錯誤
 */
const 必須是函式 = (函式) => {
	if (函式 && 不是函式(函式)) {
		throw new 型別錯誤(錯誤訊息.必須是函式);
	}
};

export default {
	複製物件,
	取得類型,
	是陣列,
	是布林值,
	是日期,
	是空字串,
	是函式,
	不是陣列,
	不是布林值,
	不是日期,
	不是空字串,
	不是函式,
	不是null,
	不是數字,
	不是物件,
	不是正則表達式,
	不是字串,
	不是未定義,
	是null,
	是null或空字串,
	是null或未定義,
	是數字,
	是物件,
	是正則表達式,
	是字串,
	是UUID,
	是未定義,
	相同類型,
	取得方法,
	取得參數名稱,
	移除代理,
	是很小的值,
	修正精確度誤差,
	兩個數值相等,
	必須是函式,
	ARRAY: TypeNames.Array,
	BOOLEAN: TypeNames.Boolean,
	DATE: TypeNames.Date,
	FUNCTION: TypeNames.Function,
	NULL: TypeNames.Null,
	NUMBER: TypeNames.Number,
	OBJECT: TypeNames.Object,
	REGEXP: TypeNames.RegExp,
	STRING: TypeNames.String,
	UNDEFINED: TypeNames.Undefined,
};