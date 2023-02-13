import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";

const Romance = () => {
  return (
    <div>
      <MovieGenre
        title="ロマンス"
        fetchUrl={requests.genre.fetchRomanceMovies}
      />
    </div>
  );
};

export default Romance;
