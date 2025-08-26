import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";

import { Btn } from "../layout/Btn";

export const AboutProject = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* INTRO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* HERO IMAGE */}
          <div className="flex justify-center">
            <img
              src="/image/hero-image.jpg"
              alt="Project overview"
              className="rounded-xl object-cover w-full max-w-md lg:max-w-full shadow-lg"
            />
          </div>
          <div className="flex flex-col items-start justify-center text-left">
            <Typography
              variant="h1"
              id="project"
              className="text-text mb-6 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-5xl"
            >
              About <span className="text-main">this project</span>.
            </Typography>
            <Typography
              variant="lead"
              className="mb-8 w-full !text-gray-500 lg:text-lg text-base"
            >
              SubscriBee is a student-built project designed to help people manage their subscriptions.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4">
              <Btn>Sign up</Btn>
              <a
                href="#faq"
                className="px-6 py-3 border border-gray-800 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition text-center"
              >
                FAQ
              </a>
            </div>
          </div>

        </div>

        {/* TEAM & LINKS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography
                variant="h4"

                className="mb-2 font-medium"
              >
                Our Team
              </Typography>
              <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
                Meet the creators behind SubscriBee — students learning and building real-world applications.
              </Typography>
              <div className="flex items-center -space-x-4 justify-center mt-8">
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Oskar image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
                />
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Sofia image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1061&q=80"
                />
                <Avatar
                  size="xl"
                  variant="circular"
                  alt="Sofie image"
                  className="border-2 border-white hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1288&q=80"
                />
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <a
                  href="https://technigo.se"
                  className="text-xs font-bold text-blue-500 hover:underline"
                >
                  Technigo
                </a>
                <a
                  href="https://github.com/your-repo"
                  className="text-xs font-bold text-blue-500 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-xs font-bold text-blue-500 hover:underline"
                >
                  Other Links
                </a>
              </div>
            </CardBody>
          </Card>

          {/* OPTIONAL: Additional Cards */}
          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography variant="h4" className="mb-2 font-medium">
                Project Process
              </Typography>
              <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
                SubscriBee was built iteratively with user testing, feedback, and constant improvement to deliver a smooth subscription-tracking experience.
              </Typography>
            </CardBody>
          </Card>

          <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
            <CardBody className="text-center">
              <Typography variant="h4" className="mb-2 font-medium">
                Technology
              </Typography>
              <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
                Built with React, Material Tailwind, and modern web best practices for responsive, user-friendly design.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section >
  );
};
