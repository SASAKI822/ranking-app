import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Grid } from "@mui/material";
import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";

const Romance = () => {
  return (
    <Grid container direction="row" sx={{ width: "100%" }}>
      <Grid
        item
        sx={{
          background: "#0f0f0f",
          position: "fixed",
          width: "100%",
          zIndex: "1",
        }}
        xs={12}
      >
        <Header />
      </Grid>
      <Grid item sx={{ width: "100%" }} md={2}>
        <SidebarNav />
      </Grid>
      <Grid item sx={{ width: "100%", marginTop: "70px" }} md={10}>
        <MovieGenre
          title="ロマンス"
          fetchUrl={requests.genre.fetchRomanceMovies}
          filterAscUrl={
            requests.genre.fetchRomanceMovies + requests.filter.releaseDateDesc
          }
          filterDescUrl={
            requests.genre.fetchRomanceMovies + requests.filter.releaseDateDesc
          }
        />
      </Grid>
    </Grid>
  );
};

export default Romance;
