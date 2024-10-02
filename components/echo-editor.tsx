import React from "react";

import dynamic from "next/dynamic";
import { Editor } from "@/components/echo";

// const Editor = dynamic(() => import("@/components/echo"), {
//   ssr: false,
// });

export const EchoEditorComp = () => {
  return <Editor />;
};
