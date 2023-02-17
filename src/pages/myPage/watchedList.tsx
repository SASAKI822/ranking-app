import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import MovieList from "@/features/components/MovieList";
import { WatchedListState, WatchListState } from "@/lib/atom";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
  const watchedMoviesList: any = useRecoilValue(WatchedListState);
  const setWatchedMoviesList: any = useSetRecoilState(WatchedListState);
  const handleDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchedMoviesList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
  };
  //  <button onClick={(e) => handleDelete(e, movie)}>削除</button>

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
            <MovieList Movies={watchedMoviesList} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default watchedList;
