import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { SubscriptionForm } from "./SubscriptionForm";

// Modal component to display the subscription form in a popup
//export const SubscriptionModal = ({ open, setOpen, subscription }) => {
export const SubscriptionModal = () => {

const isOpen = useSubscriptionStore((s) => s.isModalOpen);
const selectedSub = useSubscriptionStore((s) => s.selectedSub);
const closeModalDialog = useSubscriptionStore((s) => s.closeModalDialog);

 

  const handler = (value) => setOpen(value);

  return (
    //OLD
    // <Dialog open={open} handler={handler} size="xl" className="max-w-3xl">
    //   <DialogHeader>{subscription ? "Edit subscription" : "Add subscription"}</DialogHeader>
    //   <DialogBody className="overflow-visible">
    //     <SubscriptionForm onClose={() => setOpen(false)} compact initialData={subscription} />
    //   </DialogBody>
    //   <DialogFooter>
    //     <Button variant="text" color="red" onClick={() => setOpen(false)}>Close</Button>
    //   </DialogFooter>
    // </Dialog>
    
    <Dialog open={isOpen} handler={handler} size="xl" className="max-w-3xl">
      <DialogHeader>
        {selectedSub ? "Edit subscription" : "Add subscription"}
      </DialogHeader>

      <DialogBody className="overflow-visible">
        <SubscriptionForm
          compact
          initialData={selectedSub || undefined}
          onClose={closeModalDialog}   // close after successful submit
        />
      </DialogBody>

      <DialogFooter>
        <Button variant="text" color="red" onClick={closeModalDialog}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
