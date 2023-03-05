import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  loginState,
  searchActorKey,
  searchActorResultState,
  searchMovieKey,
  searchMovieResultState,
  SidebarState,
} from "@/lib/atom";
import { API_KEY } from "@/lib/MovieApi";
import Link from "next/link";
import { auth } from "@/lib/firebase";
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
import Switch from "@mui/material/Switch";

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
  const [inputMovie, setInputMovie] = useState("");

  // Input入力値をactorKeywordに入れる
  const [actorKeyword, setActorKeyword] = useRecoilState(searchActorKey);
  const [inputActor, setInputActor] = useState("");

  // movieKeywordを基に得たmovie情報を格納
  const setSearchMovieResult = useSetRecoilState(searchMovieResultState);

  // actorKeywordを基に得たactor情報を格納
  const setSearchActorResult = useSetRecoilState(searchActorResultState);

  // ハンバーガーメニュー開閉
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);

  // 映画検索　俳優検索切り替え
  const [alignment, setAlignment] = useState("Movie");

  // サインインチェック
  const signInCheck = useRecoilValue(loginState);

  const router: NextRouter = useRouter();

  // Enterキーを押すと起動されMovie入力値をmovieKeywordに入れる
  const onSearchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMovieKeyword(inputMovie);
    router.push("/movie");
  };

  // Enterキーを押すと起動され俳優入力値をKeywordに入れる
  const onSearchActor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActorKeyword(inputActor);
    router.push("/actor");
  };

  useEffect(() => {
    // movieKeywordを基にmovieUrlからデータを所得しSearchMovieResultに格納
    const MovieUrl: string = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${movieKeyword}`;

    async function SearchData() {
      await axios
        .get(MovieUrl)
        .then((response) => {
          const data = response.data.results;

          setSearchMovieResult(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    SearchData();
  }, [movieKeyword, setSearchMovieResult]);

  useEffect(() => {
    // actorKeywordを基にactorUrlからデータを所得しSearchActorResultに格納
    const ActorUrl: string = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorKeyword}`;

    async function SearchData() {
      await axios
        .get(ActorUrl)
        .then((response) => {
          const data = response.data.results;
          setSearchActorResult(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    SearchData();
  }, [actorKeyword, setSearchActorResult]);

  // 映画検索　俳優検索切り替え関数
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // サインイン関数
  const handleLogoIn = () => {
    router.push("/signin");
  };
  //　サインアウト関数
  const handleLogout = () => {
    auth.signOut();
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [checked, setChecked] = useState(false);

  const switchHandler = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Box
        onClick={(e) => {
          isOpened ? setIsOpened(false) : isOpened;
        }}
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
          <Toolbar sx={{ minHeight: { xs: "60px", sm: "63px" } }}>
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
              <Link href={{ pathname: "/movie" }}>Ranking</Link>
            </Typography>

            <ToggleButtonGroup
              color="info"
              value={alignment}
              exclusive
              onChange={handleChange}
              sx={{ background: "white", display: { xs: "none", sm: "block" } }}
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
            <Search sx={{ display: "block" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {(() => {
                  if (alignment === "Movie") {
                    return (
                      <>
                        <form onSubmit={onSearchMovie}>
                          <StyledInputBase
                            placeholder="映画検索"
                            inputProps={{ "aria-label": "search" }}
                            value={inputMovie}
                            onChange={(e) => setInputMovie(e.target.value)}
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
                            value={inputActor}
                            onChange={(e) => setInputActor(e.target.value)}
                            sx={{ width: "20ch" }}
                          />
                        </form>
                      </>
                    );
                  }
                })()}
              </Box>
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                {(() => {
                  if (checked === false) {
                    return (
                      <>
                        <form onSubmit={onSearchMovie}>
                          <StyledInputBase
                            placeholder="映画検索"
                            inputProps={{ "aria-label": "search" }}
                            value={inputMovie}
                            onChange={(e) => setInputMovie(e.target.value)}
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
                  } else if (checked === true) {
                    return (
                      <>
                        <form onSubmit={onSearchActor}>
                          <StyledInputBase
                            placeholder="俳優を検索"
                            inputProps={{ "aria-label": "search" }}
                            value={inputActor}
                            onChange={(e) => setInputActor(e.target.value)}
                            sx={{ width: "20ch" }}
                          />
                        </form>
                      </>
                    );
                  }
                })()}
              </Box>
            </Search>
            <Switch
              onChange={switchHandler}
              {...label}
              sx={{ display: { xs: "block", sm: "none" } }}
            />
            <Link href={{ pathname: "/signin" }}>
              {signInCheck ? (
                <Button color="inherit" onClick={handleLogout}>
                  <div style={{ lineHeight: 1.1 }}>
                    <h3>
                      Log<span style={{ display: "block" }}>out</span>
                    </h3>
                  </div>
                </Button>
              ) : (
                <Button color="inherit" onClick={handleLogoIn}>
                  <h3>Login</h3>
                </Button>
              )}
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
