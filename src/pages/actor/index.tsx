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
      <Grid container direction="row" sx={{ width: "100%", padding: "20px" }}>
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
          <Grid>検索結果:{actorKeyword}</Grid>
          <ActorList Actors={searchActorResult} />
          <Stack spacing={2} sx={{ color: "white", margin: "40px 0" }}>
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              color={"standard"}
              sx={{
                "&. MuiPagination-ul": {
                  backgroundColor: "#0f0f0f",
                },
                background: "white",
                margin: "auto",
                textAlign: "center",
                padding: "20px",
                color: "white",
              }}
              onChange={handleChange}
              size="large"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Actor;
