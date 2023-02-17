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
  const searchActorResult = useRecoilValue(searchActorResultState);
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
        {searchActorResult &&
          searchActorResult.length > 0 &&
          searchActorResult.map((actor: any) => (
            <>
              {actor.profile_path && (
                <div key={actor.id}>
                  <ImageListItem key={actor.img}>
                    <Link
                      style={{ textAlign: "center" }}
                      key={actor.id}
                      href={{
                        pathname: "/actor/[id]",
                        query: {
                          id: actor.id,
                        },
                      }}
                    >
                      <img src={`${requests.image}${actor.profile_path}`} />
                      <ImageListItemBar
                        title={actor.name}
                        actionIcon={
                          <IconButton
                            sx={{
                              color: "rgba(255, 255, 255, 0.54)",
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
                </div>
              )}
            </>
          ))}
      </ImageList>
    </>
  );
};

export default ActorList;
