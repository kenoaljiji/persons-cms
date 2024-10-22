"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceDiacritics = replaceDiacritics;
function replaceDiacritics(searchQuery) {
  // Extend the replacement for other characters as needed
  var replacements = {
    c: '[cčć]',
    d: '[dđ]',
    s: '[sš]',
    z: '[zž]'
    // Add more replacements as necessary
  };

  // Replace each character in the searchQuery with its diacritic variations
  var replacedQuery = searchQuery.toLowerCase();
  for (var [key, value] of Object.entries(replacements)) {
    replacedQuery = replacedQuery.replace(new RegExp(key, 'g'), value);
  }
  return replacedQuery;
}