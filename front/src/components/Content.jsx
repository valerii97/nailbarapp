import React from "react";
import { useState, useEffect } from "react";
import s from "./Content.module.css";
import location from "./location.jpg";
import OpenModalBtn from "./OpenModalBtn";

const Content = (props) => {
  // GET ALL IMAGES
  const importAllImages = (r) => {
    let imgs = [];
    r.keys().map((item, index) => {
      return imgs.push(r(item));
    });

    return imgs;
  };

  const images = importAllImages(
    require.context("./gallery", false, /\.(png|jpe?g|svg)$/)
  );

  // GETTING ALL PRICES FROM DB
  const [prices, setPrices] = useState([]);

  const getPrices = async () => {
    const res = await fetch("reservations/get-prices");
    const dbprices = await res.json();
    setPrices(dbprices);
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <main className={s.general}>
      <h1 className={s.maintitle}>
        Welcome to Mary's <br /> Nail Bar!
      </h1>
      <h2 className={s.secondarytitle}>
        Here you're gonna do <br /> the best nails in BC!
      </h2>
      <div className={s.pricelistHolder}>
        <h3 className={s.pricelistTitle1}>Pricelist</h3>
        <div className={s.pricelist}>
          {prices.map((pricelistItem) => (
            <div className={s.pricelistitem} key={pricelistItem._id}>
              <p className={s.pricelistitemname}>{pricelistItem.title}</p>
              <span className={s.pricelistitemprice}>
                {pricelistItem.additional && "+"}
                {pricelistItem.price + "$"}
              </span>
              <div className={s.hl}></div>
            </div>
          ))}
        </div>
      </div>
      <OpenModalBtn modalAction={props.modalAction} />
      <div className={s.gallery}>
        <h2>Gallery</h2>
        <div className={s.photos}>
          {images.map((item) => (
            <div className={s.imagediv} key={item}>
              <img className={s.image} src={item} alt={item} />
            </div>
          ))}
        </div>
      </div>
      <OpenModalBtn modalAction={props.modalAction} />
      <div className={s.contacts}>
        <h2>We are here!</h2>
        <div className={s.map}>
          <a
            href="https://www.google.com/maps/place/770+Creekside+Crescent,+Gibsons,+BC+V0N+1V9/@49.4111628,-123.5113684,17z/data=!3m1!4b1!4m5!3m4!1s0x54863fb929286a29:0xcbd8b02c455ccf72!8m2!3d49.4111628!4d-123.5091798"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={location} alt="Location" />
          </a>
        </div>
        <p className={s.address}> 770 Creekside Cres, Gibsons, BC</p>
        <p className={s.phonenumber}>+1 778 834 2623</p>
      </div>
    </main>
  );
};

export default Content;
