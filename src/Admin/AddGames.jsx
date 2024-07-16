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

const validationSchema = Yup.object({
  gameTitle: Yup.string().required("Game Title Required"),
  gameDescription: Yup.string().required("Game Description Required"),
  gamePrice: Yup.number()
    .required("Game Price Required")
    .positive("Game Price Required as positive value"),
  gameDiscount: Yup.number()
    .required("Game Discount Required")
    .min(0)
    .max(1000, "Must be between 0 and 1000"),
  gameCategory: Yup.string().required("Game Category Required"),
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
      gameTitle: "",
      gameDescription: "",
      gamePrice: "",
      gameDiscount: "",
      gameCategory: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = { ...values, selectedFile };
      console.log(data);

      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:2001/admin/addgames", data)
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // Handle form submission logic here
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
            id="gameTitle"
            name="gameTitle"
            label="Game Title"
            variant="outlined"
            size="medium"
            value={formik.values.gameTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gameTitle && Boolean(formik.errors.gameTitle)}
            helperText={formik.touched.gameTitle && formik.errors.gameTitle}
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
            id="gameDescription"
            name="gameDescription"
            label="Game Description"
            variant="outlined"
            size="medium"
            value={formik.values.gameDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gameDescription &&
              Boolean(formik.errors.gameDescription)
            }
            helperText={
              formik.touched.gameDescription && formik.errors.gameDescription
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
            id="gamePrice"
            name="gamePrice"
            label="Game Price"
            variant="outlined"
            size="medium"
            value={formik.values.gamePrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gamePrice && Boolean(formik.errors.gamePrice)}
            helperText={formik.touched.gamePrice && formik.errors.gamePrice}
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
            id="gameDiscount"
            name="gameDiscount"
            label="Game Discount"
            variant="outlined"
            size="medium"
            value={formik.values.gameDiscount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gameDiscount && Boolean(formik.errors.gameDiscount)
            }
            helperText={
              formik.touched.gameDiscount && formik.errors.gameDiscount
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
            id="gameCategory"
            name="gameCategory"
            label="Game Category"
            variant="outlined"
            size="medium"
            value={formik.values.gameCategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gameCategory && Boolean(formik.errors.gameCategory)
            }
            helperText={
              formik.touched.gameCategory && formik.errors.gameCategory
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
    </Box>
  );
}
