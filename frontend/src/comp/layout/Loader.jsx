import { Spinner } from "@material-tailwind/react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <Spinner className="h-16 w-16" />
    </div>
  )
}
