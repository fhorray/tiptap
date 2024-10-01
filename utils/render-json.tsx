import React from "react";

// Tipos do JSON
interface TextNode {
  type: "text";
  text: string;
}

interface ParagraphNode {
  type: "paragraph";
  content: Array<TextNode | ParagraphNode>;
}

export interface DocumentNode {
  type: "doc";
  content: Array<ParagraphNode>;
}

// Definindo um tipo para todos os nós
type RichTextNode = TextNode | ParagraphNode | DocumentNode;

export interface RichTextContent {
  doc: DocumentNode;
}

// Função para renderizar o conteúdo
const renderNode = (node: RichTextNode): React.ReactNode => {
  switch (node.type) {
    case "text":
      return node.text; // Renderiza o texto diretamente
    case "paragraph":
      return <p key={Math.random()}>{node.content.map(renderNode)}</p>;
    case "doc":
      return <div>{node.content.map(renderNode)}</div>; // Renderiza o documento
    // Adicione outros casos para diferentes tipos de nós, como "heading", "list", etc.
    default:
      return null;
  }
};

// Componente principal
export const RichTextRenderer: React.FC<{ content: RichTextContent }> = ({
  content,
}) => {
  return <div>{renderNode(content.doc)}</div>;
};
