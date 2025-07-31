export default abstract class UnifaceChart {

    #chart:any;
    #option:any;
    protected result: any = {name:""};

    /**
     * 初始化一个图表组件
     * @param el
     */
    async init(el:HTMLElement): Promise<void> {
        if (this.#chart == null) {
            const echarts = await import('echarts');
            this.#chart = echarts.init(el);
            this.#option = this.createOption();
            this.invalidate();
            this.postInitialize(this.#chart);
        }
    }

    /**
     * 初始化后的回调函数
     * @param chart
     * @protected
     */
    protected postInitialize(chart:any):void {

    }

    /**
     * 创建chart的option
     * @protected
     */
    protected createOption():any {
        return {};
    }

    /**
     * 获取当前的chart
     * @protected
     */
    protected get chart():any {
        return this.#chart;
    }

    /**
     * 刷新当前的图表
     */
    invalidate(): void {
        this.#chart.setOption({...this.#option},true);
    }

    /**
     * 更改图表的大小
     */
    resize(): void {
        this.#chart.resize();
    }

    /**
     * 显示加载数据
     * @param type
     * @param opts
     */
    showLoading(type?: string, opts?: any): void {
        this.#chart.showLoading(type, opts);
    }

    /**
     * 隐藏加载数据
     */
    hideLoading(): void {
        this.#chart.hideLoading();
    }

    /**
     * 安装指定精度格式化数字
     * @param value
     * @param precision
     */
    protected formatNumber(value:number, precision:number=0):string {
        if (isNaN(value)) {
            value = 0;
        } else if (typeof(value)=="string") {
            value = parseFloat(value);
        }
        return value.toLocaleString("en-US",{minimumFractionDigits: precision, maximumFractionDigits: precision});
    }
}