import { AboutProject } from "../comp/blocks/AboutProject";
import { AboutSub } from "../comp/blocks/AboutSub";
import { Popup } from "../comp/layout/Popup";
import { FAQ } from "../comp/blocks/Faq";

export const About = () => {
  return (
    <>
      <AboutSub />
      <AboutProject />

      <FAQ />
      <Popup delay={1000}>
        <p className="font-bold">Did you know?</p>
        <p>
          74% forget about their subscriptions and 42% still pay for a subscription they no longer use!
        </p>
      </Popup>
    </>
  );
}