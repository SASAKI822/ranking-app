import Header from "@/components/layouts/Header";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import { searchMovieKey, searchMovieResultState } from "@/lib/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import MovieList from "@/features/components/MovieList";

const Movie = () => {
  const SearchMovieResult: any = useRecoilValue(searchMovieResultState);
  const [movieKeyword, setMovieKeyword] = useRecoilState(searchMovieKey);
  return (
    <>
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
          <Grid sx={{ marginTop: "30px", marginBottom: "90px" }}>
            <h2 style={{ padding: "10px" }}>検索結果:{movieKeyword}</h2>
          </Grid>
          <MovieList Movies={SearchMovieResult} fetchUrl={requests.search} />
        </Grid>
      </Grid>
    </>
  );
};

export default Movie;
