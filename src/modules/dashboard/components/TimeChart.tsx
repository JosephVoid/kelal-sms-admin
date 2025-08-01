"use client";

import { Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TimeChart({
  data,
}: {
  data: { day: Date; count: number }[];
}) {
  const series = [
    {
      name: "Sent Messages",
      data: data.map((item) => item.count),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: data.map((item) => item.day.toISOString()),
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
  };

  return (
    <div className="text-center">
      <Text fontWeight={"light"} fontSize={"small"}>
        Sent Messages
      </Text>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
