/** @module 例外 **/

/**
 * @class
 */
class 索引超出範圍錯誤 extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

/**
 * @class
 */
class 參數錯誤 extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

/**
 * @class
 */
class 型別錯誤 extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

/**
 * @class
 */
class 二進位字串內容錯誤 extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤,
    二進位字串內容錯誤,
}
