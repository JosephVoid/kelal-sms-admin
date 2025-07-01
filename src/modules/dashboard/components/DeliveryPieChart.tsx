"use client";

import { useChart, Chart } from "@chakra-ui/charts";
import { PieChart, Tooltip, Pie, LabelList, Cell } from "recharts";
import { fetchMsgStatusAction } from "../lib/actions/fetchMsgStatus.action";
import { capitalizeFirst } from "../utils";
import CustomPieTooltip from "./CustomToolTip";

export default function DeliveryPieChart({
  data,
}: {
  data: Awaited<ReturnType<typeof fetchMsgStatusAction>>;
}) {
  const chart = useChart({
    data,
  });

  return (
    <Chart.Root mx="auto" chart={chart} my={6}>
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<CustomPieTooltip />}
        />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("count")}
          nameKey={chart.key("status")}
        >
          <LabelList
            position="inside"
            fill="white"
            stroke="none"
            content={(props) => <p>{capitalizeFirst(String(props.value))}</p>}
          />
          {chart.data.map((item, idx) => (
            <Cell key={item.status} fill={item.color} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  );
}
