import Header from "@/components/layouts/Header";

import React from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";

import MovieList from "@/features/components/MovieList";
import { useRecoilValue } from "recoil";
import { searchMovieResultState } from "@/lib/atom";

const movie = () => {
  const SearchMovieResult: any = useRecoilValue(searchMovieResultState);
  return (
    <>
      <Grid container>
        <Grid item xs={3} sm={1.5}>
          <Card sx={{ background: "#0f0f0f" }}>
            <SidebarNav />
          </Card>
        </Grid>
        <Grid item xs={9} sm={10.5}>
          <Card sx={{ background: "#0f0f0f" }}>
            <Header />
          </Card>
          <Grid item xs={9}>
            <Card sx={{ background: "#0f0f0f" }}>
              <MovieList Movies={SearchMovieResult} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default movie;
