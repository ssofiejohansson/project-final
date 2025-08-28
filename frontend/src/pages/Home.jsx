import { ContentBlock } from "../comp/blocks/ContentBlock";
import { Guide } from "../comp/blocks/Guide";
import { Header } from "../comp/layout/Header";
import { Popup } from "../comp/layout/Popup";

export const Home = () => {
  return (
    <>

      <Header />
      <Guide />
      <ContentBlock />
      <Popup delay={1000}>
        <p className="font-bold">Welcome busy bee! I'm Beeatrice.</p>
        <p>
          Are you ready to save some honey today? 🍯
        </p>
      </Popup>
    </>
  );
}