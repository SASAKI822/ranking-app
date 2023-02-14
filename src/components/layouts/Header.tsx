import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  searchActorKey,
  searchActorResultState,
  searchMovieKey,
  searchMovieResultState,
} from "@/lib/atom";
import { useState, useRef, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import { API_KEY, requests } from "@/lib/MovieApi";
import { useRouter } from "next/router";
import axios from "axios";

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

const Header = ({ searchUrl }: any) => {
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  // Input入力値をKeyword に入れる
  const setMovieKeyword = useSetRecoilState(searchMovieKey);
  const movieKeyword = useRecoilValue(searchMovieKey);
  const setSearchMovieResultState = useSetRecoilState(searchMovieResultState);
  const router = useRouter();
  const inputMovieElement: any = useRef(null);

  const movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
  // Enterキーを押すと起動されMovie入力値をKeywordに入れる
  const onSearchMovie = (e: any) => {
    e.preventDefault();
    setMovieKeyword(inputMovieElement.current.value);
    router.push("/movie");
  };

  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(movieUrl, {
          params: {
            query: movieKeyword,
            page: 1,
          },
        })
        .then((response) => {
          const data = response.data.results;

          setSearchMovieResultState(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [movieUrl, movieKeyword]);

  const [actor, setActor] = useState<Movie[]>([]);
  const setActorKeyword = useSetRecoilState(searchActorKey);
  const actorKeyword = useRecoilValue(searchActorKey);
  const setSearchActorResult = useSetRecoilState(searchActorResultState);
  const searchActorResult = useRecoilValue(searchActorResultState);
  const inputActorElement: any = useRef(null);
  // Enterキーを押すと起動され俳優入力値をKeywordに入れる
  const onSearchActor = (e: any) => {
    e.preventDefault();
    setActorKeyword(inputActorElement.current.value);
    router.push("/actor");
  };

  const ActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorKeyword}`;

  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(ActorUrl)
        .then((response) => {
          const data = response.data.results;
          setSearchActorResult(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [ActorUrl, actorKeyword]);
  console.log(searchActorResult);
  // keyword に応じたapiを取得し、searchMovieにdataを格納する。

  console.log(searchMovie);
  return (
    <>
      <Box sx={{ flexGrow: 1, background: "#0f0f0f" }}>
        <AppBar
          position="static"
          sx={{
            background: "#0f0f0f",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Ranking
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={onSearchMovie}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  inputRef={inputMovieElement}
                />
              </form>
              <form onSubmit={onSearchActor}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  inputRef={inputActorElement}
                />
              </form>
            </Search>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
