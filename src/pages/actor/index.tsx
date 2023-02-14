import ActorList from "@/features/components/ActorList";
import React from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { RegisterActorListState, searchActorResultState } from "@/lib/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const actor = () => {
  const searchActorResult = useRecoilValue(searchActorResultState);
  const setRegisterActorList = useSetRecoilState(RegisterActorListState);
  return (
    <>
      <Grid container>
        <Grid item xs={3} sm={1.5}>
          <Card sx={{ background: "#0f0f0f" }}>
            <SidebarNav />
          </Card>
        </Grid>
        <Grid item xs={9} sm={10.5}>
          <Card sx={{ background: "#0f0f0f" }}>
            <Header />
          </Card>
          <Grid item xs={9}>
            <Card sx={{ background: "#0f0f0f" }}>
              <ActorList Actors={searchActorResult} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default actor;
