import { useState } from "react";
import s from "../static/styles/modal.module.css";

const CallbackModal = (props) => {
  const fetchData = async (data) => {
    try {
      const response = await fetch("/reservations/callmeback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      });
      await response.json().then((r) => {
        console.log(r.message);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const callMeBackHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      callbackphoneinput: e.target.callbackphoneinput.value,
    };
    await fetchData(data);
    props.closeModal(false);
  };

  const [phoneValue, setPhoneValue] = useState("");

  return (
    <div className={s.modalBackground}>
      <div className={s.modalContainer}>
        <button
          className={s.closeBtn}
          onClick={(e) => {
            e.preventDefault();
            props.closeModal(false);
          }}
        >
          X
        </button>
        <h3>
          Please, leave your number here and we will call you back in a few
          minutes!
        </h3>
        <div className={s.formHolder}>
          <form className={s.callbackForm} onSubmit={callMeBackHandler}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="input6"
                placeholder="Pls, enter your name."
                required
              />
            </div>
            <div>
              <label htmlFor="callbackphoneinput">Phone:</label>
              <input
                name="callbackphoneinput"
                type="tel"
                placeholder="Pls, enter your phone here."
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
                maxLength="12"
                minLength="12"
                id="modal5"
                required
              />
            </div>
            <div>
              <input type="submit" value="Call me back!" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;
