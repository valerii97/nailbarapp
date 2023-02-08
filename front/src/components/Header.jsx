import React from "react";
import { useState, useEffect } from "react";
import logoimg from "./logo1.jpg";
import s from "./Header.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaPhoneSquareAlt } from "react-icons/fa";
import OpenModalBtn from "./OpenModalBtn";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (props) => {
  const [navbar, setNavbar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const changeNavbarOpacity = () => {
    if (window.scrollY >= 90) {
      setNavbar(true);
      props.changebtnbgcolor("#D18A3A");
    } else {
      props.changebtnbgcolor("#D6AB7E");
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarOpacity);
  }, []);

  const createSchedule = async () => {
    await fetch("/createSchedule");
  };

  const runCreateSchedule = (e) => {
    e.preventDefault();
    createSchedule();
  };

  const openCallbackModal = (e) => {
    e.preventDefault();
    props.callbackModal(true);
  };

  return (
    <header className={navbar ? s.general + " " + s.active : s.general}>
      <div
        className={
          openMenu ? s.logoholder + " " + s.logoholderopen : s.logoholder
        }
      >
        <img className={s.logoimg} src={logoimg} alt="logo" />
        <span className={s.logoname}>
          Mary's <br /> Nail Bar
        </span>
      </div>
      <div
        className={openMenu ? s.contacts + " " + s.contactsopen : s.contacts}
      >
        <div className={s.phone}>
          <div className={s.phoneinside}>
            <div>
              <FaPhoneSquareAlt size={30} />
            </div>
            <div>+1 778 834 2623</div>
          </div>
          <div>
            <button
              style={{ backgroundColor: props.btnbgcolor }}
              onClick={openCallbackModal}
            >
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
            <FaFacebookSquare size={35} />
          </a>
          <a
            href="https://instagram.com/vygornytskaya"
            target="_blank"
            rel="noreferrer"
            className={s.instalink}
          >
            <GrInstagram size={35} />
          </a>
        </div>

        <OpenModalBtn
          modalAction={props.modalAction}
          btnbgcolor={props.btnbgcolor}
        />
      </div>
      <div className={s.burgericon}>
        <GiHamburgerMenu
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          size={25}
        />
      </div>
      <div className={s.forScheduleCreation}>
        <button onClick={runCreateSchedule}>
          Create <br /> schedule
        </button>
      </div>
    </header>
  );
};

export default Header;
