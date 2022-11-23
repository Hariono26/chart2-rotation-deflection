import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const ChartZ: React.FC = () => {
  //   const [data, setData] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [flag, setFlag] = useState([70, 190]);
  const [markPos, setMarkPos] = useState([]);
  //   console.log(markPos);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    const url = "http://localhost:2500/all";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // let temp = json.slice(0, 10);
        let xData = json.koordinat.map((a: { x: number }) => a.x);
        let yData = json.koordinat.map((a: { y: number }) => a.y);
        let flagData = json.flag;
        // let markData = json.mark_position.map((coord: {x: number, y:number}) => {
        //     return [coord.x, coord.y]
        // })
        let markData = json.mark_position;
        setDataX(xData);
        setDataY(yData);
        setFlag(flagData);
        setMarkPos(markData);
        // setData(json.koordinat)
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const options = {
    title: {
      text: "ROTATION",
      left: "center",
      top: "10%",
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
        interval: 5000,
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
      // height: '90%',
      // containLabel: true,
      // bottom: '10%',
      // top: '10%'
    },
    yAxis: {
      type: "value",
      name: "Rotation [rad]",
      max: 0.010,
      min: -0.010,
    //   interval: 10,
      nameLocation: "middle",
      nameGap: 50,
      nameTextStyle: {
        fontWeight: "bolder",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data: dataY,
        type: "line",
        smooth: true,
        markLine: {
          symbol: ["none", "none"],
          label: { show: false },
          //   this code below for set the flag
          //   data: [{ xAxis: `${flag[0]}` }, { xAxis: `${flag[1]}` }],
          data: flag.map((coord) => {
            return {
              xAxis: `${coord}`,
            };
          }),
          lineStyle: {
            type: "solid",
            color: "rgb(255, 0, 0)",
          },
        },
        markPoint: {
          //this code below for set the mark
          //   data: [{xAxis: '250', yAxis: -25 }],
          data: markPos.map((coord: { x: string; y: number }) => {
            return { xAxis: `${coord.x}`, yAxis: coord.y };
          }),
          symbol: "circle",
          symbolSize: 15,
        },
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default ChartZ;