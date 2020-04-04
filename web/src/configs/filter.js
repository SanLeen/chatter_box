import DateUtil from "../util/DateUtil";

/**
 * 全局过滤器
 */
export default class Filter {
    filters = {};

    constructor() {
        this.filters.simpleYearDayDispLay = (dateObject) => DateUtil.getSimpleYearDay(dateObject);
    }


    /**
     * 安装/初始化
     * @param filterCallback filter回调
     */
    initialize(filterCallback) {
        if (filterCallback instanceof Function) {
            Object.keys(this.filters).forEach(
                key => filterCallback(key, this.filters[key])
            );
        }
    }
}
