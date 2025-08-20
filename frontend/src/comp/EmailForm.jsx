 import React, { useState, useEffect } from "react";
import EmailRemindersList from "./EmailRemindersList";

function EmailForm({ setRefreshReminders }) {
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [sendImmediately, setSendImmediately] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [refreshRemindersLocal, setRefreshRemindersLocal] = useState(false);

  // Pre-written message
  const subject = "Subscription Reminder";
  const text = `Hello!

This is a reminder that you have subscriptions that is due to be renewed soon.

**Insert the subscription details here.**

// Subscribee`;

  // Get current date and time for minimum values
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!to) {
      alert("Please enter an email address");
      return;
    }

    // Validate scheduled sending
    if (!sendImmediately) {
      if (!scheduledDate || !scheduledTime) {
        alert("Please select both date and time for scheduled sending");
        return;
      }

      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const now = new Date();

      if (scheduledDateTime <= now) {
        alert("Scheduled time must be in the future");
        return;
      }

      // Validate recurring option
      if (isRecurring) {
        const selectedDay = scheduledDateTime.getDate();
        if (selectedDay > 28) {
          if (
            !confirm(
              `You've selected day ${selectedDay} for monthly recurrence. This date doesn't exist in all months (e.g., February). The email will be sent on the last available day of shorter months. Continue?`
            )
          ) {
            return;
          }
        }
      }
    }

    setIsLoading(true);

    try {
      const emailData = {
        to,
        subject,
        text,
        sendImmediately,
        ...(!sendImmediately && {
          scheduledDate,
          scheduledTime,
          scheduledDateTime: `${scheduledDate}T${scheduledTime}`,
          isRecurring,
        }),
      };

      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
      const data = await res.json();

      if (res.ok) {
        if (sendImmediately) {
          alert("Subscription reminder sent successfully!");
        } else {
          const scheduledDateTime = new Date(
            `${scheduledDate}T${scheduledTime}`
          );
          const recurringText = isRecurring ? " (recurring monthly)" : "";
          alert(
            `Email scheduled successfully for ${scheduledDateTime.toLocaleString()}${recurringText}!`
          );
        }
        setTo(""); // Clear the email field after success
        setScheduledDate("");
        setScheduledTime("");
        setIsRecurring(false);
        // Replace your local setRefreshReminders with the prop:
        if (setRefreshReminders) setRefreshReminders((prev) => !prev);
      } else {
        // detta meddelande
        alert(`Error: det här är ett test ${data.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-form-container p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Send reminder email
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Send our pre-written reminder message to a subscriber
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Recipient Email Address
          </label>
          <input
            id="email"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
        </div>

        {/* Send Timing Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            When to send
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="send-now"
                type="radio"
                name="sendTiming"
                checked={sendImmediately}
                onChange={() => setSendImmediately(true)}
                className="mr-2"
                disabled={isLoading}
              />
              <label htmlFor="send-now" className="text-sm text-gray-700">
                Send immediately
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="send-later"
                type="radio"
                name="sendTiming"
                checked={!sendImmediately}
                onChange={() => setSendImmediately(false)}
                className="mr-2"
                disabled={isLoading}
              />
              <label htmlFor="send-later" className="text-sm text-gray-700">
                Schedule for later
              </label>
            </div>
          </div>
        </div>

        {/* Date and Time Pickers - only show when scheduling */}
        {!sendImmediately && (
          <div className="bg-blue-50 p-4 rounded-md space-y-4">
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                id="scheduledDate"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={getCurrentDate()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!sendImmediately}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="scheduledTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Time
              </label>
              <input
                id="scheduledTime"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!sendImmediately}
                disabled={isLoading}
              />
            </div>

            {/* Recurring Option */}
            <div>
              <div className="flex items-center">
                <input
                  id="recurring"
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="mr-2"
                  disabled={isLoading}
                />
                <label htmlFor="recurring" className="text-sm text-gray-700">
                  Send monthly recurring reminders
                </label>
              </div>
              {isRecurring && (
                <p className="text-xs text-gray-500 mt-1">
                  This will send a reminder email every month on the same date.
                  If the date doesn't exist in certain months (e.g., January
                  31st in February), the email will be sent on the last day of
                  that month.
                </p>
              )}
            </div>

            {scheduledDate && scheduledTime && (
              <div className="text-sm text-blue-600 bg-white p-2 rounded border">
                <strong>Scheduled for:</strong>{" "}
                {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}
                {isRecurring && (
                  <div className="text-xs text-blue-500 mt-1">
                    📅 Will repeat monthly on day{" "}
                    {new Date(`${scheduledDate}T${scheduledTime}`).getDate()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isLoading ||
            !to ||
            (!sendImmediately && (!scheduledDate || !scheduledTime))
          }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Processing..."
            : sendImmediately
            ? "Send Reminder Email Now"
            : isRecurring
            ? "Schedule Recurring Reminder"
            : "Schedule Reminder Email"}
        </button>
      </form>

      {/* Email Reminders List */}
      <div className="mt-8">
        <EmailRemindersList refresh={refreshRemindersLocal} />
      </div>
    </div>
  );
}

export default EmailForm;
