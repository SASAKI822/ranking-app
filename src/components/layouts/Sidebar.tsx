import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, List, ListItem, ListItemIcon } from "@mui/material";

import { useRecoilState } from "recoil";
import { SidebarState } from "@/lib/atom";

export default function SidebarNav() {
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);

  return (
    <>
      <Box sx={{ display: { sm: "none", md: "block" } }}>
        <Sidebar
          style={{
            position: "fixed",
            height: "100%",
            backgroundColor: "#0f0f0f",
            minWidth: "auto",
            borderRightWidth: "0",
            borderRightStyle: "none",
            width: "auto",
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
              icon={<MenuOutlinedIcon />}
              style={{
                textAlign: "center",
                background: "#0f0f0f",
                height: "64px",
              }}
            ></MenuItem>
            <MenuItem
              component={<Link href={{ pathname: "/movie" }}></Link>}
              icon={<HomeOutlinedIcon />}
              style={{ color: "white" }}
            >
              Home
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={
                <Link href={{ pathname: "/myPage/watchedList" }}></Link>
              }
            >
              見た映画
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/myPage/watchList" }}></Link>}
            >
              見る映画
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/myPage/actor" }}></Link>}
            >
              登録俳優
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/TopRated" }}></Link>}
            >
              Top Rated
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Trending" }}></Link>}
            >
              Trending
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Action" }}></Link>}
            >
              Action
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Horror" }}></Link>}
            >
              Horror
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Romance" }}></Link>}
            >
              Romance
            </MenuItem>

            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Document" }}></Link>}
            >
              Document
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Comedy" }}></Link>}
            >
              Comedy
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Animation" }}></Link>}
            >
              Animation
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Adventure" }}></Link>}
            >
              Adventure
            </MenuItem>
            <MenuItem
              style={{ color: "white" }}
              component={<Link href={{ pathname: "/genre/Netfilx" }}></Link>}
            >
              Netfilx
            </MenuItem>
          </Menu>
          {/* </Toolbar> */}
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
          height: "100vh",
          width: "auto",
          zIndex: "100",
          borderRightWidth: "0",
          borderRightStyle: "none",
          "&.MuiPaper-root-MuiDrawer-paper": {
            background: "#0f0f0f",
          },
          display: { sm: "block", md: "none" },
        }}
      >
        <List
          style={{ color: "white", background: "#0f0f0f", height: "100vh" }}
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
          <ListItem style={{ color: "white" }}>
            <ListItemIcon>
              <HomeOutlinedIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <Link href={{ pathname: "/movie" }}>Home</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/myPage/watchedList" }}>見た映画</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/myPage/watchList" }}>見る映画</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/myPage/actor" }}>登録俳優</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/TopRated" }}>Top Rated</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/Trending" }}>Trending</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/Action" }}>Action</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/Horror" }}>Horror</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/Romance" }}>Romance</Link>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <Link href={{ pathname: "/genre/Document" }}>Document</Link>
          </ListItem>
        </List>
      </Drawer>
    </>
    // </div>
  );
}
