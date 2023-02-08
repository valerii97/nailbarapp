import React from "react";
import { useState, useEffect } from "react";
import s from "./Content.module.css";
import location from "./location.jpg";
import OpenModalBtn from "./OpenModalBtn";
import Review from "./Review";
import "./titleAnimation.css";

const Content = (props) => {
  // GETTING ALL PRICES FROM DB
  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);

  const getPrices = async () => {
    const res = await fetch("reservations/get-prices");
    const dbpricesimages = await res.json();
    setPrices(dbpricesimages.prices);
    setImages(dbpricesimages.images);
  };

  useEffect(() => {
    getPrices();
  }, []);

  // const [slogan, setSlogan] = useState([]);

  // useEffect(() => {
  //   let count = -1;
  //   const slog = [
  //     "Here ",
  //     "you're ",
  //     "gonna ",
  //     "do ",
  //     "the ",
  //     "best ",
  //     "nails ",
  //     "in ",
  //     "BC!",
  //   ];
  //   const interval = setInterval(() => {
  //     if (count < slog.length - 1) {
  //       count += 1;
  //       setSlogan((s) => [...s, slog[count]]);
  //     } else {
  //       count = 0;
  //       setSlogan([slog[count]]);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const slogan = [
    "Here ",
    "you're ",
    "gonna ",
    "do ",
    "the ",
    "best ",
    "nails ",
    "in ",
    "BC!",
  ];

  return (
    <main className={s.general}>
      <h1 className={s.maintitle}>
        Welcome to Mary's <br /> Nail Bar!
      </h1>
      <h2 className={s.secondarytitle}>
        <div className={s.secTitleDiv + " " + "hello"}>
          {slogan.map((item, index) => {
            return (
              <span
                className={s.sloganSpan}
                key={"slog__" + index}
                id={"slog_" + index}
              >
                {item}
              </span>
            );
          })}
        </div>
      </h2>
      <div className={s.pricelistHolder}>
        <h3 className={s.pricelistTitle1}>Pricelist</h3>
        <div className={s.pricelist}>
          {prices.map((pricelistItem) => (
            <div className={s.pricelistItem} key={pricelistItem._id}>
              <div className={s.pricelistItemImgCont}>
                <img
                  className={s.pricelistItemImg}
                  src={pricelistItem.image}
                  alt={pricelistItem.image}
                />
              </div>
              <div>
                <h3 className={s.pricelistItemName}>{pricelistItem.title}</h3>
                <p className={s.pricelistItemDesc}>
                  {pricelistItem.description}
                </p>
                <span className={s.pricelistItemPrice}>
                  {pricelistItem.additional && "+"}
                  {pricelistItem.price + "$"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OpenModalBtn modalAction={props.modalAction} />
      <div className={s.gallery}>
        <h2>Gallery</h2>
        <div className={s.photos}>
          {images.map((item) => (
            <div className={s.imagediv} key={item._id}>
              <img className={s.image} src={item.image} alt={item.image} />
            </div>
          ))}
        </div>
      </div>
      <OpenModalBtn modalAction={props.modalAction} />
      <Review />
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
