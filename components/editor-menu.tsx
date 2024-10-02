import React from "react";
import {
  ALargeSmall,
  AlignCenter,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRight,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { ListBulletIcon } from "@radix-ui/react-icons";

export const EditorMenu = ({ editor }: { editor: Editor }) => {
  const hasHeading = editor?.isActive("heading");

  const handleAlignClick = (align: string) => {
    const currentAlign = editor?.getAttributes("textAlign").align;
    if (currentAlign === align) {
      // Desmarcar se o alinhamento atual for o mesmo
      editor.chain().focus().setTextAlign("unset").run();
    } else {
      // Desmarcar outros alinhamentos e definir o novo
      editor.chain().focus().setTextAlign(align).run();
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      {/* BOLD */}
      <Toggle
        value="bold"
        aria-label="Toggle bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        data-state={editor?.isActive("bold") ? "on" : "off"}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      {/* UNDERLINE */}
      <Toggle
        value="underline"
        aria-label="Toggle underline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        data-state={editor?.isActive("underline") ? "on" : "off"}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      {/* ITALIC */}
      <Toggle
        value="italic"
        aria-label="Toggle italic"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        data-state={editor?.isActive("italic") ? "on" : "off"}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      {/* STRIKE */}
      <Toggle
        value="strike"
        aria-label="Toggle strike"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        data-state={editor?.isActive("strike") ? "on" : "off"}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      {/* FONT SIZE */}
      <Select
        onValueChange={(v) => {
          const level = parseInt(v) as 1 | 2 | 3 | 4;

          if (editor && !editor.state.selection.empty) {
            editor
              .chain()
              .focus()
              .removeEmptyTextStyle()
              .setHeading({ level })
              .run();
          }
        }}
      >
        <SelectTrigger className="w-auto border-none">
          {hasHeading ? <SelectValue placeholder="H1" /> : <ALargeSmall />}
        </SelectTrigger>
        <SelectContent className="min-w-[65px]">
          <SelectItem value="1" className="text-3xl">
            Extra Grande
          </SelectItem>
          <SelectItem value="2" className="text-2xl">
            Grande
          </SelectItem>
          <SelectItem value="3" className="text-xl">
            Médio
          </SelectItem>
          <SelectItem value="4" className="text-sm">
            Pequeno
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="bg-red-950" />

      {/* ALIGN */}
      {/* LEFT */}
      <Toggle
        data-state={
          editor?.getAttributes("textAlign").align === "left" ? "on" : "off"
        }
        onClick={() => handleAlignClick("left")}
      >
        <AlignLeftIcon />
      </Toggle>
      {/* CENTER */}
      <Toggle
        data-state={
          editor?.getAttributes("textAlign").align === "center" ? "on" : "off"
        }
        onClick={() => handleAlignClick("center")}
      >
        <AlignCenter />
      </Toggle>
      {/* RIGHT */}
      <Toggle
        data-state={
          editor?.getAttributes("textAlign").align === "right" ? "on" : "off"
        }
        onClick={() => handleAlignClick("right")}
      >
        <AlignRight />
      </Toggle>
      {/* JUSTIFY */}
      <Toggle
        data-state={
          editor?.getAttributes("textAlign").align === "justify" ? "on" : "off"
        }
        onClick={() => handleAlignClick("justify")}
      >
        <AlignJustifyIcon />
      </Toggle>

      <Separator orientation="vertical" className="bg-red-950" />
    </div>
  );
};
