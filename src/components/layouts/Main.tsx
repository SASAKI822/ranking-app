import SearchMovie from "@/features/components/SearchMovie";
import { requests } from "@/lib/MovieApi";
import { Card, Grid } from "@mui/material";
import React from "react";
import SidebarNav from "./Sidebar";

const Main = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <SidebarNav />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <SearchMovie searchUrl={requests.search} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
