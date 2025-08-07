import type ChartEventHandlers from "$lib/ChartEventHandlers";
import type ChartEventParams from "$lib/ChartEventParams";

export default abstract class UnifaceChart {
    #chart: any;
    #option: any;
    #eventHandlers: ChartEventHandlers = {};
    protected result: any = { name: "" };

    /**
     * 初始化一个图表组件
     * @param el
     */
    async init(el: HTMLElement): Promise<void> {
        if (this.#chart == null) {
            const echarts = await import('echarts');
            this.#chart = echarts.init(el);
            this.#option = this.createOption();
            this.invalidate();
            this.setupEventListeners();
            this.postInitialize(this.#chart);
        }
    }

    /**
     * 设置事件处理器
     * @param handlers 事件处理器对象
     */
    setEventHandlers(handlers: ChartEventHandlers): void {
        this.#eventHandlers = { ...this.#eventHandlers, ...handlers };
        if (this.#chart) {
            this.setupEventListeners();
        }
    }

    /**
     * 添加单个事件处理器
     * @param eventType 事件类型
     * @param handler 事件处理函数
     */
    addEventListener(eventType: keyof ChartEventHandlers, handler: (params: ChartEventParams) => void): void {
        this.#eventHandlers[eventType] = handler;
        if (this.#chart) {
            this.setupEventListeners();
        }
    }

    /**
     * 移除事件处理器
     * @param eventType 事件类型
     */
    removeEventListener(eventType: keyof ChartEventHandlers): void {
        delete this.#eventHandlers[eventType];
        if (this.#chart) {
            this.setupEventListeners();
        }
    }

    /**
     * 设置事件监听器
     * @private
     */
    private setupEventListeners(): void {
        if (!this.#chart) return;

        // 清除现有的事件监听器
        this.#chart.off('click');
        this.#chart.off('dblclick');
        this.#chart.off('contextmenu');
        this.#chart.off('mouseover');

        // 注册新的事件监听器
        if (this.#eventHandlers.onClick) {
            this.#chart.on('click', this.#eventHandlers.onClick);
        }

        if (this.#eventHandlers.onDoubleClick) {
            this.#chart.on('dblclick', this.#eventHandlers.onDoubleClick);
        }

        if (this.#eventHandlers.onRightClick) {
            this.#chart.on('contextmenu', (params: ChartEventParams) => {
                // 阻止默认右键菜单
                if (params.event) {
                    params.event.event?.preventDefault();
                }
                this.#eventHandlers.onRightClick?.(params);
            });
        }

        if (this.#eventHandlers.onMouseOver) {
            this.#chart.on('mouseover', this.#eventHandlers.onMouseOver);
        }
    }

    /**
     * 触发自定义事件
     * @param eventType 事件类型
     * @param params 事件参数
     */
    protected triggerEvent(eventType: keyof ChartEventHandlers, params: ChartEventParams): void {
        const handler = this.#eventHandlers[eventType];
        if (handler) {
            handler(params);
        }
    }

    /**
     * 初始化后的回调函数
     * @param chart
     * @protected
     */
    protected postInitialize(chart: any): void {
        // 子类可以重写此方法进行额外的初始化
    }

    /**
     * 创建chart的option
     * @protected
     */
    protected createOption(): any {
        return {};
    }

    /**
     * 获取当前的chart
     * @protected
     */
    protected get chart(): any {
        return this.#chart;
    }

    /**
     * 获取当前的事件处理器
     * @protected
     */
    protected get eventHandlers(): ChartEventHandlers {
        return { ...this.#eventHandlers };
    }

    /**
     * 刷新当前的图表
     */
    invalidate(): void {
        if (this.#chart && this.#option) {
            this.#chart.setOption({ ...this.#option }, true);
        }
    }

    /**
     * 更改图表的大小
     */
    resize(): void {
        if (this.#chart) {
            this.#chart.resize();
        }
    }

    /**
     * 显示加载数据
     * @param type
     * @param opts
     */
    showLoading(type?: string, opts?: any): void {
        if (this.#chart) {
            this.#chart.showLoading(type, opts);
        }
    }

    /**
     * 隐藏加载数据
     */
    hideLoading(): void {
        if (this.#chart) {
            this.#chart.hideLoading();
        }
    }

    /**
     * 销毁图表实例
     */
    dispose(): void {
        if (this.#chart) {
            this.#chart.dispose();
            this.#chart = null;
        }
    }

    /**
     * 按照指定精度格式化数字
     * @param value
     * @param precision
     */
    protected formatNumber(value: number, precision: number = 0): string {
        if (isNaN(value)) {
            value = 0;
        } else if (typeof value == "string") {
            value = parseFloat(value);
        }
        return value.toLocaleString("en-US", {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        });
    }

    /**
     * 高亮指定的数据项
     * @param seriesIndex 系列索引
     * @param dataIndex 数据索引
     */
    highlight(seriesIndex?: number, dataIndex?: number): void {
        if (this.#chart) {
            this.#chart.dispatchAction({
                type: 'highlight',
                seriesIndex,
                dataIndex
            });
        }
    }

    /**
     * 取消高亮
     * @param seriesIndex 系列索引
     * @param dataIndex 数据索引
     */
    downplay(seriesIndex?: number, dataIndex?: number): void {
        if (this.#chart) {
            this.#chart.dispatchAction({
                type: 'downplay',
                seriesIndex,
                dataIndex
            });
        }
    }

    /**
     * 显示提示框
     * @param seriesIndex 系列索引
     * @param dataIndex 数据索引
     */
    showTip(seriesIndex: number, dataIndex: number): void {
        if (this.#chart) {
            this.#chart.dispatchAction({
                type: 'showTip',
                seriesIndex,
                dataIndex
            });
        }
    }

    /**
     * 隐藏提示框
     */
    hideTip(): void {
        if (this.#chart) {
            this.#chart.dispatchAction({
                type: 'hideTip'
            });
        }
    }
}