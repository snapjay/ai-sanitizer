 export function normalizePunctuation(text) {
  const replacements = {
    "—": "-", "–": "-", "‒": "-", "―": "-", "‐": "-",
    "“": '"', "”": '"', "„": '"', "«": '"', "»": '"',
    "‘": "'", "’": "'", "‚": "'", "‹": "'", "›": "'",
    "…": "...",
    "\u00A0": " ", "\u2002": " ", "\u2003": " ", "\u2009": " ",
    "\u200B": "", "\u202F": " ", "\u3000": " "
  };
  const pattern = new RegExp("[" + Object.keys(replacements).join("") + "]", "g");
  return text.replace(pattern, m => replacements[m] || m);
}