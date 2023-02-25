import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import { useRecoilState } from "recoil";
import { SidebarState } from "@/lib/atom";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import ColorizeIcon from "@mui/icons-material/Colorize";
import SickIcon from "@mui/icons-material/Sick";
import Person4Icon from "@mui/icons-material/Person4";

export default function SidebarNav() {
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          position: "fixed",
        }}
      >
        <Sidebar
          style={{
            height: "100%",
            backgroundColor: "#0f0f0f",
            borderRightWidth: "0",
            borderRightStyle: "none",
            width: "160px",
            minWidth: 0,
            paddingTop: "65px",
          }}
        >
          <Menu
            style={{
              color: "white",
              backgroundColor: "#0f0f0f",
              height: "100%",
            }}
          >
            <MenuItem
              component={<Link href={{ pathname: "/movie" }}></Link>}
              icon={<HomeOutlinedIcon />}
              style={{ color: "white" }}
            >
              Home
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/myPage/watchList" }}></Link>}
              icon={<BookmarkAddIcon />}
            >
              見る映画
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={
                <Link href={{ pathname: "/myPage/watchedList" }}></Link>
              }
              icon={<MovieIcon />}
            >
              見た映画
            </MenuItem>
            <MenuItem
              style={{ color: "white", borderBottom: "1px solid" }}
              component={<Link href={{ pathname: "/myPage/actor" }}></Link>}
              icon={<HowToRegIcon />}
            >
              登録俳優
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={
                <Link href={{ pathname: "/genre/popularActor" }}></Link>
              }
              icon={<Person4Icon />}
            >
              人気俳優
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/topRated" }}></Link>}
              icon={<WhatshotIcon />}
            >
              Top Rated
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/action" }}></Link>}
              icon={<ColorizeIcon />}
            >
              Action
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/horror" }}></Link>}
              icon={<SickIcon />}
            >
              Horror
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/romance" }}></Link>}
              icon={<VolunteerActivismIcon />}
            >
              Romance
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/document" }}></Link>}
              icon={<DocumentScannerOutlinedIcon />}
            >
              Document
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/comedy" }}></Link>}
              icon={<EmojiEmotionsIcon />}
            >
              Comedy
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/animation" }}></Link>}
              icon={<FlutterDashIcon />}
            >
              Animation
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/adventure" }}></Link>}
              icon={<SportsHandballIcon />}
            >
              Adventure
            </MenuItem>
          </Menu>
        </Sidebar>
      </Box>
      <Drawer
        anchor={"left"}
        variant="persistent"
        ModalProps={{
          keepMounted: false,
        }}
        open={isOpened}
        sx={{
          width: "180px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "180px",
            height: "100%",
            boxSizing: "border-box",
          },
          "&.MuiPaper-root-MuiDrawer-paper": {
            background: "#0f0f0f",
            borderRightWidth: "0",
            borderRightStyle: "none",
            marginTop: "63px",
          },
          display: { xs: "block", md: "none" },
        }}
      >
        <List
          style={{
            color: "white",
            background: "#0f0f0f",
            height: "100vh",
            width: "100%",
            paddingTop: 0,
          }}
        >
          <ListItem
            onClick={() => {
              setIsOpened(!isOpened);
            }}
            style={{
              textAlign: "center",
              background: "#0f0f0f",
              height: "64px",
            }}
          >
            <ListItemIcon>
              <MenuOutlinedIcon
                sx={{ color: "#fff", "&:hover": { cursor: "pointer" } }}
              />
            </ListItemIcon>
          </ListItem>
          <Menu
            style={{
              color: "white",
              backgroundColor: "#0f0f0f",
              height: "100%",
            }}
          >
            <MenuItem
              component={<Link href={{ pathname: "/movie" }}></Link>}
              icon={<HomeOutlinedIcon />}
              style={{ color: "white" }}
            >
              Home
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/myPage/watchList" }}></Link>}
              icon={<BookmarkAddIcon />}
            >
              見る映画
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={
                <Link href={{ pathname: "/myPage/watchedList" }}></Link>
              }
              icon={<MovieIcon />}
            >
              見た映画
            </MenuItem>
            <MenuItem
              style={{ color: "white", borderBottom: "1px solid" }}
              component={<Link href={{ pathname: "/myPage/actor" }}></Link>}
              icon={<HowToRegIcon />}
            >
              登録俳優
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={
                <Link href={{ pathname: "/genre/popularActor" }}></Link>
              }
              icon={<Person4Icon />}
            >
              人気俳優
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/topRated" }}></Link>}
              icon={<WhatshotIcon />}
            >
              Top Rated
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/action" }}></Link>}
              icon={<ColorizeIcon />}
            >
              Action
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/horror" }}></Link>}
              icon={<SickIcon />}
            >
              Horror
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/romance" }}></Link>}
              icon={<VolunteerActivismIcon />}
            >
              Romance
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/document" }}></Link>}
              icon={<DocumentScannerOutlinedIcon />}
            >
              Document
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/comedy" }}></Link>}
              icon={<EmojiEmotionsIcon />}
            >
              Comedy
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/animation" }}></Link>}
              icon={<FlutterDashIcon />}
            >
              Animation
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/adventure" }}></Link>}
              icon={<SportsHandballIcon />}
            >
              Adventure
            </MenuItem>
          </Menu>
        </List>
      </Drawer>
    </>
  );
}
