import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";

export const Guide = () => {

  return (
    <section id="guide" className="lg:py-28 py-10 px-8">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="text-text" className="mb-2 font-bold uppercase">
          How it works
        </Typography>
        <Typography color="text-text" className="mb-4 !text-2xl font-bold lg:!text-4xl">
          Get started in three simple steps
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-lg !text-gray-500">
          SubscriBee makes it easy to take control of your subscriptions. Here’s how:
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="text-text"
              className="mb-2 font-medium"
            >
              Step 1 - Create Your Account
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Sign up in minutes and start fresh.
            </Typography>
            <img
              src="/image/iphone.svg"
              alt="image of the sign up form"
              className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center"
            />
          </CardBody>
        </Card>
        <Card
          className="col-span-2 bg-gray-100/50 overflow-hidden hover:shadow-lg transition"
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="text-text"
              className="mb-2 font-medium"
            >
              Step 2 – Add Your Subscriptions
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Log every subscription, from Netflix to that random meditation app you forgot about.
            </Typography>
            <img
              src="/image/laptop 1.svg"
              alt="image of the dashboard with a list of subscriptions"
              className="w-full lg:h-[380px] md:h-[300px] h-[220px] lg:translate-y-16 translate-y-10 object-cover object-center"
            />
          </CardBody>
        </Card>
      </div>
      <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card
          className="col-span-2 bg-gray-100/50 overflow-hidden hover:shadow-lg transition"
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="text-text"
              className="mb-2 font-medium"
            >
              Step 3 – Stay on Track
            </Typography>
            <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500">
              See clear insights, receive helpful reminders, and avoid surprise charges.
            </Typography>
            <img
              src="/image/logo-collection.svg"
              alt="image on the email of a reminder and a popup with a message"
              className="w-full xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-cover object-top"
            />
          </CardBody>
        </Card>
        <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="text-text"
              className="mb-2 font-medium"
            >
              About this project
            </Typography>
            <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              SubscriBee is a student-built project designed to help people better manage their digital lives.
              Learn more about our team and process on the About page.
            </Typography>
            <div className="flex items-center -space-x-4 justify-center mt-24">
              <Avatar
                size="xl"
                variant="circular"
                alt="Oskar image"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <Avatar
                size="xl"
                variant="circular"
                alt="Sofia image"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
              <Avatar
                size="xl"
                variant="circular"
                alt="Sofie image"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
              />

            </div>
            <div className="flex justify-between items-end mt-[144px]">

              <Typography
                as="a"
                href="#"
                color="text-text"
                className="text-xs font-bold cursor-pointer"
              >
                Technigo Link / Github link / Other links
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
