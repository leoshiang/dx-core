const 向量 = require('./向量');
const { 型別錯誤, 索引超出範圍錯誤 } = require('./例外');
const 型別 = require('./型別');
const 錯誤訊息 = require('./錯誤訊息');

/**
 * 此 callback 會在遍歷每一個 直行 時被呼叫一次。
 *
 * @callback 矩陣回呼函式
 * @param {*} value 向量。
 * @param {*} 編號  直行/橫列 編號。
 */

/**
 * 此 callback 會在遍歷每一個元素時被呼叫一次。
 *
 * @callback forEachCallback
 * @param {*} value 值。
 * @param {*} 橫列  橫列 編號。
 * @param {*} 直行  直行 編號。
 */

/**
 * @class
 * @classdesc 二維陣列。
 */
module.exports = class 矩陣 extends Array {

	#橫列數量;
	#直行數量;
	#預設值;

	/**
	 * @constructor
	 * @param {number|Array} [橫列數量] 橫列數。
	 * @param {number|Array} [直行數量] 直行數。
	 * @param {number} [預設值] 預設值。
	 * @example
	 * let m1 = new 矩陣() // []
	 * let m2 = new 矩陣(2, 2) // [[0, 0], [0, 0]]
	 * let m3 = new 矩陣([2, 3, 1],
	 *                     [4, 7, 2],
	 *                     [3, 1, 1]) // [[2, 3, 1], [4, 7, 2], [3, 1, 1]]
	 * let m4 = new 矩陣([2, 3, 1], 1, [3, 1, 1]) // [[2, 3, 1], [3, 1, 1]]
	 */
	constructor (橫列數量 = 0, 直行數量 = 0, 預設值) {
		super();
		this.清除();
		this.#預設值 = 型別.是未定義(預設值) ? 0 : 預設值;
		if (型別.是陣列(橫列數量)) {
			this.#以陣列做初始化(Array.from(arguments));
		} else {
			this.設定維度(橫列數量 || 0, 直行數量 || 0);
			this.填滿(this.#預設值);
		}
	}

	get 列秩 () {
		let 非零的橫列數量 = 0;
		let 上三角矩陣 = this.上三角矩陣();
		for (let 橫列編號 = 0; 橫列編號 < 上三角矩陣.橫列數量; 橫列編號++) {
			if (!this.橫列(橫列編號).是零向量()) {
				非零的橫列數量++;
			}
		}
		return 非零的橫列數量;
	}

	/**
	 * 取得 rows。
	 * @return {*}
	 */
	get 橫列數量 () {
		return this.#橫列數量;
	}

	get 特徵值 () {
		let 暫存矩陣 = this.複製();
		for (let 對角線編號 = 0; 對角線編號 < 暫存矩陣.#橫列數量 - 1; 對角線編號++) {
			for (let 橫列編號 = 對角線編號 + 1; 橫列編號 < 暫存矩陣.#橫列數量; 橫列編號++) {
				let 對角線元素 = 暫存矩陣[對角線編號][對角線編號];
				if (對角線元素 === 0) {
					暫存矩陣.交換橫列(對角線編號, 橫列編號);
					暫存矩陣.設定橫列(橫列編號, 暫存矩陣.橫列(橫列編號).乘(-1));
					continue;
				}
				let m = -1 * 暫存矩陣[橫列編號][對角線編號] / 對角線元素;
				let 橫列向量 = 暫存矩陣.橫列(橫列編號);
				橫列向量 = 橫列向量.加(暫存矩陣.橫列(對角線編號).乘(m));
				暫存矩陣.設定橫列(橫列編號, 橫列向量);
			}
		}

		let 回傳結果 = 暫存矩陣[0][0];
		for (let 對角線編號 = 1; 對角線編號 < 暫存矩陣.#橫列數量; 對角線編號++) {
			回傳結果 = 回傳結果 * 暫存矩陣[對角線編號][對角線編號];
		}
		return 回傳結果;
	}

	/**
	 * 取得 直行數量。
	 * @return {*}
	 */
	get 直行數量 () {
		return this.#直行數量;
	}

	/**
	 * 將矩陣設為單位矩陣（對角線元素為 1 ，其餘元素為 0）
	 * @return {矩陣}
	 * @example
	 * let m = new 矩陣(3, 3).單位矩陣()
	 */
	static 單位矩陣 (橫列數量) {
		let 結果 = new 矩陣(橫列數量, 橫列數量);
		for (let 橫列 = 0; 橫列 < 橫列數量; 橫列++) {
			結果[橫列][橫列] = 1;
		}
		return 結果;
	}

	#乘以倍數 (倍數) {
		let 回傳結果 = new 矩陣(this.橫列數量, this.直行數量);
		for (let 橫列編號 = 0; 橫列編號 < this.橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.直行數量; 直行編號++) {
				回傳結果[橫列編號][直行編號] = this[橫列編號][直行編號] * 倍數;
			}
		}
		return 回傳結果;
	}

	#以陣列做初始化 (陣列集合) {
		let 維度 = this.#從陣列集合計算維度(陣列集合);
		this.length = 0;
		陣列集合
			.filter(array => 型別.是陣列(array))
			.forEach(array => {
				let 橫列 = new Array(維度.直行數量);
				let 直行編號 = 0;
				while (直行編號 < 維度.直行數量) {
					橫列[直行編號] = array[直行編號] || 0;
					直行編號++;
				}
				this.push(橫列);
			});
		this.#橫列數量 = 維度.橫列數量;
		this.#直行數量 = 維度.直行數量;
	}

	/**
	 *
	 * @param 目標
	 * @param 加減數值
	 * @param 加減矩陣
	 * @returns {矩陣}
	 */
	#加減運算 (目標, 加減數值, 加減矩陣) {
		let 加減運算;
		if (型別.是數值(目標)) {
			加減運算 = 加減數值;
		} else if (目標 instanceof 矩陣) {
			加減運算 = 加減矩陣;
		} else {
			throw new 型別錯誤(錯誤訊息.矩陣.目標必須是數值或是矩陣);
		}

		let 回傳結果 = new 矩陣(this.#橫列數量, this.#直行數量);
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
				加減運算(橫列編號, 直行編號, 回傳結果);
			}
		}
		return 回傳結果;
	}

	#參數值必須是向量或矩陣 (參數) {
		if (!(參數 instanceof 向量) && 型別.不是陣列(參數)) {
			throw new 型別錯誤(錯誤訊息.矩陣.參數值必須是向量或矩陣);
		}
	}

	#參數必須是矩陣型別 (目標) {
		if (!(目標 instanceof 矩陣)) {
			throw new 型別錯誤('目標 的型別必須是 矩陣。');
		}
	}

	/**
	 * 找出最長的陣列長度當作直行數量，有效的陣列數量當作rows。
	 * @param {*} 陣列集合 陣列的每一個元素都是陣列。
	 * @return {{直行數量: number, 橫列數量: number}}
	 */
	#從陣列集合計算維度 (陣列集合) {
		let 直行數量 = 0;
		let 橫列數量 = 0;
		陣列集合.forEach(x => {
			if (型別.不是陣列(x)) {
				return;
			}
			直行數量 = Math.max(直行數量, x.length);
			橫列數量++;
		});
		return {
			直行數量: 直行數量,
			橫列數量: 橫列數量,
		};
	}

	#橫列編號必須在範圍內 (橫列編號) {
		if (橫列編號 < 0 || 橫列編號 >= this.#橫列數量) {
			throw new 索引超出範圍錯誤(`橫列編號超出範圍(0,${this.#橫列數量 - 1})`);
		}
	}

	#直行編號必須在範圍內 (直行編號) {
		if (直行編號 < 0 || 直行編號 >= this.#直行數量) {
			throw new 索引超出範圍錯誤(`直行編號超出範圍(0,${this.#直行數量 - 1}`);
		}
	}

	#高斯約旦消去法計算反矩陣 (矩陣) {
		for (let 對角線編號 = 0; 對角線編號 < 矩陣.橫列數量; 對角線編號++) {
			let 橫列 = 矩陣.橫列(對角線編號).乘(1 / 矩陣[對角線編號][對角線編號]);
			矩陣.設定橫列(對角線編號, 橫列);
			for (let r = 對角線編號 + 1; r < 矩陣.橫列數量; r++) {
				矩陣.設定橫列(r, 矩陣.橫列(r).加(橫列.乘(-1 * 矩陣[r][對角線編號])));
			}
		}

		for (let 對角線編號 = 矩陣.橫列數量 - 1; 對角線編號 > 0; 對角線編號--) {
			for (let r = 對角線編號; r > 0; r--) {
				if (矩陣[r - 1][對角線編號] === 0) {
					continue;
				}
				let v1 = 矩陣.橫列(對角線編號).乘(-1 * 矩陣[r - 1][對角線編號]);
				let v2 = 矩陣.橫列(r - 1);
				let 橫列向量 = v2.加(v1);
				矩陣.設定橫列(r - 1, 橫列向量);
			}
		}
		return 矩陣.複製範圍(0, this.直行數量, this.橫列數量, this.直行數量);
	}

	上三角矩陣 () {
		let 回傳結果 = this.複製();
		for (let 對角線編號 = 0; 對角線編號 < 回傳結果.橫列數量; 對角線編號++) {
			let row = 回傳結果.橫列(對角線編號);
			for (let rowIndex = 對角線編號 + 1; rowIndex < 回傳結果.橫列數量; rowIndex++) {
				let m = -回傳結果[rowIndex][對角線編號] / 回傳結果[對角線編號][對角線編號];
				回傳結果.設定橫列(rowIndex, 回傳結果.橫列(rowIndex).加(row.乘(m)));
			}
		}
		return 回傳結果;
	}

	/**
	 * 與另一個矩陣或數值乘。
	 * @param {矩陣|number} 目標
	 * @return {矩陣} 新矩陣。
	 * @throws {型別錯誤} 當參數 m 不是矩陣或數值時，會拋出此例外。
	 * @example
	 * let m = new 矩陣([1, 2], [3, 4], [5, 6])
	 * let n = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
	 * let 回傳結果 = m.mul(n)
	 */
	乘 (目標) {
		let 回傳結果;
		if (型別.是數值(目標)) {
			return this.#乘以倍數(目標);
		}
		this.#參數必須是矩陣型別(目標);
		if (this.#直行數量 !== 目標.橫列數量) {
			throw new Error('目標 的 rows 應等於矩陣的 直行數量。');
		}
		回傳結果 = new 矩陣(this.橫列數量, 目標.直行數量);
		for (let row = 0; row < this.橫列數量; row++) {
			let 回傳結果Row = 回傳結果[row];
			for (let column = 0; column < 目標.直行數量; column++) {
				let sum = 0;
				for (let c = 0; c < this.#直行數量; c++) {
					sum += this[row][c] * 目標[c][column];
				}
				回傳結果Row[column] = sum;
			}
		}
		return 回傳結果;
	}

	交換橫列 (a, b) {
		this.#橫列編號必須在範圍內(a);
		this.#橫列編號必須在範圍內(b);
		let temp = this[a];
		this[a] = this[b];
		this[b] = temp;
		return this;
	}

	修正精確度誤差 () {
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
				this[橫列編號][直行編號] = 型別.修正精確度誤差(this[直行編號][橫列編號]);
			}
		}
		return this;
	}

	/**
	 *
	 * @param n
	 * @returns {矩陣}
	 */
	冪次 (n) {
		if (n === 0) {
			return 矩陣.單位矩陣(this.橫列數量);
		}
		if (n === 1) {
			return this.複製();
		}
		let 回傳結果 = this.乘(this);
		for (let i = 3; i <= n; i++) {
			回傳結果 = 回傳結果.乘(this);
		}
		return 回傳結果;
	}

	/**
	 * 與另一個矩陣相加或是加上一個數值。
	 * @param {矩陣|number} 目標
	 * @return {矩陣} 新矩陣。
	 * @throws {型別錯誤}
	 * @example
	 * let m1 = new 矩陣([1, 2], [3, 4])
	 * let m2 = new 矩陣([5, 6], [7, 8])
	 * let m3 = m1.add(m2) // [[6, 8],[10, 12]]
	 */
	加 (目標) {
		const 加上數值 = (橫列編號, 直行編號, 新矩陣) => 新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號] + 目標;
		const 加上矩陣 = (橫列編號, 直行編號, 新矩陣) => 新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號] + 目標[橫列編號][直行編號];
		return this.#加減運算(目標, 加上數值, 加上矩陣);
	}

	/**
	 * 計算反矩陣。
	 * @return {矩陣}
	 * @throws {Error} 如果行列式為0，則拋出此例外。
	 */
	反矩陣 () {
		if (this.#直行數量 === 0 || this.#橫列數量 === 0) {
			throw new Error(錯誤訊息.矩陣.因為維度為0所以此矩陣沒有反矩陣);
		}
		if (this.特徵值 === 0) {
			throw new Error(錯誤訊息.矩陣.因為行列式為零所以此矩陣沒有反矩陣);
		}
		if (this.#直行數量 !== this.#橫列數量) {
			throw new Error(錯誤訊息.矩陣.因為不是方陣所以此矩陣沒有反矩陣);
		}
		let 暫存矩陣 = this.合併直行(矩陣.單位矩陣(this.橫列數量));
		return this.#高斯約旦消去法計算反矩陣(暫存矩陣);
	}

	/**
	 *
	 * @param m
	 * @returns {矩陣}
	 */
	合併直行 (m) {
		let 新矩陣 = new 矩陣(this.橫列數量, this.直行數量 + m.直行數量);
		for (let 橫列編號 = 0; 橫列編號 < 新矩陣.橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.直行數量; 直行編號++) {
				新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號];
			}
			for (let 直行編號 = 0; 直行編號 < m.直行數量; 直行編號++) {
				新矩陣[橫列編號][直行編號 + this.直行數量] = m[橫列編號][直行編號];
			}
		}
		return 新矩陣;
	}

	/**
	 * 填入數值。
	 * @param {*} 值 要填入的值。
	 * @return {矩陣} 矩陣本身。
	 * @example
	 * let m = new 矩陣(2, 2).fill(2) // ([2, 2] [2, 2])
	 */
	填滿 (值) {
		this.forEach(row => row.fill(值));
		return this;
	}

	/**
	 * 是否為反對稱矩陣。
	 * @returns {boolean}
	 */
	是反對稱矩陣 () {
		return this.轉置矩陣().等於(this.乘(-1));
	}

	/**
	 * 是否為對稱矩陣。
	 * @returns {boolean}
	 */
	是對稱矩陣 () {
		return this.轉置矩陣().等於(this);
	}

	是方塊矩陣 () {
		return this.#橫列數量 === this.#直行數量;
	}

	/**
	 * 取得橫列的值。
	 * @param {number} 橫列編號 從 0 開始的橫列編號。
	 * @return {向量} 回傳向量。
	 * @example
	 * let m = new 矩陣(2, 2)
	 * m[0][0] = 1
	 * m[0][1] = 2
	 * m[1][0] = 3
	 * m[1][1] = 4
	 * console.log(m.橫列(0))
	 */
	橫列 (橫列編號) {
		return new 向量(this[橫列編號]);
	}

	每一個元素 (回呼函式) {
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
				回呼函式(this[橫列編號][直行編號], 橫列編號, 直行編號);
			}
		}
		return this;
	}

	/**
	 * 遍歷每一列（橫列）。
	 * @param {矩陣回呼函式} 回呼函式
	 * @return {矩陣} 矩陣本身。
	 * @example
	 * new 矩陣(3, 3).fill(1).每一個橫列((x) => console.log(x))
	 */
	每一個橫列 (回呼函式) {
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			回呼函式(this[橫列編號], 橫列編號);
		}
		return this;
	}

	/**
	 * 遍歷每一個直行。
	 * @param {矩陣回呼函式} 回呼函式。
	 * @return {矩陣} 矩陣本身。
	 * @example
	 * new 矩陣(3, 3).fill(1).每一個直行((x) => console.log(x))
	 */
	每一個直行 (回呼函式) {
		for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
			回呼函式(this.直行(直行編號), 直行編號);
		}
		return this;
	}

	/**
	 * 清除矩陣。
	 * @return {矩陣} 矩陣本身。
	 * @example
	 * let m = new 矩陣(2, 2).清除()
	 */
	清除 () {
		this.length = 0;
		this.#橫列數量 = 0;
		this.#直行數量 = 0;
		return this;
	}

	/**
	 * 與另一個矩陣相減或是減去一個數值。
	 * @param {矩陣|number} 目標
	 * @return {矩陣} 新矩陣
	 * @throws {型別錯誤}
	 * @example
	 * let m1 = new 矩陣([5, 6], [7, 8])
	 * let m2 = new 矩陣([1, 2], [3, 4])
	 * let m3 = m1.減(m2) // [[4, 4],[4, 4]]
	 */
	減 (目標) {
		const 減去數值 = (橫列編號, 直行編號, 新矩陣) => 新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號] - 目標;
		const 減去矩陣 = (橫列編號, 直行編號, 新矩陣) => 新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號] - 目標[橫列編號][直行編號];
		return this.#加減運算(目標, 減去數值, 減去矩陣);
	}

	/**
	 * 取得直行。
	 * @param {number} 直行編號 從 0 開始的直行編號。
	 * @return {向量} 回傳向量。
	 * @example
	 * let m = new 矩陣([1, 2], [3, 4])
	 * console.log(m.直行(0)) // [2, 4]
	 */
	直行 (直行編號) {
		let 回傳結果 = new 向量(this.#橫列數量);
		this.forEach((橫列, 橫列編號) => 回傳結果[橫列編號] = 橫列[直行編號]);
		return 回傳結果;
	}

	/**
	 * 此矩陣與目標是否相等。
	 * @param {矩陣} 目標
	 * @return {boolean} 如果兩個矩陣的維度和每一個元素都相同便回傳 true，否則回傳 false。
	 * @throws {型別錯誤} 如果傳入的參數不是矩陣會拋出此例外。
	 */
	等於 (目標) {
		if (!(目標 instanceof 矩陣)) {
			throw new 型別錯誤(錯誤訊息.矩陣.參數值必須是矩陣);
		}
		if (this.#橫列數量 !== 目標.橫列數量 || this.#直行數量 !== 目標.直行數量) {
			return false;
		}
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
				if (this[橫列編號][直行編號] !== 目標[橫列編號][直行編號]) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * 所有元素的總和。
	 * @return {*}
	 * @example
	 * let m1 = new 矩陣(2, 2)
	 * m1[0][0] = 1
	 * m1[0][1] = 2
	 * m1[1][0] = 3
	 * m1[1][1] = 4
	 * console.log(m1.總和())
	 *
	 * let m2 = new 矩陣(['a', 'b'], ['c', 'd'])
	 * console.log(m2.總和('')) // abcd
	 */
	總和 (初始值 = 0) {
		const 橫列每個元素加總 = (加總, 元素) => 加總 + 元素;
		const 每個橫列加總 = (加總, 橫列) => 加總 + (橫列.reduce(橫列每個元素加總, 初始值));
		return this.reduce(每個橫列加總, 初始值);
	}

	複製 () {
		return this.複製範圍(0, 0, this.#橫列數量, this.#直行數量);
	}

	/**
	 * 複製矩陣其中某一塊。
	 * @param {number} 起始橫列編號
	 * @param {number} 起始直行編號
	 * @param {number} 橫列數量
	 * @param {number} 直行數量
	 * @returns {矩陣}
	 */
	複製範圍 (起始橫列編號, 起始直行編號, 橫列數量, 直行數量) {
		this.#橫列編號必須在範圍內(起始橫列編號);
		this.#直行編號必須在範圍內(起始直行編號);
		if (橫列數量 < 0) {
			throw new Error('橫列數量必須大於零');
		}
		if (直行數量 < 0) {
			throw new Error('直行數量必須大於零');
		}
		if (起始橫列編號 + 橫列數量 > this.#橫列數量) {
			throw new Error('橫列數量超出範圍');
		}
		if (起始直行編號 + 直行數量 > this.#直行數量) {
			throw new Error('直行數量超出範圍');
		}

		let 回傳結果 = new 矩陣(橫列數量, 直行數量);
		for (let 橫列編號 = 0; 橫列編號 < 橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < 直行數量; 直行編號++) {
				回傳結果[橫列編號][直行編號] = this[起始橫列編號 + 橫列編號][起始直行編號 + 直行編號];
			}
		}
		return 回傳結果;
	}

	/**
	 * 設定某一橫列的值。
	 * @param {number} 橫列編號
	 * @param {向量|array} 值
	 */
	設定橫列 (橫列編號, 值) {
		this.#橫列編號必須在範圍內(橫列編號);
		this.#參數值必須是向量或矩陣(值);
		for (let 直行編號 = 0; 直行編號 < this.#直行數量; 直行編號++) {
			this[橫列編號][直行編號] = 值[直行編號];
		}
		return this;
	}

	/**
	 * 設定某一直行的值。
	 * @param {number} 直行編號
	 * @param {向量|array} 值
	 */
	設定直行 (直行編號, 值) {
		this.#直行編號必須在範圍內(直行編號);
		this.#參數值必須是向量或矩陣(值);
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			this[橫列編號][直行編號] = 值[橫列編號];
		}
		return this;
	}

	/**
	 * 設定維度，所有資料會被清除，並以預設值填滿。
	 * @param {number} 新的橫列數量
	 * @param {number} 新的直行數量
	 * @return {矩陣} 矩陣本身。
	 * @example
	 * let m = new 矩陣(2, 2).填滿(2).設定維度(3, 3)
	 */
	設定維度 (新的橫列數量, 新的直行數量) {
		this.length = 0;
		this.#橫列數量 = 新的橫列數量;
		this.#直行數量 = 新的直行數量;
		for (let 橫列編號 = 0; 橫列編號 < this.#橫列數量; 橫列編號++) {
			this.push(new Array(this.#直行數量).fill(this.#預設值));
		}
		return this;
	}

	轉為字串 () {
		let 回傳結果 = '[\r\n';
		this.forEach((row) => {
			回傳結果 += '  [' +
				row.reduce((acc, curr) => acc + ' ' +
					型別.修正精確度誤差((型別.是很小的值(curr) ? 0 : curr)) + ' ', '');
			回傳結果 += ']\r\n';
		});
		回傳結果 += ']\r\n';
		return 回傳結果;
	}

	/**
	 * 回傳轉置矩陣。
	 * @throws {Error} 如果維度為0，則拋出此例外。
	 * @return {矩陣} 新矩陣。
	 * @example
	 *  const m = new 矩陣([1, 2, 3], [4, 5, 6])
	 *  const t = m.轉置矩陣() // ([1,4] [2,5] [3,6])
	 */
	轉置矩陣 () {
		if (this.#直行數量 === 0 || this.#橫列數量 === 0) {
			throw new Error(錯誤訊息.矩陣.矩陣維度為0不可轉置);
		}
		let 回傳結果 = new 矩陣(this.#直行數量, this.#橫列數量);
		for (let 橫列編號 = 0; 橫列編號 < 回傳結果.#橫列數量; 橫列編號++) {
			for (let 直行編號 = 0; 直行編號 < 回傳結果.#直行數量; 直行編號++) {
				回傳結果[橫列編號][直行編號] = this[直行編號][橫列編號]
			}
		}
		return 回傳結果
	}
}
