import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for shipment history
const data = [
  {
    name: "Jan",
    domestic: 4,
    international: 2,
  },
  {
    name: "Feb",
    domestic: 5,
    international: 3,
  },
  {
    name: "Mar",
    domestic: 7,
    international: 4,
  },
  {
    name: "Apr",
    domestic: 6,
    international: 2,
  },
  {
    name: "May",
    domestic: 9,
    international: 5,
  },
  {
    name: "Jun",
    domestic: 10,
    international: 6,
  },
]

export function ShipmentHistory() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar
            dataKey="domestic"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          <Bar
            dataKey="international"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary/60"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 