const fs = require('fs');
const path = require('path');
const 檔案工具 = require('../src/檔案工具.js');

jest.mock('fs'); // 使用 Jest 模擬 fs 模組
jest.mock('path'); // 使用 Jest 模擬 path 模組

describe('檔案工具.列出目錄下所有檔案', () => {
	beforeEach(() => {
		jest.clearAllMocks(); // 在每次測試前清除 mock 記錄
	});

	it('應該列出指定目錄內的所有檔案路徑（沒有子目錄）', () => {
		// 模擬目錄內容
		fs.readdirSync.mockReturnValue(['file1.txt', 'file2.txt']);
		fs.statSync.mockImplementation((filePath) => ({
			isDirectory: () => false, // 模擬所有項目都是檔案
		}));
		path.join.mockImplementation((...args) => args.join('/')); // 模擬路徑拼接

		const 起始路徑 = '/test-folder';
		const 結果 = 檔案工具.列出目錄下所有檔案(起始路徑);

		expect(結果).toEqual(['/test-folder/file1.txt', '/test-folder/file2.txt']);
		expect(fs.readdirSync).toHaveBeenCalledWith(起始路徑);
		expect(fs.statSync).toHaveBeenCalledTimes(2);
	});

	it('應該在目錄為空時返回空陣列', () => {
		// 模擬空目錄
		fs.readdirSync.mockReturnValue([]);
		const 起始路徑 = '/empty-folder';
		const 結果 = 檔案工具.列出目錄下所有檔案(起始路徑);

		expect(結果).toEqual([]);
		expect(fs.readdirSync).toHaveBeenCalledWith(起始路徑);
		expect(fs.statSync).not.toHaveBeenCalled();
	});

	it('應該處理不存在的目錄，並拋出錯誤', () => {
		// 模擬目錄不存在時的錯誤
		fs.readdirSync.mockImplementation(() => {
			throw new Error('ENOENT: no such file or directory');
		});
		const 起始路徑 = '/non-existent-folder';

		expect(() => 檔案工具.列出目錄下所有檔案(起始路徑)).toThrow('ENOENT: no such file or directory');
		expect(fs.readdirSync).toHaveBeenCalledWith(起始路徑);
	});
});