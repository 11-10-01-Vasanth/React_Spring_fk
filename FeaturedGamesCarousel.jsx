import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const featuredGames = [
  {
    img: "https://cdn2.spatial.io/assets/v1/thumbnails/660d85089b55c7f7d734e83b/customThumbnail/r/6a7d5a32207bfee1058663c9c43692af714de01dce1fe08642cff9250c851df9/1720762121",
    title: "APEX",
    description:
      "BlueStacks app player is the best platform to play this Android game on your PC or Mac",
  },
];

export default function FeaturedGamesCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      {featuredGames.map((fg, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid"
            style={{ height: "100vh" }}
            src={fg.img}
            alt={fg.title}
          />
          <Carousel.Caption
            style={{
              bottom: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              borderRadius: "5px",
              color: "#fff",
            }}
          >
            <h5>{fg.title}</h5>
            <p>{fg.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
