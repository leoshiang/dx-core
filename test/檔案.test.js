const 檔案工具 = require('../src/檔案工具')
const mock = require('mock-fs');

beforeEach(() => {
    mock({
             '/sdk/tools': {
                 'bin': {
                     'apkanalyzer': 'apkanalyzer',
                     'archquery': 'archquery',
                 },
                 'lib': {
                     'android.el': 'android.el',
                     'animal-sniffer-annotations-1.14.jar': 'animal-sniffer-annotations-1.14.jar'
                 }
             }
         });
});

afterEach(() => {
    mock.restore();
});

describe('測試【列出目錄下所有檔案】', function () {
    test('列出目錄下所有檔案', () => {
        let 檔案列表 = 檔案工具.列出目錄下所有檔案('/sdk/tools')
        console.log(檔案列表)
    })
})
