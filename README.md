<div align="center">
  <h1>DXCore</h1>
  <p><strong>現代化的 JavaScript 實用工具集合</strong></p>
  <p>提供型別檢測、向量運算、矩陣操作、位元陣列等多種實用工具的 Node.js 套件</p>
  <p>
    <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen" alt="Node.js">
    <img src="https://img.shields.io/badge/ES6%2B-supported-blue" alt="ES6+ Support">
    <img src="https://img.shields.io/badge/build-Webpack%20%7C%20Babel-orange" alt="Build Tools">
    <img src="https://img.shields.io/badge/test-Jest-red" alt="Testing">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
    <img src="https://img.shields.io/npm/v/dx-core" alt="NPM Version">
  </p>
</div>

## 安裝

```bash
npm install dx-core
```
## 特色
- **型別** - 設計用於提供 JavaScript 中各種數據類型的檢測、驗證和操作的工具。它包含了一組實用的函式和常量，用於高效地處理數據的類型判斷、格式驗證以及特定邏輯應用，特別是針對不同的基本數據類型（如數字、字串、陣列、物件等）進行強大且準確的操作支持。
- **位元陣列** - 是一個用於位元操作的資料結構，支援高效的二進位管理與操作。本類別提供了靈活的初始化方式（字串或數值），並支援位元運算（`AND`、`OR`、`XOR`）和位元管理操作（設置、讀取、反轉等）。主要用途包括管理和處理位元級別的資料，適合用於壓縮存儲及高效操作。
- **向量** - 是一個數學運算工具，設計用於操作數值向量，支持各種向量相關的數學運算，例如加法、減法、排序、單位化、向量乘法等。該類別提供了高效的方法以實現數學向量的操作，同時包含實用的檢驗與轉換功能。其設計靈活且易於擴展，適用於處理涉及數學計算、數據分析以及科學計算的場景。
- **矩陣** - 是一個實作矩陣數學運算和操作的模組，提供多種功能以支援線性代數中的矩陣操作。
- **地理資訊系統** - 將常用的地理資訊系統功能集中在一起，例如：地址轉座標。
- **通訊軟體** - 加入傳送 Telegram 訊息的功能。
- **日期工具** - 是一個用於操作和格式化日期的高級工具集合，提供了多種實用方法包括加減日期、格式化、檢查日期是否有效，以及在指定範圍內進行日期比較等。
- **字串工具** - 提供字串處理的實用功能。
- **檔案工具** - 提供檔案操作的實用功能。

## 使用方式
``` javascript
import { 型別, 向量, 矩陣, 位元陣列, 地理資訊系統, 通訊軟體, 日期工具, 字串工具, 檔案工具 } from 'dx-core';

// 使用型別檢測
const isString = 型別.isString('hello');

// 使用向量運算
const vec1 = new 向量([1, 2, 3]);
const vec2 = new 向量([4, 5, 6]);
const result = vec1.add(vec2);

// 使用位元陣列
const bitArray = new 位元陣列(8);
bitArray.set(0, true);
```

## 開發
### 建置專案
``` bash
npm run build
```
### 執行測試
``` bash
npm run test
```
## 技術規格
- Node.js 套件，支援 ES6 模組
- 使用 Webpack 進行建置
- 使用 Babel 進行轉譯
- 使用 Jest 進行測試
- 支援 JSDoc 文件生成

## 專案結構
``` 
DXCore/
├── src/                    # 源代碼目錄
│   ├── 型別.js
│   ├── 向量.js
│   ├── 矩陣.js
│   ├── 位元陣列.js
│   ├── 地理資訊系統.js
│   ├── 通訊軟體.js
│   ├── 日期工具.js
│   ├── 字串工具.js
│   ├── 檔案工具.js
│   ├── 例外.js
│   └── 錯誤訊息.js
├── lib/                    # 建置後的檔案
├── test/                   # 測試檔案
├── docs/                   # 文件目錄
├── package.json
├── webpack.config.js
├── .babelrc
└── README.md
```
## 授權
MIT License

## 專案首頁
[https://github.com/leoshiang/dx-core](https://github.com/leoshiang/dx-core)

## 問題回報
如有問題或建議，請至 [GitHub Issues](https://github.com/leoshiang/dx-core/issues) 回報。
