"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomPieTooltip from "./CustomToolTip";
import { Text } from "@chakra-ui/react";

export default function TimeChart({
  data,
}: {
  data: { day: Date; count: number }[];
}) {
  const chart = useChart({
    data,
    series: [{ name: "count", color: "teal.solid" }],
  });
  return (
    <div className="text-center">
      <Text fontWeight={"light"} fontSize={"small"}>
        Sent Messages
      </Text>
      <Chart.Root chart={chart} my={6}>
        <LineChart data={chart.data}>
          <CartesianGrid stroke={chart.color("border")} vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={chart.key("day")}
            stroke={chart.color("border")}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })
            }
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke={chart.color("border")}
          />
          <Tooltip
            animationDuration={100}
            cursor={false}
            content={<CustomPieTooltip type="time" />}
          />
          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </div>
  );
}
