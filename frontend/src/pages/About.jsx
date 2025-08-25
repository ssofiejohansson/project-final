import { AboutProject } from "../comp/blocks/AboutProject";
import { AboutSub } from "../comp/blocks/AboutSub";
import { Contact } from "../comp/blocks/Contact";
import { FAQ } from "../comp/blocks/Faq";

export const About = () => {
  return (
    <>
      <AboutSub />
      <AboutProject />
      <Contact />
      <FAQ />
    </>
  );
}