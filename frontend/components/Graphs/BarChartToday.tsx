import { BarChart } from "@tremor/react";
import { useCallback, useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";

const BarChartToday = () => {
  const [barGraphDataToday, setBarGraphDataToday] = useState<
    string[] | number[] | any[]
  >([]);

  const todaysJobsDashboardGraph = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_GRAPH}/today`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "default",
      next: { revalidate: 2 },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("all-time graph", data)
        setBarGraphDataToday(data);
      });
  }, [barGraphDataToday]);

  useEffect(() => {
    todaysJobsDashboardGraph();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        className="mt-6"
        data={barGraphDataToday}
        index="engineer"
        categories={["units"]}
        colors={["orange"]}
        yAxisWidth={40}
      />
    </ResponsiveContainer>
  );
};

export default BarChartToday;
