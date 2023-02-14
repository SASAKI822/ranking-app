import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import MovieDetail from "@/features/components/MovieDetail";
import { Card, Grid } from "@mui/material";
import React from "react";

// movie/[id] 映画詳細表示
const index = () => {
  return (
    <>
      <div>
        <Header />
        <Grid container sx={{ background: "#0f0f0f" }}>
          <Grid item xs={2} sx={{ background: "#0f0f0f" }}>
            <Card sx={{ background: "#0f0f0f" }}>
              <SidebarNav />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card sx={{ background: "#0f0f0f" }}>
              <MovieDetail />
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default index;
