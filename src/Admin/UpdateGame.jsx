import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Grid, Typography, Container, styled } from "@mui/material";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
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
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/joy/Button";
import BackupIcon from "@mui/icons-material/Backup";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function UpdateGameWithVideos() {
  const gameid = localStorage.getItem("gameid");

  const [gameData, setGameData] = useState({
    gametitle: "",
    gamedescription: "",
    gameprice: "",
    gamediscount: "",
    gamecategory: "",
    agerating: "",
    releasedate: "",
    gamepublisher: "",
    gameplatforms: "",
    minsystemrequirements: "",
    recsystemrequirements: "",
    gamegenres: "",
    gamerating: "",
    gametrailerurl: "",
    gamefeatures: "",
    supportedlanguages: "",
    gameachievements: "",
    communitylinks: "",
    gameimage: "",
    video1Url: "",
    video2Url: "",
    video3Url: "",
    video4Url: "",
    heading1: "",
    heading2: "",
    heading3: "",
    descp1: "",
    descp2: "",
    descp3: "",
    img_vid1: "",
    img_vid2: "",
    img_vid3: "",
    img_vid4: "",
    img_vid5: "",
    img_vid6: "",
    img_vid7: "",
    img_vid8: "",
    img_vid9: "",
    img_vid10: "",
    img_vid11: "",
    img_vid12: "",
    img_vid13: "",
    img_vid14: "",
    img_vid15: "",
    img_vid16: "",
    img_vid17: "",
    img_vid18: "",
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
              agerating: data.agerating || "",
              releasedate: data.releasedate || "",
              gamepublisher: data.gamepublisher || "",
              gameplatforms: data.gameplatforms || "",
              minsystemrequirements: data.minsystemrequirements || "",
              recsystemrequirements: data.recsystemrequirements || "",
              gamegenres: data.gamegenres || "",
              gamerating: data.gamerating || "",
              gametrailerurl: data.gametrailerurl || "",
              gamefeatures: data.gamefeatures || "",
              supportedlanguages: data.supportedlanguages || "",
              gameachievements: data.gameachievements || "",
              communitylinks: data.communitylinks || "",
              gameimage: data.gameimage || "",
              descp1: (data.trending && data.trending.descp1) || "",
              descp2: (data.trending && data.trending.descp2) || "",
              descp3: (data.trending && data.trending.descp3) || "",
              heading1: (data.trending && data.trending.heading1) || "",
              heading2: (data.trending && data.trending.heading2) || "",
              heading3: (data.trending && data.trending.heading3) || "",
              video1Url: (data.trending && data.trending.video1Url) || "",
              video2Url: (data.trending && data.trending.video2Url) || "",
              video3Url: (data.trending && data.trending.video3Url) || "",
              video4Url: (data.trending && data.trending.video4Url) || "",
              img_vid1: (data.trending && data.trending.img_vid1) || "",
              img_vid2: (data.trending && data.trending.img_vid2) || "",
              img_vid3: (data.trending && data.trending.img_vid3) || "",
              img_vid4: (data.trending && data.trending.img_vid4) || "",
              img_vid5: (data.trending && data.trending.img_vid5) || "",
              img_vid6: (data.trending && data.trending.img_vid6) || "",
              img_vid7: (data.trending && data.trending.img_vid7) || "",
              img_vid8: (data.trending && data.trending.img_vid8) || "",
              img_vid9: (data.trending && data.trending.img_vid9) || "",
              img_vid10: (data.trending && data.trending.img_vid10) || "",
              img_vid11: (data.trending && data.trending.img_vid11) || "",
              img_vid12: (data.trending && data.trending.img_vid12) || "",
              img_vid13: (data.trending && data.trending.img_vid13) || "",
              img_vid14: (data.trending && data.trending.img_vid14) || "",
              img_vid15: (data.trending && data.trending.img_vid15) || "",
              img_vid16: (data.trending && data.trending.img_vid16) || "",
              img_vid17: (data.trending && data.trending.img_vid17) || "",
              img_vid18: (data.trending && data.trending.img_vid18) || "",
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
    console.log([field], e.target.files[0]);
  };

  const handleClearFile = (field) => () => {
    setGameData((prevData) => ({
      ...prevData,
      [field]: null,
    }));
  };

  // Function to handle clearing or removing the file
  const removeFile = (key) => () => {
    // Clear the file from the game data
    setGameData((prevData) => ({
      ...prevData,
      [key]: "", // Reset the key to an empty string
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append game fields
    const fields = [
      "gametitle",
      "gamecategory",
      "gamedescription",
      "gameprice",
      "gamediscount",
      "agerating",
      "releasedate",
      "gamepublisher",
      "gameplatforms",
      "minsystemrequirements",
      "recsystemrequirements",
      "gamegenres",
      "gamerating",
      "gametrailerurl",
      "gamefeatures",
      "supportedlanguages",
      "gameachievements",
      "communitylinks",
    ];

    fields.forEach((field) => {
      if (gameData[field]) {
        formData.append(field, gameData[field]);
      }
    });

    // Append image if available
    if (gameData.gameimage) {
      formData.append("gameimage", gameData.gameimage);
    }

    // Append video URLs
    ["video1Url", "video2Url", "video3Url", "video4Url"].forEach((video) => {
      if (gameData[video]) {
        formData.append(video, gameData[video]);
      }
    });

    ["heading1", "heading2", "heading3"].forEach((head) => {
      if (gameData[head]) {
        formData.append(head, gameData[head]);
      }
    });

    ["descp1", "descp2", "descp3"].forEach((desc) => {
      if (gameData[desc]) {
        formData.append(desc, gameData[desc]);
      }
    });

    // Append image video URLs
    Array.from({ length: 18 }, (_, i) => `img_vid${i + 1}`).forEach(
      (imgVid) => {
        if (gameData[imgVid]) {
          formData.append(imgVid, gameData[imgVid]);
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
              label="Game Title"
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
            <TextField
              id="agerating"
              name="agerating"
              label="Age Rating"
              variant="outlined"
              size="medium"
              value={gameData.agerating}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="releasedate"
              name="releasedate"
              label="Release Date"
              type="date" // Change the type to 'date'
              variant="outlined"
              size="medium"
              value={gameData.releasedate.split("T")[0]} // Convert datetime to date format
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <BackupIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gamepublisher"
              name="gamepublisher"
              label="Game Publisher"
              variant="outlined"
              size="medium"
              value={gameData.gamepublisher}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <TitleIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="gameplatforms"
              name="gameplatforms"
              label="Game Platforms"
              variant="outlined"
              size="medium"
              value={gameData.gameplatforms}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gamegenres"
              name="gamegenres"
              label="Game Genres"
              variant="outlined"
              size="medium"
              value={gameData.gamegenres}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gamerating"
              name="gamerating"
              label="Game Rating"
              variant="outlined"
              size="medium"
              value={gameData.gamerating}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gametrailerurl"
              name="gametrailerurl"
              label="Game Trailer URL"
              variant="outlined"
              size="medium"
              value={gameData.gametrailerurl}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gamefeatures"
              name="gamefeatures"
              label="Game Features"
              variant="outlined"
              size="medium"
              value={gameData.gamefeatures}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="supportedlanguages"
              name="supportedlanguages"
              label="Supported Languages"
              variant="outlined"
              size="medium"
              value={gameData.supportedlanguages}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <CategoryIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="gameachievements"
              name="gameachievements"
              label="Game Achievements"
              variant="outlined"
              size="medium"
              value={gameData.gameachievements}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <TitleIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="communitylinks"
              name="communitylinks"
              label="Community Links"
              variant="outlined"
              size="medium"
              value={gameData.communitylinks}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <TitleIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Game Main Image"
              fullWidth
              value={
                typeof gameData.gameimage === "string"
                  ? gameData.gameimage.split("_").pop() // Display file name from the string
                  : gameData.gameimage?.name || "Upload Game Image"
              }
              placeholder="Upload Game Image"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhotoRoundedIcon />
                  </InputAdornment>
                ),
                endAdornment: gameData.gameimage ? (
                  <InputAdornment position="end">
                    <IconButton
                      color="inherit"
                      onClick={handleClearFile("gameimage")}
                      aria-label="clear file"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                    <InputAdornment position="end">
                      <IconButton
                        component="label"
                        htmlFor={`upload-game-main-image`} // Unique ID for main image upload
                      >
                        <DriveFolderUploadIcon />
                      </IconButton>
                    </InputAdornment>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <IconButton
                      component="label"
                      htmlFor={`upload-game-main-image`} // Unique ID for main image upload
                    >
                      <DriveFolderUploadIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Hidden input field for uploading files */}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange("gameimage")}
              accept="image/*"
              style={{ display: "none" }}
              id={`upload-game-main-image`} // Unique ID for main image upload
            />
          </Grid>

          {[
            "Video/Image 1",
            "Video/Image 2",
            "Video/Image 3",
            "Video/Image 4",
          ].map((label, index) => {
            const videoKey = `video${index + 1}Url`;
            const videoData = gameData[videoKey];

            const getFileName = () => {
              if (typeof videoData === "string") {
                return videoData.split("/").pop();
              } else if (videoData && videoData.name) {
                return videoData.name;
              }
              return "";
            };

            return (
              <Grid item xs={12} key={`video-section-${index}`}>
                <TextField
                  variant="outlined"
                  label={`Game Trailer ${index + 1}`}
                  fullWidth
                  value={getFileName()}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhotoRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: videoData ? (
                      <InputAdornment position="end">
                        <IconButton
                          color="inherit"
                          onClick={handleClearFile(videoKey)}
                          aria-label="clear file"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          component="label"
                          htmlFor={`upload-button-video-${index}`} // Unique ID for video section
                        >
                          <DriveFolderUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <IconButton
                          component="label"
                          htmlFor={`upload-button-video-${index}`} // Unique ID for video section
                        >
                          <DriveFolderUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange(videoKey)}
                  accept="video/mp4,audio/mp3"
                  style={{ display: "none" }}
                  id={`upload-button-video-${index}`} // Unique ID for video section
                />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <TextField
              label="Image/Video_Description1"
              name="descp1"
              value={gameData.descp1}
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
              label="Image/Video_Description2"
              name="descp2"
              value={gameData.descp2}
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
              label="Image/Video_Description3"
              name="descp3"
              value={gameData.descp3}
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
              label="Image/Video_Heading1"
              name="heading1"
              value={gameData.heading1}
              onChange={handleChange}
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
              label="Image/Video_Heading2"
              name="heading2"
              value={gameData.heading2}
              onChange={handleChange}
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
              label="Image/Video_Heading3"
              name="heading3"
              value={gameData.heading3}
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

          {[
            "Video/Img 1",
            "Video/Img 2",
            "Video/Img 3",
            "Video/Img 4",
            "Video/Img 5",
            "Video/Img 6",
            "Video/Img 7",
            "Video/Img 8",
            "Video/Img 9",
            "Video/Img 10",
            "Video/Img 11",
            "Video/Img 12",
            "Video/Img 13",
            "Video/Img 14",
            "Video/Img 15",
            "Video/Img 16",
            "Video/Img 17",
            "Video/Img 18",
          ].map((label, index) => {
            const videoKey = `img_vid${index + 1}`;
            const videoData = gameData[videoKey];

            const getFileName = () => {
              if (typeof videoData === "string") {
                return videoData.split("/").pop();
              } else if (videoData && videoData.name) {
                return videoData.name;
              }
              return "";
            };

            return (
              <Grid item xs={12} key={`image-video-section-${index}`}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label={`Image/Video ${index + 1}`}
                  value={getFileName()}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhotoRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: videoData ? (
                      <InputAdornment position="end">
                        <IconButton
                          color="inherit"
                          onClick={removeFile(videoKey)}
                          aria-label="clear file"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          component="label"
                          htmlFor={`upload-button-image-video-${index}`} // Unique ID for image/video section
                        >
                          <DriveFolderUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <IconButton
                          component="label"
                          htmlFor={`upload-button-image-video-${index}`} // Unique ID for image/video section
                        >
                          <DriveFolderUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange(videoKey)}
                  accept="video/mp4,audio/mp3"
                  style={{ display: "none" }}
                  id={`upload-button-image-video-${index}`} // Unique ID for image/video section
                />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="soft"
              color="primary"
              size="lg"
              fullWidth
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
