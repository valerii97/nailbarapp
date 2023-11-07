import { useState, useEffect } from "react";
import s from "../static/styles/gallery.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imgcounter, setImgcounter] = useState(1);
  const [numberOfPhotosToDisplay, setNumberOfPhotosToDisplay] = useState(1);

  const getGalleryImages = async () => {
    const res = await fetch("reservations/get-images");
    const dbImgs = await res.json();
    setImages(dbImgs);
  };

  useEffect(() => {
    getGalleryImages();
    if (window.innerWidth > 1006) {
      setNumberOfPhotosToDisplay(3);
    } else if (window.innerWidth <= 1006 && window.innerWidth > 730) {
      setNumberOfPhotosToDisplay(2);
    } else {
      setNumberOfPhotosToDisplay(1);
    }
  }, []);

  const leftArrowHandler = (e) => {
    e.preventDefault();
    setImgcounter((prev) => prev - 1);
  };

  const rightArrowHandler = (e) => {
    e.preventDefault();
    setImgcounter((prev) => prev + 1);
  };

  return (
    <div className={s.gallery}>
      <h2>Gallery</h2>
      <div className={s.galleryBtnsHolder}>
        {imgcounter > 1 && (
          <BsFillArrowLeftCircleFill
            size={30}
            className={s.leftArrow}
            onClick={leftArrowHandler}
          />
        )}
        {imgcounter < Math.floor(images.length / numberOfPhotosToDisplay) && (
          <BsFillArrowRightCircleFill
            size={30}
            className={s.rightArrow}
            onClick={rightArrowHandler}
          />
        )}
      </div>
      <div className={s.photos}>
        {images.map((item, index) => (
          <div
            className={
              index < numberOfPhotosToDisplay * imgcounter &&
              index >= numberOfPhotosToDisplay * (imgcounter - 1)
                ? s.imagediv
                : s.imagediv + " " + s.hiddenimagediv
            }
            key={item._id}
          >
            <img className={s.image} src={item.image} alt={item.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
