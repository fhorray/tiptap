"use client";

import StarterKit from "@tiptap/starter-kit";
import { Loader2Icon } from "lucide-react";

import {
  BubbleMenu,
  EditorContent,
  JSONContent,
  generateHTML,
  useEditor,
} from "@tiptap/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { EditorMenu } from "./editor-menu";

import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import BulletList from "@tiptap/extension-bullet-list";

export const TipTap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "w-full focus:outline-none h-full",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Paragraph,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    // autofocus: true,
    editable: true,
    injectCSS: true,
  });

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  if (!editor) {
    return <Loader2Icon className="animate-spin" />;
  }

  return (
    <div className=" w-full flex flex-col items-center justify-center gap-4">
      <div className="w-[50%] h-auto overflow-y-hidden border-2 border-gray-300 rounded-xl bg-white p-4">
        <div className="w-full h-10">
          <EditorMenu editor={editor} />
        </div>
        <div className="w-full h-[250px] max-h-auto p-2">
          {/* <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <EditorMenu editor={editor} />
            </BubbleMenu> */}

          <EditorContent editor={editor} className="h-full" />
        </div>

        {/* BUTTONS */}
        <div className="w-full flex items-center justify-end">
          <Button type="button" variant={"ghost"}>
            Cancelar
          </Button>
          <Button type="button" variant={"outline"}>
            Salvar
          </Button>
        </div>
      </div>

      <div className="w-full bg-blue-200 h-auto p-2 max-w-[50%] rounded-xl max-h-[300px] overflow-y-auto">
        <pre className="whitespace-pre-wrap break-words">
          <code>{JSON.stringify(editor?.getJSON(), null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
