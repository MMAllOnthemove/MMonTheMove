import { useEffect, useState, useCallback } from "react";
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

function BarChartAlltime() {
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

  return (
    <Card className="my-5">
      <div className="mt-10" style={{ width: "100%", height: "100%" }}>
        <Title>Number of units added all time</Title>
        <BarChart
          className="mt-6"
          data={barGraphDataAllTime}
          index="engineer"
          categories={["units"]}
          colors={["orange"]}
          yAxisWidth={40}
        />
      </div>
    </Card>
  );
}

export default BarChartAlltime;
