
// 示例2: 带右键菜单的柱状图
import UnifaceChart from "$lib";
import type ChartEventParams from "$lib/ChartEventParams";

export class ContextMenuBarChart extends UnifaceChart {
    private contextMenuElement: HTMLElement | null = null;

    protected createOption(): any {
        return {
            title: {
                text: '右键菜单柱状图'
            },
            xAxis: {
                type: 'category',
                data: ['产品A', '产品B', '产品C', '产品D', '产品E']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [23, 45, 56, 78, 32],
                itemStyle: {
                    color: (params: any) => {
                        const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
                        return colors[params.dataIndex % colors.length];
                    }
                }
            }]
        };
    }

    protected postInitialize(chart: any): void {
        this.createContextMenu();

        this.setEventHandlers({
            onRightClick: (params: ChartEventParams) => {
                this.showContextMenu(params);
            },
            onClick: () => {
                this.hideContextMenu();
            }
        });

        // 点击图表外部时隐藏菜单
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    private createContextMenu(): void {
        this.contextMenuElement = document.createElement('div');
        this.contextMenuElement.className = 'chart-context-menu';
        this.contextMenuElement.style.cssText = `
            position: fixed;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            padding: 8px 0;
            min-width: 120px;
            display: none;
            z-index: 1000;
        `;

        const menuItems = [
            { label: '查看详情', action: 'detail' },
            { label: '编辑数据', action: 'edit' },
            { label: '复制数据', action: 'copy' },
            { label: '删除', action: 'delete' }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.textContent = item.label;
            menuItem.style.cssText = `
                padding: 8px 16px;
                cursor: pointer;
                transition: background-color 0.2s;
            `;
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.backgroundColor = '#f5f5f5';
            });
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.backgroundColor = 'transparent';
            });
            menuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleContextMenuAction(item.action);
                this.hideContextMenu();
            });
            this.contextMenuElement!.appendChild(menuItem);
        });

        document.body.appendChild(this.contextMenuElement);
    }

    private showContextMenu(params: ChartEventParams): void {
        if (this.contextMenuElement && params.event) {
            this.contextMenuElement.style.display = 'block';
            this.contextMenuElement.style.left = params.event.pageX + 'px';
            this.contextMenuElement.style.top = params.event.pageY + 'px';

            // 存储当前选中的数据
            (this.contextMenuElement as any)._selectedParams = params;
        }
    }

    private hideContextMenu(): void {
        if (this.contextMenuElement) {
            this.contextMenuElement.style.display = 'none';
        }
    }

    private handleContextMenuAction(action: string): void {
        const params = (this.contextMenuElement as any)?._selectedParams;
        if (!params) return;

        switch (action) {
            case 'detail':
                alert(`详细信息:\n产品: ${params.name}\n销量: ${params.value}`);
                break;
            case 'edit':
                const newValue = prompt(`编辑 ${params.name} 的销量:`, params.value);
                if (newValue !== null) {
                    this.updateData(params.dataIndex, parseInt(newValue));
                }
                break;
            case 'copy':
                navigator.clipboard.writeText(`${params.name}: ${params.value}`);
                console.log('数据已复制到剪贴板');
                break;
            case 'delete':
                if (confirm(`确定要删除 ${params.name} 的数据吗？`)) {
                    this.removeData(params.dataIndex);
                }
                break;
        }
    }

    private updateData(dataIndex: number, newValue: number): void {
        const option = this.createOption();
        option.series[0].data[dataIndex] = newValue;
        this.chart.setOption(option);
    }

    private removeData(dataIndex: number): void {
        const option = this.createOption();
        option.xAxis.data.splice(dataIndex, 1);
        option.series[0].data.splice(dataIndex, 1);
        this.chart.setOption(option);
    }

    public dispose(): void {
        if (this.contextMenuElement) {
            document.body.removeChild(this.contextMenuElement);
            this.contextMenuElement = null;
        }
        super.dispose();
    }
}