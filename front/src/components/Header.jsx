import { useState } from "react";
import logoimg from "../static/images/logo1.jpg";
import s from "../static/styles/header.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaPhoneSquareAlt } from "react-icons/fa";
import OpenModalBtn from "./OpenModalBtn";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const openCallbackModal = (e) => {
    e.preventDefault();
    props.callbackModal(true);
  };

  return (
    <header className={s.general}>
      <div
        className={
          openMenu ? s.logoholder + " " + s.logoholderopen : s.logoholder
        }
      >
        <img className={s.logoimg} src={logoimg} alt="logo" />
        <span className={s.logoname}>Maria's Nail Studio</span>
      </div>
      <div
        className={openMenu ? s.contacts + " " + s.contactsopen : s.contacts}
      >
        <div className={s.phone}>
          <div className={s.phoneinside}>
            <div>
              <FaPhoneSquareAlt size={45} />
            </div>
            <div>+1 778 834 2623</div>
          </div>
          <div>
            <button className={s.callMeBack} onClick={openCallbackModal}>
              Request call back!
            </button>
          </div>
        </div>
        <div>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className={s.facebooklink}
          >
            <FaFacebookSquare size={45} />
          </a>
          <a
            href="https://instagram.com/vygornytskaya"
            target="_blank"
            rel="noreferrer"
            className={s.instalink}
          >
            <GrInstagram size={45} />
          </a>
        </div>

        <OpenModalBtn modalAction={props.modalAction} />
      </div>
      <div className={s.burgericon}>
        <GiHamburgerMenu
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          size={25}
        />
      </div>
    </header>
  );
};

export default Header;
