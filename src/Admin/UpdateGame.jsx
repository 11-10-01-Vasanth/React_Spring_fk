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

const osOptions = ["Windows 10", "Windows 11", "macOS", "Linux"];
const cpuOptions = [
  "Intel Core i7-4790",
  "AMD Ryzen 5 3600",
  "Intel Core i5-10600K",
  "AMD Ryzen 7 5800X",
];
const ramOptions = ["8GB", "12GB", "16GB", "32GB"];
const gpuOptions = [
  "NVIDIA GeForce GTX 1060",
  "AMD Radeon RX 590",
  "NVIDIA GeForce RTX 2060",
  "AMD Radeon RX 6600 XT",
];

export default function UpdateGameWithVideos() {
  const gameid = localStorage.getItem("gameid");

  const [os, setOs] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [gpu, setGpu] = useState("");
  const [ros, setrOs] = useState("");
  const [rcpu, setrCpu] = useState("");
  const [rram, setrRam] = useState("");
  const [rgpu, setrGpu] = useState("");
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
              video1Url: (data.trending && data.trending.video1Url) || "",
              video2Url: (data.trending && data.trending.video2Url) || "",
              video3Url: (data.trending && data.trending.video3Url) || "",
              video4Url: (data.trending && data.trending.video4Url) || "",
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

  const handleUpdateRequirements = () => {
    formik.setFieldValue(
      "minsystemrequirements",
      `OS: ${os}, CPU: ${cpu}, RAM: ${ram}, GPU: ${gpu}`
    );
  };

  const handleRecUpdateRequirements = () => {
    formik.setFieldValue(
      "recsystemrequirements",
      `OS: ${ros}, CPU: ${rcpu}, RAM: ${rram}, GPU: ${rgpu}`
    );
  };

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
    formData.append("agerating", gameData.agerating);
    formData.append("releasedate", gameData.releasedate);
    formData.append("gamepublisher", gameData.gamepublisher);
    formData.append("gameplatforms", gameData.gameplatforms);
    formData.append("minsystemrequirements", gameData.minsystemrequirements);
    formData.append("recsystemrequirements", gameData.recsystemrequirements);
    formData.append("gamegenres", gameData.gamegenres);
    formData.append("gamerating", gameData.gamerating);
    formData.append("gametrailerurl", gameData.gametrailerurl);
    formData.append("gamefeatures", gameData.gamefeatures);
    formData.append("supportedlanguages", gameData.supportedlanguages);
    formData.append("gameachievements", gameData.gameachievements);
    formData.append("communitylinks", gameData.communitylinks);
    if (gameData.gameimage) {
      formData.append("gameimage", gameData.gameimage);
    }
    ["video1Url", "video2Url", "video3Url", "video4Url"].forEach((video) => {
      if (gameData[video]) {
        formData.append(video, gameData[video]);
      }
    });

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
              fullWidth
              value={
                typeof gameData.gameimage === "string"
                  ? gameData.gameimage.split("_").pop() // Display file name from the string
                  : gameData.gameimage?.name || "Upload Game Image"
              } // Display file name or placeholder
              placeholder="Upload Game Image"
              InputProps={{
                readOnly: true, // Make the input read-only
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
                        htmlFor={`upload-button`} // Link button to the hidden input
                      >
                        <DriveFolderUploadIcon />
                      </IconButton>
                    </InputAdornment>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <IconButton
                      component="label"
                      htmlFor={`upload-button`} // Link button to the hidden input
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
              style={{ display: "none" }} // Hide the actual input element
              id={`upload-button`}
            />
            {/* Button to trigger the hidden file input */}
          </Grid>

          {[
            "Video/Image 1",
            "Video/Image 2",
            "Video/Image 3",
            "Video/Image 4",
          ].map((label, index) => {
            const videoKey = `video${index + 1}Url`; // Key for accessing the video/image in gameData
            const videoData = gameData[videoKey]; // Access the relevant video/image data

            // Function to get the displayed label or filename
            const getFileName = () => {
              if (typeof videoData === "string") {
                return videoData.split("/").pop(); // Extract the file name from the URL string
              } else if (videoData && videoData.name) {
                return videoData.name; // Return the file name if it's a file object
              }
              return ""; // No file uploaded, return empty string
            };

            return (
              <Grid item xs={12} key={index}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={getFileName()} // Display the file name or empty string
                  placeholder={`Upload ${label}`}
                  InputProps={{
                    readOnly: true, // Make the input read-only
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
                          htmlFor={`upload-button-${index}`} // Link button to the hidden input
                        >
                          <DriveFolderUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <IconButton
                          component="label"
                          htmlFor={`upload-button-${index}`} // Link button to the hidden input
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
                  onChange={handleFileChange(videoKey)}
                  accept="video/mp4,audio/mp3"
                  style={{ display: "none" }} // Hide the actual input element
                  id={`upload-button-${index}`}
                />
                {/* Button to trigger the hidden file input */}
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
