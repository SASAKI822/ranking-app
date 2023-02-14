import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function SidebarNav() {
  const { collapseSidebar, toggleSidebar, toggled } = useProSidebar();

  // ハンバーガーメニューを押したときサイドバーの開閉
  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      collapseSidebar();
      console.log(toggled);
    } else {
      collapseSidebar();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        position: "fixed",
        zIndex: "100",
      }}
    >
      <Sidebar
        // breakPoint="sm"
        // transitionDuration={800}
        style={{
          height: "100vh",
          background: "#0f0f0f",
          minWidth: "auto",
          zIndex: "100",
          borderRightWidth: "0",
          borderRightStyle: "none",
        }}
      >
        <Menu style={{ color: "white", background: "#0f0f0f" }}>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              toggle();
            }}
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
            component={<Link href={{ pathname: "/myPage/watchedList" }}></Link>}
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
            component={<Link href={{ pathname: "/myPage/actorList" }}></Link>}
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
            component={<Link href={{ pathname: "/genre/Screening" }}></Link>}
          >
            上映中
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
        </Menu>
      </Sidebar>
    </div>
  );
}
