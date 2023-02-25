import MovieGenre from "@/features/components/MovieGenre";
import { requests } from "@/lib/MovieApi";
import React from "react";
import { Grid } from "@mui/material";
import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import { SidebarState } from "@/lib/atom";
import { useRecoilState } from "recoil";
const Animation = () => {
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);
  return (
    <Grid
      container
      direction="row"
      sx={{ width: "100%" }}
      onClick={(e) => {
        isOpened ? setIsOpened(false) : isOpened;
      }}
    >
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
      <Grid
        item
        sx={{
          width: "100%",
        }}
        xs={0}
        sm={0}
        md={2.2}
        lg={1.8}
        xl={1.3}
      >
        <SidebarNav />
      </Grid>
      <Grid
        item
        sx={{ width: "100%", marginTop: "70px" }}
        xs={12}
        sm={12}
        md={9.5}
        lg={10}
        xl={10.5}
      >
        <MovieGenre
          title="アニメ"
          fetchUrl={requests.genre.fetchAnimation}
          // MovieGenreコンポーネントのfilterAscUrlとfilterDescUrlをコメントアウト
          // filterAscUrl={
          //   requests.genre.fetchAnimation + requests.filter.releaseDateDesc
          // }
          // filterDescUrl={
          //   requests.genre.fetchAnimation + requests.filter.releaseDateDesc
          // }
        />
      </Grid>
    </Grid>
  );
};

export default Animation;
