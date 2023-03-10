import ActorList from "@/features/components/ActorList";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import axios from "axios";
import { requests } from "@/lib/MovieApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { SidebarState } from "@/lib/atom";
import { useRecoilState } from "recoil";

const PopularActor = () => {
  // 人気俳優
  const [popularActor, setPopularActor] = useState([]);

  // ページネーション 現在のページ
  const [currentPage, setCurrentPage] = useState(1);

  // サイドバー開閉
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);

  // ページ数
  const [page, setPage] = useState(20);

  // ページネーション変更関数
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setCurrentPage(value);
  };

  // 俳優一覧取得
  useEffect(() => {
    async function fetchData() {
      const data = await axios
        .get(requests.GENRE.POPULAR_ACTOR + `&page=${currentPage}`)
        .then((response) => {
          setPage(response.data.total_pages);
          setPopularActor(response.data.results);
        });
    }
    fetchData();
  }, [currentPage]);

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
          <ActorList actors={popularActor} title="人気俳優" />
          <Stack spacing={2} sx={{ color: "white", margin: "40px 0" }}>
            <Pagination
              count={page}
              variant="outlined"
              shape="rounded"
              color={"standard"}
              sx={{
                "&. MuiPagination-ul": {
                  backgroundColor: "#0f0f0f",
                },
                background: "white",
                margin: { xs: " 0 auto 50px" },
                textAlign: "center",
                padding: "20px",
                color: "white",
                width: { sm: "400px" },
              }}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PopularActor;
