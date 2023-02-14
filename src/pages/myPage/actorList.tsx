import { RegisterActorListState } from "@/lib/atom";
import React from "react";
import { useRecoilValue } from "recoil";

import ActorList from "@/features/components/ActorList";

const actorList = () => {
  const RegisterActorList: any = useRecoilValue(RegisterActorListState);
  console.log(RegisterActorList);
  return (
    <>
      <ActorList Actors={RegisterActorList} />
    </>
  );
};

export default actorList;
