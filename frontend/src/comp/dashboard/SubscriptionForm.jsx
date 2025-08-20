import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import useUserStore from "../../stores/useUserStore";

export const SubscriptionForm = ({ onClose, compact = false, initialData }) => {
  const urlAPI = "http://localhost:8081/subscriptions";

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      // Editing an existing subscription, to make sure date follows
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

    const payload = {
      ...formData,
      reminderDate: new Date(formData.reminderDate).toISOString(),
      cost: parseFloat(formData.cost),
      trialDays: formData.freeTrial ? parseInt(formData.trialDays) || 0 : 0,
    };

    try {
      let response;
      if (initialData) {
        // EDIT
        response = await fetch(`${urlAPI}/${initialData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token || "",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // ADD
        response = await fetch(`${urlAPI}`, {
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

        if (!initialData) {
          // After successfully adding the subscription
          console.log("Scheduling email with to:", user.email, user);
          await fetch("http://localhost:8081/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: user?.token || "",
            },
            body: JSON.stringify({
              to: user.email, // ✅ correct if user is the logged-in user object
              subject: `Reminder: ${formData.name} subscription`,
              text: `This is a reminder for your ${formData.name} subscription.`,
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
    <section className={compact ? "p-4" : "px-8 py-20 container mx-auto"}>
      {!compact && (
        <>
          <Typography variant="h5" color="blue-gray">
            Add a subscription
          </Typography>
          <Typography
            variant="small"
            className="text-gray-600 font-normal mt-1"
          >
            Fill in the information below
          </Typography>
        </>
      )}

      <form
        className="flex flex-col mt-6 space-y-4 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Cost"
          name="cost"
          type="number"
          min={0}
          step="0.01"
          value={formData.cost}
          onChange={handleChange}
          required
        />
        <div className="flex items-center">
          <Checkbox
            name="freeTrial"
            checked={formData.freeTrial}
            onChange={handleChange}
          />
          <span className="ml-2">Free Trial?</span>
        </div>
        {formData.freeTrial && (
          <Input
            label="Trial Days"
            name="trialDays"
            type="number"
            min={0}
            value={formData.trialDays}
            onChange={handleChange}
          />
        )}
        <Input
          label="Reminder Date"
          name="reminderDate"
          type="date"
          value={formData.reminderDate}
          onChange={handleChange}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleSelectChange("status")}
          required
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>

        <Select
          label="Category"
          name="category"
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

        <div className="flex gap-2">
          <Button type="submit" color="blue">
            Save Subscription
          </Button>
          {onClose && (
            <Button variant="text" color="red" onClick={() => onClose()}>
              Cancel
            </Button>
          )}
        </div>

        {error && (
          <Typography color="red" variant="small">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="green" variant="small">
            Subscription added successfully!
          </Typography>
        )}
      </form>
    </section>
  );
};
