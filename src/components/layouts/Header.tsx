import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useSetRecoilState } from "recoil";
import { searchKey } from "@/lib/atom";
import { useState, useRef } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import { API_KEY, requests } from "@/lib/MovieApi";
import { useRouter } from "next/router";

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
  // Input入力値をKeyword に入れる
  const setKeyword = useSetRecoilState(searchKey);
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  const inputElement: any = useRef(null);
  const router = useRouter();

  // Enterキーを押すと起動され入力値をKeywordに入れる
  const onSearch = (e: any) => {
    e.preventDefault();
    setKeyword(inputElement.current.value);
    router.push("/movie");
  };

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
    </>
  );
};
export default Header;
