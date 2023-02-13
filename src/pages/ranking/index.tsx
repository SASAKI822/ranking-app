import Header from "@/components/layouts/Header";
import ActorList from "@/features/components/ActorListContent";
import MovieGenre from "@/features/components/MovieGenre";
import MovieList from "@/features/components/MovieList";
import { requests } from "@/lib/MovieApi";
import React from "react";
import Sidebar from "@/components/layouts/Sidebar";
import Main from "@/components/layouts/Main";

const ranking = () => {
  return (
    <div>
      <Header />
      <Main />

      {/* <h2>映画一覧TopRated</h2>
      <MovieGenre
        title={"ドキュメント"}
        fetchUrl={requests.genre.fetchNetflixOriginals}
      /> */}
    </div>
  );
};

export default ranking;
