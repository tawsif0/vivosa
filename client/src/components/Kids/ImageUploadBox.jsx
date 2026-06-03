import React from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

const ImageUploadBox = ({
  label = "Image",
  description = "Upload an image",
  note = "JPG, PNG, WebP up to 8MB",
  preview,
  currentImage,
  fileName,
  inputId,
  onChange,
  onClear,
  accept = "image/*",
  uploadLabel = "Upload image",
  replaceLabel = "Replace image",
  className = "",
}) => {
  const showPreview = Boolean(preview || currentImage);
  const imageSrc = preview || currentImage || "";
  const statusText = preview ? fileName || "New image" : currentImage ? "Current image" : "";

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}>
      <h3 className="mb-4 flex items-center text-lg font-semibold text-slate-800">
        <FiImage className="mr-2" />
        {label}
      </h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 md:p-6 text-center hover:border-gray-500 transition-colors bg-slate-50/60">
        {showPreview ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt={preview ? "New preview" : "Current image"}
              className="w-full h-40 md:h-48 object-contain rounded-lg mx-auto bg-white"
              loading="lazy"
            />
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              aria-label="Remove image"
            >
              <FiX size={14} />
            </button>
            <div className="text-xs text-gray-500 mt-2 text-center">{statusText}</div>
          </div>
        ) : (
          <>
            <FiImage className="mx-auto text-gray-400 text-2xl md:text-3xl mb-2 mt-2" />
            <p className="text-gray-600 mb-2 text-sm md:text-base">{description}</p>
          </>
        )}

        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-900 text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors text-sm md:text-base"
        >
          <FiUpload /> {showPreview ? replaceLabel : uploadLabel}
        </label>
        <p className="text-xs text-gray-500 mt-2">{note}</p>
      </div>
    </div>
  );
};

export default ImageUploadBox;
