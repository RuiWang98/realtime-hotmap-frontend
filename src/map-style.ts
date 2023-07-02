import exp from "constants";
import type { CircleLayer, HeatmapLayer } from "react-map-gl";

const MAX_ZOOM_LEVEL = 15;

export const heatmapLayer: HeatmapLayer = {
  id: "heatmap",
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    "heatmap-weight": [
      "interpolate",
      ["exponential", 2],
      ["get", "density"],
      0,
      0,
      1,
      1,
    ],

    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11,
      1,
      MAX_ZOOM_LEVEL,
      3,
    ],

    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(236,222,239,0)",
      0.2,
      "rgb(208,209,230)",
      0.4,
      "rgb(166,189,219)",
      0.6,
      "rgb(103,169,207)",
      0.8,
      "rgb(28,144,153)",
    ],

    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11,
      120,
      MAX_ZOOM_LEVEL,
      200,
    ],

    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0.8, 15, 0],
  },
};

export const circleLayer: CircleLayer = {
  id: "circle",
  minzoom: MAX_ZOOM_LEVEL - 1,
  type: "circle",
  paint: {
    "circle-radius": {
      property: "density",
      type: "exponential",
      stops: [
        [{ zoom: 15, value: 0 }, 5],
        [{ zoom: 15, value: 1 }, 10],
        [{ zoom: 22, value: 0 }, 20],
        [{ zoom: 22, value: 1 }, 50],
      ],
    },
    "circle-color": {
      property: "density",
      type: "exponential",
      stops: [
        [0, "rgba(236,222,239,0)"],
        [10, "rgb(236,222,239)"],
        [20, "rgb(208,209,230)"],
        [30, "rgb(166,189,219)"],
        [40, "rgb(103,169,207)"],
        [50, "rgb(28,144,153)"],
        [60, "rgb(1,108,89)"],
      ],
    },
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    "circle-opacity": {
      stops: [
        [14, 0],
        [15, 1],
      ],
    },
  },
};
