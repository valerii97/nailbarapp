import React from "react";
import s from "./OpenModalBtn.module.css";
import { BiCabinet } from "react-icons/bi";

const OpenModalBtn = (props) => {
  return (
    <div className={s.modalBtnWrapper}>
      <div className={s.general} style={{ backgroundColor: props.btnbgcolor }}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.modalAction(true);
          }}
          className={s.appointmentlink}
        >
          {" "}
          <span className={s.appointmenticon}>
            <BiCabinet />
          </span>{" "}
          <span>
            Make an <br /> appointment
          </span>{" "}
        </a>
      </div>
    </div>
  );
};

export default OpenModalBtn;
