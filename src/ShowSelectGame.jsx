import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


export default function ShowSelectGame() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);

  const getGameById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:2001/admin/getGameById/${id}`
      );
      setData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const gameid = localStorage.getItem("gameid");
    const name = localStorage.getItem("username");
    setUsername(name);
    if (gameid) getGameById(gameid);
  }, []);

  return (
    <>
      <Navbar name={username} />
      {data && (
        <>

        </>
      )}
    </>
  );
}
