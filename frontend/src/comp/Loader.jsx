import { Spinner, Typography } from "@material-tailwind/react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">     
      <Spinner className="h-16 w-16" />      
      {/* <Typography variant="paragraph">Loading...</Typography>    */}
    </div>
  ) 
}

// const Loader = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center">
//       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mb-4"></div>
//       <p className="text-lg font-medium text-gray-700">Loading...</p>
//     </div>
//   );
// };

// export default Loader;

