import Header from "@/components/layouts/Header";
import React from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import {
  searchMovieKey,
  searchMovieResultState,
  SidebarState,
} from "@/lib/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import MovieList from "@/features/components/MovieList";

const Movie = () => {
  const SearchMovieResult = useRecoilValue(searchMovieResultState);
  const [movieKeyword, setMovieKeyword] = useRecoilState(searchMovieKey);
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);
  console.log(SearchMovieResult);
  return (
    <>
      <Grid
        container
        direction="row"
        sx={{ width: "100%" }}
        onClick={(e) => {
          isOpened ? setIsOpened(false) : isOpened;
        }}
      >
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
        <Grid
          item
          sx={{
            width: "100%",
          }}
          xs={0}
          sm={0}
          md={2.2}
          lg={1.8}
          xl={1.3}
        >
          <SidebarNav />
        </Grid>
        <Grid
          item
          sx={{ width: "100%", marginTop: "70px" }}
          xs={12}
          sm={12}
          md={9.5}
          lg={10}
          xl={10.5}
        >
          <Grid sx={{ marginTop: "30px", marginBottom: "90px" }}>
            <h2 style={{ padding: "10px" }}>検索結果:{movieKeyword}</h2>
          </Grid>
          <MovieList movies={SearchMovieResult} />
        </Grid>
      </Grid>
    </>
  );
};

export default Movie;
