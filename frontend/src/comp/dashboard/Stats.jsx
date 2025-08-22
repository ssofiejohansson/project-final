import { CheckCircleIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Card, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

export const Stats = ({ subscriptions = [] }) => {
  const monthCost = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost || 0),
    0
  );
  const yearCost = monthCost * 12;

  const totalSubs = subscriptions.length;
  const activeSubs = subscriptions.filter((sub) => sub.status === "active").length;

  const categoryCounts = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryColors = {
    Entertainment: "#9333ea",
    Food: "#ef4444",
    Health: "#22c55e",
    Learning: "#3b82f6",
    Other: "#6b7280",
  };

  const donutSeries = Object.values(categoryCounts);
  const donutLabels = Object.keys(categoryCounts);
  const donutColors = donutLabels.map((label) => categoryColors[label] || "#6b7280");

  const stats = [
    // {
    //   title: "Total Subscriptions",
    //   value: totalSubs,
    //   icon: <UserGroupIcon className="h-8 w-8 text-blue-500" />,
    // },
    {
      title: "Active Subscriptions",
      value: activeSubs,
      icon: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Total Monthly Cost",
      value: `${monthCost} SEK`,
      icon: <CurrencyDollarIcon className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Total Yearly Cost",
      value: `${yearCost} SEK`,
      icon: <CurrencyDollarIcon className="h-8 w-8 text-pink-500" />,
    },
  ];

  return (
    <section className="m-4 my-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="w-full p-4 shadow-lg rounded-2xl flex flex-col items-center justify-center text-center gap-2"
        >
          {stat.icon}
          <div className="text-center break-words">
            <Typography variant="small" color="gray" className="font-normal">
              {stat.title}
            </Typography>
            <Typography color="blue-gray" className="text-2xl sm:text-3xl font-extrabold">
              {stat.value}
            </Typography>
          </div>
        </Card>
      ))}

      <Card className="w-full p-4 shadow-lg rounded-2xl flex flex-col items-center justify-center text-center gap-2">
        <Typography variant="small" color="gray" className="font-normal mb-2">
          Subscriptions by Category
        </Typography>
        {donutSeries.length > 0 ? (
          <div className="w-full flex items-center justify-center">
            <Chart
              type="donut"
              width="100%"
              height="200"
              series={donutSeries}
              options={{
                labels: donutLabels,
                colors: donutColors,
                legend: { show: false },
                dataLabels: { enabled: false },
                chart: { width: "100%", height: "100%", toolbar: { show: false } },
                responsive: [
                  {
                    breakpoint: 640,
                    options: {
                      chart: { width: "100%", height: 180 },
                    },
                  },
                ],
              }}
            />
          </div>
        ) : (
          <Typography variant="small" color="gray">
            No data
          </Typography>
        )}
      </Card>
    </section>
  );
};
