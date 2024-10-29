"use client";

import { IPostFormInput } from "@/types/posts";
import { editorTools } from "@/utils/tools";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import "@/assets/richtext.scss";
import "@/assets/editor.scss";

interface IProps {
  isShowEditor?: boolean;
  data?: OutputData;
  register: UseFormRegister<IPostFormInput>;
  onChange: (data: OutputData) => void;
}

const CMSEditor: React.FC<IProps> = ({
  isShowEditor = false,
  data,
  register,
  onChange,
}) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (isShowEditor && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: editorTools,
        autofocus: false,
        placeholder: "Enter content for the article",
        data: data,
        onChange: async () => {
          try {
            const savedData = await editorRef.current?.save();
            if (savedData && Array.isArray(savedData.blocks)) {
              onChange(savedData);
            }
          } catch (error) {
            console.error("Error saving editor data:", error);
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowEditor, onChange]);

  return (
    <>
      <div
        id="editorjs"
        className="h-[calc(100vh-310px)] w-full overflow-y-auto relative bg-white dark:bg-gray-700 rounded-lg dark:text-white rich-text"
      />
      <TextInput
        id="small"
        type="text"
        sizing="md"
        className="hidden"
        readOnly
        {...register("content")}
      />
    </>
  );
};

export default CMSEditor;
