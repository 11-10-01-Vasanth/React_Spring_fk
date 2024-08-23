import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Container, Typography, Chip, Box } from '@mui/material';

export default function ShowSelectGame() {
  const [data, setData] = useState();
  const [username, setUsername] = useState();

  function getGameById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:2001/admin/getGameById/${id}`)
        .then((res) => {
          const a = res.data[0];
          setData(a);
          console.log(a);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  useEffect(() => {
    const gameid = localStorage.getItem("gameid");
    const name = localStorage.getItem("username");
    setUsername(name);
    getGameById(gameid);
  }, []);

  return (
    <>
      <Navbar name={username} />
      {data && (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
          <img
            src={`http://localhost:2001/uploads/${data.gameimage}`}
            alt={data.gametitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
              padding: 3,
            }}
          >
            <Container sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="div" gutterBottom>
                {data.gametitle}
              </Typography>
              <Typography variant="h6" paragraph>
                {data.gamedescription}
              </Typography>
              <Chip
                label={data.gamecategory}
                color="primary"
                sx={{ marginBottom: 2 }}
              />
              <Typography variant="h4" component="div">
                ${data.gameprice} <Typography variant="body1" component="span">({data.gamediscount}% off)</Typography>
              </Typography>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}
