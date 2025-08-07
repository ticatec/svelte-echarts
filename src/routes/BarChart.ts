// BarChart.ts
import UnifaceChart from '$lib/UnifaceChart';
import type ChartEventParams from "$lib/ChartEventParams";

export default class BarChart extends UnifaceChart {
    private selectedDataIndex: number = -1;

    protected createOption(): any {
        return {
            title: {
                text: '交互式折线图',
                subtext: '支持点击、双击、右键等交互'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['销售额', '利润']
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '销售额',
                    type: 'line',
                    data: [120, 200, 150, 80, 70, 110],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    }
                },
                {
                    name: '利润',
                    type: 'line',
                    data: [20, 60, 45, 30, 25, 40]
                }
            ]
        };
    }

    protected postInitialize(chart: any): void {
        // 设置事件处理器
        this.setEventHandlers({
            onClick: (params: ChartEventParams) => {
                console.log('图表被点击:', params);
                this.handleClick(params);
            },
            onDoubleClick: (params: ChartEventParams) => {
                console.log('图表被双击:', params);
                this.handleDoubleClick(params);
            },
            onRightClick: (params: ChartEventParams) => {
                console.log('图表被右键点击:', params);
                this.handleRightClick(params);
            },
            onMouseOver: (params: ChartEventParams) => {
                this.handleMouseOver(params);
            }
        });
    }

    private handleClick(params: ChartEventParams): void {
        if (params.dataIndex !== undefined) {
            // 高亮选中的数据点
            this.selectedDataIndex = params.dataIndex;
            this.highlight(params.seriesIndex, params.dataIndex);

            // 显示自定义提示
            console.log(`选中了 ${params.seriesName} 的第 ${params.dataIndex + 1} 个数据点，值为: ${params.value}`);
        }
    }

    private handleDoubleClick(params: ChartEventParams): void {
        if (params.dataIndex !== undefined) {
            // 双击时显示详细信息
            alert(`详细信息:\n系列: ${params.seriesName}\n数据: ${params.name}\n值: ${params.value}`);
        }
    }

    private handleRightClick(params: ChartEventParams): void {
        if (params.dataIndex !== undefined) {
            // 右键点击显示上下文菜单（这里只是示例）
            const contextMenu = [
                '查看详情',
                '编辑数据',
                '删除数据点',
                '导出数据'
            ];

            console.log('上下文菜单选项:', contextMenu);
            // 实际项目中可以在这里显示自定义上下文菜单
        }
    }

    private handleMouseOver(params: ChartEventParams): void {
        // 鼠标悬停时的效果
        if (params.dataIndex !== undefined) {
            this.showTip(params.seriesIndex!, params.dataIndex);
        }
    }


    // 公共方法：清除选择
    public clearSelection(): void {
        this.selectedDataIndex = -1;
        this.downplay();
        this.hideTip();
    }

    // 公共方法：获取选中的数据
    public getSelectedData(): any {
        if (this.selectedDataIndex >= 0) {
            const option = this.createOption();
            return {
                dataIndex: this.selectedDataIndex,
                data: option.series.map((series: any) => ({
                    name: series.name,
                    value: series.data[this.selectedDataIndex]
                }))
            };
        }
        return null;
    }
}
