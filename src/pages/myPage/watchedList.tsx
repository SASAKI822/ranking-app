import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";

import WatchedList from "@/features/components/WatchedList";
import { WatchedListState } from "@/lib/atom";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
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
            <h2>見たことある映画リスト</h2>
          </Grid>
          <WatchedList />
        </Grid>
      </Grid>
    </>
  );
};

export default watchedList;
