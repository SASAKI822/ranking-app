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
          <Grid>
            <h2>登録俳優</h2>
          </Grid>
          <ActorList Actors={RegisterActorList} />
        </Grid>
      </Grid>
    </>
  );
};

export default actorList;
