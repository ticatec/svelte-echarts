# uniface-echarts

[![Version](https://img.shields.io/npm/v/@ticatec/uniface-echarts)](https://www.npmjs.com/package/@ticatec/uniface-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | 中文

一个轻量级且功能强大的 Apache ECharts Svelte 封装库，完全支持 TypeScript。轻松创建美观、交互式的图表。

## ✨ 特性

- 🎯 **简单集成** - 简单的 ECharts Svelte 组件封装
- 📊 **完整 ECharts 支持** - 支持所有 ECharts 图表类型和功能
- 🔧 **TypeScript 就绪** - 包含完整的 TypeScript 类型定义
- 📱 **响应式设计** - 使用 ResizeObserver 自动调整图表大小
- 🎨 **可定制** - 扩展基类创建自定义图表组件
- ⚡ **性能优化** - 延迟加载和高效渲染
- 🔄 **响应式** - 与 Svelte 响应式系统无缝集成
- 🖱️ **丰富事件支持** - 支持点击、双击、右键和鼠标事件
- 📋 **上下文菜单** - 内置自定义上下文菜单支持
- 🎯 **交互式** - 高亮、工具提示和选择功能

## 📦 安装

```bash
npm install @ticatec/uniface-echarts
```

## 🚀 快速开始

1. **创建自定义图表类：**

```typescript
import UnifaceChart from '@ticatec/uniface-echarts';

export class LineChart extends UnifaceChart {
  protected createOption(): any {
    return {
      title: {
        text: '示例折线图'
      },
      tooltip: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {},
      series: [{
        name: '销售额',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130]
      }]
    };
  }
}
```

2. **在 Svelte 组件中使用：**

```svelte
<script>
  import ChartPanel from '@ticatec/uniface-echarts';
  import { LineChart } from './LineChart';
  
  const chart = new LineChart();
</script>

<div style="width: 600px; height: 400px;">
  <ChartPanel {chart} />
</div>
```

## 📖 API 参考

### UnifaceChart（基类）

#### 方法

| 方法 | 描述 | 参数 |
|------|------|------|
| `init(el: HTMLElement)` | 初始化图表 | `el` - 容器元素 |
| `invalidate()` | 使用当前选项刷新图表 | - |
| `resize()` | 调整图表大小以适应容器 | - |
| `showLoading(type?, opts?)` | 显示加载动画 | `type` - 加载类型，`opts` - 选项 |
| `hideLoading()` | 隐藏加载动画 | - |

#### 受保护方法（在子类中重写）

| 方法 | 描述 | 返回类型 |
|------|------|----------|
| `createOption()` | 创建 ECharts 选项配置 | `any` |
| `postInitialize(chart)` | 图表初始化后调用 | `void` |
| `formatNumber(value, precision?)` | 使用本地化格式化数字 | `string` |

### ChartPanel 组件

#### 事件支持

| 事件类型 | 描述 | 处理器 |
|----------|------|--------|
| `onClick` | 单击图表元素 | `(params) => void` |
| `onDoubleClick` | 双击图表元素 | `(params) => void` |
| `onRightClick` | 右键点击图表元素 | `(params) => void` |
| `onMouseOver` | 鼠标悬停在元素上 | `(params) => void` |

#### 交互方法

| 方法 | 描述 | 参数 |
|------|------|------|
| `setEventHandlers(handlers)` | 设置多个事件处理器 | `handlers` - 事件处理器对象 |
| `addEventListener(type, handler)` | 添加单个事件处理器 | `type` - 事件类型, `handler` - 处理函数 |
| `removeEventListener(type)` | 移除事件处理器 | `type` - 事件类型 |
| `highlight(seriesIndex?, dataIndex?)` | 高亮数据点 | 系列和数据索引 |
| `downplay(seriesIndex?, dataIndex?)` | 取消高亮 | 系列和数据索引 |
| `showTip(seriesIndex, dataIndex)` | 显示工具提示 | 系列和数据索引 |
| `hideTip()` | 隐藏工具提示 | - |

## 🎨 高级用法

### 带事件处理的自定义图表

```typescript
export class InteractiveChart extends UnifaceChart {
  protected createOption(): any {
    return {
      // ... 你的图表配置
      series: [{
        data: [120, 200, 150, 80, 70, 110]
      }]
    };
  }
  
  protected postInitialize(chart: any): void {
    // 设置事件处理器
    this.setEventHandlers({
      onClick: (params) => {
        console.log('图表被点击:', params);
        this.highlight(params.seriesIndex, params.dataIndex);
      },
      onDoubleClick: (params) => {
        alert(`双击了: ${params.name} = ${params.value}`);
      },
      onRightClick: (params) => {
        console.log('右键点击:', params);
        // 显示自定义上下文菜单
      },
      onMouseOver: (params) => {
        this.showTip(params.seriesIndex, params.dataIndex);
      }
    });
  }
}
```

### 事件处理方法

```typescript
// 设置多个事件处理器
chart.setEventHandlers({
  onClick: (params) => { /* 处理点击 */ },
  onDoubleClick: (params) => { /* 处理双击 */ },
  onRightClick: (params) => { /* 处理右键点击 */ }
});

// 添加单个事件处理器
chart.addEventListener('onClick', (params) => {
  console.log('点击了:', params);
});

// 移除事件处理器
chart.removeEventListener('onClick');

// 交互方法
chart.highlight(seriesIndex, dataIndex);  // 高亮数据点
chart.downplay();                         // 取消高亮
chart.showTip(seriesIndex, dataIndex);    // 显示工具提示
chart.hideTip();                          // 隐藏工具提示
```
```

### 交互式图表示例

```typescript
export class ClickableBarChart extends UnifaceChart {
  private selectedIndex = -1;

  protected createOption(): any {
    return {
      title: { text: '可点击的柱状图' },
      xAxis: {
        type: 'category',
        data: ['产品A', '产品B', '产品C', '产品D']
      },
      yAxis: { type: 'value' },
      series: [{
        name: '销量',
        type: 'bar',
        data: [23, 45, 56, 78],
        emphasis: {
          itemStyle: { color: '#ff6b6b' }
        }
      }]
    };
  }

  protected postInitialize(chart: any): void {
    this.setEventHandlers({
      onClick: (params) => {
        this.selectedIndex = params.dataIndex;
        this.highlight(params.seriesIndex, params.dataIndex);
        console.log(`选中了 ${params.name}: ${params.value}`);
      },
      onDoubleClick: (params) => {
        // 双击编辑数据
        const newValue = prompt(`编辑 ${params.name} 的值:`, params.value);
        if (newValue) {
          this.updateData(params.dataIndex, parseInt(newValue));
        }
      },
      onRightClick: (params) => {
        // 右键菜单
        this.showContextMenu(params);
      }
    });
  }

  private updateData(index: number, value: number): void {
    const option = this.createOption();
    option.series[0].data[index] = value;
    this.chart.setOption(option);
  }

  private showContextMenu(params: any): void {
    const menu = confirm(`对 ${params.name} 执行操作?\n确定: 删除数据\n取消: 复制到剪贴板`);
    if (menu) {
      // 删除数据
      this.removeData(params.dataIndex);
    } else {
      // 复制数据
      navigator.clipboard.writeText(`${params.name}: ${params.value}`);
    }
  }
}
```

### 实时更新图表

```typescript
export class LiveChart extends UnifaceChart {
  private timer: NodeJS.Timeout | null = null;
  private data: number[] = [0, 0, 0, 0, 0];

  protected createOption(): any {
    return {
      title: { text: '实时数据图表' },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        name: '实时数据',
        type: 'line',
        data: this.data,
        smooth: true,
        animation: true
      }]
    };
  }

  protected postInitialize(chart: any): void {
    // 开始实时更新
    this.startUpdate();

    this.setEventHandlers({
      onClick: (params) => {
        // 点击暂停/恢复更新
        if (this.timer) {
          this.stopUpdate();
          console.log('暂停更新');
        } else {
          this.startUpdate();
          console.log('恢复更新');
        }
      }
    });
  }

  private startUpdate(): void {
    this.timer = setInterval(() => {
      // 更新数据
      this.data = this.data.map(() => Math.floor(Math.random() * 100));
      this.invalidate();
    }, 1000);
  }

  private stopUpdate(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public dispose(): void {
    this.stopUpdate();
    super.dispose();
  }
}

### 多图表示例

```svelte
<script>
  import ChartPanel from '@ticatec/uniface-echarts';
  import { LineChart, BarChart, PieChart } from './charts';
  
  const lineChart = new LineChart();
  const barChart = new BarChart();
  const pieChart = new PieChart();
</script>

<div class="dashboard">
  <div class="chart-row">
    <div class="chart-item">
      <h3>销售趋势</h3>
      <ChartPanel chart={lineChart} />
    </div>
    <div class="chart-item">
      <h3>月度对比</h3>
      <ChartPanel chart={barChart} />
    </div>
  </div>
  <div class="chart-row">
    <div class="chart-item full-width">
      <h3>市场份额</h3>
      <ChartPanel chart={pieChart} />
    </div>
  </div>
</div>
```

### 主题自定义

```typescript
export class ThemedChart extends UnifaceChart {
  constructor(private theme: 'light' | 'dark' = 'light') {
    super();
  }
  
  protected createOption(): any {
    const isDark = this.theme === 'dark';
    
    return {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      textStyle: {
        color: isDark ? '#ffffff' : '#333333'
      },
      // ... 其他配置
    };
  }
}
```

## 🎯 最佳实践

### 性能优化

- 对于大数据集，使用 ECharts 的数据抽样功能
- 合理设置动画参数以平衡用户体验和性能
- 在不需要时禁用动画以提高性能

```typescript
export class PerformantChart extends UnifaceChart {
  protected createOption(): any {
    return {
      animation: false, // 禁用动画提高性能
      dataZoom: [{
        type: 'inside', // 内置数据缩放
        start: 0,
        end: 100
      }],
      // ... 其他配置
    };
  }
}
```

### 错误处理

```typescript
export class RobustChart extends UnifaceChart {
  private handleError(error: Error) {
    console.error('Chart error:', error);
    // 可以在这里添加错误上报逻辑
  }
  
  protected postInitialize(chart: any): void {
    chart.on('error', this.handleError);
  }
}
```

## 🔧 系统要求

- Node.js >= 18.0.0
- Svelte >= 5.0.0
- ECharts >= 6.0.0

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

我们欢迎各种形式的贡献！

1. Fork 这个仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📞 技术支持

- **问题反馈**：[GitHub Issues](https://github.com/ticatec/uniface-echarts/issues)
- **功能请求**：[GitHub Discussions](https://github.com/ticatec/uniface-echarts/discussions)
- **文档**：[完整文档](https://github.com/ticatec/uniface-echarts#readme)
- **示例**：[在线示例](https://uniface-echarts-demo.ticatec.com)

## 🙏 致谢

感谢 [Apache ECharts](https://echarts.apache.org/) 团队提供如此优秀的图表库。

---

**Made with ❤️ by Henry Feng**