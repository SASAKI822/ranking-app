import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Grid } from "@mui/material";
import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";

const Horror = () => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item sx={{ background: "#0f0f0f" }}>
        <Header />
      </Grid>
      <Grid container direction="row" sx={{ width: "100%" }}>
        <Grid item sx={{ height: "100%" }} xs="auto" sm={1.5}>
          <SidebarNav />
        </Grid>
        <Grid item sx={{ width: "100%" }} xs="auto" sm={10.5}>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Horror;
