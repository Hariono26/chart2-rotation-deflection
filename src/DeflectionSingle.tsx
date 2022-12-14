import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const DeflectionSingle: React.FC = () => {
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [markPos, setMarkPos] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    const url = "http://localhost:2000/all";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        let xData = json.koordinat.map((a: { x: number }) => a.x);
        let yData = json.koordinat.map((a: { y: number }) => a.y);
        let markData = json.flag_position
        setDataX(xData);
        setDataY(yData);
        setMarkPos(markData);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const options = {
    title: {
      text: "DEFLECTION",
      left: "5%",
    },
    xAxis: {
      type: "category",
      name: "Stationing [m]",
      boundaryGap: false,
      data: dataX,
      position: "bottom",
      axisLine: {
        onZero: false,
      },
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontWeight: "bolder",
      },
      axisLabel: {
        interval: 1000,
        formatter: (value: string) => {
          return value.substr(0, 3).replace(".", "");
        },
      },
    },
    dataZoom: {
      type: "inside",
    },
    grid: {
      show: true,
      left: "5%",
      width: "50%",
    },
    yAxis: {
      type: "value",
      name: "Deflection [mm]",
      min: -120,
      max: 20,
      interval: 25,
      nameLocation: "middle",
      nameGap: 50,
      nameTextStyle: {
        fontWeight: "bolder",
      },
      splitLine: {
        show: false,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    series: [
      {
        data: dataY,
        type: "line",
        smooth: true,
        symbol: "none",
        markPoint: {
          //this code below for set the mark
          //   data: [{xAxis: '250', yAxis: -25 }],
          data: markPos.map((coord: { x: string; y: number }) => {
            return { xAxis: `${coord.x}`, yAxis: coord.y };
          }),
          symbol: "triangle",
          symbolSize: 25,
        },
      },
    ],
  };

  return <ReactECharts style={{ height: "45vh" }} option={options} />;
};

export default DeflectionSingle;
