import ActorList from "@/features/components/ActorList";
import React from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import {
  searchActorKey,
  searchActorResultState,
  SidebarState,
} from "@/lib/atom";
import { useRecoilState, useRecoilValue } from "recoil";

const Actor = () => {
  // 俳優検索結果
  const searchActorResult = useRecoilValue(searchActorResultState);

  // 俳優検索キーワード
  const actorKeyword = useRecoilValue(searchActorKey);

  // サイドバー開閉
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);
  return (
    <>
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
          <div style={{ marginTop: "20px", padding: "10px" }}>
            <h2>検索結果:{actorKeyword}</h2>
          </div>

          <ActorList actors={searchActorResult} title="" />
        </Grid>
      </Grid>
    </>
  );
};

export default Actor;
