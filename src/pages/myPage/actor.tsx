import { RegisterActorListState, SidebarState, uIdState } from "@/lib/atom";
import { useRecoilState } from "recoil";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Actor = {
  id: string;
  name: string;
  img: string;
  profilePath: string;
};
const ActorList = () => {
  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);

  // 登録俳優
  const [registerActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );
  // サイドバー開閉
  const [isOpened, setIsOpened] = useRecoilState(SidebarState);

  // 俳優削除
  const handleDelete = async (
    e: React.MouseEvent<HTMLElement>,
    targetActor: Actor
  ) => {
    const actorsRef = collection(db, "users", userId, "actors");
    const q = query(actorsRef, where("id", "==", targetActor.id));
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.map((document) => {
        const actorDocument = doc(db, "users", userId, "actors", document.id);
        deleteDoc(actorDocument);
      });
    });
  };

  // 登録actor を表示
  useEffect(() => {
    async function fetchData() {
      const actorsRef = query(collection(db, "users", userId, "actors"));

      await getDocs(actorsRef).then((querySnapshot) => {
        setRegisterActorList(
          querySnapshot.docs.map((doc) => ({ ...doc.data() }))
        );
      });
    }
    fetchData();
  }, [registerActorList, handleDelete]);

  // 俳優削除するときalert
  const submit = (actor: Actor) => {
    confirmAlert({
      title: "本当に消しますか？",

      buttons: [
        {
          label: "Yes",
          onClick: (e: React.MouseEvent<HTMLElement>) => handleDelete(e, actor),
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <>
      <Grid
        container
        direction="row"
        sx={{ width: "100%" }}
        onClick={(e) => {
          isOpened ? setIsOpened(false) : isOpened;
        }}
      >
        <Grid
          item
          sx={{
            background: "#0f0f0f",
            position: "fixed",
            width: "100%",
            zIndex: "1",
          }}
          xs={12}
        >
          <Header />
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
          }}
          xs={0}
          sm={0}
          md={2.2}
          lg={1.8}
          xl={1.3}
        >
          <SidebarNav />
        </Grid>
        <Grid
          item
          sx={{ width: "100%", marginTop: "70px" }}
          xs={12}
          sm={12}
          md={9.5}
          lg={10}
          xl={10.5}
        >
          <div style={{ marginTop: "20px", padding: "10px" }}>
            <h2>登録俳優</h2>
          </div>
          <ImageList
            gap={8}
            sx={{
              mb: 8,
              marginTop: "85px",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))!important",
            }}
            cols={4}
          >
            {registerActorList &&
              registerActorList.length > 0 &&
              registerActorList.map((actor: Actor) => (
                <>
                  {actor.profilePath && (
                    <ImageListItem
                      key={actor.img}
                      sx={{ maxWidth: "185px", placeSelf: "center" }}
                    >
                      <Link
                        style={{ textAlign: "center", maxWidth: "185px" }}
                        key={actor.id}
                        href={{
                          pathname: "/actor/[id]",
                          query: {
                            id: actor.id,
                            name: actor.name,
                          },
                        }}
                      >
                        <img src={`${requests.image}${actor.profilePath}`} />
                        <ImageListItemBar
                          sx={{
                            "& .MuiImageListItemBar-title": {
                              textAlign: "start",
                              overflow: "auto",
                              whiteSpace: "normal",
                              "& .MuiImageListItemBar-title": {
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              },
                            },
                          }}
                          title={actor.name}
                          actionIcon={
                            <IconButton
                              sx={{
                                color: "rgba(255, 255, 255, 0.6)",
                                height: "30px",
                              }}
                              aria-label={`info about ${actor.name}`}
                              // 俳優登録ボタン
                              onClick={(e: React.MouseEvent<HTMLElement>) => {
                                submit(actor);
                                e.preventDefault();
                              }}
                            >
                              +
                            </IconButton>
                          }
                        />
                      </Link>
                    </ImageListItem>
                  )}
                </>
              ))}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
};

export default ActorList;
