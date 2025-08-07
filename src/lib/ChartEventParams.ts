export default interface ChartEventParams {
    // ECharts 事件参数
    type: string;
    seriesIndex?: number;
    seriesName?: string;
    name?: string;
    dataIndex?: number;
    data?: any;
    value?: any;
    color?: string;
    // 鼠标事件参数
    event?: {
        offsetX: number;
        offsetY: number;
        pageX: number;
        pageY: number;
        button: number;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        event?: Event;
    };
}