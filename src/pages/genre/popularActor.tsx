import ActorList from "@/features/components/ActorList";
import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { requests } from "@/lib/MovieApi";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const popularActor: any = () => {
  const [popularActor, setPopularActor] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await axios
        .get(requests.genre.popularActor)
        .then((response) => {
          setPopularActor(response.data.results);
        });
      return data;
    }
    fetchData();
  }, []);
  console.log(popularActor);

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
          <ActorList Actors={popularActor} title="人気俳優" />
        </Grid>
      </Grid>
    </>
  );
};

export default popularActor;
