import React, { useEffect, useState } from "react";
import s from "./Modal.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Modal = (props) => {
  const pickDateandTime = (e) => {
    Array.from(document.querySelectorAll("." + s.pickedDateTime)).forEach(
      (item) => {
        item.classList.remove(s.pickedDateTime);
      }
    );
    e.currentTarget.classList.add(s.pickedDateTime);
  };

  const [btnstate, setBtnstate] = useState(0);

  const handleBtnLeft = (e) => {
    e.preventDefault();
    setBtnstate(btnstate - 1);
  };

  const handleBtnRight = (e) => {
    e.preventDefault();
    setBtnstate(btnstate + 1);
  };

  const [availableDates, setAvailableDates] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/reservations/available");
    const newData = await response.json();
    setAvailableDates(newData);
  };

  const getDate = (stringDate) => {
    return new Date(stringDate).toLocaleString();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const datePagination = 6;

  const [phoneValue, setPhoneValue] = useState("");

  const makeReservation = async (data) => {
    try {
      const response = await fetch("/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json().then((r) => {
        console.log(r.message);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const submitReservationHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      pickedDate: e.target.pickedDate.value,
    };
    await makeReservation(data);
    props.closeModal(false);
  };

  return (
    <div className={s.modalBackground}>
      <div className={s.modalContainer}>
        <button
          className={s.closeBtn}
          onClick={() => {
            props.closeModal(false);
          }}
        >
          X
        </button>
        <h3>Hello, here you can book an appointment!</h3>
        <div className={s.formHolder}>
          <form onSubmit={submitReservationHandler}>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                id="modal1"
                placeholder="Please, enter your name."
                required
              />
            </div>
            <div>
              <label htmlFor="email">E-mail: </label>
              <input
                type="email"
                name="email"
                id="modal2"
                placeholder="Please, enter your e-mail."
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone: </label>
              <input
                onKeyUp={(e) => {
                  if (
                    e.key !== "Backspace" &&
                    (e.target.value.length === 3 || e.target.value.length === 7)
                  ) {
                    e.target.value += "-";
                  }
                }}
                onChange={(e) => {
                  const re = /^[0-9.-]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setPhoneValue(e.target.value);
                  }
                }}
                value={phoneValue}
                type="tel"
                name="phone"
                maxLength="12"
                minLength="12"
                id="modal3"
                placeholder="Please, enter your phone."
                required
              />
            </div>
            <h4>Please, pick date and time: </h4>
            <div className={s.datesControlBtnsHolder}>
              {btnstate > 0 && (
                <button onClick={handleBtnLeft} className={s.cntrlBtnLeft}>
                  <BsFillArrowLeftCircleFill size={25} />
                </button>
              )}
              {availableDates?.length / datePagination - btnstate > 1 && (
                <button onClick={handleBtnRight} className={s.cntrlBtnRight}>
                  <BsFillArrowRightCircleFill size={25} />
                </button>
              )}
            </div>
            <div className={s.datePick}>
              {availableDates
                ?.slice(
                  0 + btnstate * datePagination,
                  datePagination + btnstate * datePagination
                )
                .map((date) => (
                  <div key={date._id}>
                    <input
                      type="radio"
                      id={date._id}
                      name="pickedDate"
                      value={date._id}
                      className={s.dateTimeInput}
                      required
                    />
                    <label
                      htmlFor={date._id}
                      onClick={pickDateandTime}
                      className={s.dateTimeSpan}
                    >
                      {getDate(date.date)}
                    </label>
                  </div>
                ))}
            </div>
            <div>
              <input type="submit" value="Let's go!" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
