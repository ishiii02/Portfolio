'use strict';

/* ================================================================
   CONTACT.JS — Form UX enhancements for the contact page
   Loaded only on /contact via partials/scripts.ejs (pageScript: 'contact.js')

   NOTE: This file exists but is NOT automatically loaded.
   To activate it, add pageScript to the contact controller + view:

   1. In contact.controller.js getContactPage():
        res.render('pages/contact', { ..., pageScript: 'contact.js' });

   2. In contact.ejs, change the scripts include:
        <%- include('../partials/scripts', { pageScript: 'contact.js' }) %>
   ================================================================ */

(function () {
  'use strict';

  var form = document.querySelector('.form');
  if (!form) return; // Not on the contact page — bail out

  /* ── 1. Character counter for message textarea ────────────── */
  var textarea = form.querySelector('textarea[name="message"]');
  var MAX_CHARS = 2000;

  if (textarea) {
    var counter = document.createElement('div');
    counter.className = 'form-error';
    counter.style.textAlign = 'right';
    counter.style.marginTop = 'var(--space-1)';
    counter.style.opacity = '0.6';
    textarea.parentNode.appendChild(counter);

    function updateCounter() {
      var len = textarea.value.length;
      counter.textContent = len + ' / ' + MAX_CHARS;

      if (len > MAX_CHARS) {
        counter.style.color = 'var(--color-error)';
        counter.style.opacity = '1';
      } else if (len > MAX_CHARS * 0.9) {
        counter.style.color = 'var(--color-accent)';
        counter.style.opacity = '1';
      } else {
        counter.style.color = 'var(--color-text-muted)';
        counter.style.opacity = '0.6';
      }
    }

    textarea.addEventListener('input', updateCounter);
    updateCounter();
  }

  /* ── 2. Clear form fields on successful submission ────────── */
  // If the URL has ?status=sent, clear the form to prevent resubmission
  if (window.location.search.indexOf('status=sent') !== -1) {
    form.reset();
    if (textarea) updateCounter();
  }

  /* ── 3. Visual focus feedback on form inputs ───────────────── */
  var inputs = form.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(function (input) {
    input.addEventListener('focus', function () {
      input.classList.remove('error');
    });
  });
})();