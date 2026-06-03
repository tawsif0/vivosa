import React from "react";

const TextAreaBox = ({
  icon,
  label,
  helper,
  placeholder,
  rows = 8,
  name,
  value,
  onChange,
}) => {
  const Icon = icon;

  return (
    <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {label}
      </span>
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className="w-full resize-y border-0 bg-transparent p-0 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>
      {helper ? <p className="mt-2 text-xs text-slate-500">{helper}</p> : null}
    </label>
  );
};

export default TextAreaBox;
