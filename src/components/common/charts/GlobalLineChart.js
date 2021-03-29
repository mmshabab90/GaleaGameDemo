import { Container } from "@material-ui/core";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function GlobalLineChart({
  data,
  xAxis,
  dataValue,
  color,
  tooltip,
  legend,
  graphFit,
}) {
  return (
    <Container>
      <LineChart
        width={720}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxis} />
        <YAxis domain={graphFit} />
        {tooltip ? <Tooltip /> : null}
        {legend ? <Legend /> : null}
        <Line
          type="monotone"
          dataKey={dataValue}
          stroke={color}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Container>
  );
}
