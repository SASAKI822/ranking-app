import { RegisterActorListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem } from "@mui/material";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Header で入力された俳優一覧
type Props = {
  Actors: [];
  title: string;
};

export type Actor = {
  id: string;
  name: string;
  image: string;
  profile_path: string;
};
const ActorList = ({ Actors, title }: Props) => {
  // 俳優を登録
  const handleAddActor = async (
    e: React.MouseEvent<HTMLInputElement>,
    actor: Actor
  ) => {
    e.preventDefault();
    const collectionPath = collection(
      db,
      "users",
      "3afv8SDIvjimSBLiXZsM",
      "actors"
    );

    const actorsDocumentRef = await addDoc(collectionPath, {
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    });
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
        {Actors &&
          Actors.length > 0 &&
          Actors.map((actor: any) => (
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
                          aria-label={`info about ${actor.title}`}
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
