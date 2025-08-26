import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import merge from "deepmerge";
import React from "react";
import Chart from "react-apexcharts";

// AreaChart component
function AreaChart({ height = 350, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          title: { show: "" },
          dataLabels: { enabled: false },
          legend: { show: false },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: { curve: "smooth", width: 2 },
          grid: {
            show: true,
            borderColor: "#EEEEEE",
            strokeDashArray: 5,
            xaxis: { lines: { show: true } },
            padding: { top: 5, right: 20 },
          },
          tooltip: { theme: "light" },
          yaxis: {
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0,
              opacityTo: 0,
              stops: [0, 100],
            },
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, options]
  );

  return (
    <Chart type="area" height={height} series={series} options={chartOptions} />
  );
}

// Helper to group cumulative costs by year and month
function getCumulativeMonthlyTotals(subscriptions, year) {
  const months = Array(12).fill(0);
  subscriptions.forEach((sub) => {
    if (!sub.createdAt) return;
    const date = new Date(sub.createdAt);
    const cost = Number(sub.cost);
    if (date.getFullYear() === year && !isNaN(cost)) {
      months[date.getMonth()] += cost;
    }
  });
  // Convert to cumulative sum
  for (let i = 1; i < 12; i++) {
    months[i] += months[i - 1];
  }
  return months;
}

export const Linegraph = ({ subscriptions = [] }) => {
  const safeSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];

  // Get unique years from subscriptions
  const years = Array.from(
    new Set(
      safeSubscriptions
        .map((sub) => {
          if (!sub.createdAt) return null;
          const d = new Date(sub.createdAt);
          return isNaN(d) ? null : d.getFullYear();
        })
        .filter((year) => year !== null)
    )
  ).sort();

  // Prepare cumulative series data for each year
  const series = years.map((year) => ({
    name: `${year} Cumulative Cost`,
    data: getCumulativeMonthlyTotals(safeSubscriptions, year),
  }));

  // Calculate total cost for display
  const totalCost = safeSubscriptions.reduce((sum, sub) => {
    const cost = Number(sub.cost);
    return !isNaN(cost) ? sum + cost : sum;
  }, 0);

 safeSubscriptions.forEach((sub) => {
    console.log(
      "createddate:",
      sub.createdAt,
      "parsed:",
      new Date(sub.createdAt)
    );
  });

  return (
    <section id="graph" className="m-4">
      <Card>
        <CardBody className="!p-2">
          <div className="flex gap-2 flex-wrap justify-between px-2 !mt-4 ">
            <Typography variant="h3" >
              {isNaN(totalCost) ? "0.00" : totalCost.toFixed(2)} SEK
            </Typography>
            <div className="flex items-center gap-6">
              {years.map((year, idx) => (
                <div className="flex items-center gap-1" key={year}>
                  <span
                    className={`h-2 w-2 rounded-full`}
                    style={{
                      backgroundColor: ["#ff5c8d", "#2196F3", "#FF9800"][
                        idx % 3
                      ],
                    }}
                  ></span>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {year}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          {/* chart */}
          {series.length > 0 ? (
            <AreaChart
              colors={["#ff5c8d", "#2196F3", "#FF9800"]}
              options={{
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
              series={series}
            />
          ) : (
            <Typography>No data to display</Typography>
          )}
        </CardBody>
      </Card>
    </section>
  );
}
