import "../Editor/Tiptap.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useEffect, useState } from "react";

import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";

import {FaBold,FaItalic,FaUnderline,FaStrikethrough,FaListUl,FaListOl,FaParagraph,FaHeading,FaUndo,FaRedo} from "react-icons/fa";
import {BsBlockquoteLeft , BsCodeSlash,BsFileBreakFill,BsNodeMinus} from "react-icons/bs";
import {BiImageAdd,BiCodeBlock} from "react-icons/bi";
import {RxDividerHorizontal } from "react-icons/rx"

import {MdDatasetLinked,MdOutlineDatasetLinked} from "react-icons/md"
import {HiOutlineBookmarkSlash} from "react-icons/hi2"

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <a href="#" title="BOLD"><FaBold/></a> 
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <a href="#" title="ITALIC"><FaItalic/></a> 
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <a href="#" title="UNDERLINE"><FaUnderline/></a> 
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <a href="#" title="STRIKE"><FaStrikethrough/></a> 
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <a href="#" title="CODE"><BsCodeSlash/></a>
        
      </button>
      <button 
      onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <a href="#" title="CLEAR MARKS"><HiOutlineBookmarkSlash/></a>
      
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        <a href="#" title="CLEAR NODES"><BsNodeMinus/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <a href="#" title="PARAGRAPH"><FaParagraph/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <a href="#" title="HEADING 1"><FaHeading/></a>
        
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <a href="#" title="HEADING 2"><FaHeading/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <a href="#" title="BULLETS"><FaListUl/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <a href="#" title="ORDERED LIST"><FaListOl/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <a href="#" title="CODE BLOCK"><BiCodeBlock/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <a href="#" title="BLOCK QUOTE"><BsBlockquoteLeft/></a>
        
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <a href="#" title="HORIZONTAL RULE"><RxDividerHorizontal/></a>
        
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <a href="#" title="HARD BREAK"><BsFileBreakFill/></a>
        
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <a href="#" title="UNDO"><FaUndo/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <a href="#" title="REDO"><FaRedo/></a>
        
      </button>
      <button
        onClick={() => {
          const url = window.prompt("URL");

          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <a href="#" title="ADD IMAGE FROM URL"><BiImageAdd/></a>
        
      </button>
      <button
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);

          // cancelled
          if (url === null) {
            return;
          }

          // empty
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
          }

          // update link
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <a href="#" title="SETLINK"><MdDatasetLinked/></a>
        
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        <a href="#" title="UNSET LINK"><MdOutlineDatasetLinked/></a>
        
      </button>
    </div>
  );
};

const TipTap = ({
  content,
  thumbnail,
  heading,
  setContent,
  setThumbnail,
  setHeading,
  success
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Link,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl prose-headings:text-white prose-p:text-white mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  useEffect(() => {

    if (editor) 
      editor.commands.setContent(content);

    }, [editor,success]);

  return (
    <div className="w-6/12 h-8/12 bg-stone-800 mt-100">
      <div class="mb-4 mt-4 flex justify-center items-center" >
        <label
          for="large-input"
          class="block mb-2 text-sm font-medium text-gray-90 dark:text-white"
        ></label>
        <input
          type="text"
          placeholder="Title"
          id="large-input"
          class="block w-6/12 p-4  text-white border border-gray-300  bg-stone-800 sm:text-md  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          id="large-input"
          class="block w-6/12 p-4 text-white border border-gray-300  bg-stone-800 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
          value={thumbnail}
          onChange={(e) => {
            setThumbnail(e.target.value);
          }}
        />
      </div>

      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="outline-none h-full overflow-scroll ml-4  !text-white"
      />
    </div>
  );
};

export default TipTap;
