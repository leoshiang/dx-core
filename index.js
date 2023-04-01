const Vector = require('./src/向量')
const Matrix = require('./src/Matrix')
const {TextFile} = require('./src/TextFile')
const Type = require('./src/型別')
const Strings = require('./src/字串工具')
const {
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
} = require('./src/例外')

module.exports = {
    Vector: 向量,
    Matrix,
    TextFile,
    Type,
    Strings,
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
}
