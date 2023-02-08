import Header from "@/components/layouts/Header";

import MovieList from "@/features/components/MovieList";
import { requests } from "@/lib/MovieApi";
import Search from "@mui/icons-material/Search";

import React from "react";

const ranking = () => {
  return (
    <div>
      <Header searchUrl={requests.search} />
    </div>
  );
};

export default ranking;
