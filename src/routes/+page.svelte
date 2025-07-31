<script lang="ts">

    import "./app.css";

    import i18n from "@ticatec/i18n";
    import ChartPanel from "$lib/ChartPanel.svelte";
    import {onMount} from "svelte";
    import BarChart from "./BarChart";

    i18n.language = 'cn';

    let barchart:any;

    onMount(async ()=> {
        const echarts = await import('echarts'); // ✅ only loads in browser
        barchart = new BarChart();
    });


</script>

<div style="display: grid; grid-template-columns: repeat(24, 1fr); align-content: start; grid-auto-rows: 50px;">
    <div style="grid-area: 1 / 1 / span 5 / span 7;">
        <ChartPanel chart={barchart}/>
    </div>
</div>










