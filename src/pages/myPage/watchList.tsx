import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import WatchList from "@/features/components/WatchList";
import { WatchListState } from "@/lib/atom";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
  const [watchedList, setWatchedList] = useRecoilState(WatchListState);
  const [watchList, setWatchList] = useRecoilState(WatchListState); // 削除機能
  const handleWatchDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
    setWatchedList((a: any) => {
      return [...a, targetMovie];
    });
  };

  //  <button onClick={(e) => handleDelete(e, movie)}>削除</button>

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
          <WatchList />
        </Grid>
      </Grid>
    </>
  );
};

export default watchedList;
