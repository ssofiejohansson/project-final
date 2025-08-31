import {
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BeeatriceImg from "../../assets/images/beeatrice.webp";
import { useUserStore } from "../../stores/useUserStore";
import { Btn } from "../layout/Btn";
import { Team } from "./Team";

export const AboutProject = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20">
            <div className="flex justify-center">
              <img
                src={BeeatriceImg}
                alt="Mascot Beeatrice the bee popup message"
                width="800"
                height="500"
                className="rounded-xl object-cover w-full max-w-md lg:max-w-full"
                loading="lazy"
              />
            </div>
            <div
              id="project"
              className="flex flex-col items-start justify-center text-left"
            >
              <Typography
                variant="h2"
                className="text-text mb-6 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-5xl font-heading"
              >
                About <span className="text-main">this project</span>
              </Typography>
              <Typography
                variant="paragraph"
                className="mb-8 w-full lg:text-lg text-text "
              >
                SubscriBee is a student-built project designed to help people
                manage their subscriptions. Statistics show that 74% forget the
                fee of recurring subscriptions and 42% still paying for a
                subscription they no longer use, mainly because they forget to
                cancel. We found this intriguing, and we wanted to make our own
                take of this problem. In a fun and playful way with the help of
                Beeatrice the bee we display and guide the user to a more
                subscription friendly everyday life.
              </Typography>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {user ?
                  (
                    <Btn
                      onClick={() => navigate("/admin")}
                      size="md"
                      variant="filled"
                    >
                      Let's buzz to the dashboard
                    </Btn>
                  ) : (
                    <Btn
                      onClick={() => navigate("/signup")}
                      size="md"
                      variant="filled"
                    >
                      Let's join the hive!
                    </Btn>
                  )}
              </div>
            </div>
          </div>

          {/* TEAM & LINKS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
              <CardBody className="text-center">
                <Typography
                  variant="h3"
                  className="text-text mb-2 font-medium font-heading"
                >
                  Our Team
                </Typography>
                <Typography className="text-center max-w-xs mx-auto font-normal leading-7 text-text">
                  Meet the creators behind SubscriBee - students learning and
                  building real-world applications:
                </Typography>
                <Team />
              </CardBody>
            </Card>

            <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
              <CardBody className="text-center">
                <Typography
                  variant="h3"
                  className="text-text mb-2 font-medium font-heading"
                >
                  Project Process
                </Typography>
                <Typography className="text-center max-w-xs mx-auto font-normal leading-7 text-text">
                  SubscriBee was built using agile methodology with user
                  testing, feedback and constant improvement to deliver a smooth
                  subscription-tracking experience. We have the user in mind
                  when it comes to a clear overview and easy to handle
                  functionality.
                </Typography>
              </CardBody>
            </Card>

            <Card className="col-span-1 bg-gray-100/50 overflow-hidden hover:shadow-lg transition">
              <CardBody className="text-center">
                <Typography
                  variant="h3"
                  className="text-text mb-2 font-medium font-heading"
                >
                  Tech Stack
                </Typography>
                <Typography className="text-text text-center max-w-xs mx-auto font-normal leading-7">
                  We've utilized a modern tech stack for a high-quality user
                  experience, including React, Zustand for state management, and
                  Tailwind CSS. The backend is powered by Node.js and Express,
                  ensuring a robust and scalable application. Check out our full
                  tech stack{" "}
                  <span
                    onClick={handleOpen}
                    className="text-accent font-bold cursor-pointer hover:underline"
                  >
                    here
                  </span>
                  .
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <Dialog
        className="px-4 py-2 max-h-[80vh] flex flex-col"
        open={open}
        handler={handleOpen}
        size="md"
      >
        <DialogHeader>Full Tech Stack</DialogHeader>
        <DialogBody className="text-text h-[20rem] overflow-y-auto p10">
          <Typography variant="h4" className="mb-2 font-heading">
            Frontend
          </Typography>
          <div className="list-disc list-inside mb-4">
            <ul>
              <li>
                <strong>Core:</strong> HTML5, JavaScript (ES6+), React
              </li>
              <li>
                <strong>Build Tool:</strong> Vite
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS, with Material Tailwind
                for UI components.
              </li>
              <li>
                <strong>Routing:</strong> React Router
              </li>
              <li>
                <strong>State Management:</strong> Zustand
              </li>
              <li>
                <strong>Data Visualization:</strong> ApexCharts for graphs and
                charts.
              </li>
              <li>
                <strong>Icons:</strong> Heroicons
              </li>
            </ul>
          </div>

          <Typography variant="h4" className="mb-2 font-heading">
            Backend
          </Typography>
          <div className="list-disc list-inside mb-4">
            <ul>
              <li>
                <strong>Core:</strong> Node.js, Express.js
              </li>
              <li>
                <strong>Database:</strong> MongoDB with Mongoose as the ODM.
              </li>
              <li>
                <strong>Email Service:</strong> Nodemailer for sending emails.
              </li>
              <li>
                <strong>Task Scheduling:</strong> node-cron for recurring tasks.
              </li>
              <li>
                <strong>Authentication:</strong> Custom token-based
                authentication middleware.
              </li>
            </ul>
          </div>

          <Typography variant="h4" className="mb-2 font-heading">

            Tooling & Deployment
          </Typography>
          <div className="list-disc list-inside">
            <ul>
              <li>
                <strong>Version Control:</strong> Git
              </li>
              <li>
                <strong>Automation:</strong>GitHub Actions (workflow automation
                via .yml pipelines for tasks such as database updates)
              </li>
              <li>
                <strong>Hosting:</strong> Frontend on Netlify, Backend on
                Render.
              </li>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Btn
            variant="text"
            onClick={handleOpen}
            size="md"
          >
            <span>Close</span>
          </Btn>
        </DialogFooter>
      </Dialog>
    </>
  );
};
