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

export default function GameCardComp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("Action");

  const handlegamecategory = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setPage(0); // Reset to the first page when the category changes
    getGameByCategory(selectedCategory, 0);
  };

  function getGameByCategory(category) {
    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:2001/getGameByCategory/${category}`)
        .then((response) => {
          setData(response.data);
          // setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, 700);

    // Cleanup the timer if the component unmounts or page changes
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:2001/admin/getAll/${page}/8`)
        .then((response) => {
          setData(response.data.content);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, 700);

    // Cleanup the timer if the component unmounts or page changes
    return () => clearTimeout(timer);
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
      <div className="d-flex justify-content-end container">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={category}
            label="Category"
            onChange={handlegamecategory}
          >
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="RPG">RPG</MenuItem>
            <MenuItem value="Shooter">Shooter</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="container mt-5">
        <div className="row flex flex-center">
          {data.map((game, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
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
                    <img
                      src={`http://localhost:2001/uploads/${game.gameimage}`}
                      alt={game.gametitle}
                      loading="lazy"
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="body-xs">{game.gamecategory}</Typography>
                  <Link
                    href="#game-card"
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
                      <CurrencyRupeeSharpIcon></CurrencyRupeeSharpIcon>{" "}
                      {game.gameprice}
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
                      {game.gamediscount} <PercentSharpIcon></PercentSharpIcon>
                    </Typography>
                  </div>
                  <Typography level="body-sm">
                    {game.gamedescription}
                  </Typography>
                </CardContent>
                <CardOverflow>
                  <Button variant="solid" color="danger" size="lg">
                    Add to cart
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
