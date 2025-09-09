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

  let changes = 0;
  const normalized = text.replace(pattern, match => {
    changes++;
    return replacements[match] || match;
  });

  return { normalized, changes };
}
