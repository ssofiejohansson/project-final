import { AboutProject } from "../comp/blocks/AboutProject";
import { AboutSub } from "../comp/blocks/AboutSub";
import { FAQ } from "../comp/blocks/Faq";
import { Popup } from "../comp/layout/Popup";

export const About = () => {
  return (
    <>
      <AboutSub />
      <AboutProject />

      <FAQ />
      <Popup delay={1000}>
        <p className="font-bold">Did you know?</p>
        <p>
          74% of people forget about their subscription fees and 42% still pay for ones they no longer use!
        </p>
      </Popup>
    </>
  );
}