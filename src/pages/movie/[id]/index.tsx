import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import MovieDetail from "@/features/components/MovieDetail";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ActorDetail from "@/features/components/ActorDetail";
import { Grid } from "@mui/material";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// movie/[id] 映画詳細表示
const movie = () => {
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
            <MovieDetail />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default movie;
