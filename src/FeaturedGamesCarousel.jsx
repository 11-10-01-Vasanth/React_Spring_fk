import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import { Skeleton, Box } from "@mui/material";

export default function FeaturedGamesCarousel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2001/admin/getAll/0/100"
        );
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(response.data.content);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="80vh"
            />
            <Carousel.Caption
              style={{
                bottom: "20px",
                padding: "10px",
                borderRadius: "5px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                width="60%"
                height={40}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="80%"
                height={30}
              />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Carousel
      data-bs-theme="dark"
      prevIcon={
        <span style={prevIconStyle}>
          <ArrowLeftSharpIcon style={{ fontSize: "5rem" }} />
        </span>
      }
      nextIcon={
        <span style={nextIconStyle}>
          <ArrowRightSharpIcon style={{ fontSize: "5rem" }} />
        </span>
      }
    >
      {data.map((fg, index) => (
        <Carousel.Item key={index}>
          {/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv)$/i.test(fg.trending.video1Url) ? (
            <>
              <div className="row">
                <div className="col">
                  <video
                    className="d-block w-100"
                    style={{
                      height: "80vh",
                      objectFit: "fill", // Adjust this to maintain pixel rate without cutting off edges
                    }}
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={`http://localhost:2001/uploads/${fg.trending.video1Url}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="col">
                  <video
                    className="d-block w-100"
                    style={{
                      height: "80vh",
                      objectFit: "fill", // Adjust this to maintain pixel rate without cutting off edges
                    }}
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={`http://localhost:2001/uploads/${fg.trending.video2Url}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="col">
                  <video
                    className="d-block w-100"
                    style={{
                      height: "80vh",
                      objectFit: "fill", // Adjust this to maintain pixel rate without cutting off edges
                    }}
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={`http://localhost:2001/uploads/${fg.trending.video3Url}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </>
          ) : /\.(jpg|jpeg|png|gif|svg|bmp|tiff|webp)$/i.test(fg.gameimage) ? (
            // Check if the gameimage is an image
            <img
              src={`http://localhost:2001/uploads/${fg.gameimage}`}
              className="d-block w-100"
              style={{
                height: "80vh",
                objectFit: "fill", // Ensures image covers without loss of quality
              }}
              alt={fg.gametitle}
            />
          ) : (
            // Optional: Message for unsupported files
            <p>Unsupported file type.</p>
          )}

          {/* Carousel Caption */}
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
