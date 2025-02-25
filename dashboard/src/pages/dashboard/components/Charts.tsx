import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@components/ui/chart";

const chartConfig = {
  brands: {
    label: "Brands",
    color: "hsl(var(--primary))",
  },
  products: {
    label: "Products",
    color: "hsl(var(--chart-2))",
  },
  categories: {
    label: "Categories",
    color: "hsl(var(--chart-3))",
  },
  platforms: {
    label: "Platforms",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

// Static data for the chart
const staticChartData = [
  { date: "2024-01-01", brands: 10, products: 20, categories: 15, platforms: 5 },
  { date: "2024-01-02", brands: 15, products: 25, categories: 18, platforms: 8 },
  { date: "2024-01-03", brands: 12, products: 22, categories: 16, platforms: 6 },
  { date: "2024-01-04", brands: 20, products: 30, categories: 25, platforms: 10 },
  { date: "2024-01-05", brands: 18, products: 28, categories: 22, platforms: 12 },
];

export const AdminStatsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Stats - Monthly Overview</CardTitle>
        <CardDescription>Track daily creation trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={staticChartData}
            width={800}
            height={400}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)} // Display day (MM-DD)
            />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Line type="monotone" dataKey="brands" stroke="var(--color-brands)" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="products" stroke="var(--color-products)" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="categories" stroke="var(--color-categories)" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="platforms" stroke="var(--color-platforms)" activeDot={{ r: 8 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trends for January 2024 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tracking daily growth for brands, products, categories, and platforms
        </div>
      </CardFooter>
    </Card>
  );
};
