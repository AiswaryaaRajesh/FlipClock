// // // Then update every second
// // setInterval(updateClock, 1000);
// function createCardElement(digit) {
//   return `
//     <div class="bottom">${digit}</div>
//     <div class="flip-bt">${digit}</div>
//     <div class="flip-top">${digit}</div>
//     <div class="flip-bottom">${digit}</div>
//   `;
// }

// // <div class="top">${digit}</div>

// function setDigit(card, newDigit) {
//   card.innerHTML = createCardElement(newDigit);
//   card.setAttribute('data-digit', newDigit);
// }

// function updateDigit(selector, newDigit) {
//   const card = document.querySelector(selector);
//   const currentDigit = card.getAttribute('data-digit');

//   if (currentDigit === newDigit) return;

//   const flipBT = card.querySelector('.flip-bt');
//   const flipTop = card.querySelector('.flip-top');
//   const flipBottom = card.querySelector('.flip-bottom');

//   // Show current digit pulling up
//   flipBT.textContent = currentDigit;

//   // Show next digit on flip-top and flip-bottom
//   flipTop.textContent = newDigit;
//   flipBottom.textContent = newDigit;

//   card.classList.add('flipping');

//   setTimeout(() => {
//     setDigit(card, newDigit);
//     card.classList.remove('flipping');
//   }, 1000); // match total animation time
// }

// function updateClock() {
//   const now = new Date();
//   const h = now.getHours().toString().padStart(2, '0');
//   const m = now.getMinutes().toString().padStart(2, '0');
//   const s = now.getSeconds().toString().padStart(2, '0');

//   updateDigit('.hours-tens', h[0]);
//   updateDigit('.hours-ones', h[1]);
//   updateDigit('.minutes-tens', m[0]);
//   updateDigit('.minutes-ones', m[1]);
//   updateDigit('.seconds-tens', s[0]);
//   updateDigit('.seconds-ones', s[1]);

//   setTimeout(updateClock, 1000);
// }

// // Initialize
// document.querySelectorAll('.flip-card').forEach(card => {
//   const digit = card.getAttribute('data-digit') || '0';
//   setDigit(card, digit);
// });

// updateClock();


// // Automatically updatefooter year
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("✅ Script loaded!");

//   const yearSpan = document.querySelector(".footer-year");
//   if (yearSpan) {
//     yearSpan.textContent = new Date().getFullYear();
//   } else {
//     console.warn("⚠️ .footer-year not found");
//   }
// });



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

// Automatically update footer year
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script loaded!");

  const yearSpan = document.querySelector(".footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.warn("⚠️ .footer-year not found");
  }
});
