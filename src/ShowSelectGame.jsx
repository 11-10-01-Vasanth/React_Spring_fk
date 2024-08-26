import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Container,
  Typography,
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from '@mui/material/ButtonBase';

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/static/images/buttons/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/buttons/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
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
        <Container sx={{ paddingY: 4 }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: { xs: 300, sm: "auto" },
                objectFit: "cover",
                filter: "brightness(70%)",
              }}
              image={`http://localhost:2001/uploads/${data.gameimage}`}
              alt={data.gametitle}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: 3,
                borderRadius: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  maxWidth: 1200,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 400 },
                    height: { xs: 300, sm: "auto" },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                  image={`http://localhost:2001/uploads/${data.gameimage}`}
                  alt={data.gametitle}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: 3,
                    alignItems: "center",
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 2,
                    gap: 2,
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="h3"
                      gutterBottom
                      sx={{ color: "#fff" }}
                    >
                      {data.gametitle}
                    </Typography>
                    <Typography paragraph sx={{ color: "#ddd" }}>
                      <i>{data.gamedescription}</i>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 2,
                        gap: 2,
                      }}
                    >
                      <Chip
                        label={data.gamecategory}
                        color="primary"
                        sx={{ backgroundColor: "#fff", color: "#000" }}
                      />
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: "#fff" }}
                      >
                        ${data.gameprice}{" "}
                        <Typography variant="body1" component="span">
                          ({data.gamediscount}% off)
                        </Typography>
                      </Typography>
                      <Rating
                        sx={{ color: "#f1c40f" }} // Gold color for the rating stars
                        name="read-only"
                        value={data.gamerating}
                        readOnly
                        precision={0.1}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
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
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      marginTop: 2,
                      borderColor: "#fff", // Outline color
                      color: "#fff", // Text color
                      "&:hover": {
                        borderColor: "#fff", // Hover outline color
                        backgroundColor: "#000", // Hover background color
                      },
                    }}
                  >
                    Play Now
                  </Button>
                </Box>
              </Card>
            </Box>
          </Box>
          {/* Integrated ButtonBaseDemo */}
          <Box sx={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {data && (
              <ImageButton
                focusRipple
                key={data.gameid}
                style={{
                  width: 300,
                }}
              >
               <ImageSrc style={{ backgroundImage: `url(http://localhost:2001/uploads/${data.gameimage})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {data.gametitle}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            )}
          </Box>
        </Container>
      )}
    </>
  );
}
