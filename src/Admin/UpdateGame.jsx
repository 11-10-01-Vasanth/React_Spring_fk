import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom"; // Assuming you use react-router for routing


const validationSchema = Yup.object({
  gametitle: Yup.string().required("Game Title Required"),
  gamedescription: Yup.string().required("Game Description Required"),
  gameprice: Yup.number()
    .required("Game Price Required")
    .positive("Game Price Required as positive value"),
  gamediscount: Yup.number()
    .required("Game Discount Required")
    .min(0)
    .max(1000, "Must be between 0 and 1000"),
  gamecategory: Yup.string().required("Game Category Required"),
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

export default function UpdateGame() {
  const gameid = localStorage.getItem("gameid");
  const [selectedFiles, setSelectedFiles] = useState({
    main: null,
    image1: null,
    image2: null,
    image3: null,
  });
  const [fileErrors, setFileErrors] = useState({
    main: null,
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    // Fetch the existing game details by ID and set form values
    axios.get(`http://localhost:2001/admin/getGameById/${gameid}`).then((response) => {
      const gameData = response.data;
      formik.setValues({
        gametitle: gameData.gametitle,
        gamedescription: gameData.gamedescription,
        gameprice: gameData.gameprice,
        gamediscount: gameData.gamediscount,
        gamecategory: gameData.gamecategory,
      });
    });
  }, [gameid]);

  const formik = useFormik({
    initialValues: {
      gametitle: "",
      gamedescription: "",
      gameprice: "",
      gamediscount: "",
      gamecategory: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("gametitle", values.gametitle);
      formData.append("gamedescription", values.gamedescription);
      formData.append("gameprice", values.gameprice);
      formData.append("gamediscount", values.gamediscount);
      formData.append("gamecategory", values.gamecategory);
      
      // Append selected files if they exist
      if (selectedFiles.main) formData.append("gameimage", selectedFiles.main);
      if (selectedFiles.image1) formData.append("gameimage1", selectedFiles.image1);
      if (selectedFiles.image2) formData.append("gameimage2", selectedFiles.image2);
      if (selectedFiles.image3) formData.append("gameimage3", selectedFiles.image3);

      axios
        .put(`http://localhost:2001/admin/updategames/${gameid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
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
        .catch((err) => {
          toast.error("Error updating game", {
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

  const handleFileChange = (event, field) => {
    const file = event.currentTarget.files[0];
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"]; // Adjust the types as needed

    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFiles((prevState) => ({
        ...prevState,
        [field]: file,
      }));
      setFileErrors((prevState) => ({
        ...prevState,
        [field]: null,
      }));
    } else {
      setSelectedFiles((prevState) => ({
        ...prevState,
        [field]: null,
      }));
      setFileErrors((prevState) => ({
        ...prevState,
        [field]: "Please select a valid image file (jpeg, png, gif).",
      }));
    }
  };

  const handleClearFile = (field) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [field]: null,
    }));
    setFileErrors((prevState) => ({
      ...prevState,
      [field]: null,
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: 2,
        maxWidth: 600,
        margin: "auto",
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
        </Box>

        <Box sx={{ marginTop: 3 }}>
          {["main", "image1", "image2", "image3"].map((field, index) => (
            <Box
              key={field}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Button
                startIcon={<BackupIcon />}
                variant="soft"
                component="label"
              >
                {index === 0 ? "Main Image" : `Image ${index}`}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </Button>
              {selectedFiles[field] && (
                <>
                  <Alert
                    severity="info"
                    sx={{ flexGrow: 1, marginLeft: 2 }}
                  >
                    <AlertTitle>{selectedFiles[field].name}</AlertTitle>
                    {(selectedFiles[field].size / 1024 / 1024).toFixed(2)} MB
                  </Alert>
                  <IconButton
                    aria-label="clear"
                    size="small"
                    onClick={() => handleClearFile(field)}
                  >
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
                </>
              )}
              {fileErrors[field] && (
                <Alert severity="error" sx={{ flexGrow: 1 }}>
                  <AlertTitle>{fileErrors[field]}</AlertTitle>
                </Alert>
              )}
            </Box>
          ))}
        </Box>

        <Button
          sx={{ marginTop: 3, width: "100%" }}
          type="submit"
          color="primary"
          variant="solid"
        >
          Update Game
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
}
