import React, { useState, useEffect } from "react";
import { EmailForm } from "./utils/comp/EmailForm";
import EmailRemindersList from "../comp/utils/EmailRemindersList";

export const Email = () => {
  const [refreshReminders, setRefreshReminders] = useState(false);

  useEffect(() => {
    const handler = () => setRefreshReminders((prev) => !prev);
    window.addEventListener("refresh-reminders", handler);
    return () => window.removeEventListener("refresh-reminders", handler);
  }, []);

  return (
    <div>
      <EmailForm setRefreshReminders={setRefreshReminders} />
      <EmailRemindersList refresh={refreshReminders} />
    </div>
  );
};
