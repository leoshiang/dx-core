const Vector = require('./向量')
const {
    型別錯誤,
    索引超出範圍錯誤,
} = require('./例外')
const Type = require('./型別')
const 錯誤訊息 = require('./錯誤訊息')

/**
 * 此 callback 會在遍歷每一個 直行 時被呼叫一次。
 *
 * @callback MatrixColumnCallback
 * @param {*} value Vector。
 * @param {*} 直行編號  直行 編號。
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
 * 此 callback 會在遍歷每一個 橫列 時被呼叫一次。
 *
 * @callback MatrixRowCallback
 * @param {*} value 值。
 * @param {*} 橫列編號  橫列 編號。
 */

/**
 * @class
 * @classdesc 二維陣列。
 */
class Matrix extends Array {

    #columns
    #defaultValue
    #rows

    /**
     * @constructor
     * @param {number|Array} [rows] 橫列數。
     * @param {number|Array} [columns] 直行數。
     * @param {number} [defaultValue] 預設值。
     * @example
     * let m1 = new Matrix() // []
     * let m2 = new Matrix(2, 2) // [[0, 0], [0, 0]]
     * let m3 = new Matrix([2, 3, 1],
     *                     [4, 7, 2],
     *                     [3, 1, 1]) // [[2, 3, 1], [4, 7, 2], [3, 1, 1]]
     * let m4 = new Matrix([2, 3, 1], 1, [3, 1, 1]) // [[2, 3, 1], [3, 1, 1]]
     */
    constructor (rows = 0, columns = 0, defaultValue) {
        super()
        this.clear()
        this.#defaultValue = Type.isUndefined(defaultValue) ? 0 : defaultValue
        if (Type.是陣列(rows)) {
            this.#initializeByArray(Array.from(arguments))
        } else {
            this.setDimension(rows || 0, columns || 0)
            this.fill(this.#defaultValue)
        }
    }

    /**
     * 取得 columns。
     * @return {*}
     */
    get columns () {
        return this.#columns
    }

    get determinant () {
        let temp = this.clone()
        for (let diagonalIndex = 0; diagonalIndex < temp.#rows - 1; diagonalIndex++) {
            for (let row = diagonalIndex + 1; row < temp.#rows; row++) {
                let diagonalElement = temp[diagonalIndex][diagonalIndex]
                if (diagonalElement === 0) {
                    temp.exchangeRow(diagonalIndex, row)
                    temp.setRow(row, temp.row(row).乘(-1))
                    continue
                }
                let m = -1 * temp[row][diagonalIndex] / diagonalElement
                let rowVector = temp.row(row)
                rowVector = rowVector.add(temp.row(diagonalIndex).乘(m))
                temp.setRow(row, rowVector)
            }
        }

        let result = temp[0][0]
        for (let diagonalIndex = 1; diagonalIndex < temp.#rows; diagonalIndex++) {
            result = result * temp[diagonalIndex][diagonalIndex]
        }
        return result
    }

    get rowRank () {
        let numberOfNoneZeroRows = 0
        let UpperTriangularMatrix = this.upperTriangularMatrix()
        for (let row = 0; row < UpperTriangularMatrix.rows; row++) {
            if (!this.row(row).是零向量()) numberOfNoneZeroRows++
        }
        return numberOfNoneZeroRows
    }

    /**
     * 取得 rows。
     * @return {*}
     */
    get rows () {
        return this.#rows
    }

    /**
     * 將Matrix設為IdentityMatrix（對角線元素為 1 ，其餘元素為 0）
     * @return {Matrix}
     * @example
     * let m = new Matrix(3, 3).identity()
     */
    static createIdentityMatrix (rows) {
        let 結果 = new Matrix(rows, rows)
        for (let 橫列 = 0; 橫列 < rows; 橫列++) {
            結果[橫列][橫列] = 1
        }
        return 結果
    }

    /**
     *
     * @param 參數另一個向量的長度必須相同
     * @param addNumber
     * @param addMatrix
     * @returns {Matrix}
     */
    #additionOperation (參數另一個向量的長度必須相同, addNumber, addMatrix) {
        let operation
        if (Type.是數值(參數另一個向量的長度必須相同)) {
            operation = addNumber
        } else if (參數另一個向量的長度必須相同 instanceof Matrix) {
            operation = addMatrix
        } else {
            throw new 型別錯誤('參數另一個向量的長度必須相同 必須是數值或是Matrix。')
        }

        let result = new Matrix(this.#rows, this.#columns)
        for (let row = 0; row < this.#rows; row++) {
            for (let column = 0; column < this.#columns; column++) {
                operation(row, column, result)
            }
        }
        return result
    }

    #ensureMatrixType (參數另一個向量的長度必須相同) {
        if (!(參數另一個向量的長度必須相同 instanceof Matrix)) {
            throw new 型別錯誤('參數另一個向量的長度必須相同 的型別必須是 Matrix。')
        }
    }

    /**
     * 找出最長的陣列長度當作columns，有效的陣列數目當作rows。
     * @param {*} arraySet 陣列串列。
     * @return {{columns: number, rows: number}}
     */
    #getDimensionFromArraySet (arraySet) {
        let columns = 0
        let rows = 0
        arraySet.forEach(x => {
            if (Type.isNotArray(x)) return
            columns = Math.max(columns, x.length)
            rows++
        })
        return {
            columns: columns,
            rows: rows,
        }
    }

    #initializeByArray (arraySet) {
        let dimension = this.#getDimensionFromArraySet(arraySet)
        this.length = 0
        arraySet
            .filter(array => Type.是陣列(array))
            .forEach(array => {
                let row = new Array(dimension.columns)
                let column = 0
                while (column < dimension.columns) {
                    row[column] = array[column] || 0
                    column++
                }
                this.push(row)
            })
        this.#rows = dimension.rows
        this.#columns = dimension.columns
    }

    #mulByNumber (number) {
        let result = new Matrix(this.rows, this.columns)
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                result[row][column] = this[row][column] * number
            }
        }
        return result
    }

    #高斯約旦消去法計算反Matrix (Matrix) {
        for (let 對角線編號 = 0; 對角線編號 < Matrix.rows; 對角線編號++) {
            let 橫列 = Matrix.row(對角線編號).乘(1 / Matrix[對角線編號][對角線編號])
            Matrix.setRow(對角線編號, 橫列)
            for (let r = 對角線編號 + 1; r < Matrix.rows; r++) {
                Matrix.setRow(r, Matrix.row(r).add(橫列.乘(-1 * Matrix[r][對角線編號])))
            }
        }

        for (let 對角線編號 = Matrix.rows - 1; 對角線編號 > 0; 對角線編號--) {
            for (let r = 對角線編號; r > 0; r--) {
                if (Matrix[r - 1][對角線編號] === 0) {
                    continue
                }
                let v1 = Matrix.row(對角線編號).乘(-1 * Matrix[r - 1][對角線編號])
                let v2 = Matrix.row(r - 1)
                let 橫列Vector = v2.add(v1)
                Matrix.setRow(r - 1, 橫列Vector)
            }
        }
        return Matrix.copyRange(0, this.columns, this.rows, this.columns)
    }

    /**
     * 與另一個Matrix相加或是加上一個數值。
     * @param {Matrix|number} 參數另一個向量的長度必須相同
     * @return {Matrix} 新Matrix。
     * @throws {型別錯誤}
     * @example
     * let m1 = new Matrix([1, 2], [3, 4])
     * let m2 = new Matrix([5, 6], [7, 8])
     * let m3 = m1.add(m2) // [[6, 8],[10, 12]]
     */
    add (參數另一個向量的長度必須相同) {
        const addNumber = (row, column, m) => m[row][column] = this[row][column] + 參數另一個向量的長度必須相同
        const addMatrix = (row, column, m) => m[row][column] = this[row][column] +
            參數另一個向量的長度必須相同[row][column]
        return this.#additionOperation(參數另一個向量的長度必須相同, addNumber, addMatrix)
    }

    /**
     * 清除Matrix。
     * @return {Matrix} Matrix本身。
     * @example
     * let m = new Matrix(2, 2).清除內容()
     */
    clear () {
        this.length = 0
        this.#rows = 0
        this.#columns = 0
        return this
    }

    clone () {
        let result = new Matrix(this.#rows, this.#columns)
        for (let row = 0; row < this.#rows; row++) {
            for (let column = 0; column < this.#columns; column++) {
                result[row][column] = this[row][column]
            }
        }
        return result
    }

    /**
     * 取得直行的向量。
     * @param {number} index 從 0 開始的直行編號。
     * @return {向量} 回傳 Vector。
     * @example
     * let m = new Matrix([1, 2], [3, 4])
     * console.log(m.直行(0)) // [2, 4]
     */
    column (index) {
        let result = new 向量(this.#rows)
        this.forEach((row, rowIndex) => result[rowIndex] = row[index])
        return result
    }

    /**
     *
     * @param fromRow
     * @param fromColumn
     * @param rows
     * @param columns
     * @returns {Matrix}
     */
    copyRange (fromRow, fromColumn, rows, columns) {
        let result = new Matrix(rows, columns)
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                result[row][column] = this[fromRow + row][fromColumn + column]
            }
        }
        return result
    }

    /**
     * 此Matrix與 m 是否相等。
     * @param {Matrix} 參數另一個向量的長度必須相同
     * @return {boolean} 如果兩個Matrix的維度和每一個元素都相同便回傳 true，否則回傳 false。
     * @throws {型別錯誤} 如果傳入的參數不是Matrix會拋出此例外。
     */
    equals (參數另一個向量的長度必須相同) {
        if (!(參數另一個向量的長度必須相同 instanceof Matrix)) {
            throw new 型別錯誤('參數必須是Matrix。')
        }
        if (this.#rows !== 參數另一個向量的長度必須相同.rows || this.#columns !== 參數另一個向量的長度必須相同.columns) return false
        for (let row = 0; row < this.#rows; row++) {
            for (let column = 0; column < this.#columns; column++) {
                if (!Type.兩個數值相等(this[row][column], 參數另一個向量的長度必須相同[row][column])) return false
            }
        }
        return true
    }

    exchangeColumn (a, b) {
        if (a < 0 || a >= this.#columns) {
            throw new 索引超出範圍錯誤(`直行1編號超出範圍(0,${this.#columns - 1}`)
        }
        if (b < 0 || b >= this.#columns) {
            throw new 索引超出範圍錯誤(`直行2編號超出範圍(0,${this.#columns - 1}`)
        }
        for (let row = 0; row < this.#rows; row++) {
            let temp = this[row][a]
            this[row][a] = this[row][b]
            this[row][b] = temp
        }
        return this
    }

    exchangeRow (a, b) {
        if (a < 0 || a >= this.#columns) {
            throw new 索引超出範圍錯誤(`橫列1編號超出範圍(0,${this.#rows - 1}`)
        }
        if (b < 0 || b >= this.#columns) {
            throw new 索引超出範圍錯誤(`橫列2編號超出範圍(0,${this.#rows - 1}`)
        }
        let temp = this[a]
        this[a] = this[b]
        this[b] = temp
        return this
    }

    /**
     *
     * @param m
     * @returns {Matrix}
     */
    expand (m) {
        let 新Matrix = new Matrix(this.rows, this.columns + m.columns)
        for (let 橫列編號 = 0; 橫列編號 < 新Matrix.rows; 橫列編號++) {
            for (let 直行編號 = 0; 直行編號 < this.columns; 直行編號++) {
                新Matrix[橫列編號][直行編號] = this[橫列編號][直行編號]
            }
            for (let 直行編號 = 0; 直行編號 < m.columns; 直行編號++) {
                新Matrix[橫列編號][直行編號 + this.columns] = m[橫列編號][直行編號]
            }
        }
        return 新Matrix
    }

    /**
     * 填入數值。
     * @param {number} value 要填入的數值。
     * @return {Matrix} 矩陣本身。
     * @example
     * let m = new Matrix(2, 2).fill(2) // ([2, 2] [2, 2])
     */
    fill (value) {
        this.forEach(row => row.fill(value))
        return this
    }

    /**
     * 遍歷每一行（直行）。
     * @param {MatrixColumnCallback} callback 回呼函式。
     * @return {Matrix} Matrix本身。
     * @example
     * new Matrix(3, 3).fill(1).forEachColumn((x) => console.log(x))
     */
    forEachColumn (callback) {
        for (let column = 0; column < this.#columns; column++) {
            callback(this.column(column), column)
        }
        return this
    }

    /**
     * 遍歷每一列（橫列）。
     * @param {MatrixRowCallback} callback 回呼函式。
     * @return {Matrix} Matrix本身。
     * @example
     * new Matrix(3, 3).fill(1).forEachRow((x) => console.log(x))
     */
    forEachRow (callback) {
        for (let row = 0; row < this.#rows; row++) {
            callback(this[row], row)
        }
        return this
    }

    /**
     * 計算反矩陣。
     * @return {Matrix}
     * @throws {Error} 如果行列式為0，則拋出此例外。
     */
    inverse () {
        if (this.determinant === 0) {
            throw new Error('因為行列式為零，所以此矩陣沒有反矩陣。')
        }
        if (this.#columns === 0 || this.#rows === 0) {
            throw new Error('因為維度為0，所以此矩陣沒有反矩陣。')
        }
        if (this.#columns !== this.#rows) {
            throw new Error('因為不是方陣，所以此矩陣沒有反矩陣。')
        }
        let 暫存Matrix = this.expand(Matrix.createIdentityMatrix(this.rows))
        return this.#高斯約旦消去法計算反Matrix(暫存Matrix)
    }

    /**
     *
     * @returns {boolean}
     */
    isAntisymmetric () {
        return this.transpose().equals(this.mul(-1))
    }

    isSquare () {
        return this.#rows === this.#columns
    }

    /**
     * 是否為對稱矩陣。
     * @returns {boolean}
     */
    isSymmetric () {
        return this.transpose().equals(this)
    }

    /**
     * 與另一個Matrix或數值乘。
     * @param {Matrix|number} 參數另一個向量的長度必須相同
     * @return {Matrix} 新Matrix。
     * @throws {型別錯誤} 當參數 m 不是Matrix或數值時，會拋出此例外。
     * @example
     * let m = new Matrix([1, 2], [3, 4], [5, 6])
     * let n = new Matrix([1, 2, 3, 4], [5, 6, 7, 8])
     * let result = m.mul(n)
     */
    mul (參數另一個向量的長度必須相同) {
        let result
        if (Type.是數值(參數另一個向量的長度必須相同)) return this.#mulByNumber(參數另一個向量的長度必須相同)
        this.#ensureMatrixType(參數另一個向量的長度必須相同)
        if (this.#columns !== 參數另一個向量的長度必須相同.rows) {
            throw new Error('參數另一個向量的長度必須相同 的 rows 應等於矩陣的 columns。')
        }
        result = new Matrix(this.rows, 參數另一個向量的長度必須相同.columns)
        for (let row = 0; row < this.rows; row++) {
            let resultRow = result[row]
            for (let column = 0; column < 參數另一個向量的長度必須相同.columns; column++) {
                let sum = 0
                for (let c = 0; c < this.#columns; c++) {
                    sum += this[row][c] * 參數另一個向量的長度必須相同[c][column]
                }
                resultRow[column] = sum
            }
        }
        return result
    }

    /**
     *
     * @param n
     * @returns {Matrix}
     */
    power (n) {
        if (n === 0) return Matrix.createIdentityMatrix(this.rows)
        if (n === 1) return this.clone()
        let result = this.mul(this)
        for (let i = 3; i <= n; i++) {
            result = result.mul(this)
        }
        return result
    }

    /**
     * 取得橫列的值。
     * @param {number} index 從 0 開始的橫列編號。
     * @return {向量} 回傳Vector。
     * @example
     * let m = new Matrix(2, 2)
     * m[0][0] = 1
     * m[0][1] = 2
     * m[1][0] = 3
     * m[1][1] = 4
     * console.log(m.row(0))
     */
    row (index) {
        return new 向量(this[index])
    }

    /**
     * 設定某一直行的值。
     * @param {number} columnIndex
     * @param {向量|array} value
     */
    setColumn (columnIndex, value) {
        if (columnIndex < 0 || columnIndex >= this.#columns) {
            throw new 索引超出範圍錯誤(`直行編號超出範圍(0,${this.#columns - 1}`)
        }
        if (!(value instanceof 向量) || Type.isNotArray(value)) {
            throw new 型別錯誤('參數值必須是Vector或Matrix。')
        }
        for (let row = 0; row < this.#rows; row++) {
            this[row][columnIndex] = value[row]
        }
    }

    /**
     * 設定維度，所有資料會被清除，並以預設值填滿。
     * @param {number} rows rows。
     * @param {number} columns columns。
     * @return {Matrix} Matrix本身。
     * @example
     * let m = new Matrix(2, 2).填滿(2).設定維度(3, 3)
     */
    setDimension (rows, columns) {
        this.length = 0
        this.#rows = rows
        this.#columns = columns
        for (let row = 0; row < this.#rows; row++) {
            this.push(new Array(this.#columns).fill(this.#defaultValue))
        }
        return this
    }

    /**
     * 設定某一橫列的值。
     * @param {number} rowIndex
     * @param {向量|array} value
     */
    setRow (rowIndex, value) {
        if (rowIndex < 0 || rowIndex >= this.#rows) {
            throw new 索引超出範圍錯誤(`橫列編號超出範圍(0,${this.#rows - 1}`)
        }
        if (!(value instanceof 向量) || Type.isNotArray(value)) {
            throw new 型別錯誤('參數值必須是Vector或Matrix。')
        }
        for (let column = 0; column < this.#columns; column++) {
            this[rowIndex][column] = value[column]
        }
        return this
    }

    /**
     * 與另一個Matrix相減或是減去一個數值。
     * @param {Matrix|number} 參數另一個向量的長度必須相同
     * @return {Matrix} 新Matrix。
     * @throws {型別錯誤}
     * @example
     * let m1 = new Matrix([1, 2], [3, 4])
     * let m2 = new Matrix([5, 6], [7, 8])
     * let m3 = m1.減(m2) // [[6, 8],[10, 12]]
     */
    subtract (參數另一個向量的長度必須相同) {
        const 減去數值 = (橫列, 直行, 新Matrix) => 新Matrix[橫列][直行] = this[橫列][直行] - 參數另一個向量的長度必須相同
        const Matrix相減 = (橫列, 直行, 新Matrix) => 新Matrix[橫列][直行] = this[橫列][直行] -
            參數另一個向量的長度必須相同[橫列][直行]
        return this.#additionOperation(參數另一個向量的長度必須相同, 減去數值, Matrix相減)
    }

    /**
     * 所有元素的總和。
     * @return {number}
     * @example
     * let m1 = new Matrix(2, 2)
     * m1[0][0] = 1
     * m1[0][1] = 2
     * m1[1][0] = 3
     * m1[1][1] = 4
     * console.log(m1.總和())
     */
    sum () {
        const 橫列每個元素加總 = (加總, 元素) => 加總 + 元素
        const 每個橫列加總 = (加總, 橫列) => 加總 + (橫列.reduce(橫列每個元素加總, 0))
        return this.reduce(每個橫列加總, 0)
    }

    toString () {
        let 結果 = '[\r\n'
        this.forEach((row) => {
            結果 += '  [' +
                row.reduce((acc, curr) => acc + ' ' +
                    Type.去除小數部分連續的0((Type.極小值(curr) ? 0 : curr)) + ' ', '')
            結果 += ']\r\n'
        })
        結果 += ']\r\n'
        return 結果
    }

    /**
     * 轉置矩陣。回傳新矩陣，矩陣本身內容不會變動。
     * @throws {Error} 如果維度為0，則拋出此例外。
     * @return {Matrix} 新矩陣。
     * @example
     *  const m = new Matrix([1, 2, 3], [4, 5, 6])
     *  const t = m.transpose() // ([1,4] [2,5] [3,6])
     */
    transpose () {
        if (this.#columns === 0 || this.#rows === 0) {
            throw new Error(錯誤訊息.Matrix.因為維度為0此矩陣不可轉置)
        }
        let result = new Matrix(this.#columns, this.#rows)
        for (let row = 0; row < result.#rows; row++) {
            for (let column = 0; column < result.#columns; column++) {
                result[row][column] = this[column][row]
            }
        }
        return result
    }

    upperTriangularMatrix () {
        let result = this.clone()
        for (let diagonalIndex = 0; diagonalIndex < result.rows; diagonalIndex++) {
            let row = result.row(diagonalIndex)
            for (let rowIndex = diagonalIndex + 1; rowIndex < result.rows; rowIndex++) {
                let m = -result[rowIndex][diagonalIndex] / result[diagonalIndex][diagonalIndex]
                result.setRow(rowIndex, result.row(rowIndex).add(row.乘(m)))
            }
        }
        return result
    }
}

module.exports = Matrix
