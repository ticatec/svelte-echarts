<script lang="ts">

    import "./app.css";

    import i18n from "@ticatec/i18n";
    import ChartPanel from "$lib/ChartPanel.svelte";
    import {onMount} from "svelte";
    import BarChart from "./BarChart";
    import {ContextMenuBarChart} from "./ContextMenuBarChart";

    i18n.language = 'cn';

    let barchart:any;
    let contextChart: any;
    onMount(async ()=> {
        barchart = new BarChart();
        contextChart = new ContextMenuBarChart();
    });


</script>

<div style="display: grid; grid-template-columns: repeat(24, 1fr); align-content: start; grid-auto-rows: 50px;">
    <div style="grid-area: 1 / 1 / span 5 / span 7;">
        <ChartPanel chart={barchart}/>
    </div>
    <div style="grid-area: 1 / 7 / span 5 / span 13;">
        <ChartPanel chart={contextChart}/>
    </div>
</div>










