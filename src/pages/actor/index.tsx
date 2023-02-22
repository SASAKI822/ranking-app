import ActorList from "@/features/components/ActorList";
import React from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import {
  RegisterActorListState,
  searchActorKey,
  searchActorResultState,
} from "@/lib/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Actor = () => {
  const searchActorResult: any = useRecoilValue(searchActorResultState);
  const [actorKeyword, setActorKeyword] = useRecoilState(searchActorKey);
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
          <div style={{ marginTop: "20px", padding: "10px" }}>
            <h2>検索結果:{actorKeyword}</h2>
          </div>

          <ActorList Actors={searchActorResult} />
        </Grid>
      </Grid>
    </>
  );
};

export default Actor;
