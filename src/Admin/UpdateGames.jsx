import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DiscountIcon from "@mui/icons-material/Discount";
import PriceIcon from "@mui/icons-material/AttachMoney";
import ImageIcon from "@mui/icons-material/Image";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Skeleton from "@mui/material/Skeleton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function UpdateGames({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(1); // Initial page set to 1
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    setPage(value);
    // eslint-disable-next-line react/prop-types
    console.log(search);
  };

  useEffect(() => {
    getAllGame(page);
  }, [page]);

  function getAllGame(page) {
    // Set the loading state immediately
    setLoading(true);

    // Perform both the axios request and a 2-second timeout simultaneously
    Promise.all([
      axios.get(`http://localhost:2001/admin/getAll/${page - 1}/10`), // Adjusted for 0-indexed page
      new Promise((resolve) => setTimeout(resolve, 500)), // 2-second delay
    ])
      .then(([response]) => {
        // Handle the response after both axios request and timeout are complete
        setData(response.data.content);
        setPageSize(response.data.totalPages); // Get total pages from response
        setLoading(false);
      })
      .catch((err) => {
        // Handle errors
        setError(err);
        setLoading(false);
      });
  }

  function deleteGame(gameid) {
    return new Promise((resolve, reject) => {
      if (window.confirm("Are you sure you want to delete this game?")) {
        axios
          .delete(`http://localhost:2001/admin/deletegame/${gameid}`)
          .then((response) => {
            toast.success("Game deleted successfully!");
            resolve(response);
            getAllGame(page); // Refresh the game list after deletion
          })
          .catch((err) => {
            toast.error("Error deleting game!");
            reject(err);
          });
      }
    });
  }

  async function updateGame(id) {
    await new Promise((resolve) => {
      localStorage.setItem("gameid", id);
      resolve(); // Resolve the promise after setting the item
    });

    navigate("/toUpdate");
  }

  if (loading) {
    return (
      <>
        <Stack spacing={2} alignItems="center" marginTop={2}>
          <Pagination
            count={pageSize}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="skeleton table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <TitleIcon />
                </TableCell>
                <TableCell align="center">
                  <DescriptionIcon />
                </TableCell>
                <TableCell align="center">
                  <CategoryIcon />
                </TableCell>
                <TableCell align="center">
                  <DiscountIcon />
                </TableCell>
                <TableCell align="center">
                  <PriceIcon />
                </TableCell>
                <TableCell align="center">
                  <ImageIcon />
                </TableCell>
                <TableCell align="center">
                  <DeleteSweepIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={150} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={200} height={100} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} alignItems="center" marginTop={2}>
          <Pagination
            count={pageSize}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={pageSize}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="games table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <TitleIcon />
              </TableCell>
              <TableCell align="center">
                <DescriptionIcon />
              </TableCell>
              <TableCell align="center">
                <CategoryIcon />
              </TableCell>
              <TableCell align="center">
                <DiscountIcon />
              </TableCell>
              <TableCell align="center">
                <PriceIcon />
              </TableCell>
              <TableCell align="center">
                <ImageIcon />
              </TableCell>
              <TableCell align="center">
                <DeleteSweepIcon />
              </TableCell>
              <TableCell align="center">
                <DriveFileRenameOutlineIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {item.gametitle}
                </TableCell>
                <TableCell align="center">{item.gamedescription}</TableCell>
                <TableCell align="center">{item.gamecategory}</TableCell>
                <TableCell align="center">{item.gamediscount}</TableCell>
                <TableCell align="center">{item.gameprice}</TableCell>
                <TableCell align="center">
                  {item.gameimage.endsWith(".mp4") ||
                  item.gameimage.endsWith(".webm") ? (
                    <video controls style={{ height: "100px", width: "200px" }}>
                      <source
                        src={`http://localhost:2001/uploads/${item.gameimage}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={`http://localhost:2001/uploads/${item.gameimage}`}
                      style={{ height: "100px", width: "200px" }}
                      alt={item.gametitle}
                    />
                  )}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteGame(item.gameid)} // Wrap in an arrow function
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => updateGame(item.gameid)} // Wrap in an arrow function
                  >
                    <DriveFileRenameOutlineSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={pageSize}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </>
  );
}
