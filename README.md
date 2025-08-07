# @ticatec/uniface-echarts

[![Version](https://img.shields.io/npm/v/@ticatec/uniface-echarts)](https://www.npmjs.com/package/@ticatec/uniface-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

English| [中文](README_CN.md)

A lightweight and powerful Svelte wrapper for Apache ECharts with full TypeScript support. Create beautiful, interactive charts with ease.

## ✨ Features

- 🎯 **Easy Integration** - Simple Svelte component wrapper for ECharts
- 📊 **Full ECharts Support** - Access to all ECharts chart types and features
- 🔧 **TypeScript Ready** - Complete TypeScript definitions included
- 📱 **Responsive Design** - Automatic chart resizing with ResizeObserver
- 🎨 **Customizable** - Extend the base class to create custom chart components
- ⚡ **Performance Optimized** - Lazy loading and efficient rendering
- 🔄 **Reactive** - Seamlessly integrates with Svelte's reactivity system
- 🖱️ **Rich Event Support** - Click, double-click, right-click, and mouse events
- 📋 **Context Menu** - Built-in support for custom context menus
- 🎯 **Interactive** - Highlight, tooltip, and selection capabilities

## 📦 Installation

```bash
npm install @ticatec/uniface-echarts
```

## 🚀 Quick Start

1. **Create a custom chart class:**

```typescript
import UnifaceChart from '@ticatec/uniface-echarts';

export class LineChart extends UnifaceChart {
  protected createOption(): any {
    return {
      title: {
        text: 'Sample Line Chart'
      },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130]
      }]
    };
  }
}
```

2. **Use in your Svelte component:**

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

## 📖 API Reference

### UnifaceChart (Base Class)

#### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `init(el: HTMLElement)` | Initialize the chart | `el` - Container element |
| `invalidate()` | Refresh the chart with current options | - |
| `resize()` | Resize the chart to fit container | - |
| `showLoading(type?, opts?)` | Show loading animation | `type` - Loading type, `opts` - Options |
| `hideLoading()` | Hide loading animation | - |

#### Protected Methods (Override in subclasses)

| Method | Description | Return Type |
|--------|-------------|-------------|
| `createOption()` | Create ECharts option configuration | `any` |
| `postInitialize(chart)` | Called after chart initialization | `void` |
| `formatNumber(value, precision?)` | Format numbers with locale | `string` |

### ChartPanel Component

#### Event Support

| Event Type | Description | Handler |
|------------|-------------|---------|
| `onClick` | Single click on chart elements | `(params) => void` |
| `onDoubleClick` | Double click on chart elements | `(params) => void` |
| `onRightClick` | Right click on chart elements | `(params) => void` |
| `onMouseOver` | Mouse hover over elements | `(params) => void` |

#### Interactive Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `setEventHandlers(handlers)` | Set multiple event handlers | `handlers` - Event handler object |
| `addEventListener(type, handler)` | Add single event handler | `type` - Event type, `handler` - Function |
| `removeEventListener(type)` | Remove event handler | `type` - Event type |
| `highlight(seriesIndex?, dataIndex?)` | Highlight data point | Series and data indices |
| `downplay(seriesIndex?, dataIndex?)` | Remove highlight | Series and data indices |
| `showTip(seriesIndex, dataIndex)` | Show tooltip | Series and data indices |
| `hideTip()` | Hide tooltip | - |

## 🎨 Advanced Usage

### Custom Chart with Event Handling

```typescript
export class InteractiveChart extends UnifaceChart {
  protected createOption(): any {
    return {
      // ... your chart configuration
      series: [{
        data: [120, 200, 150, 80, 70, 110]
      }]
    };
  }
  
  protected postInitialize(chart: any): void {
    // Set up event handlers
    this.setEventHandlers({
      onClick: (params) => {
        console.log('Chart clicked:', params);
        this.highlight(params.seriesIndex, params.dataIndex);
      },
      onDoubleClick: (params) => {
        alert(`Double clicked: ${params.name} = ${params.value}`);
      },
      onRightClick: (params) => {
        console.log('Right clicked:', params);
        // Show custom context menu
      },
      onMouseOver: (params) => {
        this.showTip(params.seriesIndex, params.dataIndex);
      }
    });
  }
}
```

### Event Handler Methods

```typescript
// Set multiple event handlers
chart.setEventHandlers({
  onClick: (params) => { /* handle click */ },
  onDoubleClick: (params) => { /* handle double click */ },
  onRightClick: (params) => { /* handle right click */ }
});

// Add single event handler
chart.addEventListener('onClick', (params) => {
  console.log('Clicked:', params);
});

// Remove event handler
chart.removeEventListener('onClick');

// Interactive methods
chart.highlight(seriesIndex, dataIndex);  // Highlight data point
chart.downplay();                         // Remove highlight
chart.showTip(seriesIndex, dataIndex);    // Show tooltip
chart.hideTip();                          // Hide tooltip
```
```

### Responsive Chart

```svelte
<script>
  import ChartPanel from '@ticatec/uniface-echarts';
  import { MyChart } from './MyChart';
  
  const chart = new MyChart();
</script>

<!-- Chart automatically resizes with container -->
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

## 🔧 Requirements

- Node.js >= 18.0.0
- Svelte >= 5.0.0
- ECharts >= 6.0.0

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- GitHub Issues: [Report bugs or request features](https://github.com/ticatec/uniface-echarts/issues)
- Documentation: [Full documentation](https://github.com/ticatec/uniface-echarts#readme)

---

**Made with ❤️ by Henry Feng**