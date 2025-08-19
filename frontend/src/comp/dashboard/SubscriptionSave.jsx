import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import React from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { CalculateCost } from "../CalculateCost";

export const SubscriptionSave = () => { 

  const { isSaveOpen, selectedSubSave, closeSaveDialog } = useSubscriptionStore();
 
  return (
    <>  
      <Dialog
        open={isSaveOpen}
        handler={closeSaveDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Contribute</DialogHeader>
        <DialogBody>         
         <CalculateCost/>
          <br />
          {selectedSubSave && (
            <span className="text-sm text-gray-500">
              Subscription: {selectedSubSave.name}
            </span>
          )}         
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeSaveDialog}
            className="mr-1"
          >
            <span>Close</span>
          </Button>         
        </DialogFooter>
      </Dialog>
    </>
  );
}

  
