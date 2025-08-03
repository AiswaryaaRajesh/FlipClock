// Update Clock ------------------------------------------------------------------------------
function createCardElement(digit) {
  return `
    <div class="bottom">${digit}</div>
    <div class="flip-bt">${digit}</div>
    <div class="flip-top">${digit}</div>
    <div class="flip-bottom">${digit}</div>
  `;
}

function setDigit(card, newDigit) {
  card.innerHTML = createCardElement(newDigit);
  card.setAttribute('data-digit', newDigit);
}

function updateDigit(selector, newDigit) {
  const card = document.querySelector(selector);
  const currentDigit = card.getAttribute('data-digit');

  if (currentDigit === newDigit) return;

  const flipBT = card.querySelector('.flip-bt');
  const flipTop = card.querySelector('.flip-top');
  const flipBottom = card.querySelector('.flip-bottom');

  // Show current digit pulling up
  flipBT.textContent = currentDigit;

  // Show next digit on flip-top and flip-bottom
  flipTop.textContent = newDigit;
  flipBottom.textContent = newDigit;

  card.classList.add('flipping');

  setTimeout(() => {
    setDigit(card, newDigit);
    card.classList.remove('flipping');
  }, 1000); // Match total animation time
}

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');

  updateDigit('.hours-tens', h[0]);
  updateDigit('.hours-ones', h[1]);
  updateDigit('.minutes-tens', m[0]);
  updateDigit('.minutes-ones', m[1]);

  setTimeout(updateClock, 1000);
}

// Initialize digits
document.querySelectorAll('.flip-card').forEach(card => {
  const digit = card.getAttribute('data-digit') || '0';
  setDigit(card, digit);
});

// Start clock
updateClock();

// Automatically update footer year ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script loaded!");

  const yearSpan = document.querySelector(".footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.warn("⚠️ .footer-year not found");
  }
});


// Fullscreen Toggle ------------------------------------------------------------------------------
const fullscreenToggleIcon = document.getElementById("fullscreen-toggle");
const footer = document.querySelector("footer");

// Toggle fullscreen on icon click or double-click
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Update UI when fullscreen state changes
function updateFullscreenUI() {
  const isFullscreen = !!document.fullscreenElement;

  document.body.classList.toggle("hide-footer", isFullscreen);

  fullscreenToggleIcon.classList.toggle("fa-expand", !isFullscreen);
  fullscreenToggleIcon.classList.toggle("fa-compress", isFullscreen);
}

// Bind click and double-click
fullscreenToggleIcon.addEventListener("click", toggleFullscreen);
document.addEventListener("dblclick", toggleFullscreen);

// Handle Esc or any fullscreen exit
document.addEventListener("fullscreenchange", updateFullscreenUI);


// Digit Based Seconds WORKING-----------------------------------------------------------------------
function updateSecondsDigits() {
  const display = document.getElementById("secondsDisplay");
  const now = new Date();
  const seconds = now.getSeconds().toString().padStart(2, '0');
  display.textContent = seconds;
  display.style.opacity = 1;

  setTimeout(() => {
    display.style.opacity = 0;
  }, 800); // hides before next update
}

setInterval(updateSecondsDigits, 1000);


// THEME TOGGLE ------------------------------------------------------------------------------
const themeToggle = document.getElementById("toggle-seconds-dots");
const themeLabel = document.getElementById("toggle-seconds-label");

// Apply default dark theme on load
document.body.classList.add("dark-theme");
themeLabel.textContent = "Switch to Light Theme"; // since toggling switches to light

// Listen for theme toggle
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeLabel.textContent = "Switch to Dark Theme";
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    themeLabel.textContent = "Switch to Light Theme";
  }
});

// HEADER AND OVERLAYS-------------------------------------------------------------------------
const settingsIcon = document.querySelector('.settings-icon');
const settingsDropdown = document.getElementById('settings-dropdown');

// Drodpown Download -----------------------------------------------------
const toggleBtn = document.getElementById('downloadToggle');
const menu = document.getElementById('downloadMenu');

toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');

  if (menu.classList.contains('show')) {
    document.body.classList.add("overlay-open", "user-active");
    clearTimeout(userActiveTimeout);
  } else {
    closeOverlays(); // treat closing dropdown as closing overlay
  }
});


document.addEventListener('click', (e) => {
  const clickedInsideDownload = menu.contains(e.target) || toggleBtn.contains(e.target);
  const clickedInsideSettings = settingsDropdown.contains(e.target) || settingsIcon.contains(e.target);

  // Close only if clicked outside both
  if (!clickedInsideDownload && !clickedInsideSettings) {
    closeOverlays();
  }
});


// Utility to check if any overlay is open
function isOverlayOpen() {
  const isSettingsOpen = !settingsDropdown.classList.contains('hidden');
  const isDownloadMenuOpen = menu.classList.contains('show');
  return isSettingsOpen || isDownloadMenuOpen;
}


// Open the settings overlay and lock header
function showOverlay() {
  closeOverlays();
  settingsDropdown.classList.remove('hidden');
  document.body.classList.add("overlay-open", "user-active");
  clearTimeout(userActiveTimeout); // prevent auto-hide
}

// Close overlay
function closeOverlays() {
  settingsDropdown.classList.add('hidden');
  menu.classList.remove('show');
  document.body.classList.remove("overlay-open");

  // Restart auto-hide timer
  setTimeout(() => {
    setUserActive();
  }, 100);
}

// Toggle on settings icon click
settingsIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  if (settingsDropdown.classList.contains('hidden')) {
    showOverlay();
  } else {
    closeOverlays();
  }
});

// Close overlay if clicked outside
document.addEventListener('click', (e) => {
  const clickedInsideSettings = settingsDropdown.contains(e.target) || settingsIcon.contains(e.target);
  if (!clickedInsideSettings) {
    closeOverlays();
  }
});

// Auto-show header on user activity (disabled if overlay is open)
let userActiveTimeout;
function setUserActive() {
  if (isOverlayOpen()) return; // prevent hiding when overlay is active
  document.body.classList.add("user-active");
  clearTimeout(userActiveTimeout);
  userActiveTimeout = setTimeout(() => {
    document.body.classList.remove("user-active");
  }, 5000);
}

// Detect user activity
["mousemove", "touchstart"].forEach(event =>
  document.addEventListener(event, setUserActive)
);

// Show header initially
setUserActive();

// DATE -----------------------------------------------------------------------------------------
function updateDate() {
  const dateElement = document.getElementById("dateDisplay");
  const now = new Date(); // Device's local time

  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('default', { month: 'long' }); // Full month name
  const year = now.getFullYear();

  dateElement.textContent = `${day} ${month} ${year}`;
}

function scheduleMidnightUpdate() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const msUntilMidnight = nextMidnight - now;

  setTimeout(() => {
    updateDate();
    scheduleMidnightUpdate(); // Set again for the next day
  }, msUntilMidnight);
}

updateDate();             // Initial load
scheduleMidnightUpdate(); // Keep updating daily at midnight
