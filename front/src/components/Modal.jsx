import { useEffect, useState } from "react";
import s from "../static/styles/modal.module.css";
import Calendar from "./Calendar";
import { AiOutlineCaretDown, AiOutlineCloseCircle } from "react-icons/ai";

const Modal = (props) => {
  // object with validation messages
  const validation_messages = {
    service: "Please, chose one of the services.",
    date: "Please, chose one of the dates.",
  };

  // loading and processing of available dates
  const [availableDates, setAvailableDates] = useState(null);
  const [pickedDate, setPickedDate] = useState(null);
  const [validationMessage, setValidationMessage] = useState([]);
  const [dropMenu, setDropMenu] = useState(false);
  const [chosenServices, setChosenServices] = useState([]);

  const getAvailableDates = async () => {
    const response = await fetch("/reservations/available");
    const newData = await response.json();
    setAvailableDates(newData);
  };

  // loading dates
  useEffect(() => {
    getAvailableDates();
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
    if (pickedDate && chosenServices.length > 0) {
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        services: chosenServices.join(";\n "),
        pickedDate: pickedDate,
      };
      await makeReservation(data);
      props.closeModal(false);
    } else if (chosenServices.length === 0) {
      if (!validationMessage.includes(validation_messages.service)) {
        setValidationMessage((oldArr) => [
          ...oldArr,
          validation_messages.service,
        ]);
      }
    } else {
      if (!validationMessage.includes(validation_messages.date)) {
        setValidationMessage((oldArr) => [...oldArr, validation_messages.date]);
      }
    }
  };

  const dropdownBtnHandler = (e) => {
    e.preventDefault();
    setDropMenu(!dropMenu);
  };

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setChosenServices((oldArray) => [...oldArray, e.target.value]);
      //disabling validation message for services
      setValidationMessage((oldArr) =>
        oldArr.filter((item) => item !== validation_messages.service)
      );
    } else {
      setChosenServices(
        chosenServices.filter((item) => item !== e.target.value)
      );
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
            <div className={s.dropDownMenuDiv}>
              <span className={s.servicesTitle} onClick={dropdownBtnHandler}>
                Select service
                {dropMenu && (
                  <AiOutlineCloseCircle
                    className={s.dropBtn}
                    size={25}
                    onClick={dropdownBtnHandler}
                  />
                )}
                {!dropMenu && (
                  <AiOutlineCaretDown
                    className={s.dropBtn}
                    size={25}
                    onClick={dropdownBtnHandler}
                  />
                )}
              </span>
              <ul
                className={
                  dropMenu ? s.services + " " + s.openDropMenu : s.services
                }
              >
                {props.priceLists.map((item, index) => {
                  return (
                    <li key={"dropDownMenu" + index}>
                      <input
                        type="checkbox"
                        name="services"
                        id={"serv" + index}
                        value={item.title}
                        onClick={checkBoxHandler}
                      />
                      <label htmlFor={"serv" + index}>{item.title}</label>
                    </li>
                  );
                })}
              </ul>
              <div className={s.chosenServicesDiv}>
                {chosenServices.length > 0 &&
                  chosenServices.map((item, index) => {
                    return (
                      <span
                        className={s.checkedServices}
                        key={"chosenItem" + index}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
            <h4>Please, pick date and time: </h4>
            <Calendar
              avDates={availableDates}
              chooseDate={setPickedDate}
              disableDateValidationMessage={setValidationMessage}
              valid_messages={validation_messages}
            />
            <div
              className={
                validationMessage.length > 0
                  ? s.validationMessage + " " + s.failed
                  : s.validationMessage
              }
            >
              {validationMessage.map((item, index) => {
                return <span key={"validation_message" + index}>{item}</span>;
              })}
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
