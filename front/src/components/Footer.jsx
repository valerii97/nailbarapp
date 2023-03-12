import s from "../static/styles/footer.module.css";
import Modal from "./Modal";

const Footer = ({ switcher, closeModal, prices }) => {
  return (
    <footer className={s.general}>
      {switcher && <Modal closeModal={closeModal} priceLists={prices} />}
      <p className={s.inc}>Maria's Nail Studio, 2023</p>
    </footer>
  );
};

export default Footer;
