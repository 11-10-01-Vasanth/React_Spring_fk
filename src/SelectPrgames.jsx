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

  const cimages = data.trending
    ? [
        data.trending.img_vid5,
        data.trending.img_vid6,
        data.trending.img_vid7,
        data.trending.img_vid8,
        data.trending.img_vid9,
        data.trending.img_vid10,
      ].filter(Boolean)
    : []; // Filter out null values if trending data doesn't exist

  const c1images = data.trending
    ? [
        data.trending.img_vid11,
        data.trending.img_vid12,
        data.trending.img_vid13,
        data.trending.img_vid14,
        data.trending.img_vid15,
        data.trending.img_vid16,
      ].filter(Boolean)
    : []; // Filter out null values if trending data doesn't exist

  return (
    <div className="card mt-5" style={{ backgroundColor: "#121212" }}>
      {loading ? (
        <p>Loading game data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cimages.length > 0 ? (
        <>
          <Carousel
            value={cimages.map((image, index) => ({ image, index }))}
            numVisible={3}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            circular
            autoplayInterval={3000} // Interval for autoplay
            itemTemplate={(item) => gameTemplate(item.image, item.index)}
            showIndicators={false} // Hide the pagination dots below the carousel
            style={{
              overflow: "hidden", // Ensure no overflow
              position: "relative",
              transition: "transform 0.5s ease-in-out", // Inline transition style
            }}
          />
          <div
            className="mb-5"
            style={{
              position: "relative",
              width: "100%",
              height: "100vh",
              overflow: "hidden", // Ensure no overflow
            }}
          >
            <video
              src={`http://localhost:2001/uploads/${data.trending.video2Url}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loop
              autoPlay
              muted
            ></video>

            {/* Black transparency overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Black with 50% transparency
                zIndex: 1, // Ensure the overlay is on top of the video
              }}
            ></div>

            {/* Content placed above the video and the overlay */}
            <div
              style={{
                position: "relative", // This ensures content is on top of the video and overlay
                zIndex: 2, // Ensure content is above both the video and overlay
                color: "#fff", // Example text color
                padding: "20px", // Add some padding for spacing
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <div className="ms-5">
                <span style={{ height: "100vh" }}>
                  <h1
                    style={{
                      border: "1px solid white",
                      display: "inline",
                      padding: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    Get {data.gametitle}
                  </h1>
                </span>
                <div className="mt-5 w-25">{data.gamedescription}</div>
              </div>
            </div>
          </div>

          <div className="row w-100">
            <div className="col-12">
              <div className="row">
                {/* Content Section */}
                <div className="col-6">Content</div>

                {/* First Video Section */}
                <div className="col-6">
                  <video
                    src={`http://localhost:2001/uploads/${data.trending.video2Url}`}
                    style={{ height: "80vh", width: "100%" }}
                    loop
                    autoPlay
                    muted
                  ></video>
                </div>
              </div>
            </div>

            <div className="col-6">
              {/* Second Video Section */}
              <video
                src={`http://localhost:2001/uploads/${data.trending.video3Url}`}
                style={{ height: "80vh", width: "100%" }}
                loop
                autoPlay
                muted
              ></video>
            </div>

            {/* Content Sections */}
            <div className="col-6">Content</div>
            <div className="col-6">Content</div>

            <div className="col-6">
              {/* Third Video Section */}
              <video
                src={`http://localhost:2001/uploads/${data.trending.video4Url}`}
                style={{ height: "80vh", width: "100%" }}
                loop
                autoPlay
                muted
              ></video>
            </div>
          </div>
        </>
      ) : (
        <p>No game data to display.</p>
      )}
    </div>
  );
}
