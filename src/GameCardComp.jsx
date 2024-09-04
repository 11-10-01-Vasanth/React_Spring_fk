import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "@mui/material/Skeleton";
import PercentSharpIcon from "@mui/icons-material/PercentSharp";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

export default function GameCardComp() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [allcategory, setAllCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handlegamecategory = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setPage(0); // Reset to the first page when the category changes
    getGameByCategory(selectedCategory, 0);
  };

  function getGameByCategory(category) {
    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:2001/admin/getGameByCategory/${category}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, 700);

    return () => clearTimeout(timer);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchDefaultGames();
  };

  function navigateGame(id, name) {
    navigate(`/games/${name}`);
    localStorage.setItem("gameid", id);
  }

  function getAllGameCategory() {
    axios
      .get(`http://localhost:2001/admin/getAllGameCategory`)
      .then((res) => {
        setAllCategory(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      axios
        .get(`http://localhost:2001/admin/getsearchedgame/${searchQuery}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      // If search query is empty, fetch the default game list
      fetchDefaultGames();
    }
  };

  const fetchDefaultGames = () => {
    setLoading(true);
    axios
      .get(`http://localhost:2001/admin/getAll/${page}/12`)
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDefaultGames();
    getAllGameCategory();
  }, [page]);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
            className="ms-2"
          >
            Next
          </Button>
        </div>
        <div className="container mt-5">
          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <Card
                  sx={{
                    height: 500,
                    width: 320,
                    maxWidth: "100%",
                    boxShadow: "lg",
                  }}
                >
                  <CardOverflow>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  </CardOverflow>
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                  <CardOverflow>
                    <Skeleton variant="rectangular" width="100%" height={40} />
                  </CardOverflow>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
          className="ms-2"
        >
          Next
        </Button>
      </div>
      <div className="d-flex justify-content-between container">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={category}
            label="Category"
            onChange={handlegamecategory}
          >
            {allcategory.map((element, index) => (
              <MenuItem key={index} value={element}>
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: "25px",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          {searchQuery && (
            <IconButton onClick={clearSearch} aria-label="clear search">
              <ClearIcon />
            </IconButton>
          )}
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="container mt-5">
        <div className="row flex flex-center justify-content-center">
          {data.map((game, index) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={index}>
              <Card
                sx={{
                  height: 500,
                  width: 390,
                  maxWidth: "100%",
                  boxShadow: "lg",
                }}
              >
                <CardOverflow>
                  <AspectRatio sx={{ minWidth: 250 }}>
                    {game.gameimage && (
                      <img
                        src={
                          game.gameimage
                            ? `http://localhost:2001/uploads/${game.gameimage}`
                            : "https://via.placeholder.com/800x600.png?text=No+Image"
                        }
                        alt={game.gametitle || "Default title"}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </AspectRatio>
                </CardOverflow>
                <CardContent
                  onClick={() => {
                    navigateGame(game.gameid, game.gametitle);
                  }}
                >
                  <Typography level="body-xs">{game.gamecategory}</Typography>
                  <Link
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    endDecorator={<ArrowOutwardIcon />}
                  >
                    {game.gametitle}
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      level="title-lg"
                      sx={{ fontWeight: "xl", marginRight: "1rem" }}
                      endDecorator={
                        <Chip
                          component="span"
                          size="sm"
                          variant="soft"
                          color="success"
                        >
                          Price
                        </Chip>
                      }
                    >
                      <CurrencyRupeeSharpIcon /> {game.gameprice}
                    </Typography>
                    <Typography
                      level="title-lg"
                      sx={{ fontWeight: "xl" }}
                      endDecorator={
                        <Chip
                          component="span"
                          size="sm"
                          variant="soft"
                          color="success"
                        >
                          Discount
                        </Chip>
                      }
                    >
                      {game.gamediscount} <PercentSharpIcon />
                    </Typography>
                  </div>

                  <Typography level="body-sm">
                    {game.gamedescription}
                  </Typography>
                </CardContent>

                <CardOverflow>
                  <Button variant="solid" color="danger" size="lg">
                    Explore{" "}
                    <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                  </Button>
                </CardOverflow>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


{/* {[
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
            const videoKey = `img_vid${index + 1}`; // Key for accessing the video/image in gameData
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
                  label={`Image/Video ${index+1}`}
                  value={getFileName()} // Display the file name or empty string
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
                          onClick={removeFile(videoKey)} // Alternative name for clearing file
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
                <VisuallyHiddenInput
                  type="file"
                  onChange={updateFile(videoKey)} // Alternative name for handling file upload
                  accept="video/mp4,audio/mp3"
                  style={{ display: "none" }} // Hide the actual input element
                  id={`upload-button-${index}`}
                />
              </Grid>
            );
          })} */}