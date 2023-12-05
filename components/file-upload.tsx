"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: String) => void;
  value: String;
  endpoint: "serverImage" | "messageFile";
}
const FileUpload = (props: FileUploadProps) => {
  const { onChange, value, endpoint } = props;
  if (value && value?.split(".").pop() !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill alt="img" className="rounded-full" src={value} />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};

export default FileUpload;
