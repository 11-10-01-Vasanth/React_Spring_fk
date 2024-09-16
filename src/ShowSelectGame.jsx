/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Skeleton from "@mui/material/Skeleton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/joy/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { fontFamily, letterSpacing } from "@mui/system";

// Main component
export default function ShowSelectGame() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    height: "100vh",
    backgroundColor: "#121212", // Dark background for EA-like feel
  };

  const imageStyle = {
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Increased shadow for more depth
    borderRadius: "2px", // Rounded corners for modern look
    transition: "transform 2s ease, box-shadow 1s ease",
  };

  const buttonStyle = {
    border: "1px solid white",
    fontFamily: "'Russo One', sans-serif",
    padding: "10px",
    letterSpacing: "2px",
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
                    height={"30px"}
                  />
                </Typography>
                <div className="text-center w-75 mx-5">
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
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    fontFamily: "'Nova Mono', monospace",
                    textDecoration: "underline",
                    textUnderlineOffset: "5px",
                  }}
                  onMouseOver={(e) => (
                    (e.currentTarget.style.color = "#ffcc00"),
                    (e.currentTarget.style.border = "1px solid #ffcc00"),
                    (e.currentTarget.style.textDecoration = "none")
                  )}
                  onMouseOut={(e) => (
                    (e.currentTarget.style.color = "white"),
                    (e.currentTarget.style.border = "none"),
                    (e.currentTarget.style.textDecoration = "underline")
                  )}
                >
                  Pre-Order Now *
                </div>
              </Toolbar>
            </AppBar>
          </Box>
          <div style={containerStyle}>
            <div className="row w-100 align-items-center">
              <div className="col-12 col-lg-7 p-5">
                <img
                  style={imageStyle}
                  src={
                    data.trending.img_vid6
                      ? `http://localhost:2001/uploads/${data.trending.img_vid6}`
                      : "https://via.placeholder.com/800x600?text=No+Image+Available"
                  }
                  alt="Game Trending"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <div className="col-12 col-lg-5 text-light p-5">
                <h2 style={{ fontFamily: "'Russo One', sans-serif" }}>
                  {data.gametitle}
                </h2>

                <p style={{ fontFamily: "'Nova Mono', monospace" }}>
                  {data.gamedescription}
                </p>

                <div
                  className="row justify-content-evenly"
                  style={{ width: "50%" }}
                >
                  <div
                    className="col text-center p-3 m-3"
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
                    Pre-Order{" "}
                    <LocalGroceryStoreOutlinedIcon></LocalGroceryStoreOutlinedIcon>
                  </div>
                  <div
                    className="col text-center p-3 m-3"
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
                    <a href={data.gametrailerurl} style={{textDecoration:"none",color:"white"}}>Watch Trailer</a> <YouTubeIcon></YouTubeIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
