"use client";

import { useChart, Chart } from "@chakra-ui/charts";
import { PieChart, Tooltip, Pie, LabelList, Cell } from "recharts";

export default function DeliveryPieChart() {
  const chart = useChart({
    data: [
      { name: "Delivered", value: 400, color: "green.solid" },
      { name: "Failed", value: 300, color: "red.solid" },
    ],
  });

  return (
    <Chart.Root mx="auto" chart={chart} my={6}>
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
        >
          <LabelList position="inside" fill="white" stroke="none" />
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  );
}
