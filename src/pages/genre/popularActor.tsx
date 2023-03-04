import ActorList from "@/features/components/ActorList";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { requests } from "@/lib/MovieApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { SidebarState, uIdState } from "@/lib/atom";
import { useRecoilState } from "recoil";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const PopularActor = () => {
  const [popularActor, setPopularActor] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);
  const [userId, setUserId] = useRecoilState(uIdState);
  const [page, setPage] = useState<number>(20);
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setCurrentPage(value);
  };
  useEffect(() => {
    async function fetchData() {
      const data = await axios
        .get(requests.genre.popularActor + `&page=${currentPage}`)
        .then((response) => {
          setPage(response.data.total_pages);
          setPopularActor(response.data.results);
        });
      return data;
    }
    fetchData();
  }, [currentPage]);
  console.log(page);
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
