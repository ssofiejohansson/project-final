import { AboutProject } from "../comp/blocks/AboutProject";
import { AboutSub } from "../comp/blocks/AboutSub";

import { FAQ } from "../comp/blocks/Faq";

export const About = () => {
  return (
    <>
      <AboutSub />
      <AboutProject />

      <FAQ />
    </>
  );
}