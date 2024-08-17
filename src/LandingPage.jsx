import React from "react";
import Navbar from "./Navbar";
import FeaturedGamesCarousel from "./FeaturedGamesCarousel";
import { useLocation } from 'react-router-dom';
import GameCardComp from "./GameCardComp";


// eslint-disable-next-line react/prop-types
export default function LandingPage() {
  const location = useLocation();
  const { username } = location.state || {};
  return (
    <div>
      <Navbar name={username}></Navbar>
      <FeaturedGamesCarousel></FeaturedGamesCarousel>
      <GameCardComp></GameCardComp>
    </div>
  );
}
