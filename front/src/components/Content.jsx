import s from "../static/styles/content.module.css";
import Pricelist from "./Pricelist";
import Gallery from "./Gallery";
import Contacts from "./Contacts";
import OpenModalBtn from "./OpenModalBtn";
import Review from "./Review";

const Content = (props) => {
  return (
    <main className={s.general}>
      <h1 className={s.maintitle}>Welcome to Maria's Nail Studio!</h1>
      <h2 className={s.secondarytitle}>
        <p>Here you're gonna do the best nails in BC!</p>
      </h2>
      <Pricelist getPriceList={props.getPriceList} />
      <OpenModalBtn modalAction={props.modalAction} fontSize={25} />
      <Gallery />
      <OpenModalBtn modalAction={props.modalAction} fontSize={25} />
      <Review />
      <Contacts />
    </main>
  );
};

export default Content;
