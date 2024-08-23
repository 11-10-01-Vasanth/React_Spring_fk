import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FeaturedGamesCarousel from "./FeaturedGamesCarousel";
import GameCardComp from "./GameCardComp";

// eslint-disable-next-line react/prop-types
export default function LandingPage() {
  const [username, setUsername] = useState();

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name);
  }, []);
  return (
    <div>
      <Navbar name={username}></Navbar>
      <FeaturedGamesCarousel></FeaturedGamesCarousel>
      <GameCardComp></GameCardComp>
    </div>
  );
}
