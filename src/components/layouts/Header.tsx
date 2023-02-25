import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import {
  searchActorKey,
  searchActorResultState,
  searchMovieKey,
  searchMovieResultState,
  SidebarState,
} from "@/lib/atom";
import { API_KEY } from "@/lib/MovieApi";

import { useRef, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "next/link";

// Header Css 記述
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// Header コンポーネント

const Header = () => {
  // Input入力値をmovieKeywordに入れる
  const [movieKeyword, setMovieKeyword] = useRecoilState(searchMovieKey);
  const inputMovieElement = useRef<HTMLInputElement | null>(null);

  // Input入力値をactorKeywordに入れる
  const [actorKeyword, setActorKeyword] = useRecoilState(searchActorKey);
  const inputActorElement: any = useRef<string | null>(null);

  // movieKeywordを基に得たmovie情報を格納
  const [SearchMovieResult, setSearchMovieResult] = useRecoilState(
    searchMovieResultState
  );

  // actorKeywordを基に得たactor情報を格納
  const [searchActorResult, setSearchActorResult] = useRecoilState(
    searchActorResultState
  );

  // Enterキーを押すと起動されMovie入力値をmovieKeywordに入れる
  const onSearchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // nullの場合は処理を終了
    if (!inputMovieElement.current) return
    setMovieKeyword(inputMovieElement.current.value);
    router.push("/movie");
  };

  // Enterキーを押すと起動され俳優入力値をKeywordに入れる
  const onSearchActor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActorKeyword(inputActorElement.current.value);
    router.push("/actor");
  };

  // movieKeywordを基にmovieUrlからデータを所得しSearchMovieResultに格納
  const MovieUrl: string = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=ja`;

  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(MovieUrl, {
          params: {
            query: movieKeyword,
            page: 1,
          },
        })
        .then((response) => {
          const data = response.data.results;

          setSearchMovieResult(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [MovieUrl, movieKeyword, setSearchMovieResult]);

  const ActorUrl: string = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorKeyword}&page=1&page2`;

  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(ActorUrl)
        .then((response) => {
          const data = response.data.results;
          console.log(data)
          setSearchActorResult(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [ActorUrl, actorKeyword, setSearchActorResult]);

  // keyword に応じたapiを取得し、searchMovieにdataを格納する。

  const router: NextRouter = useRouter();

  // ハンバーガーメニュー開閉
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);
  const [alignment, setAlignment] = useState("Movie");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (!newAlignment) return
    setAlignment(newAlignment);
  };


  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          background: "#0f0f0f",
          display: "flex",
          width: "100%",
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: "#0f0f0f",
          }}
        >
          <Toolbar sx={{ minHeight: "63px" }}>
            <MenuOutlinedIcon
              sx={{
                display: { sm: "block", md: "none" },
                "&:hover": { cursor: "pointer" },
                marginRight: "10px",
              }}
              onClick={() => setIsOpened(!isOpened)}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Ranking
            </Typography>
            <ToggleButtonGroup
              color="info"
              value={alignment}
              exclusive
              onChange={handleChange}
              sx={{ background: "white" }}
              aria-label="Platform"
            >
              <ToggleButton
                value="Movie"
                sx={{ color: "black", lineHeight: 1 }}
              >
                Movie
              </ToggleButton>
              <ToggleButton
                value="Actor"
                sx={{ color: "black", lineHeight: 1 }}
              >
                Actor
              </ToggleButton>
            </ToggleButtonGroup>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              {(() => {
                if (alignment === "Movie") {
                  return (
                    <>
                      <form onSubmit={onSearchMovie}>
                        <StyledInputBase
                          placeholder="映画検索"
                          inputProps={{ "aria-label": "search" }}
                          inputRef={inputMovieElement}
                          sx={{
                            width: "20ch",
                            "&.MuiInputBase-root.MuiInputBase-input": {
                              width: "14ch",
                            },
                          }}
                        />
                      </form>
                    </>
                  );
                } else if (alignment === "Actor") {
                  return (
                    <>
                      <form onSubmit={onSearchActor}>
                        <StyledInputBase
                          placeholder="俳優を検索"
                          inputProps={{ "aria-label": "search" }}
                          inputRef={inputActorElement}
                          sx={{ width: "20ch" }}
                        />
                      </form>
                    </>
                  );
                }
              })()}
            </Search>
            <Link href={{ pathname: "/signin" }}>
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
