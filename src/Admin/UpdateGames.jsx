import React, { useState, useEffect } from "react";
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

export default function UpdateGames() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2001/admin/getAll/0/10")
      .then((response) => {
        setData(response.data.content);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
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
                <DiscountIcon />
              </TableCell>
              <TableCell align="center">
                <PriceIcon />
              </TableCell>
              <TableCell align="center">
                <ImageIcon />
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
                <TableCell align="center">{item.gamediscount}</TableCell>
                <TableCell align="center">{item.gameprice}</TableCell>
                <TableCell align="center">
                  <img
                    src={`http://localhost:2001/uploads/${item.gameimage}`}
                    style={{ height: "100px", width: "200px" }}
                    alt={item.gametitle}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
