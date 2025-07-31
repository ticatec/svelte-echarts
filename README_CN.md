# @ticatec/svelte-echarts

[English](README.md) | [中文](README_CN.md)

一个轻量级且功能强大的 Apache ECharts Svelte 封装库，完全支持 TypeScript。轻松创建美观、交互式的图表。

## ✨ 特性

- 🎯 **简单集成** - 简单的 ECharts Svelte 组件封装
- 📊 **完整 ECharts 支持** - 支持所有 ECharts 图表类型和功能
- 🔧 **TypeScript 就绪** - 包含完整的 TypeScript 类型定义
- 📱 **响应式设计** - 使用 ResizeObserver 自动调整图表大小
- 🎨 **可定制** - 扩展基类创建自定义图表组件
- ⚡ **性能优化** - 延迟加载和高效渲染
- 🔄 **响应式** - 与 Svelte 响应式系统无缝集成

## 📦 安装

```bash
npm install @ticatec/svelte-echarts
```

## 🚀 快速开始

1. **创建自定义图表类：**

```typescript
import UnifaceChart from '@ticatec/svelte-echarts';

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
  import ChartPanel from '@ticatec/svelte-echarts';
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

#### 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `chart` | `UnifaceChart` | 要渲染的图表实例 |

## 🎨 高级用法

### 带数据绑定的自定义图表

```typescript
export class DynamicChart extends UnifaceChart {
  private data: any[] = [];
  
  setData(newData: any[]) {
    this.data = newData;
    this.invalidate(); // 刷新图表
  }
  
  protected createOption(): any {
    return {
      // ... 你的图表配置
      series: [{
        data: this.data
      }]
    };
  }
  
  protected postInitialize(chart: any): void {
    // 添加点击事件处理器
    chart.on('click', (params: any) => {
      console.log('图表被点击:', params);
    });
  }
}
```

### 响应式图表

```svelte
<script>
  import ChartPanel from '@ticatec/svelte-echarts';
  import { MyChart } from './MyChart';
  
  const chart = new MyChart();
</script>

<!-- 图表会自动随容器大小调整 -->
<div class="chart-container">
  <ChartPanel {chart} />
</div>

<style>
  .chart-container {
    width: 100%;
    height: 50vh;
    min-height: 300px;
  }
</style>
```

### 多图表示例

```svelte
<script>
  import ChartPanel from '@ticatec/svelte-echarts';
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

## 🛠️ 开发

```bash
# 克隆仓库
git clone https://github.com/ticatec/svelte-echarts.git
cd svelte-echarts

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 发布
npm run publish:public
```

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

- **问题反馈**：[GitHub Issues](https://github.com/ticatec/svelte-echarts/issues)
- **功能请求**：[GitHub Discussions](https://github.com/ticatec/svelte-echarts/discussions)
- **文档**：[完整文档](https://github.com/ticatec/svelte-echarts#readme)
- **示例**：[在线示例](https://svelte-echarts-demo.ticatec.com)

## 🙏 致谢

感谢 [Apache ECharts](https://echarts.apache.org/) 团队提供如此优秀的图表库。

---

**Made with ❤️ by Henry Feng**