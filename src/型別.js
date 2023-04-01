/** @module Type **/

const {型別錯誤} = require("./例外");
const 錯誤訊息 = require("./錯誤訊息");
/**
 * @enum { string }
 */
const TYPE_NAME = {
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
const TOLERANCE = 1.0E-8 // 1.0E-150

/**
 * 取得型別。
 * @param {*} obj 要取得型別的物件。
 * @returns
 * {('Array'|'Boolean'|'Date'|'Function'|'Null'|'Number'|'RegExp'|'String'|'Undefined')} 型別字串。
 */
const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1)

/**
 * 判斷參數是否為陣列。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是陣列，回傳 true，否則回傳 false。
 */
const 是陣列 = (obj) => getType(obj) === TYPE_NAME.Array

/**
 * 判斷參數是否為布林值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是布林值，回傳 true，否則回傳 false。
 */
const isBoolean = (obj) => getType(obj) === TYPE_NAME.Boolean

/**
 * 判斷參數是否為日期。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是日期，回傳 true，否則回傳 false。
 */
const isDate = (obj) => getType(obj) === TYPE_NAME.Date

/**
 * 判斷參數是否為函式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是函式，回傳 true，否則回傳 false。
 */
const isFunction = (obj) => getType(obj) === TYPE_NAME.Function

/**
 * 判斷參數是否為null。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是null，回傳 true，否則回傳 false。
 */
const isNull = (obj) => getType(obj) === TYPE_NAME.Null

/**
 * 判斷參數是否為數值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是數值，回傳 true，否則回傳 false。
 */
const 是數值 = (obj) => getType(obj) === TYPE_NAME.Number

/**
 * 判斷參數是否為物件。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是物件，回傳 true，否則回傳 false。
 */
const isObject = (obj) => getType(obj) === TYPE_NAME.Object

/**
 * 判斷參數是否為正規表示式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是正規表示式，回傳 true，否則回傳 false。
 */
const isRegex = (obj) => getType(obj) === TYPE_NAME.RegExp

/**
 * 判斷參數是否為字串。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是字串，回傳 true，否則回傳 false。
 */
const 是字串 = (obj) => getType(obj) === TYPE_NAME.String

/**
 * 判斷參數是否為undefined。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 是 undefined，回傳 true，否則回傳 false。
 */
const isUndefined = (obj) => getType(obj) === TYPE_NAME.Undefined

/**
 * 判斷參數不是陣列。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是陣列，回傳 true，否則回傳 false。
 */
const isNotArray = (obj) => getType(obj) !== TYPE_NAME.Array

/**
 * 判斷參數不是布林值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是布林值，回傳 true，否則回傳 false。
 */
const isNotBoolean = (obj) => getType(obj) !== TYPE_NAME.Boolean

/**
 * 判斷參數不是日期。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是日期，回傳 true，否則回傳 false。
 */
const isNotDate = (obj) => getType(obj) !== TYPE_NAME.Date

/**
 * 判斷參數不是函式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是函式，回傳 true，否則回傳 false。
 */
const 不是函式 = (obj) => getType(obj) !== TYPE_NAME.Function

/**
 * 判斷參數不是null。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是null，回傳 true，否則回傳 false。
 */
const isNotNull = (obj) => getType(obj) !== TYPE_NAME.Null

/**
 * 判斷參數不是數值。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是數值，回傳 true，否則回傳 false。
 */
const 不是數值 = (obj) => getType(obj) !== TYPE_NAME.Number

/**
 * 判斷參數不是物件。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是物件，回傳 true，否則回傳 false。
 */
const isNotObject = (obj) => getType(obj) !== TYPE_NAME.Object

/**
 * 判斷參數不是正規表示式。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是正規表示式，回傳 true，否則回傳 false。
 */
const isNotRegex = (obj) => getType(obj) !== TYPE_NAME.RegExp

/**
 * 判斷參數不是字串。
 * @param obj 要判斷型別的物件。
 * @returns {boolean} 如果 obj 不是字串，回傳 true，否則回傳 false。
 */
const isNotString = (obj) => getType(obj) !== TYPE_NAME.String

/**
 * 判斷兩個物件的型別是否相同。
 * @param obj 要判斷型別的物件。
 * @param 參數另一個向量的長度必須相同 要判斷型別的物件。
 * @returns {boolean} 如果兩個物件的型別相同，回傳 true，否則回傳 false。
 */
const isSameType = (obj, 參數另一個向量的長度必須相同) => getType(obj) === getType(參數另一個向量的長度必須相同)

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
const isSmallValue = (x) => Math.abs(x) < TOLERANCE

/**
 * 移除小數點之後的連續的 0。
 * @param {number} x
 * @returns {number}
 */
const removeTailingZero = (x) => parseFloat(x.toFixed(8).toString())

const 回呼函式的型別必須是函式 = (回呼函式) => {
    if (回呼函式 && 不是函式(回呼函式)) {
        throw new 型別錯誤(錯誤訊息.回呼函式必須是函式)
    }
}

module.exports = {
    TYPE_NAME,
    getType,
    是陣列,
    isBoolean,
    isDate,
    isFunction,
    isNull,
    是數值,
    isObject,
    isRegex,
    是字串,
    isUndefined,
    isNotArray,
    isNotBoolean,
    isNotDate,
    不是函式,
    isNotNull,
    不是數值,
    isNotObject,
    isNotRegex,
    isNotString,
    isSameType,
    兩個數值相等,
    isSmallValue,
    removeTailingZero,
    回呼函式的型別必須是函式
}
