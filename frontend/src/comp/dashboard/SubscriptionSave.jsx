import { useEffect } from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { CalculateCost } from "../CalculateCost";

export const SubscriptionSave = () => {
  const { isSaveOpen, closeSaveDialog } = useSubscriptionStore();

  useEffect(() => {
    if (isSaveOpen) {
      const timer = setTimeout(closeSaveDialog, 15000);
      return () => clearTimeout(timer);
    }
  }, [isSaveOpen, closeSaveDialog]);

  if (!isSaveOpen) return null;

  return (
    <div className="space-y-3">
      <div className="text-text text-lg font-semibold">Yay! Nice save.</div>
      <CalculateCost />
    </div>
  );
};

