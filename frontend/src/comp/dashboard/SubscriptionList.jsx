import { BellAlertIcon, BookOpenIcon, CakeIcon, HeartIcon, PencilIcon, QuestionMarkCircleIcon, TrashIcon, TvIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Popup } from "../../comp/layout/Popup"
import useSubscriptionStore from "../../stores/useSubscriptionStore";
import useUserStore from "../../stores/useUserStore";
import { BaseURL } from "../BaseURL";
import { getLogoPath } from "../utils/getLogoPath";
import { DashboardNavbar } from "./DashboardNavbar";
import { SubscriptionModal } from "./SubscriptionModal";
import { SubscriptionSave } from "./SubscriptionSave";

export const SubscriptionList = () => {
  const user = useUserStore((state) => state.user);
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  const fetchSubscriptions = useSubscriptionStore(
    (state) => state.fetchSubscriptions
  );
  const { isSaveOpen } = useSubscriptionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [emailPrefs, setEmailPrefs] = useState({});

  const openSaveDialog = useSubscriptionStore((s) => s.openSaveDialog);
  const openModalDialog = useSubscriptionStore((s) => s.openModalDialog);

  const urlAPI = `${BaseURL}/subscriptions`;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  //Check if reminder date is in the next 3 days, inc today
  const upcommingDates = () => {
    const today = new Date();
    let datesCollection = []

    for (let i = 0; i < 3; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      // format YYYY-MM-DD
      const formatted = nextDate.toISOString().split("T")[0];

      datesCollection.push(formatted);
    }
    return datesCollection;
  }

  const upcomingDates = upcommingDates();

  const dueSoon = subscriptions.filter(sub =>
    upcomingDates.includes(
      new Date(sub.reminderDate).toISOString().split("T")[0]
    )
  );

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
    try {
      await fetch(`${urlAPI}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${user?.token}`,
          "Content-Type": "application/json",
        },
      });

      await fetchSubscriptions(user.token); // Refresh the list after deletion
    } catch (err) {
      console.error("Failed to delete subscription:", err);
    }
  };

  // Add this function inside SubscriptionList
  const handleSubscriptionAdded = async (subscription) => {
    // Remove or comment out the email sending code here
    // await fetch("https://project-final-xhjy.onrender.com/emails/send", { ... });
  };

  const TABLE_HEAD = [
    { head: "Name", customeStyle: "!text-left" },
    { head: "Category", customeStyle: "!text-left" },
    { head: "Cost", customeStyle: "text-right" },
    { head: "Status", customeStyle: "text-right" },
    { head: "Free Trial", customeStyle: "text-right" },
    { head: "Reminder Date", customeStyle: "text-right" },
    { head: "Email", customeStyle: "text-right" },
    { head: "Actions", customeStyle: "text-right" },
  ];

  const categoryIcons = {
    Entertainment: <TvIcon className="h-8 w-8 text-purple-500" />,
    Food: <CakeIcon className="h-8 w-8 text-red-500" />,
    Health: <HeartIcon className="h-8 w-8 text-main" />,
    Learning: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
    Other: <QuestionMarkCircleIcon className="h-8 w-8 text-light" />,
  };

  return (
    <section className="bg-gray-50 max-w-8xl mx-auto px-4 py-20 w-full">
      <div className="container mx-auto px-2 text-center">
        <Card className="h-full w-full p-2">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
          >
            <div className="flex flex-col gap-1">
              <Typography variant="h2" className="text-text text-base font-normal text-left mt-1">
                All subscriptions
              </Typography>
              <div className="flex items-center gap-2 mt-1">
                {dueSoon.length > 0 ? (
                  <>
                    <BellAlertIcon className="h-5 w-5 text-red-600 font-bold" />
                    <Typography variant="small" className="text-text">
                      You have <span className="text-red-600 font-semibold">{dueSoon.length} reminder(s)</span>{" "}
                      due in the next 3 days.
                    </Typography>
                  </>
                ) : (
                  <>
                    <BellAlertIcon className="h-5 w-5 text-text font-bold" />
                    <Typography variant="small" className="text-text">
                      No reminders due in the next 3 days.
                    </Typography>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
              <DashboardNavbar
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortKey={sortKey}
                setSortKey={setSortKey}
                onAdd={() => openModalDialog(null)}
              />
            </div>
          </CardHeader>

          <CardBody className="!px-0 py-2">
            <div className="overflow-x-auto">
              {/* removed min-w-max from table below to remove horizontal scroll */}
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    {TABLE_HEAD.map(({ head, customeStyle }) => (
                      <th
                        key={head}
                        className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                      >
                        <Typography

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
                      <td
                        colSpan={TABLE_HEAD.length}
                        className="text-center py-6 italic text-light"
                      >
                        {subscriptions.length === 0
                          ? "You have not added any subscriptions, please click add."
                          : `You have no subscriptions listed under ${filterCategory || "this category"
                          }.`}
                      </td>
                    </tr>
                  ) : (
                    sortedSubs.map((sub, index) => {
                      const isLast = index === sortedSubs.length - 1;
                      const classes = isLast
                        ? "!p-4"
                        : "!p-4 border-b border-gray-300";

                      // Check if reminder date is in the next 3 days
                      const isUpcoming = upcommingDates().includes(
                        new Date(sub.reminderDate).toISOString().split("T")[0]
                      );

                      return (
                        <tr key={sub._id || index}
                        >
                          {/* Name */}
                          <td className={classes}>
                            <div className="flex items-center gap-2">
                              <img
                                src={getLogoPath(sub.name)}
                                alt={sub.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null; // Prevent infinite loop
                                  e.target.src = "/logos/placeholder.webp";
                                  e.target.alt = "Bee Icon"
                                }}
                              />
                              <div>
                                <Typography
                                  variant="small"

                                  className="!font-semibold"
                                >
                                  {sub.name}
                                </Typography>

                              </div>
                            </div>
                          </td>
                          {/* Category Icon */}
                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              {categoryIcons[sub.category] || (
                                <QuestionMarkCircleIcon className="h-8 w-8 text-light" />
                              )}
                            </div>
                          </td>
                          {/* Cost */}
                          <td className={`${classes} text-right`}>

                            <div className="flex items-center justify-end gap-1">{isUpcoming && (
                              <BellAlertIcon className="h-5 w-5 text-red-600 font-bold" />
                            )}
                              <Typography
                                variant="small"
                                className="!font-normal text-light"
                              >
                                {sub.cost} kr
                              </Typography>

                            </div>

                          </td>
                          {/* Status */}
                          <td className={`${classes} text-right`}>
                            <Typography
                              variant="small"
                              className={
                                sub.status === "active"
                                  ? "!font-bold"
                                  : "!font-normal"
                              }
                            >
                              {sub.status}
                            </Typography>
                          </td>
                          {/* Free Trial */}
                          <td className={`${classes} text-right`}>
                            <Typography
                              variant="small"
                              className="!font-normal text-light"
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
                              className="!font-normal text-light"
                            >
                              {new Date(sub.reminderDate).toLocaleDateString()}
                            </Typography>
                          </td>
                          <td className={`${classes} text-right`}>
                            <input
                              type="checkbox"
                              checked={sub.sendEmail ?? true}
                              onChange={async () => {
                                // Optimistically update UI (optional)
                                // await API call to update backend
                                await fetch(`${urlAPI}/${sub._id}`, {
                                  method: "PATCH",
                                  headers: { "Content-Type": "application/json", "Authorization": user?.token || "", },
                                  body: JSON.stringify({
                                    sendEmail: !sub.sendEmail,
                                  }),
                                });
                                // Refetch or update local state as needed
                                fetchSubscriptions();
                              }}
                              className="mr-2"
                            />
                          </td>
                          {/* Actions */}
                          <td className={`${classes} text-right`}>
                            <div className="flex justify-end gap-2">
                              <IconButton
                                variant="text"
                                size="sm"
                                onClick={() => openModalDialog(sub)}
                              >
                                <PencilIcon className="h-5 w-5 text-gray-900" />
                              </IconButton>
                              <IconButton
                                variant="text"
                                size="sm"
                                onClick={() => {
                                  handleDelete(sub._id);
                                  openSaveDialog(sub);
                                }}
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
            </div>
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
          onSubscriptionAdded={handleSubscriptionAdded}
        />

        {/* save money - contribute */}
        {isSaveOpen && (
          <Popup>
            <SubscriptionSave />
          </Popup>
        )}
      </div>
    </section>
  );
};
