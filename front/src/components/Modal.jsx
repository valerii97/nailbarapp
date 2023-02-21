import React, { useEffect, useState } from "react";
import s from "./modal.module.css";

import Calendar from "./Calendar";

const Modal = (props) => {
  // loading and processing of available dates
  const [availableDates, setAvailableDates] = useState(null);
  const [pickedDate, setPickedDate] = useState(null);
  const [dateValidationMessage, setDateValidationMessage] = useState(false);

  const fetchData = async () => {
    const response = await fetch("/reservations/available");
    const newData = await response.json();
    setAvailableDates(newData);
  };

  // loading dates
  useEffect(() => {
    fetchData();
  }, []);

  // for phone input
  const [phoneValue, setPhoneValue] = useState("");

  // request to make new reservation
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

  // on submit of reservation form event
  const submitReservationHandler = async (e) => {
    e.preventDefault();
    if (pickedDate) {
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        pickedDate: pickedDate,
      };
      await makeReservation(data);
      props.closeModal(false);
    } else {
      setDateValidationMessage(true);
    }
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
            <Calendar
              avDates={availableDates}
              chooseDate={setPickedDate}
              enableDateValidationMessage={setDateValidationMessage}
            />
            <div
              className={
                dateValidationMessage
                  ? s.validationMessage + " " + s.failed
                  : s.validationMessage
              }
            >
              Please, pick one of the dates!
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
