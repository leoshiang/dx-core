const 型別 = require('./型別')
const { 型別錯誤, 參數錯誤, } = require('./例外')
const 位元陣列 = require('./位元陣列')
const 錯誤訊息 = require('./錯誤訊息')

/**
 * 回呼函式
 * @callback 向量回呼函式
 * @param {*} 數值
 * @param {number} 索引
 */

/**
 * @class
 * @classdesc 向量。
 */

module.exports = class 向量 extends Array {

    /**
     * @constructor
     * @param {array|number} 初始值 初始值。
     * @throws 參數錯誤
     */
    constructor (初始值 = 0) {
        let 參數陣列 = Array.from(arguments)
        if (參數陣列.length === 1) {
            const 第一個參數 = 參數陣列[0]
            if (型別.是陣列(第一個參數) && 第一個參數.length === 1) {
                super()
                this.push(第一個參數[0])
                return
            }

            if (型別.是數值(參數陣列[0])) {
                if (參數陣列[0] < 0) throw new 參數錯誤(錯誤訊息.向量.長度必須大於等於零)
                super(參數陣列[0])
                this.fill(0)
                return
            }
        }
        let 展開的參數 = 參數陣列.reduce((a, b) => {
            if (型別.是陣列(b)) {
                return [...a, ...b]
            } else {
                return [...a, b]
            }
        }, [])
        super(...展開的參數)
    }

    /**
     * 長度
     * @returns {number}
     */
    get 範數 () {
        let 回傳結果 = 0
        for (let i = 0; i < this.length; i++) {
            回傳結果 += this[i] * this[i]
        }
        return Math.sqrt(回傳結果)
    }

    /**
     * 尋找最後一個符合條件的項目。
     * @param {function} 條件 比較函式會在每一個有效的項目比較時被呼叫。
     * @param {位元陣列} 排除項目 如果項目的索引在排除項目中設為 true，便會被排除。
     * @returns {{索引: number, 值: null}|{索引: number, 值: *}}
     */
    #尋找最後一個符合條件的項目 (條件, 排除項目) {
        this.#排除項目的型別必須是位元陣列(排除項目)
        let 回傳結果 = {
            索引: -1,
            值: undefined
        }
        if (this.length === 0 || !條件) return 回傳結果
        回傳結果.索引 = 0
        回傳結果.值 = this[0]
        let 目前索引 = 1
        while (目前索引 <= this.length - 1) {
            if (排除項目 && 排除項目.狀態(目前索引)) {
                目前索引++
                continue
            }
            let 目前項目 = this[目前索引]
            if (條件(目前項目, 回傳結果.值)) {
                回傳結果 = {
                    索引: 目前索引,
                    值: 目前項目,
                }
            }
            目前索引++
        }
        return 回傳結果
    }

    /**
     * 尋找第一個符合條件的項目。
     * @param {*} 目標值
     * @param {位元陣列} 排除項目 如果項目在排除項目中設為 true，便會被排除。
     * @param {function} 條件 條件函式會在每一個有效的項目比較時被呼叫。
     * 如果 target 和目前項目相同，回傳 true。
     * 如果 target 和目前項目不相同，回傳 false。
     * @returns {{索引: number, 值: undefined}|{索引: number, 值: *}}
     */
    #尋找第一個符合條件的項目 (目標值, 排除項目, 條件) {
        this.#排除項目的型別必須是位元陣列(排除項目)
        型別.回呼函式的型別必須是函式(條件)
        let 目前索引 = 0
        while (目前索引 < this.length) {
            if (排除項目 && 排除項目.狀態(目前索引)) {
                目前索引++
                continue
            }
            let 目前項目 = this[目前索引]
            if (條件(目前項目, 目標值)) {
                return {
                    索引: 目前索引,
                    值: 目前項目,
                }
            }
            目前索引++
        }
        return {
            索引: -1,
            值: null,
        }
    }

    /**
     * 確保 排除項目 的型別是 位元陣列。如果 排除項目 不是 null 或是 undefined，其型別必須是 位元陣列，否則會拋出例外。
     * @param 排除項目
     * @throws {型別錯誤}
     */
    #排除項目的型別必須是位元陣列 (排除項目) {
        if (排除項目 && !(排除項目 instanceof 位元陣列)) {
            throw new 型別錯誤(錯誤訊息.向量.參數excludedElements型別必須是位元陣列)
        }
    }

    #索引必須在範圍內 (index) {
        if (index < 0 || index >= this.length) throw new Error(錯誤訊息.向量.索引超出範圍)
    }

    /**
     * 每一個項目乘上傳入的倍數。
     * @param {number} 倍數
     * @return {向量} 新向量。
     * @throws {型別錯誤}
     */
    乘 (倍數) {
        if (型別.不是數值(倍數)) {
            throw new 型別錯誤(錯誤訊息.傳入的參數應為數值)
        }
        let 新向量 = new 向量(this.length)
        for (let i = 0; i < this.length; i++) {
            新向量[i] = this[i] * 倍數
        }
        return 新向量
    }

    /**
     * 交換元素。
     * @param {int} a
     * @param {int} b
     * @return {向量}
     */
    交換 (a, b) {
        this.#索引必須在範圍內(a)
        this.#索引必須在範圍內(b)
        let temp = this[a]
        this[a] = this[b]
        this[b] = temp
        return this
    }

    /**
     * 內積
     * @param {向量} 另一個向量
     * @return {number}
     * @example
     */
    內積 (另一個向量) {
        if (另一個向量.length !== this.length) {
            throw new Error(錯誤訊息.向量.向量維度相同才能計算內積)
        }
        return 另一個向量.reduce((acc, curr, index) => acc + curr * this[index], 0)
    }

    /**
     * 向量的每一個項目與傳入的數值或向量相加。
     * @param {*} 來源 如果傳入向量，結果是自身的項目和向量的項目相加，要注意的是傳入向量的長度必須相同，否則會發生錯誤。
     *                如果傳入其他型態，會將向量的每一個項目加上傳入的參數。
     * @return {向量} 回傳新的向量。
     * @throws {型別錯誤|參數錯誤}
     */
    加 (來源) {
        if (!來源) return this.複製()
        if (來源 instanceof 向量) {
            if (來源.length !== this.length) {
                throw new 參數錯誤(錯誤訊息.向量.參數來源的長度必須相同)
            }
        }
        let 回傳結果 = new 向量(this.length)
        if (來源 instanceof 向量) {
            for (let i = 0; i < this.length; i++) {
                回傳結果[i] = this[i] + 來源[i]
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                回傳結果[i] = this[i] + 來源
            }
        }
        return 回傳結果
    }

    /**
     * 所有的項目加總。
     * @param {位元陣列} [排除項目] excludedElements設為 true 的項目會被排除。
     * @return {*}
     * @throws {型別錯誤} 如果排除項目不是位元陣列會拋出型別錯誤例外。
     * @example
     * const v1 = new 向量(["a", "b", "c"])
     * console.log(v1.加總()) // abc
     *
     * const v2 = new 向量([1, 2, 3, 4])
     * console.log(v2.加總()) // 10
     *
     * const v3 = new 向量([1, 2, 3, 4])
     * const 排除項目 = new 位元陣列('0001') // 0001 是二進位
     * console.log(v3.加總(排除項目) // 9
     */
    加總 (排除項目 = null) {
        this.#排除項目的型別必須是位元陣列(排除項目)

        // for 比 reduce 快 10 倍

        // 找到第一個未被排除的項目
        let 回傳結果
        let 目前位置 = 0
        if (排除項目) {
            while (目前位置 < this.length && 排除項目.狀態(目前位置)) {
                目前位置++
            }
        }

        // 如果有找到，當做初始值
        if (目前位置 < this.length) {
            回傳結果 = this[目前位置]
            目前位置++
        }

        while (目前位置 < this.length) {
            if (排除項目 && 排除項目.狀態(目前位置)) continue
            回傳結果 += this[目前位置]
            目前位置++
        }
        return 回傳結果
    }

    /**
     * 外積。
     * @param {向量|Array} 另一個向量
     * @return {向量} 傳回新向量。
     * @throws {Error} 如果長度不是 3，便會拋出此例外。
     */
    外積 (另一個向量) {
        if (this.length !== 3 || 另一個向量.length !== 3) {
            throw new Error(錯誤訊息.向量.外積僅能對三維向量做運算)
        }
        return new 向量(this[1] * 另一個向量[2] - this[2] * 另一個向量[1],
            this[2] * 另一個向量[0] - this[0] * 另一個向量[2],
            this[0] * 另一個向量[1] - this[1] * 另一個向量[0])
    }

    /**
     * 是否為零向量。
     * @returns {boolean} 如果每一個項目都為 0 回傳 true，否則回傳 false。
     */
    是零向量 () {
        // for 迴圈的速度比 filter 快 6 倍
        for (let i = 0; i < this.length; i++) {
            if (!型別.兩個數值相等(this[i], 0)) return false
        }
        return true
    }

    /**
     * 每個項目會被回呼函式回傳值取代。如果項目的索引在排除項目中設為 true，便會被排除。
     * @param 回呼函式
     * @param {位元陣列} 排除項目
     * @return {向量} 向量本身
     * @throws {型別錯誤} 如果排除項目不是位元陣列會拋出此例外。
     */
    更新全部 (回呼函式, 排除項目 = null) {
        this.#排除項目的型別必須是位元陣列(排除項目)
        for (let i = 0; i < this.length; i++) {
            if (排除項目 && 排除項目.狀態(i)) {
                continue
            }
            this[i] = 回呼函式(this[i], i)
        }
        return this
    }

    /**
     * 尋找最大值。
     * @param {位元陣列} 排除項目
     * @return {{值: number, 索引: number}}
     */
    最大值 (排除項目 = null) {
        const 條件 = (目前的項目, 已知最大的項目) => 目前的項目 > 已知最大的項目
        return this.#尋找最後一個符合條件的項目(條件, 排除項目)
    }

    /**
     * 尋找最小值。
     * @param {位元陣列} 排除項目
     * @return {{值: number, 索引: number}}
     */
    最小值 (排除項目 = null) {
        const 條件 = (目前的項目, 已知最小的項目) => 目前的項目 < 已知最小的項目
        return this.#尋找最後一個符合條件的項目(條件, 排除項目)
    }

    /**
     * 尋找是否有相鄰的兩個項目。
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    有相鄰的 (a, b) {
        if (this.length <= 1) return false
        const 第一個項目的索引 = this.indexOf(a)
        if (第一個項目的索引 === -1) return false
        if (第一個項目的索引 >= this.length - 1) return false
        const 第二個項目 = this[第一個項目的索引 + 1]
        if (型別.是數值(a) && 型別.是數值(b)) {
            return 型別.兩個數值相等(第二個項目, b)
        }
        return 第二個項目 === b
    }

    /**
     * 第一個大於目標值的項目。
     * @param {number} 目標值
     * @param {位元陣列} 排除項目
     * @return {{值: number, 索引: number}|{值: null, 索引: number}}
     * @throws {型別錯誤} 如果有傳入排除項目，但型別不是位元陣列，會拋出此例外。
     * @example
     *  const v1 = new 向量([1, 2, 3, 4])
     *  console.log(v1.第一個大於的項目(2)) // {索引: 2,值: 3})
     *
     *  const v2 = new 向量([1, 2, 3, 4])
     *  const 排除項目 = new 位元陣列('0010')
     *  console.log(v2.第一個大於(2, 排除項目)) // {索引: 2,值: 3})
     */
    第一個大於 (目標值, 排除項目 = null) {
        const 條件 = (目前的項目, 目標值) => 目前的項目 > 目標值
        return this.#尋找第一個符合條件的項目(目標值, 排除項目, 條件)
    }

    /**
     * 第一個小於目標值的項目。
     * @param {number} 目標值
     * @param {位元陣列} 排除項目
     * @return {{值: number, 索引: number}|{值: null, 索引: number}}
     * @throws {型別錯誤} 如果有傳入排除項目，但型別不是位元陣列，會拋出此例外。
     * @example
     *  const v1 = new 向量([4, 3, 2, 1])
     *  console.log(v1.第一個小於(4)) // {索引: 1,值: 3})
     *
     *  const v2 = new 向量([4, 3, 2, 1])
     *  const 排除項目 = new 位元陣列('0010')
     *  console.log(v2.第一個小於(4, 排除項目)) // {索引: 2,值: 3})
     */
    第一個小於 (目標值, 排除項目 = null) {
        const 條件 = (目前的項目, 目標值) => 目前的項目 < 目標值
        return this.#尋找第一個符合條件的項目(目標值, 排除項目, 條件)
    }

    /**
     * 與另一個向量是否相等。當兩個數值差異小於 0.00000001 時，會被認為是相等。
     * @param {向量|Array} 另一個向量
     * @return {boolean}
     * @throws {型別錯誤} 如果另一個向量的型別不是向量會拋出此例外。
     */
    等於 (另一個向量) {
        if (!(另一個向量 instanceof 向量) && 型別.不是陣列(另一個向量)) {
            throw new 型別錯誤(錯誤訊息.向量.參數另一個向量的型別必須是向量或陣列)
        }
        if (另一個向量.length !== this.length) return false
        for (let i = 0; i < this.length; i++) {
            if (!型別.兩個數值相等(this[i], 另一個向量[i])) return false
        }
        return true
    }

    /**
     * 複製成新向量。
     * @return {向量} 回傳新的向量，內容與自身相同。
     */
    複製 () {
        return new 向量(this)
    }

    /**
     * 迭代每個項目，如果項目的索引在排除項目中設為 true，便會被排除。
     * @param {向量回呼函式} 回呼函式。
     * @param {位元陣列} 排除項目。
     * @return {向量} 向量本身。
     * @throws {型別錯誤} 如果有傳入排除項目，但型別不是位元陣列，會拋出此例外。
     */
    迭代 (回呼函式, 排除項目) {
        型別.回呼函式的型別必須是函式(回呼函式)
        this.#排除項目的型別必須是位元陣列(排除項目)
        for (let i = 0; i < this.length; i++) {
            if (排除項目 && 排除項目.狀態(i)) continue
            回呼函式(this[i], i)
        }
        return this
    }

    /**
     * 將新的項目附加在向量後面。
     * @param {*} 要附加的項目 要加入的項目可以是單一數值或是向量。
     * @return {向量} 回傳新的向量。
     */
    附加 (...要附加的項目) {
        let 新向量 = this.複製()
        要附加的項目.forEach(項目 => {
            if (型別.是陣列(項目)) {
                項目.forEach(x => 新向量.push(x))
            } else {
                新向量.push(項目)
            }
        })
        return 新向量
    }
}
