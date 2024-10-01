"use client";

import StarterKit from "@tiptap/starter-kit";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BubbleMenu,
  EditorContent,
  JSONContent,
  generateHTML,
  useEditor,
} from "@tiptap/react";
import { useEffect, useMemo, useState } from "react";

// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Heading from "@tiptap/extension-heading";

export const TipTap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "w-full focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
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

  const output = useMemo(() => {
    return generateHTML(editor?.getJSON() as JSONContent, [StarterKit]);
  }, [editor]);

  return (
    <div className="w-[450px] h-auto overflow-y-hidden border-2 border-gray-300 rounded-md">
      <div className="w-full bg-gray-300 h-10">
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            data-state={editor?.isActive("bold") ? "on" : "off"}
          >
            <BoldIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            data-state={editor?.isActive("italic") ? "on" : "off"}
          >
            <ItalicIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            data-state={editor?.isActive("strike") ? "on" : "off"}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className="w-full h-[250px] max-h-auto p-2"
        onClick={() => {
          // Verifica se o editor tem conteúdo e se o clique não está dentro de uma seleção
          const isEmpty = editor?.isEmpty; // Checa se o editor está vazio
          const isSelection = editor?.state.selection.empty; // Checa se há seleção ativa

          if (isEmpty || isSelection) {
            const endPos = editor?.state.doc.content.size; // Pega o tamanho do conteúdo
            editor?.chain().focus().setTextSelection(endPos).run(); // Coloca o cursor na última posição
          }
        }}
      >
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <ToggleGroup type="multiple">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                data-state={editor?.isActive("bold") ? "on" : "off"}
              >
                <BoldIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                data-state={editor?.isActive("italic") ? "on" : "off"}
              >
                <ItalicIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="underline"
                aria-label="Toggle underline"
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                data-state={editor?.isActive("strike") ? "on" : "off"}
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* CONTENT */}
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="render">RENDER</TabsTrigger>
          <TabsTrigger value="content">CONTENT</TabsTrigger>
        </TabsList>
        <TabsContent value="render">{output}</TabsContent>
        <TabsContent value="content">
          <div className="w-full bg-blue-200 h-auto p-2">
            <pre className="whitespace-pre-wrap break-words">
              <code>{JSON.stringify(editor?.getJSON(), null, 2)}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
