import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import WatchList from "@/features/components/WatchList";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

// JSXの書かれたコンポーネントは大文字始まり
// 名前が被っていたため修正
// 見たことある映画リスト
const WatchMovieList = () => {
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

export default WatchMovieList;
