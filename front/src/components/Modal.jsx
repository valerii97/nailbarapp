import React, { useEffect, useState } from "react";
import s from "./modal.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Modal = (props) => {
  //highlight which date is picked
  const pickDateandTime = (e) => {
    Array.from(document.querySelectorAll("." + s.dateTimeSpan)).forEach(
      (item) => {
        item.classList.remove(s.pickedDateTime);
      }
    );
    e.currentTarget.classList.add(s.pickedDateTime);

    const time = e.currentTarget
      .closest("div")
      .querySelector("div")
      .querySelectorAll("span");
    document.querySelectorAll("." + s.open).forEach((item) => {
      item.classList.remove(s.open);
    });
    time.forEach((item) => {
      item.classList.add(s.open);
    });
    scaleOtherDates(e);
  };

  const scaleOtherDates = (e) => {
    const otherDates = document.querySelectorAll("." + s.dateDiv);
    console.log(e.currentTarget.closest("div"));
    otherDates.forEach((item) => {
      if (item !== e.currentTarget.closest("div")) {
        item.classList.add(s.scaled);
      }
    });
    e.currentTarget.closest("div").classList.remove(s.scaled);
  };

  // buttons for date pagination control
  const [btnstate, setBtnstate] = useState(0);

  const handleBtnLeft = (e) => {
    e.preventDefault();
    setBtnstate(btnstate - 1);
  };

  const handleBtnRight = (e) => {
    e.preventDefault();
    setBtnstate(btnstate + 1);
  };

  // loading and processing of available dates
  const [availableDates, setAvailableDates] = useState(null);
  const [someshit, setSomeshit] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/reservations/available");
    const newData = await response.json();
    setAvailableDates(newData);

    // creating more comfortable data structure
    const processedDates = [];
    const checkDates = [];
    const weekarr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    await newData.forEach((item) => {
      const date = new Date(item.date);
      if (!checkDates.includes(date.getDate())) {
        processedDates.push({
          date: date.getDate(),
          weekday: weekarr[date.getDay()],
          time: [{ hours: date.getHours(), minutes: date.getMinutes() }],
        });
      } else {
        processedDates
          .slice(-1)[0]
          .time.push({ hours: date.getHours(), minutes: date.getMinutes() });
      }
      checkDates.push(date.getDate());
    });
    setSomeshit(processedDates);
  };

  // used for old data structure
  const getDate = (stringDate) => {
    const weekarr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(stringDate);
    const res = { date: date.getDate(), weekday: weekarr[date.getDay()] };
    return res;
  };

  // loading dates
  useEffect(() => {
    fetchData();
  }, []);

  // pagination control, how much dates you want to see on one page
  const datePagination = 4;

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
              {someshit?.length / datePagination - btnstate > 1 && (
                <button onClick={handleBtnRight} className={s.cntrlBtnRight}>
                  <BsFillArrowRightCircleFill size={25} />
                </button>
              )}
            </div>
            <div className={s.datePick}>
              {someshit
                ?.slice(
                  0 + btnstate * datePagination,
                  datePagination + btnstate * datePagination
                )
                .map((date) => (
                  <div key={date.date} className={s.dateDiv}>
                    <input
                      type="radio"
                      id={date.date}
                      name="pickedDate"
                      value={date.date}
                      className={s.dateTimeInput}
                      required
                    />
                    <label
                      htmlFor={date.date}
                      onClick={pickDateandTime}
                      className={s.dateTimeSpan}
                    >
                      <figure className={s.calendarIcon}>
                        <header>{date.weekday}</header>
                        <section>{date.date}</section>
                      </figure>
                    </label>
                    <div className={s.availableTime}>
                      {date.time.map((item) => (
                        <span>
                          {item.hours}:{item.minutes}
                        </span>
                      ))}
                    </div>
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
