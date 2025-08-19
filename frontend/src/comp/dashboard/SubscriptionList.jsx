import { BookOpenIcon, CakeIcon, HeartIcon, PencilIcon, PlusIcon, QuestionMarkCircleIcon, TrashIcon, TvIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { DashboardNavbar } from "./DashboardNavbar";
import { SubscriptionModal } from "./SubscriptionModal";

export const SubscriptionList = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const fetchSubscriptions = useSubscriptionStore((state) => state.fetchSubscriptions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Filtering
  const filteredSubs = filterCategory
    ? subscriptions.filter((sub) => sub.category === filterCategory)
    : subscriptions;

  // Sorting
  const sortedSubs = [...filteredSubs].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === "name") return a.name.localeCompare(b.name);
    if (sortKey === "cost") return a.cost - b.cost;
    if (sortKey === "reminderDate")
      return new Date(a.reminderDate) - new Date(b.reminderDate);
    if (sortKey === "status") {
      if (a.status === b.status) return 0;
      return a.status === "active" ? -1 : 1;
    }
    return 0;
  });

  // Delete handler
  const handleDelete = async (id) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (!token) {
      alert("You must be logged in to delete a subscription.");
      return;
    }
    try {
      const response = await fetch(
        `https://project-final-xhjy.onrender.com/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete subscription");
      }
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      alert(error.message);
    }
  };

  const TABLE_HEAD = [
    { head: "Category", customeStyle: "!text-left" },
    { head: "Name", customeStyle: "!text-left" },
    { head: "Cost", customeStyle: "text-right" },
    { head: "Status", customeStyle: "text-right" },
    { head: "Free Trial", customeStyle: "text-right" },
    { head: "Reminder Date", customeStyle: "text-right" },
    { head: "Actions", customeStyle: "text-right" },
  ];

  const categoryIcons = {
    Entertainment: <TvIcon className="h-8 w-8 text-purple-500" />,
    Food: <CakeIcon className="h-8 w-8 text-red-500" />,
    Health: <HeartIcon className="h-8 w-8 text-green-500" />,
    Learning: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
    Other: <QuestionMarkCircleIcon className="h-8 w-8 text-gray-500" />,
  };


  return (
    <section className="max-w-6xl mx-auto px-4 py-10 w-full">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div>
            <Typography variant="h6" className="text-gray-600 font-normal mt-1">
              All subscriptions
            </Typography>

          </div>
          <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
            <DashboardNavbar
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortKey={sortKey}
              setSortKey={setSortKey}
            />
            <Button
              variant="outlined"
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedSubs.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center py-6 italic text-gray-500">
                    You have no subscriptions listed under {filterCategory || "this category"}.
                  </td>
                </tr>
              ) : (
                sortedSubs.map((sub, index) => {
                  const isLast = index === sortedSubs.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";

                  return (
                    <tr key={sub._id || index}>
                      {/* Category Icon */}
                      <td className={classes}>
                        <div className="flex items-center justify-center">
                          {categoryIcons[sub.category] || <QuestionMarkCircleIcon className="h-8 w-8 text-gray-500" />}
                        </div>
                      </td>
                      {/* Name */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="!font-semibold"
                        >
                          {sub.name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {sub.category || "No category"}
                        </Typography>
                      </td>
                      {/* Cost */}
                      <td className={`${classes} text-right`}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          ${sub.cost}
                        </Typography>
                      </td>
                      {/* Status */}
                      <td className={`${classes} text-right`}>
                        <Typography
                          variant="small"
                          className="!font-bold"
                        >
                          {sub.status}
                        </Typography>
                      </td>
                      {/* Free Trial */}
                      <td className={`${classes} text-right`}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {sub.freeTrial
                            ? `Yes (${sub.trialDays} days)`
                            : "No"}
                        </Typography>
                      </td>
                      {/* Reminder Date */}
                      <td className={`${classes} text-right`}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {new Date(sub.reminderDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      {/* Actions */}
                      <td className={`${classes} text-right`}>
                        <div className="flex justify-end gap-2">
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() => {
                              setSelectedSub(sub);
                              setIsModalOpen(true);
                            }}
                          >
                            <PencilIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() => handleDelete(sub._id)}
                          >
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal */}
      <SubscriptionModal
        open={isModalOpen}
        setOpen={(val) => {
          setIsModalOpen(val);
          if (!val) setSelectedSub(null);
        }}
        subscription={selectedSub}
      />
    </section>
  );
};
