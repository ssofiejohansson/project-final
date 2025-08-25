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
        <p className="font-semibold">Welcome busy bee! I'm Beeatrice.</p>
        <p className="text-gray-600 text-sm mt-1">
          Ready to save some honey today?
        </p>
      </Popup>
    </>
  );
}