import Header from "@/components/layouts/Header";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";

import { searchMovieResultState } from "@/lib/atom";
import { useRecoilValue } from "recoil";
import MovieList from "@/features/components/MovieList";

const movie = () => {
  const SearchMovieResult: any = useRecoilValue(searchMovieResultState);
  return (
    <>
      <Grid container sx={{ width: "100%" }}>
        <Grid item sx={{ background: "#0f0f0f" }}>
          <Header />
        </Grid>
        <Grid container direction="row" sx={{ width: "100%" }}>
          <Grid item sx={{ height: "100%" }} xs="auto" sm={1.5}>
            <SidebarNav />
          </Grid>
          <Grid item sx={{ width: "100%" }} xs="auto" sm={10.5}>
            <MovieList Movies={SearchMovieResult} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default movie;
