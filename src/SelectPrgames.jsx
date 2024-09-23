import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";

export default function SelectPrgames() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getGameById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:2001/admin/getGameById/${id}`
      );
      if (res.data && res.data.length > 0) {
        setData(res.data[0]);
      } else {
        setError("No game data found.");
      }
    } catch (err) {
      setError("Error fetching game data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const gameid = localStorage.getItem("gameid");
    const name = localStorage.getItem("username");
    setUsername(name);

    if (gameid) {
      getGameById(gameid);
    } else {
      setError("No game ID found in localStorage.");
      setLoading(false);
    }
  }, []);

  const gameTemplate = (image, index) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 shadow-md transition-transform duration-200 hover:scale-105">
        <img
          src={`http://localhost:2001/uploads/${image}`}
          alt={`Game visual ${index + 1}`}
          className="w-full rounded-lg"
          style={{
            height: "50vh",
            objectFit: "cover",
            width: "100%",
          }}
        />
        {/* <h3 className="mt-4 text-light text-xl font-bold hover:text-blue-600 transition-colors duration-300">
          {headings[index]}
        </h3>
        <p className="text-light mt-2 px-4">{descriptions[index]}</p> */}
      </div>
    );
  };

  const headings = data.trending
    ? [
        data.trending.heading1,
        data.trending.heading2,
        data.trending.heading3,
      ].filter(Boolean)
    : [];

  const descriptions = data.trending
    ? [data.trending.descp1, data.trending.descp2, data.trending.descp3]
    : [];

  const images = data.trending
    ? [
        data.trending.img_vid5,
        data.trending.img_vid6,
        data.trending.img_vid7,
        data.trending.img_vid8,
        data.trending.img_vid9,
        data.trending.img_vid10,
      ].filter(Boolean)
    : []; // Filter out null values if trending data doesn't exist

  return (
    <div className="card mt-5" style={{ backgroundColor: "#121212" }}>
      {loading ? (
        <p>Loading game data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : images.length > 0 ? (
        <>
          <Carousel
            value={images.map((image, index) => ({ image, index }))}
            numVisible={3}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            circular
            autoplayInterval={3000} // Interval for autoplay
            itemTemplate={(item) => gameTemplate(item.image, item.index)}
            prevIcon={
              <i
                className="pi pi-angle-left"
                style={{
                  fontSize: "2rem",
                  color: "#fff",
                  borderRadius: "50%",
                }}
              />
            }
            nextIcon={
              <i
                className="pi pi-angle-right"
                style={{
                  fontSize: "2rem",
                  color: "#fff",
                  borderRadius: "50%",
                }}
              />
            }
            style={{
              overflow: "hidden", // Ensure no overflow
              position: "relative",
              transition: "transform 0.5s ease-in-out", // Inline transition style
            }}
          />

          {/* Display the preview image below the carousel */}
          {images.map((i) => (
            <>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <img
                  src={`http://localhost:2001/uploads/${i}`} // Use the first image for preview
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "8px",
                  }} // Adjust size and styling as needed
                />
              </div>
            </>
          ))}
        </>
      ) : (
        <p>No game data to display.</p>
      )}
    </div>
  );
}
