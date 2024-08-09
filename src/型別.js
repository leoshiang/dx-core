/** @module Type **/

const {型別錯誤} = require("./例外");
const 錯誤訊息 = require("./錯誤訊息");
/**
 * @enum { string }
 */
const 型別名稱 = {
    /** 陣列 **/
    Array: 'Array',

    /** 布林值 **/
    Boolean: 'Boolean',

    /** 日期 **/
    Date: 'Date',

    /** 函式 **/
    Function: 'Function',

    /** 空值 **/
    Null: 'Null',

    /** 數值 **/
    Number: 'Number',

    /** 物件 **/
    Object: 'Object',

    /** 陣正規表示式 **/
    RegExp: 'RegExp',

    /** 字串 **/
    String: 'String',

    /** 未定義 **/
    Undefined: 'Undefined',
}

/**
 * 判斷數值是否相同的容許值。如果兩個數值相減的結果小於 TOLERANCE，則視為相同。
 * @const
 * @type {number}
 */
let TOLERANCE = 1.0E-8 // Number.EPSILON = 1.0E-150

/**
 * 取得型別。
 * @param {*} obj 要取得型別的物件。
 * @returns
 * {('Array'|'Boolean'|'Date'|'Function'|'Null'|'Number'|'RegExp'|'String'|'Undefined')} 型別字串。
 */
const 取得型別 = (obj) => Object.prototype.toString.call(obj).slice(8, -1)

/**
 * 判斷參數是否為陣列。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是陣列，回傳 true，否則回傳 false。
 */
const 是陣列 = (obj) => 取得型別(obj) === 型別名稱.Array

/**
 * 判斷參數是否為布林值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是布林值，回傳 true，否則回傳 false。
 */
const 是布林 = (obj) => 取得型別(obj) === 型別名稱.Boolean

/**
 * 判斷參數是否為日期。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是日期，回傳 true，否則回傳 false。
 */
const 是日期 = (obj) => 取得型別(obj) === 型別名稱.Date

/**
 * 判斷參數是否為函式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是函式，回傳 true，否則回傳 false。
 */
const 是函式 = (obj) => 取得型別(obj) === 型別名稱.Function

/**
 * 判斷參數是否為null。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是null，回傳 true，否則回傳 false。
 */
const 是空值 = (obj) => 取得型別(obj) === 型別名稱.Null

/**
 * 判斷參數是否為數值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是數值，回傳 true，否則回傳 false。
 */
const 是數值 = (obj) => 取得型別(obj) === 型別名稱.Number

/**
 * 判斷參數是否為物件。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是物件，回傳 true，否則回傳 false。
 */
const 是物件 = (obj) => 取得型別(obj) === 型別名稱.Object

/**
 * 判斷參數是否為正規表示式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是正規表示式，回傳 true，否則回傳 false。
 */
const 是正規表示式 = (obj) => 取得型別(obj) === 型別名稱.RegExp

/**
 * 判斷參數是否為字串。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是字串，回傳 true，否則回傳 false。
 */
const 是字串 = (obj) => 取得型別(obj) === 型別名稱.String

/**
 * 判斷參數是否為undefined。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是 undefined，回傳 true，否則回傳 false。
 */
const 是未定義 = (obj) => 取得型別(obj) === 型別名稱.Undefined

/**
 * 判斷參數不是陣列。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是陣列，回傳 true，否則回傳 false。
 */
const 不是陣列 = (obj) => 取得型別(obj) !== 型別名稱.Array

/**
 * 判斷參數不是布林值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是布林值，回傳 true，否則回傳 false。
 */
const 不是布林 = (obj) => 取得型別(obj) !== 型別名稱.Boolean

/**
 * 判斷參數不是日期。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是日期，回傳 true，否則回傳 false。
 */
const 不是日期 = (obj) => 取得型別(obj) !== 型別名稱.Date

/**
 * 判斷參數不是函式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是函式，回傳 true，否則回傳 false。
 */
const 不是函式 = (obj) => 取得型別(obj) !== 型別名稱.Function

/**
 * 判斷參數不是null。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是null，回傳 true，否則回傳 false。
 */
const 不是空值 = (obj) => 取得型別(obj) !== 型別名稱.Null

/**
 * 判斷參數不是數值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是數值，回傳 true，否則回傳 false。
 */
const 不是數值 = (obj) => 取得型別(obj) !== 型別名稱.Number

/**
 * 判斷參數不是物件。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是物件，回傳 true，否則回傳 false。
 */
const 不是物件 = (obj) => 取得型別(obj) !== 型別名稱.Object

/**
 * 判斷參數不是正規表示式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是正規表示式，回傳 true，否則回傳 false。
 */
const 不是正規表示式 = (obj) => 取得型別(obj) !== 型別名稱.RegExp

/**
 * 判斷參數不是字串。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是字串，回傳 true，否則回傳 false。
 */
const 不是字串 = (obj) => 取得型別(obj) !== 型別名稱.String

/**
 * 判斷兩個物件的型別是否相同。
 * @param obj 要判斷型別的物件。
 * @param 參數另一個向量的長度必須相同 要判斷型別的物件。
 * @returns {boolean} 如果兩個物件的型別相同，回傳 true，否則回傳 false。
 */
const 同型別 = (obj, 參數另一個向量的長度必須相同) => 取得型別(obj) === 取得型別(參數另一個向量的長度必須相同)

/**
 * 判斷兩個數值是否相同。
 * @param {number} a
 * @param {number} b
 * @returns {boolean} 如果兩個數值相同，回傳 true，否則回傳 false。
 */
const 兩個數值相等 = (a, b) => Math.abs(a - b) <= TOLERANCE

/**
 * 是否為很小的值。
 * @param {number} x
 * @returns {boolean} 如果小於 TOLERANCE，則回傳 true，否則回傳 false。
 */
const 是很小的值 = (x) => Math.abs(x) < TOLERANCE

/**
 * 移除小數點之後的連續的 0。
 * @param {number} x
 * @param {number} 精確度
 * @returns {number}
 */
const 修正精確度誤差 = (x, 精確度 = 10) => parseFloat(x.toFixed(精確度).toString())

const 回呼函式的型別必須是函式 = (回呼函式) => {
    if (回呼函式 && 不是函式(回呼函式)) {
        throw new 型別錯誤(錯誤訊息.回呼函式必須是函式)
    }
}

module.exports = {
    不是函式,
    不是字串,
    不是布林,
    不是數值,
    不是日期,
    不是正規表示式,
    不是物件,
    不是空值,
    不是陣列,
    修正精確度誤差,
    兩個數值相等,
    取得型別,
    同型別,
    回呼函式的型別必須是函式,
    型別名稱,
    是函式,
    是字串,
    是布林,
    是很小的值,
    是數值,
    是日期,
    是未定義,
    是正規表示式,
    是物件,
    是空值,
    是陣列
}
