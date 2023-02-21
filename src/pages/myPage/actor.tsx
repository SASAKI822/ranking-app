import { RegisterActorListState, RegisterActorList } from "@/lib/atom";

import { useRecoilState, useRecoilValue } from "recoil";
import { Grid } from "@mui/material";
import SidebarNav from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const actorList = () => {
  const [RegisterActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );
  const handleDelete = (e: any, targetActor: any) => {
    setRegisterActorList((current: any) =>
      current.filter((value: any) => targetActor !== value)
    );
  };
  const submit = (actor: any) => {
    confirmAlert({
      title: "本当に消しますか？",

      buttons: [
        {
          label: "Yes",
          onClick: (e: any) => handleDelete(e, actor),
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <>
      <Grid container direction="row" sx={{ width: "100%" }}>
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
        <Grid item sx={{ width: "100%" }} md={2}>
          <SidebarNav />
        </Grid>
        <Grid item sx={{ width: "100%", marginTop: "70px" }} md={10}>
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
            {RegisterActorList &&
              RegisterActorList.length > 0 &&
              RegisterActorList.map((actor: any) => (
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

export default actorList;
