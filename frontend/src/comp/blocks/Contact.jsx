import { Input, Textarea, Typography } from "@material-tailwind/react";

import { Btn } from "../layout/Btn";

export const Contact = () => {
  return (
    <section id="contact" className="flex justify-center items-center py-16 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-6 text-3xl text-center lg:text-4xl"
        >
          Contact Us
        </Typography>
        <Typography
          variant="paragraph"
          className="mb-2 text-center"
        >
          For questions please email or contact using our contact form below.
        </Typography>
        <form className="flex flex-col gap-4">
          <div>
            <Typography
              variant="small"
              className="mb-2 font-medium !text-gray-900"
            >
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Your Name"
              name="name"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="mb-2 font-medium !text-gray-900"
            >
              Email
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="name@email.com"
              name="email"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="mb-2 font-medium !text-gray-900"
            >
              Message
            </Typography>
            <Textarea
              rows={6}
              color="gray"
              placeholder="Your message"
              name="message"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="w-4 h-4 text-gray-600 border-gray-300 rounded"
            />
            <label htmlFor="privacy" className="text-gray-600 text-sm">
              I agree to the privacy policy
            </label>
          </div>

          <Btn className="w-full mt-2">Send Message</Btn>
        </form>
      </div>
    </section>
  );
};
