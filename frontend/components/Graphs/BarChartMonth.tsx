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

function BarChartMonth() {
  const [barGraphDataMonth, setBarGraphDataMonth] = useState<
    string[] | number[] | any[]
  >([]);

  const monthlyJobsDashboardGraph = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_GRAPH}/month`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "default",
      next: { revalidate: 2 },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("all-time graph", data)
        setBarGraphDataMonth(data);
      });
  }, [barGraphDataMonth]);

  useEffect(() => {
    monthlyJobsDashboardGraph();
  }, []);

  return (
    <Card className="my-5">
      <div className="mt-10" style={{ width: "100%", height: "100%" }}>
        <Title>Number of units added for month</Title>
        <BarChart
          className="mt-6"
          data={barGraphDataMonth}
          index="engineer"
          categories={["units"]}
          colors={["orange"]}
          yAxisWidth={40}
        />
      </div>
    </Card>
  );
}

export default BarChartMonth;
