import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const faqs = [
  {
    title: "How do I order?",
    desc: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don't appreciate the moment until it's passed.",
  },
  {
    title: "How can I make the payment?",
    desc: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too. We're not always in the position that we want to be at.",
  },
  {
    title: "How much time does it take to receive the order?",
    desc: "Delivery times depend on your location, but generally orders are processed within 1–2 business days and shipped within 3–5 business days.",
  },
  {
    title: "Can I resell the products?",
    desc: "Yes, you can resell our products as long as you comply with our terms and conditions.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Frequently asked questions
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            A lot of people don&apos;t appreciate the moment until it&apos;s
            passed. I&apos;m not trying my hardest, and I&apos;m not trying to
            do.
          </Typography>
        </div>

        {/* Accordion FAQ List */}
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map(({ title, desc }, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={<span className="text-xl">{open === index + 1 ? "−" : "+"}</span>}
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="text-lg font-semibold text-blue-gray-900 py-4"
              >
                {title}
              </AccordionHeader>
              <AccordionBody className="pb-6">
                <Typography className="font-normal !text-gray-500">
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
