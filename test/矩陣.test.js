const 矩陣 = require('../src/矩陣')
const {型別錯誤, 索引超出範圍錯誤} = require('../src/例外')
const 錯誤訊息 = require('../src/錯誤訊息')

describe('測試【constructor】', () => {
    test('沒指定初始的rows與columns，rows與columns應為0', () => {
        let m = new 矩陣()
        expect(m.直行數量).toBe(0)
        expect(m.橫列數量).toBe(0)
    })

    test('傳入初始的rows與columns，rows與columns應等於傳入的數值', () => {
        let m = new 矩陣(5, 10)
        expect(m.直行數量).toBe(10)
        expect(m.橫列數量).toBe(5)
    })

    test('傳入多個陣列，每個元素應該與陣列元素相同', () => {
        const m = new 矩陣([2, 3, 1], [4, 7, 2], [3, 1, 1])
        expect(m[0]).toEqual([2, 3, 1])
        expect(m[1]).toEqual([4, 7, 2])
        expect(m[2]).toEqual([3, 1, 1])
    })

    test('傳入多個陣列，中間穿插非陣列的資料，非陣列的資料應被忽略', () => {
        const m = new 矩陣([2, 3, 1], 1, [3, 1, 1])
        expect(m.橫列數量).toStrictEqual(2)
        expect(m.直行數量).toStrictEqual(3)
    })
})

describe('測試【單位矩陣】】', () => {
    test('3x3矩陣，對角線應為1，其餘為0', () => {
        const m = 矩陣.單位矩陣(3)
        expect(m[0][0]).toBe(1)
        expect(m[0][1]).toBe(0)
        expect(m[0][2]).toBe(0)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(1)
        expect(m[1][2]).toBe(0)
        expect(m[2][0]).toBe(0)
        expect(m[2][1]).toBe(0)
        expect(m[2][2]).toBe(1)
    })
})

describe('測試【特徵值】】', () => {
    test('[2,2,3,4][5,6,7,8][9,19,11,1][34,4,3,0]，應為-262', () => {
        const m = new 矩陣([2, 2, 3, 4], [5, 6, 7, 8], [9, 19, 11, 1], [34, 4, 3, 0])
        expect(m.特徵值).toBe(-262)
    })

    test('[0,2,3,4][5,0,7,8][9,19,0,1][34,4,3,0]，應為362', () => {
        const m = new 矩陣([0, 2, 3, 4], [5, 0, 7, 8], [9, 19, 0, 1], [34, 4, 3, 0])
        expect(m.特徵值).toBe(362)
    })
})

describe('測試【列秩】】', () => {
    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]，列秩等於4', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        expect(m.列秩).toBe(4)
    })
})

describe('測試【交換律】】', () => {
    test('A+B=B+A', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        expect(a.加(b)).toEqual(b.加(a))
    })

    test('A-B <> B-A', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        expect(a.減(b)).not.toEqual(b.減(a))
    })

    test('(A+B)+C=A+(B+C(', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        const c = new 矩陣([8, 3], [9, 0])
        expect(a.加(b).加(c)).toEqual(a.加(b.加(c)))
    })
})

describe('測試【上三角矩陣】】', () => {
    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.上三角矩陣()
        expect(r.橫列數量).toBe(m.橫列數量)
        expect(r.直行數量).toBe(m.直行數量)
        expect(r.橫列(0)).toEqual([2, 2, 3, 1])
        expect(r.橫列(1)).toEqual([0, 1, 0, 1])
        expect(r.橫列(2)).toEqual([0, 0, -7.5, -1.5])
        expect(r.橫列(3)).toEqual([0, 0, 0, -0.8])
    })
})

describe('測試【乘】】', () => {
    test('傳入undefined，應拋出例外型別錯誤', () => {
        let m = new 矩陣(3, 3)
        expect(() => m.乘()).toThrow(型別錯誤)
    })

    test('兩個矩陣維度不同，應拋出參數錯誤例外', () => {
        let m = new 矩陣([1, 2, 3], [2, 3, 4], [3, 4, 5])
        let n = new 矩陣(1, 2).填滿(1)
        expect(() => n.乘(m)).toThrow(Error)
    })

    test('[1,2][3,4]乘2，應等於[2,4][6,8]', () => {
        let m = new 矩陣([1, 2], [3, 4]).乘(2)
        expect(m.橫列數量).toBe(2)
        expect(m.直行數量).toBe(2)
        expect(m.橫列(0)).toEqual([2, 4])
        expect(m.橫列(1)).toEqual([6, 8])
    })

    test('兩個矩陣相乘', () => {
        let m = new 矩陣([1, 2], [3, 4], [5, 6])
        let n = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
        let result = m.乘(n)
        expect(result.橫列數量).toBe(3)
        expect(result.直行數量).toBe(4)
        expect(result[0]).toEqual([11, 14, 17, 20])
        expect(result[1]).toEqual([23, 30, 37, 44])
        expect(result[2]).toEqual([35, 46, 57, 68])
    })

    test('A(BC)=(AB)C', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        const c = new 矩陣([8, 3], [9, 0])
        expect(a.乘(b.乘(c))).toEqual(a.乘(b).乘(c))
    })
})

describe('測試【冪次】】', () => {
    test('[1,2][3,4]的2次應為[7,10][15,22]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = m1.冪次(2)
        expect(m2[0][0]).toBe(7)
        expect(m2[0][1]).toBe(10)
        expect(m2[1][0]).toBe(15)
        expect(m2[1][1]).toBe(22)
    })

    test('[1,2][3,4]的4次應為[199,290][435,634]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = m1.冪次(4)
        expect(m2[0][0]).toBe(199)
        expect(m2[0][1]).toBe(290)
        expect(m2[1][0]).toBe(435)
        expect(m2[1][1]).toBe(634)
    })
})

describe('測試【加】】', () => {
    test('[1,2][3,4]加[5,6][7,8]應等於[6,8][10,12]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = new 矩陣([5, 6], [7, 8])
        let m3 = m1.加(m2)
        expect(m3[0][0]).toBe(6)
        expect(m3[0][1]).toBe(8)
        expect(m3[1][0]).toBe(10)
        expect(m3[1][1]).toBe(12)
    })

    test('[1,2][3,4]加3應等於[4,5][6,7]', () => {
        let m = new 矩陣([1, 2], [3, 4]).加(3)
        expect(m[0][0]).toBe(4)
        expect(m[0][1]).toBe(5)
        expect(m[1][0]).toBe(6)
        expect(m[1][1]).toBe(7)
    })

    test('對象不是數值或陣列，應拋出 型別錯誤例外', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(() => m.加('a')).toThrow(型別錯誤)
    })
})

describe('測試【反矩陣】】', () => {
    test('行列式為0，應拋出例外', () => {
        const m = new 矩陣([1, 0], [0, 0])
        expect(() => m.反矩陣()).toThrow(錯誤訊息.矩陣.因為行列式為零所以此矩陣沒有反矩陣)
    })

    test('維度為0，應拋出例外', () => {
        const m = new 矩陣()
        expect(() => m.反矩陣()).toThrow(錯誤訊息.矩陣.因為維度為0所以此矩陣沒有反矩陣)
    })

    test('空矩陣應拋出例外', () => {
        const m = new 矩陣()
        expect(() => m.反矩陣()).toThrow(Error)
    })

    test('不是方陣，應拋出例外', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3])
        expect(() => m.反矩陣()).toThrow(Error)
    })

    test('[1,2][3,4]', () => {
        const m = new 矩陣([1, 2], [3, 4])
        const r = m.反矩陣()
        expect(r.橫列數量).toBe(m.橫列數量)
        expect(r.直行數量).toBe(m.直行數量)
        expect(r.橫列(0)).toEqual([-2, 1])
        expect(r.橫列(1)).toEqual([1.5, -0.5])
    })

    test('M x M-1 = [1]', () => {
        const m = new 矩陣([1, 2], [3, 4])
        const r = m.反矩陣().乘(m)
        expect(r).toEqual(矩陣.單位矩陣(2))
    })

    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.反矩陣()
        expect(r.橫列數量).toBe(m.橫列數量)
        expect(r.直行數量).toBe(m.直行數量)
        expect(r.橫列(0)).toEqual([3, -1.3333333333333335, 0.33333333333333337, -1])
        expect(r.橫列(1)).toEqual([-3, 1.1666666666666667, -0.16666666666666666, 1.25])
        expect(r.橫列(2)).toEqual([0, 0.16666666666666666, -0.16666666666666666, 0.25])
        expect(r.橫列(3)).toEqual([1, -0.16666666666666666, 0.16666666666666666, -1.25])
    })

    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.反矩陣().乘(m).修正精確度誤差()
        expect(r.等於(矩陣.單位矩陣(4))).toBe(true)
    })
})

describe('測試【合併】】', () => {
    test('[2,2][2,2]合併[3,3]應為[2,2,3][2,3,3]', () => {
        let m1 = new 矩陣(2, 2).填滿(2)
        let m2 = new 矩陣(2, 1).填滿(3)
        let m3 = m1.合併直行(m2)
        expect(m3.橫列(0)).toEqual([2, 2, 3])
        expect(m3.橫列(1)).toEqual([2, 2, 3])
    })
})

describe('測試【填滿】】', () => {
    test('矩陣用2填滿，每一個元素應等於2', () => {
        let m = new 矩陣(2, 2).填滿(2)
        expect(m[0][0]).toBe(2)
        expect(m[0][1]).toBe(2)
        expect(m[1][0]).toBe(2)
        expect(m[1][1]).toBe(2)
    })

    test('填滿之後應回傳自己', () => {
        let m = new 矩陣(2, 2)
        let r = m.填滿(2)
        expect(r).toBe(m)
    })
})

describe('測試【是反對稱矩陣】】', () => {
    test('At=-A', () => {
        const m = new 矩陣([0, 2, -1], [-2, 0, -4], [1, 4, 0])
        expect(m.是反對稱矩陣()).toBe(true)
    })

    test('At=-A', () => {
        const m = new 矩陣([0, 1, -1], [-2, 0, -4], [1, 4, 0])
        expect(m.是反對稱矩陣()).toBe(false)
    })
})

describe('測試【是對稱矩陣】】', () => {
    test('At=A', () => {
        const m = new 矩陣([1, 2, 3], [2, 4, -5], [3, -5, 6])
        expect(m.是對稱矩陣()).toBe(true)
    })
})

describe('測試【是方塊矩陣】】', () => {
    test('3x3矩陣應為方塊矩陣', () => {
        const m = new 矩陣([1, 2, 3], [2, 4, -5], [3, -5, 6])
        expect(m.是方塊矩陣()).toBe(true)
    })

    test('3x1矩陣應非方塊矩陣', () => {
        const m = new 矩陣([1], [2], [3])
        expect(m.是方塊矩陣()).toBe(false)
    })
})

describe('測試【橫列】】', () => {
    test('[1,2][3,4]，橫列(0)應等於[1,2]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        let expected = m.橫列(0)
        expect(expected[0]).toBe(1)
        expect(expected[1]).toBe(2)
    })

    test('[1,2][3,4]，橫列(1)應等於[3,4]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        let expected = m.橫列(1)
        expect(expected[0]).toBe(3)
        expect(expected[1]).toBe(4)
    })
})

describe('測試【每一個元素】】', () => {
    test('3x3矩陣呼叫每一個元素應被回呼9次', () => {
        const m = new 矩陣(3, 3).填滿(1)
        let 回呼函式被呼叫次數 = 0
        let 回呼函式收到的資料 = []
        const 回呼函式 = jest.fn(x => 回呼函式收到的資料.push(x))
        m.每一個元素(回呼函式)
        expect(回呼函式).toBeCalledTimes(9)
        expect(回呼函式收到的資料).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
})

describe('測試【每一個橫列】】', () => {
    test('3x3矩陣用1填滿，應傳[1,1,1]給回呼函式', () => {
        new 矩陣(3, 3).填滿(1).每一個橫列((x) => {
            expect(x).toEqual([1, 1, 1])
        })
    })

    test('3x3矩陣，應將橫列編號傳給回呼函式', () => {
        let 目前的橫列編號 = 0
        new 矩陣(3, 3).每一個橫列((x, 橫列編號) => {
            expect(橫列編號).toBe(目前的橫列編號++)
        })
    })

    test('應回傳自己', () => {
        let m = new 矩陣(3, 3)
        expect(m.每一個橫列(() => {
        })).toBe(m)
    })
})

describe('測試【每一個直行】】', () => {
    test('3x3矩陣用1填滿，應傳[1,1,1]給回呼函式', () => {
        new 矩陣(3, 3).填滿(1).每一個直行((x) => {
            expect(x).toEqual([1, 1, 1])
        })
    })

    test('3x3矩陣，應將直行編號傳給回呼函式', () => {
        let 目前的直行編號 = 0
        new 矩陣(3, 3).每一個直行((元素, 直行編號) => {
            expect(直行編號).toBe(目前的直行編號++)
        })
    })

    test('應回傳自己', () => {
        let m = new 矩陣(3, 3)
        expect(m.每一個直行(() => {
        })).toBe(m)
    })
})

describe('測試【清除】】', () => {
    test('建立2x2矩陣，清除內容之後橫列數量和直行數量應等於0', () => {
        let m = new 矩陣(2, 2).清除()
        expect(m.橫列數量).toBe(0)
        expect(m.直行數量).toBe(0)
    })
})

describe('測試【減】】', () => {
    test('[1,2][3,4]減[5,6][7,8]應等於[-4,-4][-4,-4]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = new 矩陣([5, 6], [7, 8])
        let m3 = m1.減(m2)
        expect(m3[0][0]).toBe(-4)
        expect(m3[0][1]).toBe(-4)
        expect(m3[1][0]).toBe(-4)
        expect(m3[1][1]).toBe(-4)
    })

    test('[1,2][3,4]減3應等於[-2,-1][0,1]', () => {
        let m = new 矩陣([1, 2], [3, 4]).減(3)
        expect(m[0][0]).toBe(-2)
        expect(m[0][1]).toBe(-1)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(1)
    })

    test('對象不是數值或陣列，應拋出型別錯誤例外', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(() => m.減('a')).toThrow(型別錯誤)
    })
})

describe('測試【直行】】', () => {
    test('[1,2][3,4]，直行(0)應等於[1,3]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(m.直行(0)).toEqual([1, 3])
    })

    test('[1,2][3,4]，直行(1)應等於[2,4]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(m.直行(1)).toEqual([2, 4])
    })
})

describe('測試【等於】】', () => {
    test('傳入不是矩陣的參數應拋出例外', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.等於(1)).toThrow(錯誤訊息.矩陣.參數值必須是矩陣)
    })

    test('[1,2][3,4]與[7,8,3,3][2,2,2,0]應不相等', () => {
        const m1 = new 矩陣([1, 2], [3, 4])
        const m2 = new 矩陣([7, 8, 3, 3], [2, 2, 2, 0])
        expect(m1.等於(m2)).toBe(false)
    })

    test('[1,2][3,2]與[1,2][3,4]應不相等', () => {
        const m1 = new 矩陣([1, 2], [3, 2])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.等於(m2)).toBe(false)
    })

    test('[1.00000001,2][3,2]與[1,2][3,4]應不相等', () => {
        const m1 = new 矩陣([1.00000001, 2], [3, 2])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.等於(m2)).toBe(false)
    })

    test('[1,2][3,4]與[1,2][3,4]應相等', () => {
        const m1 = new 矩陣([1, 2], [3, 4])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.等於(m2)).toBe(true)
    })
})

describe('測試【總和】】', () => {
    test('[1,2][3,4]總和應等於10', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        expect(m1.總和()).toBe(10)
    })

    test('[a,b][c,d]總和應等於abcd', () => {
        let m1 = new 矩陣(['a', 'b'], ['c', 'd'])
        expect(m1.總和('')).toBe('abcd')
    })
})

describe('測試【複製】】', () => {
    test('[1,2,3][4,5,6]，複製之後應為[1,2,3][4,5,6]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6])
        const c = m.複製()
        expect(c.直行數量).toBe(3)
        expect(c.橫列數量).toBe(2)
        expect(c.橫列(0)).toEqual([1, 2, 3])
        expect(c.橫列(1)).toEqual([4, 5, 6])
    })
})

describe('測試【複製範圍】】', () => {
    test('橫列編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.複製範圍(4, 2, 1, 1)).toThrow(索引超出範圍錯誤)
    })

    test('直行編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.複製範圍(2, 4, 1, 1)).toThrow(索引超出範圍錯誤)
    })

    test('直行編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        const c = m.複製範圍(1, 1, 2, 2)
        expect(c.橫列數量).toBe(2)
        expect(c.直行數量).toBe(2)
        expect(c[0][0]).toBe(5)
        expect(c[0][1]).toBe(6)
        expect(c[1][0]).toBe(8)
        expect(c[1][1]).toBe(9)
    })

})

describe('測試【設定橫列】】', () => {
    test('值不是向量或矩陣，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.設定橫列(1, 'a')).toThrow(錯誤訊息.矩陣.參數值必須是向量或矩陣)
    })

    test('橫列編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.設定橫列(4, [11, 12, 13])).toThrow(索引超出範圍錯誤)
    })

    test('橫列編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.設定橫列(-1, [11, 12, 13])).toThrow(索引超出範圍錯誤)
    })

    test('矩陣[1,2,3][4,5,6][7,8,9]，設定橫列2 = [11,12,13]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        m.設定橫列(2, [11, 12, 13])
        expect(m[0][0]).toBe(1)
        expect(m[0][1]).toBe(2)
        expect(m[0][2]).toBe(3)
        expect(m[1][0]).toBe(4)
        expect(m[1][1]).toBe(5)
        expect(m[1][2]).toBe(6)
        expect(m[2][0]).toBe(11)
        expect(m[2][1]).toBe(12)
        expect(m[2][2]).toBe(13)
    })
})

describe('測試【設定直行】】', () => {
    test('直行編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.設定直行(4, [11, 12, 13])).toThrow(索引超出範圍錯誤)
    })

    test('直行編號超出範圍，應拋出例外。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        expect(() => m.設定直行(-1, [11, 12, 13])).toThrow(索引超出範圍錯誤)
    })

    test('矩陣[1,2,3][4,5,6][7,8,9]，設定直行2 = [11,12,13]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
        m.設定直行(2, [11, 12, 13])
        expect(m[0][0]).toBe(1)
        expect(m[0][1]).toBe(2)
        expect(m[0][2]).toBe(11)
        expect(m[1][0]).toBe(4)
        expect(m[1][1]).toBe(5)
        expect(m[1][2]).toBe(12)
        expect(m[2][0]).toBe(7)
        expect(m[2][1]).toBe(8)
        expect(m[2][2]).toBe(13)
    })
})

describe('測試【設定維度】】', () => {
    test('矩陣設定維度之後，新的元素應等於0', () => {
        let m = new 矩陣(2, 2).填滿(2).設定維度(3, 3)
        expect(m[0][0]).toBe(0)
        expect(m[0][1]).toBe(0)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(0)
        expect(m[0][2]).toBe(0)
        expect(m[1][2]).toBe(0)
        expect(m[2][1]).toBe(0)
        expect(m[2][2]).toBe(0)
    })

    test('設定維度(1,1)之後，橫列數量和直行數量應等於1', () => {
        let m = new 矩陣(2, 2).填滿(2).設定維度(1, 1)
        expect(m.橫列數量).toBe(1)
        expect(m.直行數量).toBe(1)
    })
})

describe('測試【轉為字串】】', () => {
    test('[1,2,3][4,5,6]，轉為字串[1,2,3][4,5,6]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6])
        const s = m.轉為字串()
        expect(s).toBe('[\r\n' +
                           '  [ 1  2  3 ]\r\n' +
                           '  [ 4  5  6 ]\r\n' +
                           ']\r\n')
    })
})

describe('測試【轉置矩陣】】', () => {
    test('空矩陣應拋出例外。', () => {
        const m = new 矩陣([])
        expect(() => m.轉置矩陣()).toThrow(Error)
    })

    test('[1,2,3][4,5,6]，轉置之後應為[1,4][2,5][3,6]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6])
        const t = m.轉置矩陣()
        expect(t.直行數量).toBe(2)
        expect(t.橫列數量).toBe(3)
        expect(t.橫列(0)).toEqual([1, 4])
        expect(t.橫列(1)).toEqual([2, 5])
        expect(t.橫列(2)).toEqual([3, 6])
    })

    test('矩陣的轉置矩陣的行列式等於這個矩陣的行列式。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.轉置矩陣().特徵值).toBe(m.特徵值)
    })

    test('純量的轉置是同樣的純量。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.乘(3).轉置矩陣()).toEqual(m.轉置矩陣().乘(3))
    })

    test('轉置是自身逆運算。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.轉置矩陣().轉置矩陣()).toEqual(m)
    })

    test('轉置是從m × n矩陣的向量空間到所有n × m矩陣的向量空間的線性映射。', () => {
        const a = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        const b = new 矩陣([3, 2, 1], [9, 1, 2], [5, 0, 3])

        expect(a.加(b).轉置矩陣()).toEqual(a.轉置矩陣().加(b.轉置矩陣()))
    })
})
