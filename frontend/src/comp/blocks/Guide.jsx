import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom"
import { Team } from "./Team";
import SignupImage from "../../assets/home-img/signup-img.png"
import AddSubImage from "../../assets/home-img/addsub-img.png"
import SubListImage from "../../assets/home-img/sublist-img.png"

export const Guide = () => {

  return (
    <section id="guide" className="lg:py-28 py-10 px-8">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography className="text-main mb-2 font-bold uppercase">
          How it works
        </Typography>
        <Typography variant="h2" className="text-text mb-4 !text-2xl font-bold lg:!text-4xl">
          Get started in three simple steps
        </Typography>
        <Typography variant="paragraph" className="mx-auto max-w-lg text-text">
          SubscriBee makes it easy to take control of your subscriptions. Here’s how:
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography variant="h3" className="text-text mb-2 font-medium">
              Step 1 - Create Your Account
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto font-normal leading-7 text-light">
              <Link to="/signup" className="text-main hover:underline">
                Sign up
              </Link>{" "} in minutes and start fresh.
            </Typography>
          </CardBody>

          <img
            src={SignupImage}
            alt="image of the sign up form"
            className="w-full xl:h-[370px] lg:h-[360px] h-[220px] object-cover md:object-contain object-top"
          />
        </Card>

        <Card className="col-span-2 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography variant="h3" className="text-text mb-2 font-medium">
              Step 2 – Add Your Subscriptions
            </Typography>
            <Typography className="text-center mb-3 max-w-xs mx-auto font-normal leading-7 text-light">
              Log every subscription, from Netflix to that random meditation app you forgot about.
            </Typography>
            <img
              src={AddSubImage}
              alt="image of the dashboard with a list of subscriptions"
              className="w-full lg:h-[380px] md:h-[300px] h-[220px] object-cover md:object-contain object-top"
            />
          </CardBody>
        </Card>

      </div>
      <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-2 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography variant="h3" className="text-text mb-2 font-medium">
              Step 3 – Stay on Track
            </Typography>
            <Typography className="text-center mb-3 max-w-sm mx-auto font-normal leading-7 text-light">
              See clear insights, receive helpful reminders, and avoid surprise charges.
            </Typography>
            <img
              src={SubListImage}
              alt="image on the email of a reminder and a popup with a message"
              className="w-full xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] object-cover md:object-contain object-top"
            />
          </CardBody>
        </Card>


        <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
          <CardBody className="text-center">
            <Typography
              variant="h4"
              className="text-text mb-2 font-medium"
            >
              About this project
            </Typography>
            <Typography className="text-center max-w-xs mx-auto  font-normal leading-7 text-light">
              SubscriBee is a student-built project designed to help people better manage their digital lives.
              Learn more about our team and process on the{" "}
              <Link to="/about" className="text-main hover:underline">
                About
              </Link>{" "}
              page.
            </Typography>
            <Team />
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
