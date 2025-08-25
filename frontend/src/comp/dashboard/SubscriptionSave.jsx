import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Tooltip } from "@material-tailwind/react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { CalculateCost } from "../CalculateCost";

export const SubscriptionSave = () => { 

  const isSaveOpen = useSubscriptionStore((s) => s.isSaveOpen);
  const closeSaveDialog = useSubscriptionStore((s) => s.closeSaveDialog);
  const selectedSubSave = useSubscriptionStore((s) => s.selectedSubSave);

  //if (!isSaveOpen) return null;
 
  return (
    <> 
   


      <Dialog
        open={isSaveOpen}
        handler={closeSaveDialog}
        // animate={{
        //   mount: { scale: 1, y: 0 },
        //   unmount: { scale: 0.9, y: -100 },
        // }}
      >
        <DialogHeader>Contribute</DialogHeader>
        <DialogBody>                   
         <CalculateCost
          compact
          initialData={selectedSubSave || undefined}
          onClose={closeSaveDialog}   // close after successful submit         
         /> 
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

  
