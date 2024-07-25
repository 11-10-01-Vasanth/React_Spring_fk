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

export default function AddGames() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

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
      formData.append("gameimage", selectedFile);

      console.log(formData);

      axios
        .post("http://localhost:2001/admin/addgames", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Successfully Added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(response.data);
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

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setFileError(null);
    } else {
      setSelectedFile(null);
      setFileError("Please select an image file.");
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
