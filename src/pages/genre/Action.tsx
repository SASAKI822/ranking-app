import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";

const Action = () => {
  return (
    <div>
      <MovieGenre
        title="アクション"
        fetchUrl={requests.genre.fetchActionMovies}
      />
    </div>
  );
};

export default Action;
