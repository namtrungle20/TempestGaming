import React from "react";
import { Carousel } from "react-bootstrap";

import TempestGaming from "../assets/images/backgroupTempet.png";

function CarouselCard() {
  return (
    <Carousel data-bs-theme="primary">
      <Carousel.Item>
        <img className="d-block w-100" src={TempestGaming} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={TempestGaming} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={TempestGaming} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}
export default CarouselCard;
