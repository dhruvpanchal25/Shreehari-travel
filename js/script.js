// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  const scrollElements = document.querySelectorAll(".animate-on-scroll");

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  scrollElements.forEach((el) => scrollObserver.observe(el));
});



// Zoom-out on scroll for hero text
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heading = document.querySelector('.hero-heading');
  const sub = document.querySelector('.hero-sub');

  if (scrollY > 100) {
    heading.classList.add('zoom-out');
    sub.classList.add('zoom-out');
  } else {
    heading.classList.remove('zoom-out');
    sub.classList.remove('zoom-out');
  }
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs.sendForm("service_ruvb64c", "template_d1f033b", this)
    .then(function () {
      alert("✅ Your travel request has been sent!");
    }, function (error) {
      console.log("FAILED...", error);
      alert("❌ Something went wrong. Try again!");
    });

  this.reset();
});


