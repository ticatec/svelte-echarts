// BarChart.ts
import UnifaceChart from '$lib/UnifaceChart';

export default class BarChart extends UnifaceChart {
    protected override createOption(): any {
        return {
            title: {
                text: '示例柱状图',
                left: 'center'
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: Array.from({ length: 11 }, (_, i) => i.toString())
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: Array.from({ length: 11 }, () => Math.floor(Math.random() * 100))
                }
            ]
        };
    }
}
