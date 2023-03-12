import { useState, useEffect } from "react";
import s from "../static/styles/content.module.css";

const Pricelist = (props) => {
  const [pricelist, setPricelist] = useState([]);

  const getPricelist = async () => {
    const res = await fetch("reservations/get-prices");
    const dbPrices = await res.json();
    setPricelist(dbPrices);
    props.getPriceList(dbPrices);
  };

  useEffect(() => {
    getPricelist();
  }, []);

  return (
    <div className={s.pricelistHolder}>
      <h3 className={s.pricelistTitle1}>Pricelist</h3>
      <div className={s.pricelist}>
        {pricelist.map((pricelistItem) => (
          <div
            className={
              pricelistItem.category === "female"
                ? s.pricelistItem + " " + s.female
                : pricelistItem.category === "male"
                ? s.pricelistItem + " " + s.male
                : s.pricelistItem + " " + s.other
            }
            key={pricelistItem._id}
          >
            <div className={s.pricelistItemImgCont}>
              <img
                className={s.pricelistItemImg}
                src={pricelistItem.image}
                alt={pricelistItem.image}
              />
            </div>
            <div>
              <h3 className={s.pricelistItemName}>{pricelistItem.title}</h3>
              <p className={s.pricelistItemDesc}>{pricelistItem.description}</p>
              <span className={s.pricelistItemPrice}>
                {"CAN " + pricelistItem.price}
                {pricelistItem.additional && "/nail"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricelist;
