const BASE_URL = "https://bible-api.com";

export const TRANSLATION_OPTIONS = [
  { label: "KJV", value: "kjv" },
  { label: "NIV", value: "niv" },
  { label: "ESV", value: "esv" },
  { label: "NASB", value: "nasb" },
  { label: "NRSV", value: "nrsv" },
];

export async function fetchBibleVerse(reference, translationValue = "kjv") {
  const ref = reference.trim();
  if (!ref) throw new Error("Please enter a reference.");

  const url = `${BASE_URL}/${encodeURIComponent(ref)}?translation=${encodeURIComponent(
    translationValue,
  )}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Bible lookup failed.");

  const data = await res.json();

  // bible-api returns { reference, text, translation_name, ... } in most cases.
  return {
    reference: data.reference || ref,
    text: typeof data.text === "string" ? data.text : data.text?.toString?.() || "",
    translation_name: data.translation_name || translationValue.toUpperCase(),
    raw: data,
  };
}

