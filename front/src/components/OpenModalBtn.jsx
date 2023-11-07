import s from "../static/styles/openModalBtn.module.css";
import { BiCabinet } from "react-icons/bi";

const OpenModalBtn = (props) => {
  return (
    <div
      className={s.modalBtnWrapper}
      onClick={(e) => {
        e.preventDefault();
        props.modalAction(true);
      }}
    >
      <div className={s.general}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
          className={s.appointmentlink}
        >
          {" "}
          <span className={s.appointmenticon}>
            <BiCabinet />
          </span>{" "}
          <span style={{ fontSize: props.fontSize }}>
            Make an <br /> appointment
          </span>{" "}
        </a>
      </div>
    </div>
  );
};

export default OpenModalBtn;
