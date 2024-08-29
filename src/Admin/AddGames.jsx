import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import BackupIcon from "@mui/icons-material/Backup";
import { styled } from "@mui/joy";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const validationSchema = Yup.object({
  gametitle: Yup.string().required("Game Title Required"),
  gamedescription: Yup.string().required("Game Description Required"),
  gameprice: Yup.number()
    .required("Game Price Required")
    .positive("Game Price must be a positive value"),
  gamediscount: Yup.number()
    .required("Game Discount Required")
    .min(0, "Discount must be at least 0")
    .max(1000, "Discount must be at most 1000"),
  gamecategory: Yup.string().required("Game Category Required"),
  agerating: Yup.string().required("Age Rating Required"),
  releasedate: Yup.date()
    .required("Release Date Required")
    .typeError("Invalid Release Date"),
  gamepublisher: Yup.string().required("Game Publisher Required"),
  gameplatforms: Yup.string().required("Game Platforms Required"),
  minsystemrequirements: Yup.string().required(
    "Minimum System Requirements Required"
  ),
  recsystemrequirements: Yup.string().required(
    "Recommended System Requirements Required"
  ),
  gamegenres: Yup.string().required("Game Genres Required"),
  gamerating: Yup.string().required("Game Rating Required"),
  gametrailerurl: Yup.string()
    .url("Invalid URL format")
    .required("Game Trailer URL Required"),
  gamefeatures: Yup.string().required("Game Features Required"),
  supportedlanguages: Yup.string().required("Supported Languages Required"),
  gameachievements: Yup.string().required("Game Achievements Required"),
  communitylinks: Yup.string()
    .url("Invalid URL format")
    .required("Community Links Required"),
});

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

export default function AddGames() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const [os, setOs] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [gpu, setGpu] = useState("");
  const [ros, setrOs] = useState("");
  const [rcpu, setrCpu] = useState("");
  const [rram, setrRam] = useState("");
  const [rgpu, setrGpu] = useState("");

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("gametitle", values.gametitle);
      formData.append("gamedescription", values.gamedescription);
      formData.append("gameprice", values.gameprice);
      formData.append("gamediscount", values.gamediscount);
      formData.append("gamecategory", values.gamecategory);
      formData.append("agerating", values.agerating);
      formData.append("releasedate", values.releasedate);
      formData.append("gamepublisher", values.gamepublisher);
      formData.append("gameplatforms", values.gameplatforms);
      formData.append("minsystemrequirements", values.minsystemrequirements);
      formData.append("recsystemrequirements", values.recsystemrequirements);
      formData.append("gamegenres", values.gamegenres);
      formData.append("gamerating", values.gamerating);
      formData.append("gametrailerurl", values.gametrailerurl);
      formData.append("gamefeatures", values.gamefeatures);
      formData.append("supportedlanguages", values.supportedlanguages);
      formData.append("gameachievements", values.gameachievements);
      formData.append("communitylinks", values.communitylinks);
      formData.append("gameimage", selectedFile);

      axios
        .post("http://localhost:2001/admin/addgames", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.statusCode === "INTERNAL_SERVER_ERROR") {
            toast.error("Try Again!!!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Successfully Added", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

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

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    // Define the allowed file types
    const allowedFileTypes = ["image/", "video/mp4", "audio/mp3"];

    // Check if the file type is allowed
    if (file && allowedFileTypes.some((type) => file.type.startsWith(type))) {
      setSelectedFile(file);
      setFileError(null);
    } else {
      setSelectedFile(null);
      setFileError("Please select a valid file (image, mp4, or mp3).");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileError(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: 2,
        maxWidth: 600, // Adjust max width as needed
        margin: "auto", // Center align horizontally
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}>
          <TextField
            id="gametitle"
            name="gametitle"
            label="Game Title"
            variant="outlined"
            size="medium"
            value={formik.values.gametitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gametitle && Boolean(formik.errors.gametitle)}
            helperText={formik.touched.gametitle && formik.errors.gametitle}
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <TitleIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            id="gamedescription"
            name="gamedescription"
            label="Game Description"
            variant="outlined"
            size="medium"
            value={formik.values.gamedescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamedescription &&
              Boolean(formik.errors.gamedescription)
            }
            helperText={
              formik.touched.gamedescription && formik.errors.gamedescription
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <DescriptionIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            id="gameprice"
            name="gameprice"
            label="Game Price"
            variant="outlined"
            size="medium"
            value={formik.values.gameprice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gameprice && Boolean(formik.errors.gameprice)}
            helperText={formik.touched.gameprice && formik.errors.gameprice}
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <MonetizationOnIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            id="gamediscount"
            name="gamediscount"
            label="Game Discount"
            variant="outlined"
            size="medium"
            value={formik.values.gamediscount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamediscount && Boolean(formik.errors.gamediscount)
            }
            helperText={
              formik.touched.gamediscount && formik.errors.gamediscount
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <MonetizationOnIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            id="gamecategory"
            name="gamecategory"
            label="Game Category"
            variant="outlined"
            size="medium"
            value={formik.values.gamecategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamecategory && Boolean(formik.errors.gamecategory)
            }
            helperText={
              formik.touched.gamecategory && formik.errors.gamecategory
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <CategoryIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            id="agerating"
            name="agerating"
            label="Age Rating"
            variant="outlined"
            size="medium"
            value={formik.values.agerating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.agerating && Boolean(formik.errors.agerating)}
            helperText={formik.touched.agerating && formik.errors.agerating}
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <CategoryIcon />
                </IconButton>
              ),
            }}
            aria-describedby="agerating-helper-text"
            aria-invalid={Boolean(formik.errors.agerating)}
          />
          <TextField
            id="releasedate"
            name="releasedate"
            label="Release Date"
            variant="outlined"
            type="date"
            value={formik.values.releasedate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.releasedate && Boolean(formik.errors.releasedate)
            }
            helperText={formik.touched.releasedate && formik.errors.releasedate}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <BackupIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gamepublisher"
            name="gamepublisher"
            label="Game Publisher"
            variant="outlined"
            value={formik.values.gamepublisher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamepublisher &&
              Boolean(formik.errors.gamepublisher)
            }
            helperText={
              formik.touched.gamepublisher && formik.errors.gamepublisher
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <TitleIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gameplatforms"
            name="gameplatforms"
            label="Game Platforms"
            variant="outlined"
            value={formik.values.gameplatforms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gameplatforms &&
              Boolean(formik.errors.gameplatforms)
            }
            helperText={
              formik.touched.gameplatforms && formik.errors.gameplatforms
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <CategoryIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="minsystemrequirements"
            name="minsystemrequirements"
            label="Minimum System Requirements"
            variant="outlined"
            value={formik.values.minsystemrequirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.minsystemrequirements &&
              Boolean(formik.errors.minsystemrequirements)
            }
            helperText={
              formik.touched.minsystemrequirements &&
              formik.errors.minsystemrequirements
            }
            select // Add this prop to enable the select dropdown
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <BackupIcon />
                </IconButton>
              ),
            }}
          >
            {/* Define MenuItem components as options */}
            <MenuItem value="Windows 7 or higher">Windows 7 or higher</MenuItem>
            <MenuItem value="8GB RAM, GTX 1050">8GB RAM, GTX 1050</MenuItem>
            <MenuItem value="12GB RAM, RTX 2060">12GB RAM, RTX 2060</MenuItem>
            <MenuItem value="16GB RAM, RTX 3070">16GB RAM, RTX 3070</MenuItem>
          </TextField>

          <TextField
            id="recsystemrequirements"
            name="recsystemrequirements"
            label="Recommended System Requirements"
            variant="outlined"
            value={formik.values.recsystemrequirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.recsystemrequirements &&
              Boolean(formik.errors.recsystemrequirements)
            }
            helperText={
              formik.touched.recsystemrequirements &&
              formik.errors.recsystemrequirements
            }
            select // Add this prop to enable the select dropdown
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <BackupIcon />
                </IconButton>
              ),
            }}
          >
            {/* Define MenuItem components as options */}
            <MenuItem value="Windows 7 or higher">Windows 7 or higher</MenuItem>
            <MenuItem value="8GB RAM, GTX 1050">8GB RAM, GTX 1050</MenuItem>
            <MenuItem value="12GB RAM, RTX 2060">12GB RAM, RTX 2060</MenuItem>
            <MenuItem value="16GB RAM, RTX 3070">16GB RAM, RTX 3070</MenuItem>
          </TextField>

          <TextField
            id="gamegenres"
            name="gamegenres"
            label="Game Genres"
            variant="outlined"
            value={formik.values.gamegenres}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamegenres && Boolean(formik.errors.gamegenres)
            }
            helperText={formik.touched.gamegenres && formik.errors.gamegenres}
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <CategoryIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gamerating"
            name="gamerating"
            label="Game Rating"
            variant="outlined"
            value={formik.values.gamerating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamerating && Boolean(formik.errors.gamerating)
            }
            helperText={formik.touched.gamerating && formik.errors.gamerating}
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <TitleIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gametrailerurl"
            name="gametrailerurl"
            label="Game Trailer URL"
            variant="outlined"
            value={formik.values.gametrailerurl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gametrailerurl &&
              Boolean(formik.errors.gametrailerurl)
            }
            helperText={
              formik.touched.gametrailerurl && formik.errors.gametrailerurl
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <BackupIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gamefeatures"
            name="gamefeatures"
            label="Game Features"
            variant="outlined"
            value={formik.values.gamefeatures}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gamefeatures && Boolean(formik.errors.gamefeatures)
            }
            helperText={
              formik.touched.gamefeatures && formik.errors.gamefeatures
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <DescriptionIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="supportedlanguages"
            name="supportedlanguages"
            label="Supported Languages"
            variant="outlined"
            value={formik.values.supportedlanguages}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.supportedlanguages &&
              Boolean(formik.errors.supportedlanguages)
            }
            helperText={
              formik.touched.supportedlanguages &&
              formik.errors.supportedlanguages
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <CategoryIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="gameachievements"
            name="gameachievements"
            label="Game Achievements"
            variant="outlined"
            value={formik.values.gameachievements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gameachievements &&
              Boolean(formik.errors.gameachievements)
            }
            helperText={
              formik.touched.gameachievements && formik.errors.gameachievements
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <TitleIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="communitylinks"
            name="communitylinks"
            label="Community Links"
            variant="outlined"
            value={formik.values.communitylinks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.communitylinks &&
              Boolean(formik.errors.communitylinks)
            }
            helperText={
              formik.touched.communitylinks && formik.errors.communitylinks
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <BackupIcon />
                </IconButton>
              ),
            }}
          />

          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={<BackupIcon />}
            fullWidth
          >
            {selectedFile ? (
              <>
                {selectedFile.name}
                <IconButton
                  color="inherit"
                  onClick={handleClearFile}
                  aria-label="clear file"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              "Upload a file"
            )}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept="image/*" // Add other file types as needed
            />
          </Button>
          {fileError && (
            <Alert severity="error" variant="outlined">
              <AlertTitle>Error</AlertTitle>
              {fileError}
            </Alert>
          )}
          <Button
            type="submit"
            variant="soft"
            color="primary"
            size="lg"
            fullWidth
          >
            Add
          </Button>
        </Box>
      </form>
      <ToastContainer></ToastContainer>
    </Box>
  );
}
