import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const faqs = [
  {
    title: "What is SubscriBee?",
    desc: "SubscriBee helps you track all your subscriptions in one place. Get reminders before renewals, avoid surprise charges, and see insights on your monthly spending.",
  },
  {
    title: "Is SubscriBee free?",
    desc: "Yes! You can get started for free. Just sign up!",
  },
  {
    title: "Can I use it on mobile?",
    desc: "Absolutely. SubscriBee is designed to work seamlessly on desktop, tablet, and mobile devices.",
  },
  {
    title: "What makes SubscriBee different?",
    desc: "Our friendly mascot Beeatrice, smart reminders, and intuitive dashboard make it easy (and even fun!) to stay on top of your subscriptions.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <section id="faq" className="px-8 py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h4"
            className="text-text mb-4 text-3xl font-bold !leading-snug lg:text-4xl font-heading"
          >
            Frequently Asked Questions
          </Typography>
          <Typography className="mx-auto font-normal  text-light lg:max-w-2xl">
            Everything you need to know about SubscriBee — from setup to staying
            on track.
          </Typography>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map(({ title, desc }, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={
                open === index + 1 ? (
                  <MinusIcon className="h-5 w-5 text-main transition" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-light transition" />
                )
              }
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="text-lg font-semibold text-text py-4 hover:text-main transition"
              >
                {title}
              </AccordionHeader>
              <AccordionBody className="pb-6">
                <Typography className="font-normal text-light leading-relaxed">
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
