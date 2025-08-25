import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { SubscriptionForm } from "./SubscriptionForm";

// Modal component to display the subscription form in a popup
export const SubscriptionModal = ({ setOpen, onSubscriptionAdded, sendEmail, setSendEmail, }) => {

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
          onClose={closeModalDialog}   // close after successful submit
          onSubscriptionAdded={onSubscriptionAdded}
          sendEmail={sendEmail}
          setSendEmail={setSendEmail}
        />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="sendEmail"
            checked={sendEmail}
            onChange={() => setSendEmail((prev) => !prev)}
            className="mr-2 border border-black"
          />
          <label htmlFor="sendEmail">Send email when adding subscription</label>
        </div>
      </DialogBody>

      {/* <DialogFooter>
        <Button variant="text" color="red" onClick={closeModalDialog}>
          Close
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
};
