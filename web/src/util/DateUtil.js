/**
 * 时间日期格式工具
 */
export default class DateUtil {

    /**
     * 获取时间对象
     * @param date 原始时间 *Date | string | number
     * @returns {Date} *Date
     */
    static getDateObject(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date;
    }

    /**
     * 获取格式化字符串
     * @param dateObject Date对象
     * @param format 目标字符串格式,默认：yyyy-MM-dd hh:mm:ss
     * @returns 格式化后的日期字符串
     *
     * 支持参数
     * yyyy：年
     * q: 季度
     * MM：月
     * dd：日
     * hh: 时
     * mm：分
     * ss：秒
     * S：毫秒
     */
    static format(dateObject, format) {
        dateObject = this.getDateObject(dateObject);

        let f = format || 'yyyy-MM-dd hh:mm:ss';
        const o = {
            'q+': Math.floor((dateObject.getMonth() + 3) / 3), // 季度
            'M+': dateObject.getMonth() + 1, // 月份
            'd+': dateObject.getDate(),   // 日
            'h+': dateObject.getHours(),    // 时
            'm+': dateObject.getMinutes(),    // 分
            's+': dateObject.getSeconds(),    // 秒
            'S': dateObject.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(f)) {
            f = f.replace(RegExp.$1, (dateObject.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(f)) {
                f = f.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return f;
    }

    /**
     * 获取简单时间显示
     * *如果和当前时间年份相同，则省略年份 e.g. 03-25 10:31
     * *如果和当前时间日期相同，则省略年份及日期 e.g. 10:31:25
     * @param date 时间 *Date | string | number
     */
    static getSimpleYearDay(date) {
        date = this.getDateObject(date);
        const now = new Date();
        if (date.getFullYear() === now.getFullYear()) { // 年份相同
            if (
                (date.getMonth() === now.getMonth())
                && (date.getDate() === now.getDate())
            ) { // 日期相同
                return this.format(date, 'hh:mm:ss');
            } else {
                return this.format(date, 'MM-dd hh:mm');
            }
        } else {
            return this.format(date);
        }
    }
}
