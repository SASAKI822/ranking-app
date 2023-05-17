import { requests } from "@/lib/MovieApi";
import { ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ActorListItem, RegisterActorListState, uIdState } from "@/lib/atom";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {
  title: string;
  actors: ActorListItem[];
};

type Actor = {
  id: string;
  name: string;
  img: string;
  profile_path: string;
};

// Header で入力された俳優一覧
const ActorList = ({ actors, title }: Props) => {
  //　ユーザーid
  const userId = useRecoilValue(uIdState);

  // 登録俳優リスト
  const [registerActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );

  // 俳優情報を登録する処理
  const handleAddActor = async (
    e: React.MouseEvent<HTMLInputElement>,
    actor: Actor
  ) => {
    e.preventDefault();

    // 俳優重複フィルター
    const containActor = registerActorList.find(
      (registerActor: any) => registerActor.id === actor.id
    );

    // 登録されていなければ登録
    if (!containActor) {
      const collectionPath = collection(db, "users", userId, "actors");
      // Firestoreに登録
      addDoc(collectionPath, {
        id: actor.id,
        name: actor.name,
        profilePath: actor.profile_path,
      }).then(() => {
        // 登録した俳優情報をstateに追加
        setRegisterActorList([...registerActorList, actor]);
      });
    }
    // 登録されていればアラート
    else {
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
                    <img src={`${requests.IMAGE}${actor.profile_path}`} />
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
