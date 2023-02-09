import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState, useRef, createContext } from "react";
import { Movie } from "@/features/components/MovieList";
import { API_KEY, requests } from "@/lib/MovieApi";
import Link from "next/link";
import movie from "@/pages/actor/movie";

type SearchProps = {
  searchUrl: string;
};

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

const Header = ({ searchUrl }: SearchProps) => {
  // Input入力値をKeyword に入れる
  const [keyword, setKeyword] = useState("ハリー");
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  const [detailActors, setDetailActors] = useState<any>([]);
  const [actorContent, setActorContent] = useState<any>([]);

  const inputElement: any = useRef(null);

  // Enterキーを押すと起動され入力値をKeywordに入れる
  const onSearch = (e: any) => {
    e.preventDefault();
    setKeyword(inputElement.current.value);
  };

  const handleMovieDetail = (e: any) => {};

  // keyword に応じたapiを取得し、searchMovieにdataを格納する。
  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(searchUrl, {
          params: {
            query: keyword,
            page: 1,
          },
        })
        .then((response) => {
          const data = response.data.results;

          setSearchMovie(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [searchUrl, keyword]);

  // 検索結果のdata取得しIDをactorUrlに代入し検索結果のactor情報を取得。
  // movie情報とactor情報をactorContentに格納
  useEffect(() => {
    const actorContentList: any[] = [];
    const actorList = searchMovie.map((movie: any) => {
      const actorUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`;
      axios
        .get(actorUrl)
        .then((response) => {
          actorContentList.push({
            movie,
            cast: response.data.cast,
          });

          return response.data.cast;
        })
        .catch((error) => {
          console.log(error.response);
        });
    });
    setDetailActors(actorList);
    setActorContent(actorContentList);
  }, [searchMovie]);

  console.log(actorContent);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
              <form onSubmit={onSearch}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  inputRef={inputElement}
                />
              </form>
            </Search>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {actorContent.map((value: any) => {})}
    </>
  );
};
export default Header;
{
  /* <img src={`${requests.image}${movie.poster_path}`} alt="" /> */
}
{
  /* <Link
                href={{
                  pathname: `ranking/${movie.id}`,
                  query: {
                    title: movie.title,
                    image: movie.poster_path,
                    cast: movie.cast,
                  },
                }}
              >
                <button onClick={handleMovieDetail}>詳細を見る</button>
                <ul>li</ul>
              </Link> */
}
