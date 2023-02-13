import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
const Document = () => {
  return (
    <div>
      <MovieGenre
        title="ドキュメント"
        fetchUrl={requests.genre.fetchDocumentaryMovies}
      />
    </div>
  );
};

export default Document;
