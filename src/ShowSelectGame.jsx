import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { styled } from "@mui/material/styles";
import Typography from "@mui/joy/Typography";

const FullPageBackground = styled(Box)(({ imageUrl }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `url(${imageUrl}) center/cover no-repeat`,
  opacity: 0.9,
  zIndex: -1,
}));

const VideoCard = styled(Card)(({ theme }) => ({
  position: "relative",
  minWidth: 300,
  height: "70vh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

const OverlayText = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: theme.palette.common.white,
  textAlign: "center",
  width: "100%",
  zIndex: 1,
  background: "rgba(0, 0, 0, 0.6)",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export default function ShowSelectGame() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);

  const getGameById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:2001/admin/getGameById/${id}`
      );
      setData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const gameid = localStorage.getItem("gameid");
    const name = localStorage.getItem("username");
    setUsername(name);
    if (gameid) getGameById(gameid);
  }, []);

  return (
    <>
      <Navbar name={username} />
      {data && (
        <Box
          sx={{
            minHeight: "100vh",
            padding: 2,
            color: "#fff",
            position: "relative",
          }}
        >
          {/* Full Page Background */}
          <FullPageBackground
            imageUrl={`http://localhost:2001/uploads/${data.trending.video1Url}`}
          />

          {/* Video Playback */}
          <VideoCard>
            <CardCover>
              <video
                autoPlay
                loop
                muted
                poster={`http://localhost:2001/uploads/${data.trending.video4Url}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source
                  src={`http://localhost:2001/uploads/${data.trending.video4Url}`}
                  type="video/mp4"
                />
              </video>
            </CardCover>
            <OverlayText>
              <Typography fontWeight="bold" color="light">
                <h2> {data.gametitle}</h2>
              </Typography>
              <Typography variant="body1" paragraph color="light">
                {data.gamedescription}
              </Typography>
              <Button
                variant="outlined"
                color="warning"
                size="lg"
                sx={{ mt: 2 }}
              >
                Order Now
              </Button>
            </OverlayText>
          </VideoCard>

          <div className="row mt-5" style={{ height: "50vh",backgroundColor: "rgba(0, 0, 0, 0.5)", }} >
            <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center mb-4 mb-lg-0 order-1 order-lg-2">
              <div
                className="text-light"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
                  padding: "20px", // Optional: Add padding for better appearance
                  borderRadius: "8px", // Optional: Add rounded corners
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {data.gametitle}
                </h2>
                <p>{data.gamefeatures}</p>
              </div>
            </div>

            <div className="col-lg-6 col-12 d-flex justify-content-center order-2 order-lg-1">
              <Card sx={{ minHeight: "auto", width: "100%" }}>
                <CardCover>
                  <img
                    src={`http://localhost:2001/uploads/${data.trending.video2Url}`}
                    alt={data.gametitle}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px", // Optional: adds rounded corners
                      opacity: "0.9",
                    }}
                    loading="lazy"
                  />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    {data.gamecategory}
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    {data.agerating}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="row" style={{ height: "50vh",backgroundColor: "rgba(0, 0, 0, 0.5)", }}>
            <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center mb-4 mb-lg-0 order-2 order-lg-1">
              <div className="text-light">
                <h2
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {data.gametitle}
                </h2>
                <p>{data.gamefeatures}</p>
              </div>
            </div>
            <div className="col-lg-6 col-12 d-flex justify-content-center order-1 order-lg-2">
              <Card sx={{ minHeight: "auto", width: "100%" }}>
                <CardCover>
                  <img
                    src={`http://localhost:2001/uploads/${data.trending.video3Url}`}
                    alt={data.gametitle}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px", // Optional: adds rounded corners
                      opacity: "0.9",
                    }}
                    loading="lazy"
                  />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    {data.gamecategory}
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    California, USA
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="row" style={{ height: "50vh",backgroundColor: "rgba(0, 0, 0, 0.5)", }}>
            <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center mb-4 mb-lg-0 order-1 order-lg-2">
              <div className="text-light">
                <h2
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {data.gametitle}
                </h2>
                <p>{data.gamedescription}</p>
              </div>
            </div>
            <div className="col-lg-6 col-12 d-flex justify-content-center order-2 order-lg-1">
              <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
                <CardCover>
                  <video
                    autoPlay
                    loop
                    muted
                    poster="https://assets.codepen.io/6093409/river.jpg"
                  >
                    <source
                      src={`http://localhost:2001/uploads/${data.trending.video4Url}`}
                      type="video/mp4"
                    />
                  </video>
                </CardCover>
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    {data.gamecategory}
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    California, USA
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
