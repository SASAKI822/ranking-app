import { RegisterActorListState } from "@/lib/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import { Grid } from "@mui/material";
import ActorList from "@/features/components/ActorList";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

const actorList = () => {
  const RegisterActorList: any = useRecoilValue(RegisterActorListState);
  console.log(RegisterActorList);
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
            <ActorList Actors={RegisterActorList} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default actorList;
