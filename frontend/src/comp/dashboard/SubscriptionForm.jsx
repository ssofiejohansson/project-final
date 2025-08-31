import { Checkbox, Option, Select, Typography } from "@material-tailwind/react";
import { useState } from "react";

import { useSubscriptionStore } from "../../stores/useSubscriptionStore";
import { useUserStore } from "../../stores/useUserStore";
import { BaseURL } from "../utils/BaseURL";
import { Btn } from "../layout/Btn";
import { Input } from "../user/Input";

export const SubscriptionForm = ({
  onClose,
  compact = false,
  initialData,
  sendEmail,
  setSendEmail,
}) => {
  const urlAPI = `${BaseURL}`;

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        reminderDate: initialData.reminderDate
          ? new Date(initialData.reminderDate).toISOString().split("T")[0] // YYYY-MM-DD
          : "",
      };
    }

    // Adding a new subscription
    return {
      name: "",
      cost: "",
      freeTrial: false,
      trialDays: "",
      reminderDate: "",
      status: "active",
      category: "Other",
    };
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const addSubscription = useSubscriptionStore(
    (state) => state.addSubscription
  );
  const updateSubscription = useSubscriptionStore(
    (state) => state.updateSubscription
  );
  const user = useUserStore((state) => state.user);
  const openSaveDialog = useSubscriptionStore((s) => s.openSaveDialog);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.token) {
      setError("You must be logged in to add a subscription!");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please fill in subscription name!");
      return;
    }

    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      setError("Please enter a valid cost!");
      return;
    }

    if (!formData.reminderDate) {
      setError("Please select a reminder date!");
      return;
    }

    if (formData.status === "inactive") {
      openSaveDialog(formData);
    }

    const payload = {
      ...formData,
      reminderDate: new Date(formData.reminderDate).toISOString(),
      cost: parseFloat(formData.cost),
      trialDays: formData.freeTrial ? parseInt(formData.trialDays) || 0 : 0,
      sendEmail, // Include sendEmail in the payload
    };

    try {
      let response;
      if (initialData) {
        // EDIT
        response = await fetch(`${urlAPI}/subscriptions/${initialData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token || "",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // ADD
        response = await fetch(`${urlAPI}/subscriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token || "",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (response.ok) {
        if (initialData) {
          updateSubscription(data.response || payload);
        } else {
          addSubscription(data?.response || payload);
        }
        setSuccess(true);
        if (onClose) setTimeout(() => onClose(), 500);

        // Dispatch the custom event to refresh reminders on /email
        window.dispatchEvent(new Event("refresh-reminders"));

        if (!initialData && sendEmail) {
          // Only send the reminder email if sendEmail is true
          await fetch(`${urlAPI}/emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: user?.token || "",
            },
            body: JSON.stringify({
              to: user.email,
              subject: `Reminder: ${formData.name} subscription`,
              text: `Hello from Beeatrice,
                    Just a friendly buzz to remind you that one of your subscriptions is coming up for renewal soon. 
                    We want to keep you in control, so you’re never caught off guard.

                    Subscription details:
                    ${formData.name}
                    
                    Stay on top of your hive of subscriptions with SubscriBee 🐝
                    `,
              sendImmediately: false,
              scheduledDateTime: new Date(formData.reminderDate).toISOString(),
              isRecurring: false,
            }),
          });

          // Trigger the reminders list to refresh
          window.dispatchEvent(new Event("refresh-reminders"));
        }
      } else {
        setError(data.message || "Failed to save subscription");
      }
    } catch (err) {
      setError("Failed to save subscription. Please try again.");
    }
  };

  return (
    <section
      className={
        compact ? "p-4" : "px-4 sm:px-8 py-10 sm:py-20 container mx-auto"
      }
    >
      <Typography
        variant="small"
        className="text-light font-normal text-sm sm:text-base"
      >
        Please fill in the information below.
      </Typography>

      <form
        className="flex flex-col mt-4 space-y-3 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Top row: Name + Cost */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <Input
              label="Name"
              name="name"
              aria-lable="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-2">
            <Input
              label="Cost (SEK)"
              name="cost"
              aria-lable="cost"
              type="number"
              min={0}
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Free trial + Trial Days */}
        <div className="flex items-center gap-4">
          <Checkbox
            name="freeTrial"
            aria-lable="free trial checkbox"
            checked={formData.freeTrial}
            onChange={handleChange}
          />
          <span>Free trial?</span>
          {formData.freeTrial && (
            <div className="flex-1">
              <Input
                label="Trial Days"
                name="trialDays"
                aria-lable="trial days"
                type="number"
                min={0}
                value={formData.trialDays}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* Reminder Date */}
        <Input
          label="Reminder Date"
          name="reminderDate"
          aria-lable="reminder date"
          type="date"
          value={formData.reminderDate}
          onChange={handleChange}
          required
        />

        {/* Status + Category */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <Select
              label="Status"
              name="status"
              aria-lable="status"
              value={formData.status}
              onChange={handleSelectChange("status")}
              required
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              label="Category"
              name="category"
              aria-lable="category"
              value={formData.category}
              onChange={handleSelectChange("category")}
              required
            >
              <Option value="Entertainment">Entertainment</Option>
              <Option value="Food">Food</Option>
              <Option value="Health">Health</Option>
              <Option value="Learning">Learning</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>
        </div>

        {/* ✅ Send email checkbox  */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={() => setSendEmail(!sendEmail)}
            id="sendEmail"
          />
          <label htmlFor="sendEmail">Send email when adding subscription</label>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex gap-4">
          <Btn variant="outlined" size="sm" type="submit" disabled={success}>
            Save
          </Btn>
          {onClose && (
            <Btn variant="text" size="sm" onClick={() => onClose()}>
              Cancel
            </Btn>
          )}
        </div>

        {/* Feedback messages */}
        {error && (
          <Typography color="red" variant="small">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="green" variant="small">
            Your subscription was added!
          </Typography>
        )}
      </form>
    </section>
  );
};
