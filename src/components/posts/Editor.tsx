"use client";

import { IPostFormInput } from "@/types/posts";
import { editorTools } from "@/utils/tools";
import EditorJS from "@editorjs/editorjs";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  isShowEditor?: boolean;
  register: UseFormRegister<IPostFormInput>;
}

const CMSEditor: React.FC<IProps> = ({ isShowEditor = false, register }) => {
  let isAddEditor: boolean = false;
  const [editor, setEditor] = useState<EditorJS>();
  useEffect(() => {
    if (!isAddEditor && isShowEditor) {
      setEditor(
        new EditorJS({
          holder: "editorjs",
          tools: editorTools,
          autofocus: true,
          placeholder: "",
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isAddEditor = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowEditor]);

  useEffect(() => {}, [editor]);

  return (
    <>
      <div
        id="editorjs"
        className="h-[60vh] w-full max-w-5xl overflow-y-auto relative"
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
