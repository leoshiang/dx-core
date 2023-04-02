const 位元陣列 = require('./src/位元陣列')
const 向量 = require('./src/向量')
const 型別 = require('./src/型別')
const 字串工具 = require('./src/字串工具')
const {
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
} = require('./src/例外')

module.exports = {
    位元陣列,
    向量,
    型別,
    字串工具,
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
}
