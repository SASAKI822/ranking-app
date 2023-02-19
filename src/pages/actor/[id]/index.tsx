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
const Actor = () => {
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
          <ActorDetail />
        </Grid>
      </Grid>
    </>
  );
};

export default Actor;
