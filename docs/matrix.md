# 用 JavaScript 來認識Matrix

---

**Leo Shiang，2022/03/19**

---

[toc]

## 前言

`dolphin-node-core` 是一個 node.js 的套件，由向皓田開發，採用 MIT 授權。

## 建立 node.js 專案

建立專案目錄

```bash
mkdir matrix-test
cd matrix-test
```

建立 node.js 專案

```bash
npm init
```

引用套件

```bash
npm install dolphin-node-core
```

建立 index.js

```bash
echo "const matrix = require('dolphin-node-core')" > index.js
```

後續的範例皆是修改 index.js

執行程式

```bash
node index.js
```

## 建立Matrix

首先引用套件：

```javascript
const matrix = require('dolphin-node-core')
```

接著建立一個 4x3 matrix，其中 4 代表橫列數目（row），而 3 代表直行數目（column）：

```javascript
const m = new matrix(4, 3)
console.log(m)
```

完整程式如下：

```javascript
const matrix = require('dolphin-node-core')
const m = new matrix(4, 3)
console.log(m)
```

輸出結果：

> matrix(4) [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]

### 賦予初始值

建立Matrix時可以在行列數目的後面加上預設值的參數，如果沒指定，預設值會是 0。如果要建立一個 4x4 的Matrix，裡面元素全部都是 12，可以這樣寫：

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(4, 4, 12)
console.log(m)
```

輸出結果：

> matrix(4) [
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ]
> ]

建立Matrix時可以傳入多個陣列當作初始值，每一個陣列會被當作一個橫列（row）並把值寫入Matrix：

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(
  								[2, 2, 3, 1], 
  								[4, 5, 6, 3], 
  								[7, 8, 3, 3], 
  								[2, 2, 2, 0])
console.log(m)
```

輸出結果：

> matrix(4) [
>   [ 2, 2, 3, 1 ],
>   [ 4, 5, 6, 3 ],
>   [ 7, 8, 3, 3 ],
>   [ 2, 2, 2, 0 ]
> ]

如果傳入的陣列長度不等，缺少的元素會用 0 取代：

```Javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(
  								[2, 2],
                  [4, 5, 6, 3],
                 	[7], 
                 	[2, 2, 2, 0])
console.log(m)
```

輸出結果：

> matrix(4) [
>   [ 2, 2, 0, 0 ],
>   [ 4, 5, 6, 3 ],
>   [ 7, 0, 0, 0 ],
>   [ 2, 2, 2, 0 ]
> ]

### 存取元素

Matrix本身就是一個陣列，可以用陣列存取方式去取得元素：

> 請注意：因為與陣列相容，因此元素編號是從 0 開始。

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([8, 0, 1], [0, 3, 5])
```

以下的程式碼將改變 [0,0] 位置的元素：

```javascript
m[0][0] = 3 // 原本是 8
```

### 維度

Matrix的維度可以從 `橫列數`（rows） 和 `直行數`（columns）去取得：

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([8, 0, 1], [0, 3, 5])
console.log(`橫列數:${m.橫列數}`)
console.log(`直行數:${m.直行數}`)
```

輸出結果：

> 橫列數:2
> 直行數:3

### 橫列與直行

橫列與直行的編號是從 0 開始：

```javascript
const matrix = require('dolphin-node-core') 
let m = new matrix([1, 2], [3, 4])
console.log(m)
for (let 橫列編號 = 0; 橫列編號 < m.橫列數; 橫列編號++) {
    console.log(m.橫列(橫列編號))
}
for (let 直行編號 = 0; 直行編號 < m.直行數; 直行編號++) {
    console.log(m.直行(直行編號))
}
```

輸出結果：

> matrix(2) [ [ 1, 2 ], [ 3, 4 ] ]
> vector(2) [ 1, 2 ]
> vector(2) [ 3, 4 ]
> vector(2) [ 1, 3 ]
> vector(2) [ 2, 4 ]

## $A+B=B+A$

Matrix的加法具有交換律：

```javascript
const matrix = require('dolphin-node-core')
const a = new matrix([1, 2], [3, 4])
const b = new matrix([4, 5], [6, 7])
console.log(a.加(b).equals(b.加(a)))
```

輸出結果：

> true

## $A-B\neq B-A$

減法不具有交換律，因此 $A - B$ 不等於 $B - A$：

```javascript
const matrix = require('dolphin-node-core')
const a = new matrix([1, 2], [3, 4])
const b = new matrix([4, 5], [6, 7])
console.log(a.減(b).equals(b.減(a)))
```

輸出結果：

> false

## $A\left(B+C\right)=\left(A+B\right)+C$

```Javascript
const matrix = require('dolphin-node-core')
const a = new matrix([4, 1], [2, 7])
const b = new matrix([6, 7], [8, 9])
const c = new matrix([0, 4], [3, 59])
console.log(a.加(b.加(c)).equals(a.加(b).add(c)))
```

輸出結果：

> true

## 與純量相乘

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([4, 1], [2, 7])
console.log(m.乘(3))
```

輸出結果：

> matrix(2) [ [ 12, 3 ], [ 6, 21 ] ]

## $A \times (BC) = (AB) \times C$

```javascript
const matrix = require('dolphin-node-core')
const a = new matrix([1, 2], [3, 4])
const b = new matrix([4, 5], [6, 7])
const c = new matrix([8, 3], [9, 0])
console.log(a.乘(b.乘(c)).相等(a.乘(b).multiply(c)))
```

輸出結果：

> true

## Matrix相乘 $A_{m\times p}\times B_{p\times n}={(AB)}_{m\times n}$

```javascript
let a = new matrix([1, 2], [3, 4], [5, 6])
let b = new matrix([1, 2, 3, 4], [5, 6, 7, 8])
console.log(a.乘(b))
```

輸出結果：

> matrix(3) [ [ 11, 14, 17, 20 ], [ 23, 30, 37, 44 ], [ 35, 46, 57, 68 ] ]

詳細計算步驟：


$$
\begin{flalign}
\left(\begin{matrix}
1 & 2 \\
3 & 4 \\
5 & 6
\end{matrix}\right)
*
\left(\begin{matrix}
1 & 2 & 3 & 4 \\
5 & 6 & 7 & 8
\end{matrix}\right)
& = \left(\begin{matrix}
1*1+2*5 & 1*2+2*6 & 1*3+2*7 & 1*4+2*8 \\
3*1+4*5 & 3*2+4*6 & 3*3+4*7 & 3*4+4*8 \\
5*1+6*5 & 5*2+6*6 & 5*3+6*7 & 5*4+6*8
\end{matrix}\right)\\
&= \left(\begin{matrix}
11 & 14 & 17 & 20 \\
23 & 30 & 37 & 44 \\
35 & 46 & 57 & 68
\end{matrix}\right)
\end{flalign}
$$

## 單位Matrix

```javascript
const matrix = require('dolphin-node-core') 
let m = matrix.單位Matrix(4)
console.log(m)
```

輸出結果：

> matrix(4) [
>   [ 1, 0, 0, 0 ],
>   [ 0, 1, 0, 0 ],
>   [ 0, 0, 1, 0 ],
>   [ 0, 0, 0, 1 ]
> ]

## 轉置Matrix

```javascript
const matrix = require('dolphin-node-core') 
let m = new matrix([1, 2, 3], [4, 5, 6], [7, 2, 9])
console.log(m.轉置())
```

輸出結果：

> matrix(3) [ [ 1, 4, 7 ], [ 2, 5, 2 ], [ 3, 6, 9 ] ]

### $det(M)=\left|\begin{matrix}M^T\\\end{matrix}\right|=\left|\begin{matrix}M\\\end{matrix}\right|$

一個Matrix的行列式等於它的轉置Matrix的行列式：

```Javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([1, 2, 3], [4, 5, 6], [7, 2, 9])
const 轉置Matrix的行列式 = m.轉置().行列式()
const Matrix的行列式 = m.行列式()
console.log(轉置Matrix的行列式)
console.log(Matrix的行列式)
console.log(轉置Matrix的行列式 === Matrix的行列式)
```

輸出結果：

> -36
> -36
> true

### $(M^T)^T=M$

轉置是自身逆運算：

```javascript
const matrix = require('dolphin-node-core')
const m = new matrix([1, 2, 3], [4, 5, 6], [7, 9, 8])
m.轉置().transpose().equals(m)
```

輸出結果：

> true

### $(A+B)^T=A^T+B^T$

轉置是從 $m \times n$ Matrix的向量空間到所有 $n \times m$ Matrix的向量空間的線性映射：

```javascript
const matrix = require('dolphin-node-core')
const A = new matrix([1, 2, 3], [4, 5, 6], [7, 9, 8])
const B = new matrix([3, 2, 1], [9, 1, 2], [5, 0, 3])
console.log(A.加(B).transpose().equals(A.轉置().加(B.轉置())))
```

輸出結果：

> true
>

### $\left(cM\right)^T=cM^T$

純量的轉置是同樣的純量。

```javascript
const m = new matrix([1, 2, 3], [4, 5, 6], [7, 9, 8])
console.log(m.乘(3).transpose().equals(m.轉置().乘(3)))
```

輸出結果：

> true

### $\left(A\times B\right)^T=B^T\times A^T$

```javascript
const matrix = require('dolphin-node-core')
const A = new matrix([1, 2, 3], [4, 5, 6], [7, 9, 8])
const B = new matrix([3, 2, 1], [9, 1, 2], [5, 0, 3])
console.log(A.乘(B).transpose().equals(B.轉置().乘(A.轉置())))
```

輸出結果：

> true

### $A^T=-A$

反對稱Matrix（或稱斜對稱Matrix）是一個方形Matrix，其轉置Matrix和自身的加法反元素相等。

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([0, 2, -1], [-2, 0, -4], [1, 4, 0])
console.log(m.轉置().相等(m.乘(-1)))
```

輸出結果：

> true

### $A^T=A$

對稱Matrix是一個方形Matrix，其轉置Matrix和自身相等。

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix([1, 2, 3], [2, 4, -5], [3, -5, 6])
console.log(m.轉置().相等(m))
```

輸出結果：

> true

## 冪 $A^n=A \times A... \times A$

### $A^2 B^2=A(AB)B$

```Javascript
const matrix = require('dolphin-node-core')
const a = new matrix([4, 0], [-3, 7])
const b = new matrix([1, 3], [6, -6])
console.log(a.冪(2).multiply(b.冪(2)).equals(a.乘(a.乘(b)).multiply(b)))
```

輸出結果：

> true

### $A^r A^s = A^{(r+s)}$

```javascript
const matrix = require('dolphin-node-core')
const a = new matrix([4, 0], [-3, 7])
console.log(a.冪(2).multiply(a.冪(3)).equals(a.冪(2 + 3)))
```

輸出結果：

> true

### $\left(A^r\right)^s=A^{r \times s}$

```Javascript
const matrix = require('dolphin-node-core')
const a = new matrix([2, 1], [3, 7])
console.log(a.冪(2).power(3).equals(a.冪(2 * 3)))
```

輸出結果：

> true

## 逆Matrix $A^{-1}$

逆Matrix（inverse matrix），又稱乘法反方陣、反Matrix。在線性代數中，給定一個 $n$ 階方陣，若存在一 $n$ 階方陣 $B$，使得 $AB=BA=I_n$ ，其中 $I_n$ 為 $n$ 階單位Matrix，則稱 $A$ 是可逆的，且 $B$ 是 $A$ 的逆Matrix，記作 $A^{-1}$。 

以下列的Matrix為例，最右邊為逆Matrix的結果：
$$
\left(\begin{matrix}
2 & 2 & 3 & 1 \\
4 & 5 & 6 & 3 \\
7 & 8 & 3 & 3 \\
2 & 2 & 2 & 0
\end{matrix}\right)^{-1}
=
\left(\begin{matrix}
3 & \frac{-4}{3} & \frac{1}{3} & -1 \\
-3 & \frac{7}{6} & \frac{-1}{6} & \frac{5}{4} \\
0 & \frac{1}{6} & \frac{-1}{6} & \frac{1}{4} \\
1 & \frac{-1}{6} & \frac{1}{6} & \frac{-5}{4}
\end{matrix}\right)
=\left(\begin{matrix}
3 & -1.33333 & 0.33333 & -1 \\
-3 & 1.16667 & -0.16667 & 1.25 \\
0 & 0.16667 & -0.16667 & 0.25 \\
1 & -0.16667 & 0.16667 & -1.25
\end{matrix}\right)
$$

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(
  							 [2, 2, 3, 1], 
                 [4, 5, 6, 3], 
  							 [7, 8, 3, 3],
   							 [2, 2, 2, 0])
const r = m.逆Matrix()
console.log(r.文字表示())
```

輸出結果：

> [
>   [ 3  -1.33333333  0.33333333  -1 ]
>   [ -3  1.16666667  -0.16666667  1.25 ]
>   [ 0  0.16666667  -0.16666667  0.25 ]
>   [ 1  -0.16666667  0.16666667  -1.25 ]
> ]

### $A \times A^{-1} = I$

如果把Matrix乘以逆Matrix應等於單位Matrix：

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(
    [2, 2, 3, 1],
    [4, 5, 6, 3],
    [7, 8, 3, 3],
    [2, 2, 2, 0])
const r = m.逆Matrix()
console.log(m.乘(r).文字表示())
```

輸出結果：

> [
>   [ 1  0  0  0 ]
>   [ 0  1  0  0 ]
>   [ 0  0  1  0 ]
>   [ 0  0  0  1 ]
> ]

### $(A^{T})^{-1} = (A^{-1})T$

```javascript
const matrix = require('dolphin-node-core') 
const m = new matrix(
                  [2, 2, 3, 1],
                  [4, 5, 6, 3],
                  [7, 8, 3, 3],
                  [2, 2, 2, 0])
const r1 = m.轉置().逆Matrix()
const r2 = m.逆Matrix().轉置()
console.log(r1.文字表示())
console.log(r2.文字表示())
```

輸出結果：

> r1= [
>   [ 3  -3  0  1 ]
>   [ -1.33333333  1.16666667  0.16666667  -0.16666667 ]
>   [ 0.33333333  -0.16666667  -0.16666667  0.16666667 ]
>   [ -1  1.25  0.25  -1.25 ]
> ]
>
> r2= [
>   [ 3  -3  0  1 ]
>   [ -1.33333333  1.16666667  0.16666667  -0.16666667 ]
>   [ 0.33333333  -0.16666667  -0.16666667  0.16666667 ]
>   [ -1  1.25  0.25  -1.25 ]
> ]

### $det(A^{-1}) = {{1} \over {det(A)}}$

```javascript
const m = new matrix(
    [2, 2, 3, 1],
    [4, 5, 6, 3],
    [7, 8, 3, 3],
    [2, 2, 2, 0])
const d1 = m.逆Matrix().行列式()
const d2 = 1 / m.行列式()
console.log('d1=', d1)
console.log('d2=', d2)
```

輸出結果：

> r1= 0.08333333333333333
> r2= 0.08333333333333333

### $(AB)^{-1} = B^{-1} A^{-1}$

```javascript
const matrix = require('dolphin-node-core') 
const a = new matrix(
    [2, 2, 3, 1],
    [4, 5, 6, 3],
    [7, 8, 3, 3],
    [2, 2, 2, 0])
const b = new matrix(
    [3, 2, 3, 0],
    [4, 5, 6, 3],
    [4, 1, 3, 3],
    [2, 6, 9, 0])
const r1 = a.乘(b).逆Matrix()
const r2 = b.逆Matrix().乘(a.逆Matrix())
console.log('r1=', r1.文字表示())
console.log('r2=', r2.文字表示())
```

輸出結果：

> r1= [
>   [ 1.14285714  -0.54761905  0.11904762  -0.25 ]
>   [ -1.28571429  0.3452381  0.01190476  0.625 ]
>   [ 0.71428571  -0.12698413  -0.01587302  -0.5 ]
>   [ -1.80952381  0.79761905  -0.20238095  0.70833333 ]
> ]
>
> r2= [
>   [ 1.14285714  -0.54761905  0.11904762  -0.25 ]
>   [ -1.28571429  0.3452381  0.01190476  0.625 ]
>   [ 0.71428571  -0.12698413  -0.01587302  -0.5 ]
>   [ -1.80952381  0.79761905  -0.20238095  0.70833333 ]
> ]
