import { useEffect, useState, useCallback, memo } from "react";
import {
  BadgeDelta,
  BarChart,
  Card,
  Metric,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from "@tremor/react";
import { ResponsiveContainer } from "recharts";

const BarChartAlltime = memo(() => {
  const [barGraphDataAllTime, setBarGraphDataAllTime] = useState<
    string[] | number[] | any[]
  >([]);

  const alltimeJobsDashboardGraph = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_GRAPH}/all-time`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "default",
      next: { revalidate: 2 },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("all-time graph", data)
        setBarGraphDataAllTime(data);
      });
  }, [barGraphDataAllTime]);

  useEffect(() => {
    alltimeJobsDashboardGraph();
  }, []);

  // The width(0) and height(0) of chart should be greater than 0,
  // please check the style of container, or the props width(100%) and height(100%),
  //  or add a minWidth(0) or minHeight(undefined) or use aspect(undefined) to control the       height and width.
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        className="mt-6"
        data={barGraphDataAllTime}
        index="engineer"
        categories={["units"]}
        colors={["orange"]}
        yAxisWidth={40}
      />
    </ResponsiveContainer>
  );
});

export default BarChartAlltime;
