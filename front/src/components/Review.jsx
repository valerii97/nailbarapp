import React from "react";
import { useState } from "react";
import s from "./Review.module.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

function Review() {
  const rates = [1, 2, 3, 4, 5];

  const [rate, setRate] = useState(0);
  const [rateclicked, setRateclicked] = useState(false);

  const rateHandler = (e) => {
    if (!rateclicked) {
      setRate(e.target.closest("div").querySelector("input").value);
    }
  };

  const rateClickedHandler = (e) => {
    setRateclicked(true);
    setRate(e.target.closest("div").querySelector("input").value);
  };

  const sendReview = async (data) => {
    try {
      const req = await fetch("/reservations/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      });
      await req.json().then((r) => {
        console.log(r.message);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      rate: e.target.rate.value,
      feedback: e.target.feedback.value,
    };
    sendReview(data);
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.feedback.value = "";
    setRate(0);
    setRateclicked(false);
  };

  const [formHover, setFormHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className={s.general}>
      <h3 className={s.rateTitle}>Please, find few seconds to rate us!</h3>
      <div
        className={s.formHolder}
        onMouseEnter={() => {
          if (!inputFocus) {
            setFormHover(true);
          }
        }}
        onMouseLeave={() => {
          if (!inputFocus) {
            setFormHover(false);
          }
        }}
        onFocus={() => {
          setInputFocus(true);
          setFormHover(true);
        }}
        onBlur={() => {
          setInputFocus(false);
          setFormHover(false);
        }}
      >
        <div
          className={
            formHover
              ? s.slideEffect + " " + s.slideEffectActive
              : s.slideEffect
          }
        ></div>
        <form
          className={s.reviewForm}
          onSubmit={reviewSubmitHandler}
          method="POST"
        >
          <div className={s.gridInputs}>
            <label htmlFor="name">Name (optional): </label>
            <input type="text" name="name" />
          </div>
          <div className={s.gridInputs}>
            <label htmlFor="email">Email (optional): </label>
            <input type="email" name="email" />
          </div>
          <div
            className={s.flexInputs}
            onMouseLeave={() => {
              if (!rateclicked) {
                setRate(0);
              }
            }}
          >
            {rates.map((item) => (
              <div key={item + "stars"}>
                <label
                  htmlFor={item}
                  onMouseEnter={rateHandler}
                  onClick={rateClickedHandler}
                >
                  {rate >= item && <AiFillStar size={30} />}
                  {rate < item && <AiOutlineStar size={30} />}
                </label>
                <input
                  type="radio"
                  id={item}
                  name="rate"
                  value={item}
                  required
                />
              </div>
            ))}
          </div>
          <div className={s.gridInputs}>
            <label htmlFor="feedback">Feedback (optional): </label>
            <textarea name="feedback" rows={3}></textarea>
          </div>
          <div className={s.flexInputs}>
            <input type="submit" value="Send!" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Review;
