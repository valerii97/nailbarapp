import s from "../static/styles/content.module.css";
import location from "../static/images/location.jpg";

const Contacts = () => {
  return (
    <div className={s.contacts}>
      <h2>We are here!</h2>
      <div className={s.map}>
        <a
          href="https://www.google.com/maps/place/770+Creekside+Crescent,+Gibsons,+BC+V0N+1V9/@49.4111628,-123.5113684,17z/data=!3m1!4b1!4m5!3m4!1s0x54863fb929286a29:0xcbd8b02c455ccf72!8m2!3d49.4111628!4d-123.5091798"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={location} alt="Location" />
        </a>
      </div>
      <p className={s.address}> 770 Creekside Cres, Gibsons, BC</p>
      <p className={s.phonenumber}>+1 778 834 2623</p>
    </div>
  );
};

export default Contacts;
