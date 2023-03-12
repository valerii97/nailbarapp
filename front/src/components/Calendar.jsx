import { useState } from "react";
import s from "../static/styles/calendar.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useEffect } from "react";
import nail_animation from "../static/images/nail_animation.gif";

const Calendar = ({
  avDates,
  chooseDate,
  disableDateValidationMessage,
  valid_messages,
}) => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const monthsAhead = 2;

  const monthNameArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septermber",
    "October",
    "November",
    "December",
  ];

  const weekdaysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const createCalendar = (year, month) => {
    const monthsarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const newdate = new Date(year, monthsarr[month], 0);
    const firstWeekdayOfMonth = new Date(
      year,
      monthsarr[month] - 1,
      1
    ).getDay();

    const datesarr = [];

    for (let i = 0; i < 6; i++) {
      datesarr.push([]);
      for (let j = 1; j < 8; j++) {
        let dayOfMonthOffset = i + j + i * 6 - firstWeekdayOfMonth;
        if (dayOfMonthOffset <= newdate.getDate() && dayOfMonthOffset > 0) {
          datesarr[i].push(dayOfMonthOffset);
        } else {
          datesarr[i].push(null);
        }
      }
    }
    return [datesarr, newdate];
  };

  const allMonthCalendar = [];

  for (let i = now.getMonth(); i <= now.getMonth() + monthsAhead; i++) {
    allMonthCalendar.push(createCalendar(2023, i));
  }

  useEffect(() => {
    if (month <= now.getMonth()) {
      document.querySelector("." + s.leftArrow1).classList.add(s.hide);
    } else {
      document.querySelector("." + s.leftArrow1).classList.remove(s.hide);
    }
    if (month >= now.getMonth() + monthsAhead) {
      document.querySelector("." + s.rightArrow).classList.add(s.hide);
    } else {
      document.querySelector("." + s.rightArrow).classList.remove(s.hide);
    }

    // eslint-disable-next-line
  }, [month]);

  useEffect(() => {
    const activeMonth = document.querySelector("." + s.active);
    const thsArr = activeMonth
      .querySelector("tbody")
      .querySelectorAll('th[data-empty="no"');
    thsArr.forEach((item) => {
      if (month === now.getMonth()) {
        if (now.getHours() > 13) {
          if (Number(item.innerText) <= now.getDate()) {
            item.classList.add(s.notAvailableDate);
          }
        } else {
          if (Number(item.innerText) < now.getDate()) {
            item.classList.add(s.notAvailableDate);
          }
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const activeMonth = document.querySelector("." + s.active);
    const loadingScreen = document.querySelector("." + s.loading);

    setTimeout(() => {
      if (avDates) {
        filterByAvDates(avDates, activeMonth);
        activeMonth.classList.remove(s.loadingDates);
        loadingScreen.classList.add(s.hideLoading);
      }
    }, 500);
  });

  const leftArrowHandler = (e) => {
    e.preventDefault();
    setMonth((prev) => prev - 1);
    cleanSelectedDate();
    chooseDate(null);
  };

  const rightArrowHandler = (e) => {
    e.preventDefault();
    setMonth((prev) => prev + 1);
    cleanSelectedDate();
    chooseDate(null);
  };

  const filterByAvDates = (availableDates, activeMonth) => {
    const thsArr = activeMonth
      .querySelector("tbody")
      .querySelectorAll('th[data-empty="no"');
    thsArr.forEach((item) => {
      if (availableDates) {
        availableDates.forEach((date) => {
          let itemDate = new Date(date.date);
          if (month === itemDate.getMonth()) {
            // i've put slice here, because when we have a time picked, it counts inner span with time as innerText as well
            if (itemDate.getDate() === Number(item.innerText.slice(0, 2))) {
              item.classList.add(s.availableDates);
            }
          }
        });
      }
    });
  };

  const [pickedDate, setPickedDate] = useState(null);
  const [availTime, setAvailTime] = useState([]);

  const datePickHandler = (e) => {
    e.preventDefault();
    const timePickerDiv = document.querySelector("." + s.timePicker1);
    timePickerDiv.classList.add(s.showTimePicker);
    const activeMonth = document.querySelector("." + s.active);
    activeMonth.classList.add(s.bluredSlide);
    setPickedDate(e.target);

    if (avDates) {
      let hoursmins = [];
      avDates.forEach((item) => {
        let date = new Date(item.date);
        if (month === date.getMonth()) {
          // i've put slice here, because when we have a time picked, it counts inner span with time as innerText as well
          if (Number(e.target.innerText.slice(0, 2)) === date.getDate()) {
            hoursmins.push([
              date.getHours(),
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes(),
              item._id,
            ]);
          }
        }
      });
      setAvailTime(hoursmins);
    }
  };

  const closeTimePicker = (e) => {
    e.preventDefault();
    const timePickerDiv = e.target.closest("." + s.timePicker1);
    timePickerDiv.classList.remove(s.showTimePicker);
    const activeMonth = document.querySelector("." + s.active);
    activeMonth.classList.remove(s.bluredSlide);
  };

  const timePickHandler = (e) => {
    e.preventDefault();
    closeTimePicker(e);
    cleanSelectedDate();
    const innerSpan = pickedDate.querySelector("span");
    innerSpan.innerText = e.target.innerText;
    chooseDate(e.target.id);
    disableDateValidationMessage((oldArr) =>
      oldArr.filter((item) => item !== valid_messages.date)
    );
    pickedDate.classList.add(s.pickedDateandTime);
  };

  const cleanSelectedDate = () => {
    const activeMonth = document.querySelector("." + s.active);
    activeMonth
      .querySelector("tbody")
      .querySelectorAll("th")
      .forEach((item) => {
        item.classList.remove(s.pickedDateandTime);
      });
    activeMonth.querySelectorAll("span").forEach((item) => {
      item.innerText = "";
    });
  };

  return (
    <div className={s.main}>
      <h2>Caledar 2023</h2>
      <div>
        <div className={s.arrowsHolder}>
          <BsFillArrowLeftCircleFill
            size={25}
            className={s.leftArrow1}
            onClick={leftArrowHandler}
          />
          <BsFillArrowRightCircleFill
            size={25}
            className={s.rightArrow}
            onClick={rightArrowHandler}
          />
        </div>
        <div className={s.calTableHolder}>
          <div className={s.loading}>
            <img src={nail_animation} alt="gifka" />
          </div>
          <div className={s.timePicker1}>
            <button
              className={s.btn + " " + s.btnClose}
              onClick={closeTimePicker}
            >
              X
            </button>
            <p>Please, choose time of your visit: </p>
            <div>
              {availTime?.map((item, index) => {
                return (
                  <span onClick={timePickHandler} key={item[2]} id={item[2]}>
                    {item[0]}:{item[1]}
                  </span>
                );
              })}
            </div>
          </div>
          {allMonthCalendar.map((item, index) => {
            return (
              <div
                className={
                  month === item[1].getMonth()
                    ? s.slider + " " + s.active + " " + s.loadingDates
                    : item[1].getMonth() < month
                    ? s.slider + " " + s.prevSlide
                    : item[1].getMonth() > month
                    ? s.slider + " " + s.nextSlide
                    : s.slider
                }
                id={item[1].getMonth()}
                key={"this_is_key_for_months_arr" + index}
              >
                <h2>{monthNameArr[item[1].getMonth()]}</h2>
                <table className={s.calTable}>
                  <thead>
                    <tr>
                      {weekdaysArr.map((item) => {
                        return <th key={item + "_weekdays"}>{item}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {item[0].map((row, row_index) => {
                      return (
                        <tr key={row_index + "_week"}>
                          {row.map((col, col_index) => {
                            return (
                              <th
                                data-empty={col ? "no" : "yes"}
                                key={col_index + "_dayofmonth"}
                                onClick={
                                  month !== now.getMonth()
                                    ? datePickHandler
                                    : col > now.getDate()
                                    ? datePickHandler
                                    : col === now.getDate() &&
                                      now.getHours() < 13
                                    ? datePickHandler
                                    : (e) => {
                                        e.preventDefault();
                                      }
                                }
                              >
                                {col}
                                <span></span>
                              </th>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
