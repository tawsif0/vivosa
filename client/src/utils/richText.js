const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const toRichTextHtml = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .map((item) => `<p>${escapeHtml(item)}</p>`)
      .join("");
  }

  const raw = String(value || "").trim();
  if (!raw) return "";

  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw;
  }

  return raw
    .split(/\n+/)
    .map((line) => String(line || "").trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
};

export const stripRichText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
