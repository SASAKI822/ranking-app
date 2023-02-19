import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

const GenreButton = () => {
  const [variantState, setVariantState] = useState("");
  return (
    <>
      {/* <Stack spacing={2} direction="row">
        <Button variant={variantState}>Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack> */}
    </>
  );
};

export default GenreButton;
