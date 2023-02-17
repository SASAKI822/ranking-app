import Header from "@/components/layouts/Header";
import ActorDetail from "@/features/components/ActorDetail";
import React from "react";
import SidebarNav from "@/components/layouts/Sidebar";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

// actor/[id] 俳優出演映画表示
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// actor/[id] 映画詳細表示
const actor = () => {
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
            <ActorDetail />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default actor;
