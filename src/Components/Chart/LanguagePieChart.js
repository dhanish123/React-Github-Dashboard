import React, { useEffect } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import { useSelector } from "react-redux";

// Initialize FusionCharts
ReactFC.fcRoot(FusionCharts, Charts);

const LanguagePieChart = () => {
  const languageData = useSelector((state) => state.user.languageData);

  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: "350",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Languages Used in Repositories",
        theme: "fusion",
        // bgAlpha: "0", // Set the background alpha to 0 (completely transparent)
      },
      data: languageData,
    },
  };

  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default LanguagePieChart;
