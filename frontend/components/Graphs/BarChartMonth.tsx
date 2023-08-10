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

const BarChartMonth = memo(() => {
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
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        className="mt-6"
        data={barGraphDataMonth}
        index="engineer"
        categories={["units"]}
        colors={["orange"]}
        yAxisWidth={40}
      />
    </ResponsiveContainer>
  );
});

export default BarChartMonth;
