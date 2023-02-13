import {
  Sidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
  sidebarClasses,
  useProSidebar,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
export default function SidebarNav() {
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
        },
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "white",
                backgroundColor: active ? "black" : "#0f0f0f",
              };
          },
        }}
      >
        <MenuItem
          component={<Link href={{ pathname: "/movie" }}></Link>}
          icon={<HomeOutlinedIcon />}
        >
          Home
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/myPage/watchedList" }}></Link>}
        >
          見た映画
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/myPage/watchList" }}></Link>}
        >
          見る映画
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/myPage/actor" }}></Link>}
        >
          登録俳優
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/TopRated" }}></Link>}
        >
          Top Rated
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/Trending" }}></Link>}
        >
          Trending
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/Action" }}></Link>}
        >
          Action
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/Horror" }}></Link>}
        >
          Horror
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/Romance" }}></Link>}
        >
          Romance
        </MenuItem>

        <MenuItem
          component={<Link href={{ pathname: "/genre/Document" }}></Link>}
        >
          Document
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
