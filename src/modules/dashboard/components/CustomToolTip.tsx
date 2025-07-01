import { TooltipContentProps, TooltipProps } from "recharts";
import { capitalizeFirst } from "../utils";

export default function CustomPieTooltip({ active, payload, type }: any) {
  if (active && payload && payload.length > 0) {
    const { name, value, payload: mainPayload } = payload[0]; // name is 'status'
    return (
      <div
        style={{
          background: "white",
          padding: "8px",
          borderRadius: "6px",
          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        }}
      >
        {type === "time" ? (
          <strong>
            Sent {value} on{" "}
            {new Date(mainPayload?.day).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })}
          </strong>
        ) : (
          <>
            <strong>{capitalizeFirst(name)}</strong>: {value}
          </>
        )}
      </div>
    );
  }

  return null;
}
