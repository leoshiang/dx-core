/** @module 例外 **/

/**
 * @class
 * 索引超出範圍錯誤
 */
export class 索引超出範圍錯誤 extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * @class
 * 參數錯誤
 */
export class 參數錯誤 extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * @class
 * 型別錯誤
 */
export class 型別錯誤 extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * @class
 * 二進位字串內容錯誤
 */
export class 二進位字串內容錯誤 extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default {
	索引超出範圍錯誤,
	參數錯誤,
	型別錯誤,
	二進位字串內容錯誤
}