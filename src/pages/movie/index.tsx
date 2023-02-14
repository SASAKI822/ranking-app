import Header from "@/components/layouts/Header";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Card, Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import SearchMovieList from "@/features/components/SearchMovie";

const movie = () => {
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
              <SearchMovieList searchUrl={requests.search} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default movie;
