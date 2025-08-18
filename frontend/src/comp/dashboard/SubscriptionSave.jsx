import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useSubscriptionStore from "../../stores/useSubscriptionStore";

//import { SubscriptionList } from "./SubscriptionList";

export const SubscriptionSave = () => { 

  const { isSaveOpen, selectedSubSave, closeSaveDialog } = useSubscriptionStore();
 
  //const handleOpenDel = () => setOpenDel(!openDel);
 
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
         You just saved $100, buy a friend coffee 💕
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

  
