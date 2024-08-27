import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Container, styled } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputAdornment } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  left: "0",
  whiteSpace: "nowrap",
  width: "1px",
});

export default function UpdateGameWithVideos() {
  const gameid = localStorage.getItem("gameid");
  const [gameData, setGameData] = useState({
    gametitle: "",
    gamecategory: "",
    gamedescription: "",
    gameprice: "",
    gamediscount: "",
    gameimage: null,
    video1Url: null,
    video2Url: null,
    video3Url: null,
    video4Url: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (gameid) {
      axios
        .get(`http://localhost:2001/admin/getGameById/${gameid}`)
        .then((response) => {
          if (response.data.length > 0) {
            const data = response.data[0];
            setGameData({
              gametitle: data.gametitle || "",
              gamecategory: data.gamecategory || "",
              gamedescription: data.gamedescription || "",
              gameprice: data.gameprice || "",
              gamediscount: data.gamediscount || "",
              gameimage: null,
              video1Url: null,
              video2Url: null,
              video3Url: null,
              video4Url: null,
            });
          } else {
            setError("Game data not found.");
          }
        })
        .catch((err) => {
          console.error("Error fetching game data:", err);
          setError("An error occurred while fetching game data.");
        });
    } else {
      setError("Game ID is not available.");
    }
  }, [gameid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (field) => (e) => {
    setGameData((prevData) => ({
      ...prevData,
      [field]: e.target.files[0],
    }));
  };

  const handleClearFile = (field) => () => {
    setGameData((prevData) => ({
      ...prevData,
      [field]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gametitle", gameData.gametitle);
    formData.append("gamecategory", gameData.gamecategory);
    formData.append("gamedescription", gameData.gamedescription);
    formData.append("gameprice", gameData.gameprice);
    formData.append("gamediscount", gameData.gamediscount);
    if (gameData.gameimage) {
      formData.append("gameimage", gameData.gameimage);
    }
    ["video1Url", "video2Url", "video3Url", "video4Url"].forEach(
      (video, index) => {
        if (gameData[video]) {
          formData.append(video, gameData[video]);
        }
      }
    );

    axios
      .put(`http://localhost:2001/admin/updategames/${gameid}`, formData)
      .then(() => {
        toast.success("Game updated successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update {gameData.gametitle}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="gametitle"
              value={gameData.gametitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              name="gamecategory"
              value={gameData.gamecategory}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="gamedescription"
              value={gameData.gamedescription}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="gameprice"
              value={gameData.gameprice}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Discount"
              name="gamediscount"
              value={gameData.gamediscount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DiscountIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<BackupIcon />}
              fullWidth
              style={{ marginBottom: "10px" }}
            >
              {gameData.gameimage
                ? gameData.gameimage.name
                : "Upload Game Image"}
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange("gameimage")}
                accept="image/*"
              />
            </Button>
            {gameData.gameimage && (
              <IconButton
                color="inherit"
                onClick={handleClearFile("gameimage")}
                aria-label="clear file"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Grid>
          {["Video/Image 1", "Video/Image 2", "Video/Image 3", "Video/Image 4"].map((label, index) => (
            <Grid item xs={12} key={index}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<BackupIcon />}
                fullWidth
                style={{ marginBottom: "10px" }}
              >
                {gameData[`video${index + 1}Url`]
                  ? gameData[`video${index + 1}Url`].name
                  : `Upload ${label}`}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange(`video${index + 1}Url`)}
                  accept="video/mp4,audio/mp3"
                />
              </Button>
              {gameData[`video${index + 1}Url`] && (
                <IconButton
                  color="inherit"
                  onClick={handleClearFile(`video${index + 1}Url`)}
                  aria-label="clear file"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Update Game
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
}
