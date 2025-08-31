import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

import { useSubscriptionStore } from "../../stores/useSubscriptionStore";
import { SubscriptionForm } from "./SubscriptionForm";

// Modal component to display the subscription form in a popup
export const SubscriptionModal = ({
  setOpen,
  onSubscriptionAdded,
  sendEmail,
  setSendEmail,
}) => {
  const isOpen = useSubscriptionStore((s) => s.isModalOpen);
  const selectedSub = useSubscriptionStore((s) => s.selectedSub);
  const closeModalDialog = useSubscriptionStore((s) => s.closeModalDialog);
  const handler = (value) => setOpen(value);

  return (
    <Dialog open={isOpen} handler={handler} size="xl" className="max-w-3xl p-4">
      <DialogHeader>
        {selectedSub ? "Edit subscription" : "Add subscription"}
      </DialogHeader>

      <DialogBody className="max-h-[70vh] overflow-y-auto">
        <SubscriptionForm
          compact
          initialData={selectedSub || undefined}
          onClose={closeModalDialog}
          onSubscriptionAdded={onSubscriptionAdded}
          sendEmail={sendEmail}
          setSendEmail={setSendEmail}
        />
      </DialogBody>
    </Dialog>
  );
};
