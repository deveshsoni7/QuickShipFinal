import React from "react";
import SearchForm from "../Search/Search";
import Card from "../Card/Card";
import LongCard from "../LongCard/LongCard";
import WannaGo from "../WannaGo/WannaGo";
import LongCard2 from "../LongCard2/LongCard2"
import LastCard from "../LastCard/LatsCard";

const Header = () => {
  return (
    <>

<header className="w-full h-72 bg-cover bg-center flex items-start justify-center pt-12 "
  style={{
    backgroundImage:
      "url('https://cdn.blablacar.com/kairos/assets/images/carpool_blablabus_large-e3d8eff32c13cdafc080.svg')",
  }}
>
  <h1 className="font-bold text-white text-5xl">
  The best way to send parcels—fast and cheap!
  </h1>
</header>
      <SearchForm />
      <Card/>
      <LongCard/>
      <WannaGo/>
      <LongCard2/>
      <LastCard/>
    </>
  );
};

export default Header;
