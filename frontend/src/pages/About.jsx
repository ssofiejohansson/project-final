import { AboutProject } from "../comp/blocks/AboutProject";
import { AboutSub } from "../comp/blocks/AboutSub";
import { FAQ } from "../comp/blocks/Faq";
import { Contact } from "../comp/blocks/Contact";

export const About = () => {
  return (
    <>
      {/* Header */}
      <AboutSub />

      <Contact />
      <AboutProject />
      <FAQ />
    </>
  );
}