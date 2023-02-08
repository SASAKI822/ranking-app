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
import { requests } from "@/lib/MovieApi";

type SearchProps = {
  searchUrl: string;
};
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

const Header = ({ searchUrl }: SearchProps) => {
  const [keyword, setKeyword] = useState("ハリー");
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);

  const inputElement: any = useRef(null);

  const onSearch = (e: any) => {
    e.preventDefault();
    setKeyword(inputElement.current.value);
  };

  const handleMovieDetail = (e: any) => {};
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
  console.log(searchMovie);

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
      <ul>
        {searchMovie.map((movie) => (
          <>
            <li>
              <span>{movie.title}</span>
              <img src={`${requests.image}${movie.poster_path}`} alt="" />
              <button onClick={handleMovieDetail}>詳細を見る</button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};
export default Header;
