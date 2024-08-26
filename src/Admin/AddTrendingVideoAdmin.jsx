import React, { useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import BackupIcon from "@mui/icons-material/Backup";
import { styled } from "@mui/joy";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function AddTrendingVideoAdmin() {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [fileErrors, setFileErrors] = useState([null, null, null, null]);

  const formik = useFormik({
    initialValues: {
      video1: null,
      video2: null,
      video3: null,
      video4: null,
    },
    onSubmit: () => {
      // Check if all fields have a selected file
      const hasAllFiles = selectedFiles.every((file) => file !== null);

      if (!hasAllFiles) {
        toast.error("Please upload a file for all fields.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        if (file) {
          formData.append(`video${index + 1}`, file);
        }
      });

      axios
        .post("http://localhost:2001/addtrending/video", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Successfully Added", {
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
          toast.error(`Error: ${err.message}`, {
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

  const handleFileChange = (index) => (event) => {
    const file = event.currentTarget.files[0];
    const allowedFileTypes = ["image/", "video/mp4", "audio/mp3"];

    if (file && allowedFileTypes.some((type) => file.type.startsWith(type))) {
      const newFiles = [...selectedFiles];
      newFiles[index] = file;
      setSelectedFiles(newFiles);

      const newErrors = [...fileErrors];
      newErrors[index] = null;
      setFileErrors(newErrors);
    } else {
      const newErrors = [...fileErrors];
      newErrors[index] = "Please select a valid file (image, mp4, or mp3).";
      setFileErrors(newErrors);
    }
  };

  const handleClearFile = (index) => () => {
    const newFiles = [...selectedFiles];
    newFiles[index] = null;
    setSelectedFiles(newFiles);

    const newErrors = [...fileErrors];
    newErrors[index] = null;
    setFileErrors(newErrors);
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          {["Video 1", "Video 2", "Video 3", "Video 4"].map((label, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={<BackupIcon />}
                fullWidth
              >
                {selectedFiles[index] ? (
                  <>
                    {selectedFiles[index].name}
                    <IconButton
                      color="inherit"
                      onClick={handleClearFile(index)}
                      aria-label="clear file"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  `Upload ${label}`
                )}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange(index)}
                  accept="image/*,video/mp4,audio/mp3"
                />
              </Button>
              {fileErrors[index] && (
                <Alert severity="error" variant="outlined">
                  <AlertTitle>Error</AlertTitle>
                  {fileErrors[index]}
                </Alert>
              )}
            </Box>
          ))}
          <Button type="submit" variant="soft" color="primary" size="lg" fullWidth>
            Add
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
}
