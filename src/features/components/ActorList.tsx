import { RegisterActorListState, searchActorResultState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem, makeStyles } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

// Header で入力された俳優一覧
const ActorList = ({ Actors }: any) => {
  const setRegisterActorList = useSetRecoilState(RegisterActorListState);

  return (
    <>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
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
                            e.preventDefault();
                            setRegisterActorList((a: any) => {
                              return [...a, actor];
                            });
                          }}
                        >
                          <InfoIcon />
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
