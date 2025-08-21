import { Typography } from "@material-tailwind/react"
import { Btn } from "../layout/Btn"

export const AboutSub = () => {

  return (
    <header className="bg-white p-8">

      <div className="container mx-auto px-4 text-center">

        <Typography
          variant="h1"
          color="blue-gray"
          className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        >
          What is {" "}
          <span className="text-green-500 leading-snug ">SubscriBee</span>?

        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, nam. At, quas ex!
        </Typography>
        <div className="mt-8 grid w-full place-items-start md:justify-center">
          <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">

            <Btn>
              Log in
            </Btn>
            <Btn>
              Sign up
            </Btn>

          </div>
        </div>
      </div>

    </header>
  )
}