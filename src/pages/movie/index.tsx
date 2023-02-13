import Header from "@/components/layouts/Header";
import ActorList from "@/features/components/ActorListContent";
import MovieGenre from "@/features/components/MovieGenre";
import MovieList from "@/features/components/MovieList";
import { requests } from "@/lib/MovieApi";
import React from "react";
import Sidebar from "@/components/layouts/Sidebar";
import Main from "@/components/layouts/Main";

const movie = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default movie;
