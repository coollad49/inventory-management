"use client"

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "@/contexts/ProductContext";

const chartConfig = {
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-1))",
  },
};

export function Chart() {
  const [chartData, setChartData] = useState([]);
  const {products} = useContext(ProductContext)

  useEffect(() => {
    const fetchData = async () => {
      // Aggregate quantities by category
      const categoryData = products.reduce((acc, product) => {
        const { category, quantity } = product;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += quantity;
        return acc;
      }, {});

      // Format data for the chart
      const formattedData = Object.entries(categoryData).map(([category, quantity]) => ({
        category,
        quantity,
      }));

      setChartData(formattedData);
    };

    fetchData();
  }, [products]);

  return (
    <Card className="md:w-[40%]">
      <CardHeader>
        <CardTitle>Inventory Categories Overview</CardTitle>
        <CardDescription>Quantities of Products by Category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
