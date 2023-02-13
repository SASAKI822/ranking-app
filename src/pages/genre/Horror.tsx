import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
const Horror = () => {
  return (
    <div>
      <MovieGenre title="ホラー" fetchUrl={requests.genre.fetchHorrorMovies} />
    </div>
  );
};

export default Horror;
