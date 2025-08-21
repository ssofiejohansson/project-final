import { CheckCircleIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Card, Typography } from "@material-tailwind/react";

export const Stats = ({ subscriptions = [] }) => {

  // Monthly cost & yearly cost
  const monthCost = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost || 0),
    0
  );
  const yearCost = monthCost * 12;

  const totalSubs = subscriptions.length;
  const activeSubs = subscriptions.filter((sub) => sub.status === "active").length;

  // Stats list for rendering
  const stats = [
    {
      title: "Total Subscriptions",
      value: totalSubs,
      icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Active Subscriptions",
      value: activeSubs,
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Total Monthly Cost",
      value: `${monthCost}`,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Total Yearly Cost",
      value: `${yearCost}`,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-pink-500" />,
    },
  ];

  return (
    <section className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6 shadow-lg rounded-2xl flex items-center gap-4">
          {stat.icon}
          <div className="text-center">
            <Typography variant="small" color="gray" className="font-normal">
              {stat.title}
            </Typography>
            <Typography variant="h5" color="blue-gray">
              {stat.value}
            </Typography>
          </div>
        </Card>
      ))}
    </section>
  );
};
