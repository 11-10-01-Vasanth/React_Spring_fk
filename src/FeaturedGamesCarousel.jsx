import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Button from "react-bootstrap/Button";

export default function FeaturedGamesCarousel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const customIconStyle = {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    backgroundSize: "cover",
  };

  const prevIconStyle = {
    ...customIconStyle,
  };

  const nextIconStyle = {
    ...customIconStyle,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:2001/admin/getAll/${page}/10`)
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages); // Assuming your API returns totalPages
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [page]); // Re-run the effect when page changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <>
      <Carousel
        data-bs-theme="dark"
        prevIcon={
          <span style={prevIconStyle}>
            <ArrowLeftSharpIcon onClick={handlePrevPage}
          disabled={page === 0} style={{ fontSize: "5rem" }} />
          </span>
        }
        nextIcon={
          <span style={nextIconStyle}>
            <ArrowRightSharpIcon onClick={handleNextPage}
          disabled={page === totalPages - 1} style={{ fontSize: "5rem" }} />
          </span>
        }
      >
        {data.map((fg, index) => (
          <Carousel.Item key={index}>
            <img
              src={`http://localhost:2001/uploads/${fg.gameimage}`}
              className="d-block w-100 img-fluid"
              style={{ height: "80vh", width: "100%" }}
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
      {/* <div className="d-flex justify-content-center mt-3">
        <Button
          variant="primary"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          
          className="ms-2"
        >
          Next
        </Button>
      </div> */}
    </>
  );
}
