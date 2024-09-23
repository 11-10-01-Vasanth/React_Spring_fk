/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import SelectPrgames from "./SelectPrgames";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Skeleton from "@mui/material/Skeleton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/joy/Box";
import { CiYoutube } from "react-icons/ci";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { FaXbox } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { SiNintendoswitch } from "react-icons/si";

// Main component
export default function ShowSelectGame() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    height: "800vh",
    backgroundColor: "#121212", // Dark background for EA-like feel
  };

  const buttonStyle = {
    border: "1px solid white",
    fontFamily: "'Russo One', sans-serif",
    fontSize: "16px", // Add this line for font size
    cursor: "pointer",
    borderRadius: "3px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const buttonStyle1 = {
    border: "1px solid white",
    fontFamily: "'Russo One', sans-serif",
    fontSize: "16px", // Add this line for font size
    cursor: "pointer",
    borderRadius: "3px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  // Fetch game details by ID
  const getGameById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:2001/admin/getGameById/${id}`
      );
      if (res.data && res.data.length > 0) {
        setData(res.data[0]);
      }
    } catch (err) {
      console.error("Error fetching game data:", err);
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
    }
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <>
      <Navbar name={username} />
      {loading ? (
        <Skeleton variant="rectangular" height="70vh" />
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense" className="bg-dark">
                <Typography
                  style={{ cursor: "pointer" }}
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  <img
                    src={`http://localhost:2001/uploads/${data.trending.img_vid18}`}
                    alt=""
                    style={{
                      width: "auto", // Adjust as needed
                      height: "5vh",
                      objectFit: "contain", // or "cover" based on your preference
                    }}
                  />
                </Typography>
                <div className="text-center w-75 mx-5 d-lg-block d-none">
                  <marquee behavior="" direction="">
                    <GradeIcon></GradeIcon>{" "}
                    <i>
                      {data.gameachievements} <GradeIcon></GradeIcon>{" "}
                      {data.gamefeatures}{" "}
                    </i>{" "}
                    <GradeIcon></GradeIcon>
                  </marquee>
                </div>
                <div
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
                    fontFamily: "'Nova Mono', monospace",
                    textUnderlineOffset: "5px",
                    color: "white",
                    display: "inline-block",
                    borderRadius: "5px",
                    border: "1px solid white",
                    animation: "2s infinite pulse",
                    animationName: "pulse",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffcc00";
                    e.currentTarget.style.border = "1px solid #ffcc00";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.border = "1px solid white";
                  }}
                >
                  Pre-Order Now*
                </div>

                <style>
                  {`
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.03);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
                </style>
              </Toolbar>
            </AppBar>
          </Box>
          <div className="d-lg-none d-block bg-dark text-light">
            <marquee behavior="" direction="">
              <GradeIcon></GradeIcon>{" "}
              <i>
                {data.gameachievements} <GradeIcon></GradeIcon>{" "}
                {data.gamefeatures}{" "}
              </i>{" "}
              <GradeIcon></GradeIcon>
            </marquee>
          </div>
          <div style={containerStyle}>
            <div className="row w-100" style={{ height: "auto" }}>
              <div
                className="col-12 col-lg-7 p-lg-4 d-flex justify-content-lg-end"
                style={{ padding: 0 }}
              >
                <img
                  style={{ width: "106%", height: "90vh" }}
                  className="img-fluid"
                  src={
                    data.gameimage
                      ? `http://localhost:2001/uploads/${data.gameimage}`
                      : "https://via.placeholder.com/800x600?text=No+Image+Available"
                  }
                  alt="Game Trending"
                />
              </div>

              <div className="col-12 col-lg-5 text-light p-5 d-flex flex-column justify-content-center">
                <h2 style={{ fontFamily: "'Russo One', sans-serif" }}>
                  {data.gametitle}
                </h2>

                <p style={{ fontFamily: "'Nova Mono', monospace" }}>
                  {data.gamedescription}
                </p>

                <div
                  className="d-flex "
                  style={{ width: "100%" }} // Adjusted width for better alignment
                >
                  <div
                    className="text-center p-2 m-2 mt-4"
                    style={buttonStyle1}
                    onMouseOver={(e) => (
                      (e.currentTarget.style.backgroundColor = "#ffcc00"),
                      (e.currentTarget.style.color = "black"),
                      (e.currentTarget.style.border = "1px solid black")
                    )}
                    onMouseOut={(e) => (
                      (e.currentTarget.style.backgroundColor = "#121212"),
                      (e.currentTarget.style.color = "white"),
                      (e.currentTarget.style.border = "1px solid white")
                    )}
                  >
                    Pre-Order{" "}
                    <LocalGroceryStoreOutlinedIcon
                      style={{ color: "orange" }}
                    />
                  </div>

                  <div
                    className="text-center p-3 m-2"
                    style={buttonStyle}
                    onMouseOver={(e) => (
                      (e.currentTarget.style.backgroundColor = "#ffcc00"),
                      (e.currentTarget.style.color = "black"),
                      (e.currentTarget.style.border = "1px solid black")
                    )}
                    onMouseOut={(e) => (
                      (e.currentTarget.style.backgroundColor = "#121212"),
                      (e.currentTarget.style.color = "white"),
                      (e.currentTarget.style.border = "1px solid white")
                    )}
                  >
                    <a
                      href={data.gametrailerurl}
                      target="blank"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Watch Trailer
                    </a>{" "}
                    <CiYoutube style={{ color: "red", fontSize: "25px" }} />
                  </div>
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily: "'Russo One', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  Coming{" "}
                  {new Date(data.releasedate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="mt-3">
                  <p
                    style={{
                      fontFamily: "'Nova Mono', monospace",
                      display: "flex",
                      alignItems: "center",
                      color: "#FFF", // White text for contrast
                      fontSize: "13px",
                    }}
                  >
                    Available on &nbsp;
                    {data.gameplatforms.split(",").map((platform, index) => {
                      const commonStyle = {
                        display: "inline-block",
                        padding: "3px 7px",
                        margin: "0 8px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease",
                        cursor: "pointer",
                      };

                      switch (platform.trim()) {
                        case "Pc":
                        case "pc":
                        case "PC":
                          return (
                            <span
                              key={index}
                              style={{
                                ...commonStyle,
                                backgroundColor: "rgba(75, 75, 75, 0.8)", // Sleek dark gray for PC
                              }}
                            >
                              <RiComputerLine
                                style={{ fontSize: "20px", color: "#FFF" }} // Keeping white for contrast
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.2)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "rgba(125, 125, 125, 0.9)"; // Metallic silver on hover
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "rgba(75, 75, 75, 0.8)";
                                }}
                              />
                            </span>
                          );
                        case "PlayStation 4":
                        case "PlayStation 5":
                          return (
                            <span
                              key={index}
                              style={{
                                ...commonStyle,
                                backgroundColor: "rgba(0, 48, 135, 0.8)", // PlayStation blue
                              }}
                            >
                              <IoLogoPlaystation
                                style={{ fontSize: "20px", color: "#FFF" }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.2)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "#0050D4"; // Darker blue on hover
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "rgba(0, 48, 135, 0.8)";
                                }}
                              />
                            </span>
                          );
                        case "Xbox One":
                        case "Xbox":
                        case "Xbox Series X":
                          return (
                            <span
                              key={index}
                              style={{
                                ...commonStyle,
                                backgroundColor: "rgba(16, 124, 16, 0.8)", // Xbox green
                              }}
                            >
                              <FaXbox
                                style={{ fontSize: "20px", color: "#FFF" }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.2)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "#0D6F0D"; // Darker green on hover
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "rgba(16, 124, 16, 0.8)";
                                }}
                              />
                            </span>
                          );
                        case "Nintendo Switch":
                          return (
                            <span
                              key={index}
                              style={{
                                ...commonStyle,
                                backgroundColor: "rgba(255, 0, 0, 0.8)", // Nintendo red
                              }}
                            >
                              <SiNintendoswitch
                                style={{ fontSize: "20px", color: "#FFF" }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.2)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "#E60000"; // Darker red on hover
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.parentElement.style.backgroundColor =
                                    "rgba(255, 0, 0, 0.8)";
                                }}
                              />
                            </span>
                          );
                        default:
                          return platform;
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 mt-5 d-lg-block d-none">
              <div className="row w-100">
                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                  {data.trending.img_vid1.endsWith(".mp4") ? (
                    <video
                      src={`http://localhost:2001/uploads/${data.trending.img_vid1}`}
                      style={{ height: "80vh" }}
                      loop
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <img
                      src={`http://localhost:2001/uploads/${data.trending.img_vid1}`}
                      style={{
                        height: "80vh",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt={data.trending.heading1}
                    />
                  )}
                  <div
                    className="text-light text-center w-75 mt-5"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem", // Increased font size
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading1}
                    </h2>

                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp1}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                  {data.trending.img_vid2.endsWith(".mp4") ? (
                    <video
                      src={`http://localhost:2001/uploads/${data.trending.img_vid2}`}
                      style={{ height: "80vh" }}
                      loop
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <img
                      src={`http://localhost:2001/uploads/${data.trending.img_vid2}`}
                      style={{
                        height: "80vh",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt={data.trending.heading2}
                    />
                  )}
                  <div
                    className="text-light text-center w-75 mt-5"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading2}
                    </h2>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp2}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                  {data.trending.img_vid3.endsWith(".mp4") ? (
                    <video
                      src={`http://localhost:2001/uploads/${data.trending.img_vid3}`}
                      style={{ height: "80vh" }}
                      loop
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <img
                      src={`http://localhost:2001/uploads/${data.trending.img_vid3}`}
                      style={{
                        height: "80vh",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt={data.trending.heading3}
                    />
                  )}
                  <div
                    className="text-light text-center w-75 mt-5"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading3}
                    </h2>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp3}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 d-lg-none d-block">
              <div className="row w-100">
                <div className="col-12">
                  <video
                    src={`http://localhost:2001/uploads/${data.trending.img_vid1}`}
                    style={{ width: "106%" }}
                    loop
                    autoPlay
                    muted
                  ></video>
                  <div
                    className="text-light text-center mt-3"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading1}
                    </h2>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp1}
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <video
                    src={`http://localhost:2001/uploads/${data.trending.img_vid2}`}
                    style={{ width: "106%" }}
                    loop
                    autoPlay
                    muted
                  ></video>
                  <div
                    className="text-light text-center mt-3"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading2}
                    </h2>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp2}
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <video
                    src={`http://localhost:2001/uploads/${data.trending.img_vid3}`}
                    style={{ width: "106%" }}
                    loop
                    autoPlay
                    muted
                  ></video>
                  <div
                    className="text-light text-center mt-3"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                      }}
                    >
                      {data.trending.heading3}
                    </h2>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {data.trending.descp3}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span
                style={{
                  border: "1px solid white",
                  color: "white",
                  display: "inline-block",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  fontSize: "18px",
                  fontFamily: "'Helvetica Neue', sans-serif",
                }}
                className="p-3 rounded-5"
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                Explore Gameplay Features
              </span>
            </div>
            <SelectPrgames></SelectPrgames>
          </div>
        </>
      )}
    </>
  );
}
