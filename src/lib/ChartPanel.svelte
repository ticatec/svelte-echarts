<script lang="ts">

    import {onDestroy, onMount} from "svelte";

    import UnifaceChart from "./UnifaceChart";

    export let chart: UnifaceChart = null as unknown as UnifaceChart;

    let chartDiv: HTMLElement;
    let hasInit = false;


    let resizeObserver: ResizeObserver;
    const initChart = async () => {
        if (chart && chartDiv && !hasInit) {
            await chart.init(chartDiv);
            hasInit = true;
        }
    };

    onMount(() => {
        initChart();
        resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const rect = entry.contentRect;
                if (chart) {
                    chart.resize(); // ✅ 在尺寸变化时调用 chart.resize()
                }
            }
        })
        if (chartDiv) {
            resizeObserver.observe(chartDiv);
        }
    });

    onDestroy(() => {
        resizeObserver?.disconnect();
    });

    $: if (chart != null && chartDiv != null) {
        initChart();
    }

</script>
<div style="height: 100%; width: 100%" bind:this={chartDiv}></div>
