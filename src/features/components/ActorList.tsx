import { requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ActorListItem, RegisterActorListState, uIdState } from "@/lib/atom";
import { useRecoilState } from "recoil";

// Header で入力された俳優一覧

type Props = {
  title: string;
  actors: ActorListItem[];
  // titleはPropsとして利用しないのでオプショナルにする
};

export type Actor = {
  id: string;
  name: string;
  img: string;
  profile_path: string;
};

const ActorList = ({ actors, title }: Props) => {
  const [userId, setUserId] = useRecoilState(uIdState);
  const [registerActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );

  // 俳優を登録
  const handleAddActor = async (
    e: React.MouseEvent<HTMLInputElement>,
    actor: Actor
  ) => {
    e.preventDefault();

    // 俳優重複フィルター
    const contain = registerActorList.filter((value: any) => {
      return value.id === actor.id;
    });
    if (contain.length === 0) {
      const collectionPath = collection(db, "users", userId, "actors");
      const q = query(collectionPath);
      setRegisterActorList([actor]);
      await getDocs(q).then((querySnapshot) => {
        const actorsDocumentRef = addDoc(collectionPath, {
          id: actor.id,
          name: actor.name,
          profilePath: actor.profile_path,
        });
      });
    } else {
      window.alert("すでに追加されています。");
    }
  };

  return (
    <>
      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h2>{title}</h2>
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
        {actors &&
          actors.length > 0 &&
          actors.map((actor: any) => (
            <>
              {actor.profile_path && (
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
                    <img src={`${requests.image}${actor.profile_path}`} />
                    <ImageListItemBar
                      sx={{
                        background: "rgba(0, 0, 0, 0.7);",
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
                          onClick={(e: any) => {
                            handleAddActor(e, actor);
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
    </>
  );
};

export default ActorList;
