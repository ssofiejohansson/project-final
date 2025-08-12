import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

import { SubscriptionForm } from "./SubscriptionForm";

// Modal component to display the subscription form in a popup
export const SubscriptionModal = ({ open, setOpen }) => {

  const handler = (value) => setOpen(value);

  return (
    <Dialog open={open} handler={handler} size="xl" className="max-w-3xl">
      <DialogHeader>Add subscription</DialogHeader>
      <DialogBody className="overflow-visible">
        <SubscriptionForm onClose={() => setOpen(false)} compact />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => setOpen(false)}>Close</Button>
      </DialogFooter>
    </Dialog>
  );
};
