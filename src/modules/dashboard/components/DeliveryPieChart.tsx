"use client";

import { fetchMsgStatusAction } from "../lib/actions/fetchMsgStatus.action";
import { Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DeliveryPieChart({
  data,
}: {
  data: Awaited<ReturnType<typeof fetchMsgStatusAction>>;
}) {
  const series = data.map((item) => item.count);
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: data.map((item) => item.status),
    colors: data.map((item) => item.color),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="text-center">
      <Text fontWeight={"light"} fontSize={"small"}>
        Delivery Status
      </Text>
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
}
