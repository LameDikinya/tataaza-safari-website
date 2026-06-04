/* ====================================================
   TATAAZA OKAVANGO ADVENTURES — Main JavaScript
   ==================================================== */

// ─── CLEAN URLs (local: .html links work; online: strips .html for clean URLs) ───
if (location.protocol !== 'file:') {
  document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
    try {
      var url = new URL(a.href);
      if (url.origin === location.origin) {
        a.href = url.pathname.replace(/\.html$/, '');
      }
    } catch (e) {}
  });
}

// ─── NAV HAMBURGER ───
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('main-nav').classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('main-nav').classList.remove('open');
  });
});

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(function (el) {
  observer.observe(el);
});

// ─── BOOKING FORM SUBMIT ───
function submitBooking() {
  var fname   = document.getElementById('f-fname').value.trim();
  var lname   = document.getElementById('f-lname').value.trim();
  var email   = document.getElementById('f-email').value.trim();
  var phone   = document.getElementById('f-phone').value.trim();
  var date    = document.getElementById('f-date')   ? document.getElementById('f-date').value   : '';
  var guests  = document.getElementById('f-guests') ? document.getElementById('f-guests').value : '';
  var type    = document.getElementById('f-type').value;
  var message = document.getElementById('f-message').value.trim();

  if (!fname || !email) {
    alert('Please fill in your name and email address.');
    return;
  }

  var subject = encodeURIComponent('Safari Booking Request – ' + fname + ' ' + lname);
  var body = encodeURIComponent(
    'Hello Tataaza Okavango Adventures,\n\n' +
    'I would like to make a safari booking enquiry:\n\n' +
    'Name: ' + fname + ' ' + lname + '\n' +
    'Email: ' + email + '\n' +
    'Phone/WhatsApp: ' + (phone || 'Not provided') + '\n' +
    'Preferred Date: ' + (date || 'Flexible') + '\n' +
    'Number of Guests: ' + (guests || 'Not specified') + '\n' +
    'Experience Type: ' + (type || 'Not specified') + '\n\n' +
    'Message:\n' + (message || 'No additional details provided.') + '\n\n' +
    'Kind regards,\n' + fname
  );

  window.location.href = 'mailto:tataazamobilesafaris@gmail.com?subject=' + subject + '&body=' + body;

  document.getElementById('booking-fields').style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
}

// ─── NAV SCROLL EFFECT ───
window.addEventListener('scroll', function () {
  var nav = document.getElementById('main-nav');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(30,14,2,0.98)';
  } else {
    nav.style.background = 'rgba(30,14,2,0.94)';
  }
});
