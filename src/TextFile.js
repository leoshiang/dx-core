const fs = require('fs')
const { EOL } = require('os')
const WriteMode = { flag: 'w+' }
const AppendMode = { flag: 'a' }

/**
 * @class
 */
class TextFile {
    #fileName
    #mode

    /**
     * 檔案名稱。
     * @return {string}
     */
    get fileName () {
        return this.#fileName
    }

    /**
     * 模式。
     * @return {object}
     */
    get mode () {
        return this.#mode
    }

    /**
     * 附加資料到目前的檔案。
     * @param {string} fileName 檔案名稱。
     */
    append (fileName) {
        this.#mode = AppendMode
        this.#fileName = fileName
        fs.writeFileSync(this.#fileName, '', this.#mode)
        return this
    }

    /**
     * 讀取整個檔案內容為一個字串。
     * @return {string}
     */
    readAll () {
        return fs.readFileSync(this.#fileName).toString()
    }

    /**
     * 建立新檔案，如果檔案已存在，會被覆蓋。
     * @param {string} fileName 檔案名稱。
     */
    rewrite (fileName) {
        this.#mode = WriteMode
        this.#fileName = fileName
        fs.writeFileSync(this.#fileName, '', this.#mode)
        return this
    }

    /**
     * 寫入字串。
     * @param {*} line
     */
    write (line) {
        fs.writeFileSync(this.#fileName, String(line || ''), AppendMode)
        return this
    }

    /**
     * 寫入字串並加上換行符號。
     * @param {*} line 要寫入的資料。
     * @param {string} [eol=EOL] eol 換行符號，預設值隨系統而變。
     */
    writeLine (line, eol) {
        this.write(String(line || '') + (eol || EOL))
        return this
    }
}

module.exports = {
    TextFile,
    WriteMode,
    AppendMode,
}
