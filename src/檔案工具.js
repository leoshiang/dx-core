const fs = require("fs")
const path = require("path")

const 列出目錄下所有檔案 = function (起始路徑, 檔案陣列) {
    const files = fs.readdirSync(起始路徑)
    檔案陣列 = 檔案陣列 || []
    files.forEach(function (file) {
        if (fs.statSync(起始路徑 + "/" + file).isDirectory()) {
            檔案陣列 = 列出目錄下所有檔案(起始路徑 + "/" + file, 檔案陣列)
        } else {
            檔案陣列.push(path.join(起始路徑, "/", file))
        }
    })

    return 檔案陣列
}

module.exports = {
    列出目錄下所有檔案
}
