import Header from "@/components/layouts/Header";
import ActorDetail from "@/features/components/ActorDetail";
import React from "react";

// actor/[id] 俳優出演映画表示
const index = () => {
  return (
    <>
      <Header />
      <div>
        <ActorDetail />
      </div>
    </>
  );
};

export default index;
