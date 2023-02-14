import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
const Horror = () => {
  return (
    <div>
      <MovieGenre
        title="ホラー"
        fetchUrl={requests.genre.fetchHorrorMovies}
        filterAscUrl={
          requests.genre.fetchHorrorMovies + requests.filter.popularAsc
        }
        filterDescUrl={
          requests.genre.fetchHorrorMovies + requests.filter.popularDesc
        }
      />
    </div>
  );
};

export default Horror;
