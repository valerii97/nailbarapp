import React from "react";
import { useState } from "react";
import logoimg from "./logo1.jpg";
import s from "./Header.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaPhoneSquareAlt } from "react-icons/fa";
import OpenModalBtn from "./OpenModalBtn";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (props) => {
  const [navbar, setNavbar] = useState(false);

  const changeNavbarOpacity = () => {
    if (window.scrollY >= 90) {
      setNavbar(true);
      props.changebtnbgcolor("#D18A3A");
    } else {
      props.changebtnbgcolor("#D6AB7E");
      setNavbar(false);
    }
    if (window.innerWidth <= 782) {
      const navMenu = document.querySelector("." + s.contacts);
      const logoHolder = document.querySelector("." + s.logoholder);
      logoHolder.style.justifyContent = "left";
      navMenu.style.display = "none";
    }
  };

  window.addEventListener("scroll", changeNavbarOpacity);

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

  const toggleNavMenu = () => {
    const navMenu = document.querySelector("." + s.contacts);
    const logoHolder = document.querySelector("." + s.logoholder);
    if (navMenu.style.display === "none") {
      logoHolder.style.justifyContent = "center";
      navMenu.style.display = "flex";
    } else {
      logoHolder.style.justifyContent = "left";
      navMenu.style.display = "none";
    }
  };

  return (
    <header className={navbar ? s.active : s.general}>
      <div className={s.logoholder}>
        <img className={s.logoimg} src={logoimg} alt="logo" />
        <span className={s.logoname}>
          Mary's <br /> Nail Bar
        </span>
      </div>
      <div className={s.contacts}>
        <div className={s.phone}>
          <div className={s.phoneinside}>
            <div>
              <FaPhoneSquareAlt size={30} />
            </div>
            <div>+1-604-343-2222</div>
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
          <a href="https://www.facebook.com/" className={s.facebooklink}>
            <FaFacebookSquare size={35} />
          </a>
          <a href="https://www.instagram.com/" className={s.instalink}>
            <GrInstagram size={35} />
          </a>
        </div>

        <OpenModalBtn
          modalAction={props.modalAction}
          btnbgcolor={props.btnbgcolor}
        />
      </div>
      <div className={s.burgericon}>
        <GiHamburgerMenu onClick={toggleNavMenu} size={25} />
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
