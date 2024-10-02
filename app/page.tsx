import { EchoEditorComp } from "@/components/echo-editor";
import { TipTap } from "@/components/tiptap";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200">
      {/* <TipTap /> */}
      <EchoEditorComp />
    </div>
  );
}
