import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Typography,
  Chip,
  Box,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { Grid, Divider, Stack } from "@mui/material";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
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
          sx={{ position: "relative", width: "100%", bgcolor: "#0b0c10", p: 4 }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: { xs: 300, sm: 500 },
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
            image={`http://localhost:2001/uploads/${data.trending.video1Url}`}
            alt={data.gametitle}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              color: "white",
              p: 3,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" gutterBottom sx={{ color: "#fff" }}>
                  {data.gametitle}
                </Typography>
                <Typography
                  paragraph
                  sx={{ color: "#ddd", fontStyle: "italic" }}
                >
                  {data.gamedescription}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Chip label={data.gamecategory} color="primary" />
                  <Typography variant="h5" sx={{ color: "#fff" }}>
                    ${data.gameprice}{" "}
                    <Typography variant="body1" component="span">
                      ({data.gamediscount}% off)
                    </Typography>
                  </Typography>
                  <Rating
                    name="read-only"
                    value={parseFloat(data.gamerating)}
                    readOnly
                    precision={0.1}
                    sx={{ color: "#f1c40f" }} // Gold color for the rating stars
                  />
                </Box>
                <Stack spacing={2}>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    <strong>Release Date:</strong>{" "}
                    {new Date(data.releasedate).toDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    <strong>Publisher:</strong> {data.gamepublisher}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    <strong>Platforms:</strong> {data.gameplatforms}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    <strong>Supported Languages:</strong>{" "}
                    {data.supportedlanguages}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2, bgcolor: "#444" }} />
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  <strong>Features:</strong> {data.gamefeatures}
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa", mt: 2 }}>
                  <strong>Minimum System Requirements:</strong>{" "}
                  {data.minsystemrequirements}
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
                  <strong>Recommended System Requirements:</strong>{" "}
                  {data.recsystemrequirements}
                </Typography>
                <Divider sx={{ my: 2, bgcolor: "#444" }} />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton aria-label="like" sx={{ color: "white" }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="review" sx={{ color: "white" }}>
                    <ReviewsIcon />
                  </IconButton>
                  <IconButton aria-label="explore" sx={{ color: "white" }}>
                    <OpenInNewIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                {data.trending && data.trending.video2Url && (
                  <CardMedia
                    component="video"
                    sx={{
                      width: "100%",
                      height: 300,
                      borderRadius: 2,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    }}
                    controls
                    autoPlay
                    loop
                    src={`http://localhost:2001/uploads/${data.trending.video2Url}`}
                    title={data.gametitle}
                  />
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 4,
                    borderColor: "#fff",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: "#000",
                    },
                  }}
                  onClick={() => window.open(data.communitylinks, "_blank")}
                >
                  Join Community
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}
