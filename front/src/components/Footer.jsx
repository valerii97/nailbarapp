import React from "react";
import s from "./Footer.module.css";
import Modal from "./Modal";

const Footer = (props) => {
  const { switcher, closeModal } = props;
  return (
    <footer className={s.general}>
      {switcher && <Modal closeModal={closeModal} />}
      Mary's Nail Studio, 2023
    </footer>
  );
};

export default Footer;
