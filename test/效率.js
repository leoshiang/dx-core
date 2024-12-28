const 樣本數量 = 1000000;
const 測試陣列 = new Array(樣本數量);

function 初始化測試陣列 () {
	for (let i = 0; i < 樣本數量; i++) {
		測試陣列[i] = i;
	}
}

function 產生亂數 (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function 計算函式執行時間 (函式, 標籤) {
	console.time(標籤);
	函式();
	console.timeEnd(標籤);
}

function 測試搜尋數值_使用for迴圈 () {
	const 目標 = 樣本數量 - 1;
	let i;
	for (i = 0; i < 樣本數量; i++) {
		if (測試陣列[i] === 目標) {
			break;
		}
	}
}

function 測試搜尋數值_使用indexOf () {
	const 目標 = 樣本數量 - 1;
	const i = 測試陣列.indexOf(目標);
}

function 測試filter_使用for迴圈 () {
	const 目標 = 樣本數量 - 1;
	let i;
	for (i = 0; i < 樣本數量; i++) {
		if (測試陣列[i] === 目標) {
			break;
		}
	}
}

function 測試filter_使用filter () {
	const 目標 = 樣本數量 - 1;
	let i = 測試陣列.filter(x => x === 目標).length > 0;
}

function 測試複製_使用for迴圈 () {
	const 新陣列 = new Array(樣本數量);
	for (let i = 0; i < 樣本數量; i++) {
		新陣列[i] = 測試陣列[i];
	}
}

function 測試複製_使用from () {
	const 新陣列 = Array.from(測試陣列);
}

function 測試複製_使用push () {
	const 新陣列 = new Array(樣本數量);
	for (let i = 0; i < 樣本數量; i++) {
		新陣列.push(測試陣列[i]);
	}
}

function 測試複製_使用slice () {
	const 新陣列 = 測試陣列.slice(0);
}

初始化測試陣列();
計算函式執行時間(測試搜尋數值_使用for迴圈, '測試 搜尋數值_使用for迴圈');
計算函式執行時間(測試搜尋數值_使用indexOf, '測試 搜尋數值_使用indexOf');

計算函式執行時間(測試filter_使用for迴圈, '測試 filter_使用for迴圈');
計算函式執行時間(測試filter_使用filter, '測試 filter_使用filter');

計算函式執行時間(測試複製_使用for迴圈, '測試 複製_使用for迴圈');
計算函式執行時間(測試複製_使用from, '測試 複製_使用from');
計算函式執行時間(測試複製_使用push, '測試 複製_使用push');
計算函式執行時間(測試複製_使用slice, '測試 複製_使用slice');

/*
測試搜尋數值_使用for迴圈: 2.682ms
測試搜尋數值_使用indexOf: 1.296ms
測試filter_使用for迴圈: 2.673ms
測試filter_使用filter: 10.806ms
測試複製_使用for迴圈: 8.516ms
測試複製_使用push: 132.27ms
測試複製_使用slice: 11.37ms

 */
