// Starting data (replace with the exact array from the assignment page)
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the project report", category: "work" },
  { id: 3, text: "Read chapter 4 of the HTML book", category: "study" },
  { id: 4, text: "Call mum on Sunday", category: "personal" },
  { id: 5, text: "Practice JavaScript functions", category: "study" }
];

// 1. searchNotes: notes whose text contains the word (case-insensitive)
function searchNotes(word) {
  const w = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(w));
}

// 2. longestNote: note with most characters, or null if empty
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// 3. countByCategory: counts notes per category
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary: sentence like "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";
  if (total === 0) {
    return "0 notes.";
  }
  const parts = Object.entries(counts)
    .map(([category, count]) => `${count} ${category}`)
    .join(", ");
  return `${total} ${word}: ${parts}.`;
}

// 5. isDuplicate: same text exists (ignoring case and extra spaces)
function clean(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function isDuplicate(text) {
  return notes.some(note => clean(note.text) === clean(text));
}

// 6. addNote: adds only if valid, returns true/false and logs the reason
function addNote(text, category) {
  const trimmed = text.trim();
  const allowed = ["personal", "work", "study"];

  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Not added: text must be 1-200 characters.");
    return false;
  }
  if (isDuplicate(trimmed)) {
    console.log("Not added: duplicate note.");
    return false;
  }
  if (!allowed.includes(category)) {
    console.log("Not added: category must be personal, work or study.");
    return false;
  }

  const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: trimmed, category: category });
  console.log("Note added.");
  return true;
}

// ---------- Tests ----------

// searchNotes
console.log(searchNotes("milk"));  // [ { id: 1, text: "Buy milk and bread", category: "personal" } ]
console.log(searchNotes("MILK"));  // same result (ignores case)
console.log(searchNotes("zebra")); // [] (edge case: no results)

// longestNote
console.log(longestNote()); // { id: 3, text: "Read chapter 4 of the HTML book", category: "study" }
const saved = notes;
notes = [];
console.log(longestNote()); // null (edge case: no notes)
notes = saved;

// countByCategory
console.log(countByCategory()); // { personal: 2, work: 1, study: 2 }

// getSummary
console.log(getSummary()); // "5 notes: 2 personal, 1 work, 2 study."

// isDuplicate
console.log(isDuplicate("  buy MILK   and bread ")); // true (ignores case and extra spaces)
console.log(isDuplicate("Walk the dog"));            // false

// addNote
console.log(addNote("Walk the dog", "personal"));    // "Note added." then true
console.log(addNote("buy milk and bread", "work"));  // "Not added: duplicate note." then false
console.log(addNote("", "work"));                    // "Not added: text must be 1-200 characters." then false
console.log(addNote("Plan a trip", "fun"));          // "Not added: category must be personal, work or study." then false
console.log(getSummary()); // "6 notes: 3 personal, 1 work, 2 study."
