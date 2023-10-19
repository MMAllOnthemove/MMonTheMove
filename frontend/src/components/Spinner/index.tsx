import React from "react";
import { Spinner as Loading } from "@chakra-ui/react";

function Spinner() {
  return (
    <main className="flex flex-col justify-center items-center h-screen max-h-screen">
      <Loading size="xl" />
    </main>
  );
}

export default Spinner;
