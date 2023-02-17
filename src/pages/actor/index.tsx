import ActorList from "@/features/components/ActorList";
import React from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { RegisterActorListState, searchActorResultState } from "@/lib/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const actor = () => {
  const searchActorResult: any = useRecoilValue(searchActorResultState);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <SidebarNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph>
            <ActorList Actors={searchActorResult} />
          </Typography>
          <Typography paragraph></Typography>
        </Box>
      </Box>
    </>
  );
};

export default actor;
