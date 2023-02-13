import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";

const TopRated = () => {
  return (
    <div>
      <MovieGenre title="トップ" fetchUrl={requests.genre.fetchTopRated} />
    </div>
  );
};

export default TopRated;
