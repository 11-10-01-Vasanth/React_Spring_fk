import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export default function FeaturedGamesCarousel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:2001/admin/getAll/${page}/1`)
      .then((response) => {
        setData(response.data.content);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Carousel data-bs-theme="dark">
      {data.map((fg, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid"
            style={{ height: "100vh" }}
            src={fg.gameimage}
            alt={fg.gametitle}
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
            <h5>{fg.gametitle}</h5>
            <p>{fg.gamedescription}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
