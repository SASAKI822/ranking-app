import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import MovieList from "@/features/components/MovieList";
import { WatchListState } from "@/lib/atom";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 見る映画リスト
const watchList = () => {
  const watchMoviesList: any = useRecoilValue(WatchListState);
  const setWatchMoviesList: any = useSetRecoilState(WatchListState);
  const copyWatchMoviesList: any = [...watchMoviesList];
  console.log(copyWatchMoviesList);

  // 削除機能
  const handleDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchMoviesList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
  };
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
            <MovieList Movies={watchMoviesList} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default watchList;
