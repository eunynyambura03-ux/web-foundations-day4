// Day 4: character/word counters, draft saving and theme switching.

const MAX_CHARS = 200;
const WARN_CHARS = 180;
const DRAFT_KEY = "day4-draft";
const THEME_KEY = "day4-theme";

const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

function countWords(text) {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

// Updates both counters and the warning / over classes.
function updateCounts() {
  const length = noteText.value.length;

  charCount.textContent = length + " / " + MAX_CHARS + " characters";
  wordCount.textContent = countWords(noteText.value) + " words";

  charCount.classList.remove("warning", "over");
  if (length > MAX_CHARS) {
    charCount.classList.add("over");
  } else if (length > WARN_CHARS) {
    charCount.classList.add("warning");
  }
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, noteText.value);
}

// Empties the textarea, resets the counters and removes the draft.
function clearAll() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
  noteText.focus();
}

// Shows the right theme and the matching button label.
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

// On load: restore any saved draft and theme, then show the counters.
const savedDraft = localStorage.getItem(DRAFT_KEY);
if (savedDraft !== null) {
  noteText.value = savedDraft;
}

applyTheme(localStorage.getItem(THEME_KEY));
updateCounts();

noteText.addEventListener("input", function () {
  updateCounts();
  saveDraft();
});

// Escape inside the textarea clears the note too.
noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearAll();
  }
});

clearBtn.addEventListener("click", clearAll);

themeToggle.addEventListener("click", function () {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});
