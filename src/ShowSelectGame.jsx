/* eslint-disable react/prop-types */
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
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";
import SmartScreenOutlinedIcon from "@mui/icons-material/SmartScreenOutlined";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Styled Components
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

// Utility function to determine if the media is a video or image
const isVideo = (url) => {
  return url.match(/\.(mp4|webm|ogg)$/i);
};

// Media component to handle dynamic media rendering
const MediaComponent = ({ url, alt, poster }) => {
  return isVideo(url) ? (
    <video
      autoPlay
      loop
      muted
      poster={poster}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <source src={url} type="video/mp4" />
    </video>
  ) : (
    <img
      src={url}
      alt={alt}
      style={{
        width: "100%",
        objectFit: "cover",
        borderRadius: "8px",
        opacity: "0.9",
      }}
      loading="lazy"
    />
  );
};

// Main component
export default function ShowSelectGame() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);

  // Fetch game details by ID
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
            imageUrl={
              data.gameimage
                ? `http://localhost:2001/uploads/${data.gameimage}`
                : "https://via.placeholder.com/800x600.png?text=No+Image"
            }
          />

          {/* Main Video Card */}
          <VideoCard>
            <CardCover>
              {data.trending && data.trending.video2Url && (
                <MediaComponent
                  url={
                    data.trending && data.trending.video2Url
                      ? `http://localhost:2001/uploads/${data.trending.video2Url}`
                      : "https://via.placeholder.com/800x600.png?text=No+Image"
                  }
                  alt={data.gametitle}
                  poster={
                    data.trending && data.trending.video4Url
                      ? `http://localhost:2001/uploads/${data.trending.video2Url}`
                      : "https://via.placeholder.com/800x600.png?text=No+Image"
                  }
                />
              )}
            </CardCover>
            <OverlayText>
              <Typography fontWeight="bold" color="light">
                <h2>{data.gametitle}</h2>
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

          {/* {data.trending &&
            [
              data.trending.img_vid1,
            ].map((url, index) => (
              <div
                key={index}
                className="row mt-5"
                style={{
                  height: "50vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                  <div
                    className="text-light"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "20px",
                      borderRadius: "8px",
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

                <div className="col-lg-6 col-12 d-flex justify-content-center">
                  <Card sx={{ minHeight: "auto", width: "100%" }}>
                    <CardCover>
                      <MediaComponent
                        url={
                          url
                            ? `http://localhost:2001/uploads/${url}`
                            : "https://via.placeholder.com/800x600.png?text=No+Image"
                        }
                        alt={data.gametitle || "Default title"}
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
            ))} */}

          <Box sx={{ mt: 4 }}>
            <ImageList
              sx={{ width: "100%", height: 500 }}
              variant="woven"
              cols={3}
              gap={8}
            >
              {(data.trending.img_vid1 || []).map((url, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    src={`${url}?w=161&fit=crop&auto=format`}
                    alt={data.gametitle || "Image"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>

          <VideoCard className="mt-5">
            <CardCover>
              {data.trending && data.trending.video3Url && (
                <MediaComponent
                  url={
                    data.trending.video3Url
                      ? `http://localhost:2001/uploads/${data.trending.video3Url}`
                      : "https://via.placeholder.com/800x600.png?text=No+Image"
                  }
                  alt={data.gametitle}
                  poster={
                    data.trending.video4Url
                      ? `http://localhost:2001/uploads/${data.trending.video4Url}`
                      : "https://via.placeholder.com/800x600.png?text=No+Image"
                  }
                />
              )}
            </CardCover>
            <OverlayText>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                color="light"
              >
                {data.gametitle}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 2,
                }}
              >
                {data.gameplatforms.split(",").map((platform, index) => {
                  // Define platform icons
                  const platformIcons = {
                    PC: ImportantDevicesIcon,
                    "PlayStation 4": SportsEsportsIcon,
                    "Xbox One": GamesOutlinedIcon,
                    "Nintendo Switch": SmartScreenOutlinedIcon,
                  };

                  // Select the icon component or fallback
                  const IconComponent =
                    platformIcons[platform.trim()] || RotateRightIcon;

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        padding: 2, // Slightly increase padding for better spacing
                        borderRadius: 2, // Increase border radius for a smoother look
                        gap: 1, // Add spacing between elements
                        color: "white", // Set text color for better contrast
                      }}
                    >
                      Available On
                      {platform}
                      <IconComponent />
                    </Box>
                  );
                })}
              </Box>
              <Typography
                variant="body2"
                color="light"
                paragraph
                sx={{ mt: 2 }}
              >
                {data.gamefeatures}
              </Typography>
              <Button
                variant="outlined"
                color="warning"
                size="large"
                sx={{ mt: 2 }}
              >
                Play Now
              </Button>
            </OverlayText>
          </VideoCard>
        </Box>
      )}
    </>
  );
}
