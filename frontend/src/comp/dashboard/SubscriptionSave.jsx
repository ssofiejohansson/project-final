import { useEffect } from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { CalculateCost } from "../CalculateCost";

export const SubscriptionSave = () => { 
  const { isSaveOpen, closeSaveDialog } = useSubscriptionStore();

  useEffect(() => {
    if (isSaveOpen) {
      const timer = setTimeout(() => {
        closeSaveDialog();
      }, 4000); // auto-close after 4 seconds (adjust as needed)

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [isSaveOpen, closeSaveDialog]);

  if (!isSaveOpen) return null;

  return (
    <div>
      <div className="text-lg font-semibold mb-3">Contribute</div>
      <CalculateCost />
    </div>
  );
};

// import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Tooltip } from "@material-tailwind/react";

// import useSubscriptionStore from "../../stores/useSubscriptionStore";
// import { CalculateCost } from "../CalculateCost";

// export const SubscriptionSave = () => { 

//   const { isSaveOpen, closeSaveDialog } = useSubscriptionStore();

//   if (!isSaveOpen) return null;
 
//   return (
//     <> 
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div
//           className="absolute inset-0 bg-black/30"
//           onClick={closeSaveDialog}
//         />
//         <div className="">          
//         <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-10 border-2 border-black">
          
//             <div className="text-lg font-semibold mb-3">Contribute</div>
//             <CalculateCost />
//             <div className="flex justify-end mt-4">
//               <Button
//                 variant="text"
//                 color="red"
//                 onClick={closeSaveDialog}
//               >
//                 Close
//               </Button>
//             </div>
//             <div className="absolute -bottom-4 right-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black" />
//             <div className="absolute -bottom-4 right-10 w-0 h-0">🐝</div>
//             </div>          
//           </div>
//     </div>


//       {/* <Dialog
//         open={isSaveOpen}
//         handler={closeSaveDialog}
//         animate={{
//           mount: { scale: 1, y: 0 },
//           unmount: { scale: 0.9, y: -100 },
//         }}
//       >
//         <DialogHeader>Contribute</DialogHeader>
//         <DialogBody>                   
//          <CalculateCost/> 
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={closeSaveDialog}
//             className="mr-1"
//           >
//             <span>Close</span>
//           </Button>         
//         </DialogFooter>
//       </Dialog> */}
//     </>
//   );
// }

  
