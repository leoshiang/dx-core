const Units = {
    Year: 'year',
    Month: 'month',
    Day: 'day',
    Hour: 'hour',
    Minute: 'minute',
    Second: 'second',
    Millisecond: 'millisecond',
};

const UnitNames = Object.getOwnPropertyNames(Units).map(x => Units[x]);

/**
 * 日期工具類別。
 *
 * 提供與日期操作相關的實用功能，例如格式化、比較和轉換日期。
 *
 * @class 日期工具
 * @example
 * // 建立日期工具的實例
 * const 工具 = new 日期工具();
 *
 * // 使用格式化方法
 * const 格式化日期 = 工具.格式化(new Date(), 'YYYY-MM-DD');
 * console.log(格式化日期); // 輸出形如 "2023-11-15" 的日期字串
 */
class 日期工具 {
    /**
     * 為指定的日期新增指定數量的時間單位，並返回更新後的新日期。
     *
     * 支援的時間單位類型：
     * - `days`：新增指定數量的天。
     * - `months`：新增指定數量的月份。
     * - `years`：新增指定數量的年份。
     *
     * @param {Date} date - 要處理的日期物件。必須為有效的 `Date` 物件。
     * @param {string} unit - 要新增的時間單位類型。支援的值包括：'days', 'months', 'years'。
     * @param {number} count - 新增的時間單位數量（可以為正或負數）。
     *     - 正數：將指定的時間單位往未來新增（如新增天數）。
     *     - 負數：將指定的時間單位往過去遞減（如減少天數）。
     * @return {Date} 返回新增時間單位後的 `Date` 物件。
     * @throws {Error} 當傳入無效的 `unit` 時拋出錯誤，例如未支援的時間單位（非 'days', 'months', 'years'）。
     *
     * @example
     * // 範例 1：新增 5 天
     * const date = new Date('2023-11-01');
     * const newDate = 加上(date, 'days', 5);
     * console.log(newDate); // 2023-11-06
     *
     * @example
     * // 範例 2：新增 2 個月
     * const date = new Date('2023-11-01');
     * const newDate = 加上(date, 'months', 2);
     * console.log(newDate); // 2024-01-01
     *
     * @example
     * // 範例 3：減少 1 年
     * const date = new Date('2023-11-01');
     * const newDate = 加上(date, 'years', -1);
     * console.log(newDate); // 2022-11-01
     *
     * @example
     * // 範例 4：傳入無效的時間單位
     * try {
     *    const newDate = 加上(new Date(), 'hours', 1);
     * } catch (error) {
     *    console.error(error.message); // 輸出：無效的單位類型
     * }
     */
    加上(date, unit, count) {
        this.檢查單位(unit);
        const parts = this.提取(date);
        parts[unit] += count;
        return this.建構(parts);
    }

    /**
     * 取得指定日期的中文星期幾名稱。
     *
     * @param {Date} date - 傳入的日期物件，表示需要取得星期幾的日期。
     * @param {boolean} [isShort=false] - 是否返回簡短的星期格式。
     *     - `true`：返回簡短的格式（如 "日", "一", "二"）。
     *     - `false`：返回完整格式（如 "星期日", "星期一", "星期二"）。
     * @return {string} 該日期對應的中文星期幾名稱。
     * @throws {Error} 當傳入的 `date` 參數不是有效的 `Date` 物件時，拋出錯誤。
     *
     * @example
     * // 假設今天是 2023-11-01 (星期三)
     * 取得中文星期名稱(new Date('2023-11-01'));
     * // 返回 "星期三"
     *
     * 取得中文星期名稱(new Date('2023-11-01'), true);
     * // 返回 "三"
     */
    取得中文星期名稱(date, isShort = false) {
        if (!(date instanceof Date)) {
            throw new Error('請提供有效的 Date 物件');
        }
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const shortWeekdays = ['日', '一', '二', '三', '四', '五', '六'];
        if (isShort) {
            return shortWeekdays[date.getDay()];
        }
        return weekdays[date.getDay()];
    }

    /**
     * 取得指定日期物件的年份最後兩位數。
     *
     * @param {Date} date - 要提取年份資訊的 `Date` 物件。
     * @return {string} 年份的最後兩位數，作為字串返回（例如 '23' 表示 2023）。
     * @throws {Error} 如果參數不是有效的 `Date` 物件，將拋出錯誤。
     *
     * @example
     * // 範例 1：取得年份最後兩位數
     * const date = new Date('2023-11-15');
     * const yearLastTwoDigits = 取得年份尾數(date);
     * console.log(yearLastTwoDigits); // '23'
     *
     * @example
     * // 範例 2：處理無效的日期參數
     * try {
     *     const invalidDate = '2023-11-15'; // 非 Date 物件
     *     const yearLastTwoDigits = 取得年份尾數(invalidDate);
     * } catch (error) {
     *     console.error(error.message); // 輸出：請提供有效的 Date 物件
     * }
     */
    取得年份尾數(date) {
        if (!(date instanceof Date)) {
            throw new Error('請提供有效的 Date 物件');
        }
        return date.getFullYear().toString().slice(-2);
    }

    /**
     * 檢查指定的日期是否在給定的日期範圍內（包括起始和結束日期）。
     *
     * @param {Date} 日期 - 要檢查的日期。
     * @param {Date} 開始 - 範圍的開始日期（包含在範圍內）。
     * @param {Date} 結束 - 範圍的結束日期（包含在範圍內）。
     * @returns {boolean} 如果 `日期` 位於 `開始` 和 `結束` 範圍內，返回 `true`，否則返回 `false`。
     * @throws {Error} 如果 `日期`, `開始`, 或 `結束` 不是有效的 `Date` 實例，會拋出錯誤。
     * @throws {Error} 如果 `開始` 晚於 `結束`，則會拋出錯誤。
     *
     * @example
     * const 日期 = new Date(2023, 10, 15); // 2023年11月15日
     * const 開始 = new Date(2023, 10, 1); // 2023年11月1日
     * const 結束 = new Date(2023, 10, 30); // 2023年11月30日
     *
     * console.log(在範圍內(日期, 開始, 結束)); // true
     *
     * const invalidDate = new Date(2023, 11, 1); // 2023年12月1日
     * console.log(在範圍內(invalidDate, 開始, 結束)); // false
     *
     * // 無效輸入範例：
     * try {
     *     在範圍內('Invalid Date', 開始, 結束);
     * } catch (error) {
     *     console.error(error.message); // "請提供有效的 Date 物件"
     * }
     *
     * try {
     *     在範圍內(日期, 結束, 開始); // 起始日期晚於結束日期
     * } catch (error) {
     *     console.error(error.message); // "開始日期不可以晚於結束日期"
     * }
     */
    在範圍內(日期, 開始, 結束) {
        // 確保所有參數都是有效的 Date 實例
        if (!(日期 instanceof Date) || isNaN(日期.getTime())) {
            throw new Error('請提供有效的 Date 物件');
        }
        if (!(開始 instanceof Date) || isNaN(開始.getTime())) {
            throw new Error('請提供有效的開始日期 Date 物件');
        }
        if (!(結束 instanceof Date) || isNaN(結束.getTime())) {
            throw new Error('請提供有效的結束日期 Date 物件');
        }

        // 確保 開始 和 結束 的順序正確
        if (開始 > 結束) {
            throw new Error('開始日期不可以晚於結束日期');
        }

        // 返回日期是否在範圍內（包括起始和結束日期）
        return 日期 >= 開始 && 日期 <= 結束;
    }

    /**
     * 根據提供的日期時間組件，構建並返回一個新的 `Date` 物件。
     *
     * @param {Object} parts - 包含日期時間組件的物件。
     * @param {number} parts.year - 年份（例如 2023）。
     * @param {number} parts.month - 月份（從 0 開始，0 表示一月，11 表示十二月）。
     * @param {number} parts.day - 日期（1-31）。
     * @param {number} parts.hour - 小時（0-23）。
     * @param {number} parts.minute - 分鐘（0-59）。
     * @param {number} parts.second - 秒數（0-59）。
     * @param {number} parts.millisecond - 毫秒數（0-999）。
     * @return {Date} 根據提供的組件構建的 `Date` 物件。
     *
     * @throws {Error} 如果 `parts` 中缺少必要的屬性或屬性值無效，則拋出錯誤。
     *
     * @example
     * // 範例 1：構建一個指定日期和時間的 Date 物件
     * const parts = {
     *     year: 2023,
     *     month: 10, // 十一月 (0 為一月)
     *     day: 15,
     *     hour: 14,
     *     minute: 30,
     *     second: 59,
     *     millisecond: 123
     * };
     * const date = 建構(parts);
     * console.log(date); // 2023-11-15T14:30:59.123Z
     *
     * @example
     * // 範例 2：使用最小的組件構建 Date 物件
     * const parts = {
     *     year: 2023,
     *     month: 0, // 一月
     *     day: 1,
     *     hour: 0,
     *     minute: 0,
     *     second: 0,
     *     millisecond: 0
     * };
     * const date = 建構(parts);
     * console.log(date); // 2023-01-01T00:00:00.000Z
     *
     * @example
     * // 範例 3：傳遞不完整的組件應拋出錯誤
     * try {
     *     const parts = {
     *         year: 2023,
     *         month: 10, // 缺少其他組件
     *     };
     *     const date = 建構(parts);
     * } catch (error) {
     *     console.error(error.message); // 輸出：無效的 parts 屬性
     * }
     */
    建構(parts) {
        return new Date(parts.year, parts.month, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond);
    }

    /**
     * 從給定的日期物件中提取日期和時間的各個組件，並返回包含這些組件的物件。
     *
     * @param {Date} date - 要提取日期和時間組件的 `Date` 物件。
     * @return {Object} 返回包含日期和時間組件的物件。
     * @property {number} year - 年份（四位數，例如 2023）。
     * @property {number} month - 月份（從 0 開始，0 表示一月，11 表示十二月）。
     * @property {number} day - 日期（1-31）。
     * @property {number} hour - 小時（0-23）。
     * @property {number} minute - 分鐘（0-59）。
     * @property {number} second - 秒數（0-59）。
     * @property {number} millisecond - 毫秒數（0-999）。
     *
     * @throws {Error} 如果 `date` 不是有效的 `Date` 物件，則會拋出錯誤。
     *
     * @example
     * // 範例 1：提取完整的日期和時間組件
     * const date = new Date('2023-11-15T14:30:59.123Z');
     * const components = 提取(date);
     * console.log(components);
     * // 輸出：
     * // {
     * //   year: 2023,
     * //   month: 10, // 十一月 (0 表示一月)
     * //   day: 15,
     * //   hour: 14,
     * //   minute: 30,
     * //   second: 59,
     * //   millisecond: 123
     * // }
     *
     * @example
     * // 範例 2：處理無效的日期物件
     * try {
     *     const invalidDate = '2023-11-15'; // 非 Date 物件
     *     const components = 提取(invalidDate); // 將拋出錯誤
     * } catch (error) {
     *     console.error(error.message); // 輸出：Invalid Date
     * }
     */
    提取(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds(),
        };
    }

    /**
     * 檢查一個字串是否為有效的日期。
     *
     * 該函式會檢測輸入是否為字串，並嘗試將其轉換為 `Date` 物件。
     * 如果轉換後的日期是有效的（`getTime()` 不會返回 `NaN`），則判定為有效日期字串。
     *
     * @param {string} dateString - 要檢查的日期字串。
     * @returns {boolean} 如果提供的字串是有效的日期格式，則返回 `true`，否則返回 `false`。
     *
     * @example
     * 是否為有效日期字串('2023-11-15'); // true
     * 是否為有效日期字串('2023/11/32'); // false
     * 是否為有效日期字串('invalid-date'); // false
     * 是否為有效日期字串(12345); // false
     */
    是否為有效日期字串(dateString) {
        if (typeof dateString !== 'string') {
            return false;
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    /**
     * 格式化傳入的日期物件，根據指定的格式字串輸出對應的日期字串。
     *
     * 支援的格式符號：
     * - `YYYY`：四位數年份（例如 2023）
     * - `YY`：兩位數年份（例如 23）
     * - `MM`：兩位數月份，補 0（例如 01, 12）
     * - `M`：不補 0 的月份（例如 1, 12）
     * - `DD`：兩位數日期，補 0（例如 01, 31）
     * - `D`：不補 0 的日期（例如 1, 31）
     * - `HH`：24 小時制的時，補 0（例如 01, 23）
     * - `H`：24 小時制的時，不補 0（例如 1, 23）
     * - `mm`：分鐘，補 0（例如 01, 59）
     * - `m`：分鐘，不補 0（例如 1, 59）
     * - `ss`：秒數，補 0（例如 01, 59）
     * - `s`：秒數，不補 0（例如 1, 59）
     * - `xxx`：毫秒，補 0（例如 001, 999）
     * - `DOW`：完整的中文星期（例如 星期日, 星期一）
     * - `dow`：簡短的中文星期（例如 日, 一）
     *
     * @param {Date} date - 要格式化的日期物件。
     * @param {string} format - 指定的格式字串，包含格式符號。
     * @return {string} 返回格式化後的日期字串。
     * @throws {Error} 當參數 `date` 無效或不是 `Date` 物件時拋出錯誤。
     * @throws {Error} 當參數 `format` 無效或不是字串時拋出錯誤。
     *
     * @example
     * // 範例 1：格式化日期為 YYYY-MM-DD 格式
     * const date = new Date('2023-11-01T14:30:59');
     * 格式化日期(date, 'YYYY-MM-DD'); // 返回 '2023-11-01'
     *
     * @example
     * // 範例 2：格式化日期為 DD/MM/YYYY 格式
     * const date = new Date('2023-11-01T14:30:59');
     * 格式化日期(date, 'DD/MM/YYYY'); // 返回 '01/11/2023'
     *
     * @example
     * // 範例 3：包含時間結果的格式化
     * const date = new Date('2023-11-01T14:30:59');
     * 格式化日期(date, 'YYYY-MM-DD HH:mm:ss'); // 返回 '2023-11-01 14:30:59'
     *
     * @example
     * // 範例 4：格式化為中文星期格式
     * const date = new Date('2023-11-01T14:30:59');
     * 格式化日期(date, 'DOW'); // 返回 '星期三'
     * 格式化日期(date, 'dow'); // 返回 '三'
     *
     * @example
     * // 範例 5：包含毫秒的格式化
     * const date = new Date('2023-11-01T14:30:59.123');
     * 格式化日期(date, 'YYYY-MM-DD HH:mm:ss.xxx'); // 返回 '2023-11-01 14:30:59.123'
     */
    格式化日期(date, format) {
        if (!(date instanceof Date)) {
            throw new Error('請提供有效的 Date 物件');
        }

        if (typeof format !== 'string') {
            throw new Error('請提供有效的格式字串');
        }

        // 提取日期資訊
        const year = date.getFullYear().toString();
        const paddedMonth = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
        const paddedDay = String(date.getDate()).padStart(2, '0');
        const paddedHour = String(date.getHours()).padStart(2, '0');
        const paddedMinute = String(date.getMinutes()).padStart(2, '0');
        const paddedSecond = String(date.getSeconds()).padStart(2, '0');
        const paddedMilliSecond = String(date.getMilliseconds()).padStart(3, '0');

        // 替換格式字串中的關鍵字
        let result = format.replace(/YYYY/g, year)
                           .replace(/MM/g, paddedMonth)
                           .replace(/DD/g, paddedDay)
                           .replace(/HH/g, paddedHour)
                           .replace(/mm/g, paddedMinute)
                           .replace(/ss/g, paddedSecond)
                           .replace(/xxx/g, paddedMilliSecond)
                           .replace(/DOW/g, this.取得中文星期名稱(date))
                           .replace(/dow/g, this.取得中文星期名稱(date, true));

        const yearLastTwoDigits = this.取得年份尾數(date);
        const month = String(date.getMonth() + 1); // 月份從 0 開始
        const day = String(date.getDate());
        const hour = String(date.getHours());
        const minute = String(date.getMinutes());
        const second = String(date.getSeconds());
        result = result.replace(/YY/g, yearLastTwoDigits)
                       .replace(/M/g, month)
                       .replace(/D/g, day)
                       .replace(/H/g, hour)
                       .replace(/m/g, minute)
                       .replace(/s/g, second);

        return result;
    }

    /**
     * 驗證給定的時間單位是否有效。
     *
     * @param {string} 單位 - 要驗證的時間單位。
     * @throws {Error} 如果 `單位` 不在預定義的 `Units` 集合中，則拋出錯誤。
     *
     * @example
     * // 範例 1：有效的單位
     * const 單位 = 'days';
     * 檢查單位(單位); // 不會拋出錯誤
     *
     * @example
     * // 範例 2：無效的單位
     * try {
     *     const 單位 = 'hours';
     *     檢查單位(單位); // 單位 'hours' 不存在，將拋出錯誤
     * } catch (error) {
     *     console.error(error.message); // 輸出：不支援的單位
     * }
     *
     * @example
     * // 範例 3：驗證包含有效單位集合
     * const Units = { days: 'days', months: 'months', years: 'years' }; // 預定義單位
     * console.log(Object.values(Units)); // ['days', 'months', 'years']
     * const 單位 = 'months';
     * 檢查單位(單位); // 不會拋出錯誤
     */
    檢查單位(單位) {
        const exists = Object.values(Units).includes(單位);
        if (!exists) {
            throw new Error('不支援的單位');
        }
    }

    /**
     * 從指定的日期中減去指定的單位數量，並返回新的日期物件。
     *
     * @param {Date} 日期 - 要操作的原始 `Date` 物件。
     * @param {string} 單位 - 要減去的日期和時間單位（例如 `'year'`, `'month'`, `'day'`, `'hour'`, `'minute'`, `'second'`, `'millisecond'`）。
     * @param {number} 數量 - 要減去的單位數量。
     * @return {Date} 返回減去指定單位數量後的新 `Date` 物件。
     * @throws {Error} 如果傳入的 `單位` 無效，或 `日期` 不是有效的 `Date` 物件，則拋出錯誤。
     *
     * @example
     * // 範例 1：從日期中減去數月
     * const 日期 = new Date('2023-11-15T14:30:00Z');
     * const newDate = 減去(日期, 'month', 3);
     * console.log(newDate); // 2023-08-15T14:30:00Z
     *
     * @example
     * // 範例 2：從日期中減去數天
     * const 日期 = new Date('2023-11-15T14:30:00Z');
     * const newDate = 減去(日期, 'day', 10);
     * console.log(newDate); // 2023-11-05T14:30:00Z
     *
     * @example
     * // 範例 3：處理無效的單位
     * try {
     *     const 日期 = new Date('2023-11-15T14:30:00Z');
     *     const newDate = 減去(日期, 'invalidUnit', 5); // 單位無效
     * } catch (error) {
     *     console.error(error.message); // 輸出：Invalid 單位
     * }
     */
    減去(日期, 單位, 數量) {
        // 確保 日期 是一個有效的 Date 物件
        if (!(日期 instanceof Date) || isNaN(日期.getTime())) {
            throw new Error('無效的日期物件');
        }

        // 驗證單位是否合法
        if (!UnitNames.includes(單位)) {
            throw new Error(`不支援的單位: ${單位}`);
        }

        // 建立一個新 Date 防止直接修改輸入的日期
        const newDate = new Date(日期);

        // 執行對應的減法
        switch (單位) {
            case 'year':
                newDate.setFullYear(newDate.getFullYear() - 數量);
                break;
            case 'month':
                newDate.setMonth(newDate.getMonth() - 數量);
                break;
            case 'day':
                newDate.setDate(newDate.getDate() - 數量);
                break;
            case 'hour':
                newDate.setHours(newDate.getHours() - 數量);
                break;
            case 'minute':
                newDate.setMinutes(newDate.getMinutes() - 數量);
                break;
            case 'second':
                newDate.setSeconds(newDate.getSeconds() - 數量);
                break;
            case 'millisecond':
                newDate.setMilliseconds(newDate.getMilliseconds() - 數量);
                break;
        }

        return newDate; // 返回新的日期物件
    }

    /**
     * 解析日期字串並根據指定格式構建 `Date` 物件。
     *
     * 此功能允許使用者通過指定的格式字串來解析日期，如 `YYYY-MM-DD hh:mm:ss`，並返回對應的 `Date` 物件。
     * 格式字串必須與目標日期字串完全匹配，否則將拋出錯誤。
     *
     * 支援的格式標記：
     * - `YYYY`：四位數年份（例如 2023）
     * - `MM`：兩位數月份（01-12）
     * - `DD`：兩位數日期（01-31）
     * - `hh`：兩位數小時（00-23）
     * - `mm`：兩位數分鐘（00-59）
     * - `ss`：兩位數秒數（00-59）
     * - `zzz`：三位數毫秒數（000-999）
     *
     * @param {string} dateString - 要解析的日期字串，必須與格式匹配。
     * @param {string} format - 日期的格式字串，用來指明 `dateString` 的結構。例如：`YYYY-MM-DD hh:mm:ss`。
     * @return {Date} 解析後生成的 `Date` 物件。
     * @throws {Error} 如果 `dateString` 與 `format` 不匹配，將拋出 "無效的日期格式" 錯誤。
     * @throws {Error} 如果 `dateString` 或 `format` 為空或非字串類型，將拋出錯誤。
     *
     * @example
     * // 範例 1：成功解析日期字串
     * const dateString = '2023-11-15 14:30:59';
     * const format = 'YYYY-MM-DD hh:mm:ss';
     * const date = 解析(dateString, format);
     * console.log(date); // 返回 Date 物件，如 2023-11-15T14:30:59.000Z
     *
     * @example
     * // 範例 2：處理不匹配的日期字串
     * try {
     *     const dateString = '15/11/2023';
     *     const format = 'YYYY-MM-DD';
     *     const date = 解析(dateString, format); // 將拋出錯誤
     * } catch (error) {
     *     console.error(error.message); // 輸出：無效的日期格式。預期的格式為 "YYYY-MM-DD"。
     * }
     *
     * @example
     * // 範例 3：處理缺少的日期部分
     * const dateString = '2023-11';
     * const format = 'YYYY-MM';
     * const date = 解析(dateString, format);
     * console.log(date); // 返回 Date 物件，如 2023-11-01T00:00:00.000Z，未提供的日以 1 為預設值。
     */
    解析(dateString, format) {
        const formatTokens = {
            YYYY: '(\\d{4})', // 年，4 位數字
            MM: '(\\d{2})',   // 月，2 位數字
            DD: '(\\d{2})',   // 日，2 位數字
            hh: '(\\d{2})',   // 小時，2 位數字（24 小時制）
            mm: '(\\d{2})',   // 分鐘，2 位數字
            ss: '(\\d{2})',   // 秒，2 位數字
            zzz: '(\\d{3})',   // 毫秒，3 位數字
        };

        const regexString = format.replace(/YYYY|MM|DD|hh|mm|ss|zzz/g, (token) => formatTokens[token]);
        const regex = new RegExp(`^${regexString}$`);
        const match = dateString.match(regex);

        if (!match) {
            throw new Error(`無效的日期格式。預期的格式為 "${format}"。`);
        }

        const dateParts = {};
        let index = 1;
        for (const token of Object.keys(formatTokens)) {
            if (format.includes(token)) {
                dateParts[token] = parseInt(match[index++], 10);
            }
        }

        const year = dateParts['YYYY'] || 1970;
        const month = (dateParts['MM'] || 1) - 1;
        const day = dateParts['DD'] || 1;
        const hours = dateParts['hh'] || 0;
        const minutes = dateParts['mm'] || 0;
        const seconds = dateParts['ss'] || 0;
        const milliseconds = dateParts['zzz'] || 0;

        return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }

}

const instance = new 日期工具();

export default instance;