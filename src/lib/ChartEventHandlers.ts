import type ChartEventParams from "./ChartEventParams";

export default interface ChartEventHandlers {
    onClick?: (params: ChartEventParams) => void;
    onDoubleClick?: (params: ChartEventParams) => void;
    onRightClick?: (params: ChartEventParams) => void;
    onMouseOver?: (params: ChartEventParams) => void;
}
