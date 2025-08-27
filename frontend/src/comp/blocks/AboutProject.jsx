import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { Btn } from "../layout/Btn";

export const AboutProject = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* HERO IMAGE */}
          <div className="flex justify-center">
            <img
              src="/"
              alt="Project overview"
              className="rounded-xl object-cover w-full max-w-md lg:max-w-full shadow-lg"
            />
          </div>
          <div id="project" className="flex flex-col items-start justify-center text-left">
            <Typography
              variant="h2"
              className="text-text mb-6 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-5xl"
            >
              About <span className="text-main">this project</span>
            </Typography>
            <Typography
              variant="paragraph"
              className="mb-8 w-full lg:text-lg text-text"
            >
              SubscriBee is a student-built project designed to help people manage their subscriptions. 
              Statistics show that 74% forget the fee of recurring subscriptions and 42% still paying 
              for a subscription they no longer use, mainly because they forget to cancel. We found this
              intriguing, and we wanted to make our own take of this problem. In a fun and playful way 
              with the help of Beatrice the bee we display and guide the user to a more subscription 
              friendly everyday life.   
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4">
              <Btn
                onClick={() => navigate("/signup")}
                size="lg"
                variant="filled"
              >
                Join the hive
              </Btn>
            </div>
          </div>

        </div>

        {/* TEAM & LINKS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography
                variant="h3"
                className="text-text mb-2 font-medium"
              >
                Our Team
              </Typography>
              <Typography className="text-center max-w-xs mx-auto font-normal leading-7 text-text">
                Meet the creators behind SubscriBee — students learning and building real-world applications.
              </Typography>
              <div className="flex items-center -space-x-4 justify-center mt-8">
                <a href="https://www.linkedin.com/" target="_blank">
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Oskar image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
                />
                </a>
                <a href="https://www.linkedin.com/in/sofia-lennbom-91252195/" target="_blank">
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Sofia image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="../../public/sofia.webp"                  
                />
                </a>
                <a href="https://www.linkedin.com/" target="_blank">
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Sofie image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1288&q=80"
                />
                </a>
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-main hover:underline"
                >
                  Technigo
                </a>
                <a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-main hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-main hover:underline"
                >
                  Other Links
                </a>
              </div>
            </CardBody>
          </Card>

          {/* OPTIONAL: Additional Cards */}
          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography variant="h3" className="text-text mb-2 font-medium">
                Project Process
              </Typography>
              <Typography className="text-center max-w-xs mx-auto  font-normal leading-7 text-text">
                SubscriBee was built using agile methodology with user testing, feedback, and constant improvement to deliver a smooth subscription-tracking experience.
                We have the user in mind when it comes to a clear overview and easy to handle functionality. 
              </Typography>
            </CardBody>
          </Card>

          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography variant="h3" className="text-text mb-2 font-medium">
                Tech Stack
              </Typography>
              <Typography className="text-text text-center max-w-xs mx-auto  font-normal leading-7">
                Built with React, Material Tailwind, and modern web best practices for responsive, user-friendly design.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section >
  );
};
