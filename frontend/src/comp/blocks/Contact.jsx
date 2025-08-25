import { Input, Textarea, Typography } from "@material-tailwind/react";

import { Btn } from "../layout/Btn";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="flex justify-center items-center py-16 px-4 bg-gray-50 min-h-screen"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Section Title */}
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-4 text-3xl text-center lg:text-4xl font-bold"
        >
          Contact Us
        </Typography>
        <Typography
          variant="paragraph"
          className="mb-6 text-center text-gray-600"
        >
          For questions, email us or use the contact form below. We’ll get back to you as soon as possible.
        </Typography>

        {/* Contact Form */}
        <form className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <Typography variant="small" className="mb-2 font-medium !text-gray-900">
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

          {/* Email */}
          <div>
            <Typography variant="small" className="mb-2 font-medium !text-gray-900">
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

          {/* Message */}
          <div>
            <Typography variant="small" className="mb-2 font-medium !text-gray-900">
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

          {/* Privacy Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="w-4 h-4 text-green-500 border-gray-300 rounded"
            />
            <label htmlFor="privacy" className="text-gray-600 text-sm">
              I agree to the privacy policy
            </label>
          </div>

          {/* Submit Button */}
          <Btn className="w-full mt-2 hover:bg-green-600">
            Send Message
          </Btn>
        </form>
      </div>
    </section>
  );
};
