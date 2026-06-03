import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [false, 2, 3] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet", "blockquote", "link"];

const RichTextBox = ({
  label,
  helper,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <label className={`block rounded-3xl border border-slate-200 bg-slate-50 p-4 ${className}`.trim()}>
      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
        />
      </div>
      {helper ? <p className="mt-2 text-xs text-slate-500">{helper}</p> : null}
    </label>
  );
};

export default RichTextBox;
