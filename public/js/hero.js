'use strict';

/* ================================================================
   HERO.JS — Terminal typing effect for the home page hero
   Loaded only on / via partials/scripts.ejs (pageScript: 'hero.js')
   ================================================================ */

(function () {
  'use strict';

  var TYPED_EL = document.getElementById('typed-text');
  if (!TYPED_EL) return; // Not on the home page — bail out

  var PHRASES = [
    'cat about.md',
    'ls -la projects/',
    'npm run dev',
    'git push origin main',
    'node server.js',
  ];

  var TYPING_SPEED   = 60;  // ms per character
  var DELETING_SPEED = 30;  // ms per character
  var PAUSE_AFTER_TYPE   = 2000; // ms before deleting
  var PAUSE_AFTER_DELETE = 400;  // ms before typing next phrase

  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;

  function tick() {
    var currentPhrase = PHRASES[phraseIndex];

    if (isDeleting) {
      // Remove one character
      charIndex--;
      TYPED_EL.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }

      setTimeout(tick, DELETING_SPEED);
    } else {
      // Add one character
      charIndex++;
      TYPED_EL.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }

      setTimeout(tick, TYPING_SPEED);
    }
  }

  // Start the loop after a short delay so the page finishes rendering
  setTimeout(tick, 800);
})();