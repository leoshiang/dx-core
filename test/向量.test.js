const 向量 = require('../src/向量');
const 位元陣列 = require('../src/位元陣列');
const {
	型別錯誤,
	參數錯誤,
} = require('../src/例外');
const 錯誤訊息 = require('../src/錯誤訊息');

describe('測試【constructor】', () => {
	it('傳入大於等於零的數字，length 應等於該數字', () => {
		const v = new 向量(4);
		expect(v.length).toBe(4);
	});

	it('傳入小於零的數字，應拋出參數錯誤', () => {
		expect(() => new 向量(-1)).toThrow(錯誤訊息.向量.長度必須大於等於零);
	});

	it('傳入大於等於零的數字，每一個元素應等於0', () => {
		const v = new 向量(4);
		expect(v[0]).toBe(0);
		expect(v[1]).toBe(0);
		expect(v[2]).toBe(0);
		expect(v[3]).toBe(0);
	});

	it('傳入陣列，length 應等於陣列長度', () => {
		const v = new 向量([1, 2, 3]);
		expect(v.length).toBe(3);
	});

	it('傳入只有一個數字的陣列，length 應等於陣列長度', () => {
		const v = new 向量([3]);
		expect(v[0]).toBe(3);
	});

	it('傳入陣列，內容應與陣列相同', () => {
		const v = new 向量([1, 2, 3]);
		expect(v[0]).toBe(1);
		expect(v[1]).toBe(2);
		expect(v[2]).toBe(3);
	});

	it('傳入陣列、數字，內容應為參數的所有元素', () => {
		const v = new 向量([1, 2, 3], 4);
		expect(v[0]).toBe(1);
		expect(v[1]).toBe(2);
		expect(v[2]).toBe(3);
		expect(v[3]).toBe(4);
	});

	it('傳入陣列、數字陣列，內容應為參數的所有元素', () => {
		const v = new 向量([1, 2, 3], 4, [5, 6, 7]);
		expect(v[0]).toBe(1);
		expect(v[1]).toBe(2);
		expect(v[2]).toBe(3);
		expect(v[3]).toBe(4);
		expect(v[4]).toBe(5);
		expect(v[5]).toBe(6);
		expect(v[6]).toBe(7);
	});

	it('沒有傳入參數，length 應等於0', () => {
		const v = new 向量();
		expect(v.length).toBe(0);
	});
});

describe('測試【範數】】', () => {
	it('[3,4]的範數應為5', () => {
		const v1 = new 向量([3, 4]);
		expect(v1.範數).toEqual(5);
	});

	it('[0,0]的範數應為0', () => {
		const v1 = new 向量([0, 0]);
		expect(v1.範數).toEqual(0);
	});
});

describe('測試【交換】】', () => {
	it('[1,2,3]交換(0,2)應變為[3,2,1]', () => {
		const v = new 向量([1, 2, 3]).交換(0, 2);
		expect(v).toEqual([3, 2, 1]);
	});

	it('[1,2,3]交換(-1,2)應拋出例外', () => {
		const v = new 向量([1, 2, 3]);
		expect(() => v.交換(-1, 2)).toThrow(錯誤訊息.向量.索引超出範圍);
	});

	it('[1,2,3]交換(0,3)應拋出例外', () => {
		const v = new 向量([1, 2, 3]);
		expect(() => v.交換(0, 3)).toThrow(錯誤訊息.向量.索引超出範圍);
	});
});

describe('測試【乘】】', () => {
	it('乘的結果應回傳新向量', () => {
		const v1 = new 向量([1, 2, 3]);
		const v2 = v1.乘(0.5);
		expect(v1).not.toBe(v2);
	});

	it('傳入的參數不是數值，應拋出型別錯誤例外', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(() => 測試向量.乘('a')).toThrow(型別錯誤);
	});

	it('[1,2,3]乘以2，應等於[2,4,6]', () => {
		const v = new 向量([1, 2, 3]).乘(2);
		expect(v).toEqual([2, 4, 6]);
	});

	it('[1,2,3]乘以0.5，應等於[0.5,1,1.5]', () => {
		const v = new 向量([1, 2, 3]).乘(0.5);
		expect(v).toEqual([0.5, 1, 1.5]);
	});
});

describe('測試【內積】】', () => {
	it('維度不同應拋出例外', () => {
		expect(() => {
			const v1 = new 向量([3, 4, 1]);
			const v2 = new 向量([3, 7]);
			const dot = v1.內積(v2);
		}).toThrow(錯誤訊息.向量.向量維度相同才能計算內積);
	});

	it('[3,4,1].[3,7,5]應等於42', () => {
		const v1 = new 向量([3, 4, 1]);
		const v2 = new 向量([3, 7, 5]);
		expect(v1.內積(v2)).toBe(42);
	});

	it('交換率 a．b = b．a ', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		expect(a.內積(b)).toBe(b.內積(a));
	});

	it('對向量加法滿足分配律 a．(b+c) = a．b + a．c', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		const c = new 向量([1, 2, 3]);
		expect(a.內積(b.加(c))).toBe(a.內積(b) + a.內積(c));
	});

	it('內積是雙線性算子 a．(rb+c) = r(a．b) + (a．c)', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		const c = new 向量([1, 2, 3]);
		const r = 2;
		expect(a.內積(b.乘(r).加(c))).toBe(r * a.內積(b) + a.內積(c));
	});

	it('在乘以純量時滿足 (c1*a)．(c2*b) = (c1*c2)(a．b)', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		const c1 = 2;
		const c2 = 4;
		const left = a.乘(c1).內積(b.乘(c2));
		const right = c1 * c2 * a.內積(b);
		expect(left).toBe(right);
	});
});

describe('測試【加】】', () => {
	it('加的結果應回傳新向量', () => {
		const v1 = new 向量([1, 2, 3]);
		const v2 = v1.加(1);
		expect(v2).not.toBe(v1);
	});

	it('[1,2,3]加上1，應等於[2,3,4]', () => {
		const v = new 向量([1, 2, 3]).加(1);
		expect(v).toEqual([2, 3, 4]);
	});

	it('[1,2,3]加上-1，應等於[0,1,2]', () => {
		const v = new 向量([1, 2, 3]).加(-1);
		expect(v).toEqual([0, 1, 2]);
	});

	it('[1,2,3]加上[2,3,4]，應等於[3,5,7]', () => {
		const v = new 向量([1, 2, 3]).加(new 向量([2, 3, 4]));
		expect(v).toEqual([3, 5, 7]);
	});

	it('長度不相同，應拋出參數錯誤例外', () => {
		expect(() => new 向量([1, 2, 3]).加(new 向量([2, 3])))
			.toThrow(參數錯誤);
	});

	it('文字向量加上文字', () => {
		const v1 = new 向量(['a', 'b', 'c']);
		const v2 = v1.加('1');
		expect(v2[0]).toBe('a1');
		expect(v2[1]).toBe('b1');
		expect(v2[2]).toBe('c1');
	});

	it('不傳入參數，應回傳完全相同的新向量', () => {
		const v1 = new 向量([1, 2, 3]);
		const v2 = v1.加();
		expect(v1).toEqual(v2);
	});
});

describe('測試【加總】】', () => {
	it('[1,2,3,4]加總應為10', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(測試向量.加總()).toBe(10);
	});

	it('[1,2,3,4]（排除位置0）加總應為9', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 排除項目 = new 位元陣列('0001');
		expect(測試向量.加總(排除項目)).toStrictEqual(9);
	});

	it('["a", "b", "c"]加總應為"abc"', () => {
		const 測試向量 = new 向量(['a', 'b', 'c']);
		expect(測試向量.加總()).toStrictEqual('abc');
	});

	it('["a", 2, "c"]加總應為"abc"', () => {
		const 測試向量 = new 向量(['a', 2, 'c']);
		expect(測試向量.加總()).toStrictEqual('a2c');
	});
});

describe('測試【外積】】', () => {
	it('外積的結果應回傳新向量', () => {
		const v1 = new 向量([3, 4, 1]);
		const v2 = new 向量([3, 7, 5]);
		const v3 = v1.外積(v2);
		expect(v3).not.toBe(v1);
		expect(v3).not.toBe(v2);
	});

	it('外積的結果應不改變原來的向量', () => {
		const v1 = new 向量([3, 4, 1]);
		const v2 = new 向量([3, 7, 5]);
		const v3 = v1.外積(v2);
		expect(v1).toEqual([3, 4, 1]);
		expect(v2).toEqual([3, 7, 5]);
		expect(v3).toEqual([13, -12, 9]);
	});

	it('[3,4,1]x[3,7,5]應等於[13,-12,9]', () => {
		const v1 = new 向量([3, 4, 1]);
		const v2 = new 向量([3, 7, 5]);
		const v3 = v1.外積(v2);
		expect(v3).toEqual([13, -12, 9]);
	});

	it('不是三維向量不能做外積運算', () => {
		const v1 = new 向量([3, 4]);
		const v2 = new 向量([3, 7, 5]);
		expect(() => v1.外積(v2)).toThrow(錯誤訊息.向量.外積僅能對三維向量做運算);
	});

	it('不是三維向量不能做外積運算', () => {
		const v1 = new 向量([3, 4]);
		const v2 = new 向量([3, 7, 5]);
		expect(() => v2.外積(v1)).toThrow(錯誤訊息.向量.外積僅能對三維向量做運算);
	});

	it('axa = 0', () => {
		const a = new 向量([3, 4, 1]);
		const c = a.外積(a);
		expect(c[0]).toBe(0);
		expect(c[1]).toBe(0);
		expect(c[2]).toBe(0);
	});

	it('ax0 = 0', () => {
		const a = new 向量([3, 4, 1]);
		const c = a.外積([0, 0, 0]);
		expect(c[0]).toBe(0);
		expect(c[1]).toBe(0);
		expect(c[2]).toBe(0);
	});

	it('axb = -bxa', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		expect(a.外積(b)).toStrictEqual(b.乘(-1).外積(a));
	});

	it('ax(b+c) = axb + axc', () => {
		const a = new 向量([3, 4, 1]);
		const b = new 向量([3, 7, 5]);
		const c = new 向量([1, 2, 3]);
		expect(a.外積(b.加(c))).toStrictEqual(a.外積(b).加(a.外積(c)));
	});
});

describe('測試【是零向量】】', () => {
	it('[1,2,3]應等於 false', () => {
		const v = new 向量([1, 2, 3]);
		expect(v.是零向量()).toBe(false);
	});

	it('[1,2,0]應等於 false', () => {
		const v = new 向量([1, 2, 0]);
		expect(v.是零向量()).toBe(false);
	});

	it('[0,0,0]應等於 true', () => {
		const v = new 向量([0, 0, 0]);
		expect(v.是零向量()).toBe(true);
	});

	it('[]應等於 true', () => {
		const v = new 向量();
		expect(v.是零向量()).toBe(true);
	});
});

describe('測試【更新全部】】', () => {
	it('[1,2,3,4,5]每個元素+1但是排除 [0,4]，最後向量應該是[1,3,4,5,5]', () => {
		const 五個數字的向量 = new 向量([1, 2, 3, 4, 5]);
		const 排除項目 = new 位元陣列(5).設定狀態(0, true).設定狀態(4, true);
		五個數字的向量.更新全部(x => x + 1, 排除項目);
		expect(五個數字的向量).toEqual([1, 3, 4, 5, 5]);
	});
});

describe('測試【最大值】】', () => {
	it('效能測試：10000000個元素', () => {
		const 測試向量 = new 向量(10000000);
		expect(測試向量.最大值()).toStrictEqual({
			索引: 0,
			值: 0,
		});
	});

	it('[]最大值應為{值:null,索引:-1}', () => {
		const 測試向量 = new 向量();
		expect(測試向量.最大值()).toStrictEqual({
			索引: -1,
			值: undefined,
		});
	});

	it('[1,2,3,4]最大值應為{值:4,索引:3}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(測試向量.最大值()).toStrictEqual({
			值: 4,
			索引: 3,
		});
	});

	it('[1,2,3,4]排除4，應為{值:3,索引:2}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 排除的項目 = new 位元陣列('1000');
		expect(測試向量.最大值(排除的項目)).toStrictEqual({
			值: 3,
			索引: 2,
		});
	});

	it('[1,2,3,4]排除null，應拋出 型別錯誤例外', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(() => 測試向量.最大值('a')).toThrow(型別錯誤);
	});
});

describe('測試【最小值】】', () => {
	it('[4,3,2,1]最小值應為{值:1,索引:3}', () => {
		const 測試向量 = new 向量([4, 3, 2, 1]);
		expect(測試向量.最小值()).toStrictEqual({
			值: 1,
			索引: 3,
		});
	});

	it('[4,3,2,1]排除4，應為{值:1,索引:3}', () => {
		const 測試向量 = new 向量([4, 3, 2, 1]);
		const 排除的項目 = new 位元陣列('0001');
		expect(測試向量.最小值(排除的項目)).toStrictEqual({
			值: 1,
			索引: 3,
		});
	});
});

describe('測試【有相鄰的】】', () => {
	it('[1]，(3,4)應不相鄰', () => {
		const v = new 向量([1]);
		expect(v.有相鄰的(3, 4)).toBe(false);
	});

	it('[1,2,3,4]，(3,4)應相鄰', () => {
		const v = new 向量(1, 2, 3, 4);
		expect(v.有相鄰的(3, 4)).toBe(true);
	});

	it('[1,2,3,4]，(1,4)應不相鄰', () => {
		const v = new 向量(1, 2, 3, 4);
		expect(v.有相鄰的(1, 4)).toBe(false);
	});

	it('[1,2,3,4]，(5,6)應不相鄰', () => {
		const v = new 向量(1, 2, 3, 4);
		expect(v.有相鄰的(5, 6)).toBe(false);
	});

	it('[a,b,c,d,e]，(b,c)應不相鄰', () => {
		const v = new 向量('a', 'b', 'c', 'd', 'e');
		expect(v.有相鄰的('b', 'c')).toBe(true);
	});
});

describe('測試【等於】】', () => {
	it('另一個向量不是向量，應拋出型別錯誤例外', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(() => 測試向量.等於('a')).toThrow(型別錯誤);
	});

	it('[1,2,3,4]應不等於[[1,2,3,4,5]', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 向量2 = new 向量([1, 2, 3, 4, 5]);
		expect(測試向量.等於(向量2)).toBe(false);
	});

	it('[1,2,3,4,5]應等於[[1,2,3,4,5]', () => {
		const 測試向量 = new 向量([1, 2, 3, 4, 5]);
		const 向量2 = new 向量([1, 2, 3, 4, 5]);
		expect(測試向量.等於(向量2)).toBe(true);
	});

	it('[1.00000001,2,3,4,5]應不等於[[1,2,3,4,5]', () => {
		const 測試向量 = new 向量([1.0000001, 2, 3, 4, 5]);
		const 向量2 = new 向量([1, 2, 3, 4, 5]);
		expect(測試向量.等於(向量2)).toBe(false);
	});

	it('[1.000000001,2,3,4,5]應等於[[1,2,3,4,5]', () => {
		const 測試向量 = new 向量([1.00000001, 2, 3, 4, 5]);
		const 向量2 = new 向量([1, 2, 3, 4, 5]);
		expect(測試向量.等於(向量2)).toBe(true);
	});
});

describe('測試【第一個大於】】', () => {
	it('[1,2,3,4]第一個大於 2 的元素應為{索引:2,值:3}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(測試向量.第一個大於(2)).toStrictEqual({
			索引: 2,
			值: 3,
		});
	});

	it('[1,2,3,4]第一個大於 2 的元素（排除位置1）應為{索引:2,值:3}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 排除項目 = new 位元陣列('0010');
		expect(測試向量.第一個大於(2, 排除項目)).toStrictEqual({
			索引: 2,
			值: 3,
		});
	});

	it('[1,2,3,4]第一個大於 2 的元素（排除位置1）應為{索引:2,值:3}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 排除項目 = new 位元陣列('0010');
		expect(測試向量.第一個大於(2, 排除項目)).toStrictEqual({
			索引: 2,
			值: 3,
		});
	});

	it('[1,2,3,4]第一個大於 6 的元素應為{索引:-1,值:null}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(測試向量.第一個大於(6)).toStrictEqual({
			索引: -1,
			值: null,
		});
	});
});

describe('測試【第一個小於】】', () => {
	it('[1,2,3,4]第一個小於 0 的元素應為 {索引:-1,值:null}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		expect(測試向量.第一個小於(0)).toStrictEqual({
			索引: -1,
			值: null,
		});
	});

	it('[1,2,3,4]第一個小於 2 的元素（排除位置1）應為{索引:0,值:1}', () => {
		const 測試向量 = new 向量([1, 2, 3, 4]);
		const 排除項目 = new 位元陣列('0010');
		expect(測試向量.第一個小於(2, 排除項目)).toStrictEqual({
			索引: 0,
			值: 1,
		});
	});

	it('[4,3,2,1]第一個小於2的元素（排除位置1）應為{索引:3,值:1}', () => {
		const 測試向量 = new 向量([4, 3, 2, 1]);
		const 排除項目 = new 位元陣列('0010');
		expect(測試向量.第一個小於(2, 排除項目)).toStrictEqual({
			索引: 3,
			值: 1,
		});
	});

	it('[10,9,8,7]第一個小於8的元素應為{索引:4,值:7}', () => {
		const 測試向量 = new 向量([10, 9, 8, 7]);
		expect(測試向量.第一個小於(8)).toStrictEqual({
			索引: 3,
			值: 7,
		});
	});

	it('[7,3,2,1]第一個小於6的元素應為{索引:1,值:3}', () => {
		const 測試向量 = new 向量([7, 3, 2, 1]);
		expect(測試向量.第一個小於(6)).toStrictEqual({
			索引: 1,
			值: 3,
		});
	});
});

describe('測試【複製】】', () => {
	it('複製的新向量應與原向量是不同物件', () => {
		const v1 = new 向量([1, 2, 3]);
		const v2 = v1.複製();
		expect(v2).not.toBe(v1);
	});

	it('[1,2,3]複製的結果應等於[1,2,3]', () => {
		const v = new 向量([1, 2, 3]);
		expect(v.複製()).toEqual([1, 2, 3]);
	});

	it('[]複製應等於[]', () => {
		const v = new 向量([]);
		expect(v.複製()).toEqual([]);
	});
});

describe('測試【迭代】】', () => {
	it('回呼函式的型別不是函式應拋出例外', () => {
		const 五個數字的向量 = new 向量([1, 2, 3, 4, 5]);
		const 排除項目 = new 位元陣列('10001');
		expect(() => 五個數字的向量.迭代(1, 排除項目))
			.toThrow(錯誤訊息.回呼函式必須是函式);
	});

	it('[1,2,3,4,5] 排除 [0,4]，回呼函式應收到[2,3,4]', () => {
		const 五個數字的向量 = new 向量([1, 2, 3, 4, 5]);
		const 排除項目 = new 位元陣列('10001');
		let 回呼函式收到的資料 = [];
		const 回呼函式 = jest.fn(x => 回呼函式收到的資料.push(x));
		五個數字的向量.迭代(回呼函式, 排除項目);
		expect(回呼函式).toBeCalledTimes(3);
		expect(回呼函式收到的資料).toStrictEqual([2, 3, 4]);
	});

	it('[1,2,3,4,5] 沒傳入排除項目，回呼函式應收到[1,2,3,4,5]', () => {
		const 五個數字的向量 = new 向量([1, 2, 3, 4, 5]);
		let 回呼函式收到的資料 = [];
		const 回呼函式 = jest.fn(x => 回呼函式收到的資料.push(x));
		五個數字的向量.迭代(回呼函式);
		expect(回呼函式).toBeCalledTimes(5);
		expect(回呼函式收到的資料).toStrictEqual([1, 2, 3, 4, 5]);
	});

	it('[1,2,3,4,5] 沒傳入排除項目，回呼函式應收到[(1,1),(2,2),(3,3),(4,4),(5,5)]', () => {
		const 五個數字的向量 = new 向量([1, 2, 3, 4, 5]);
		let 回呼函式收到的資料 = [];
		let 回呼函式收到的索引 = [];
		const 回呼函式 = jest.fn((x, index) => {
			回呼函式收到的資料.push(x);
			回呼函式收到的索引.push(index);
		});
		五個數字的向量.迭代(回呼函式);
		expect(回呼函式).toBeCalledTimes(5);
		expect(回呼函式收到的資料).toStrictEqual([1, 2, 3, 4, 5]);
		expect(回呼函式收到的索引).toStrictEqual([0, 1, 2, 3, 4]);
	});
});

describe('測試【附加】】', () => {
	it('附加的結果應該是新向量', () => {
		const v1 = new 向量([1]);
		const v2 = v1.附加([2, 3, 4], [5, 6, 7]);
		expect(v2).not.toBe(v1);
	});

	it('空向量，加入一個元素，length 應等於1', () => {
		const v1 = new 向量();
		const v2 = v1.附加(123);
		expect(v2.length).toBe(1);
		expect(v2[0]).toBe(123);
	});

	it('一個元素的向量，加入一個有三個元素的陣列，length 應等於4', () => {
		const v1 = new 向量([1]);
		const v2 = v1.附加([2, 3, 4]);
		expect(v2.length).toBe(4);
		expect(v2[1]).toBe(2);
		expect(v2[2]).toBe(3);
		expect(v2[3]).toBe(4);
	});

	it('一個元素的向量，加入兩個有三個元素的陣列，length 應等於7', () => {
		const v1 = new 向量([1]);
		const v2 = v1.附加([2, 3, 4], [5, 6, 7]);
		expect(v2.length).toBe(7);
		expect(v2[1]).toBe(2);
		expect(v2[2]).toBe(3);
		expect(v2[3]).toBe(4);
		expect(v2[4]).toBe(5);
		expect(v2[5]).toBe(6);
		expect(v2[6]).toBe(7);
	});
});
