// ================= MENU =================
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.menu-overlay');

toggle.onclick = () => {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
};

overlay.onclick = () => {
  menu.classList.remove('active');
  overlay.classList.remove('active');
};


// ================= COUNTER FIX =================
const counters = document.querySelectorAll('.counter');

const startCounting = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const update = () => {
    const increment = target / 120;

    if (count < target) {
      count += increment;
      counter.innerText = Math.floor(count).toLocaleString();
      requestAnimationFrame(update);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  update();
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ================= SLIDER (AUTO + SMOOTH) =================
const slider = document.querySelector('.vehicle-container');

let autoScroll = setInterval(() => {
  slider.scrollBy({
    left: 320,
    behavior: "smooth"
  });

}, 3000);

// pause on hover
slider.addEventListener("mouseenter", () => clearInterval(autoScroll));
slider.addEventListener("mouseleave", () => {
  autoScroll = setInterval(() => {
    slider.scrollBy({ left: 320, behavior: "smooth" });
  }, 3000);
});


// ================= CONTACT ANIMATION =================
const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".contact-form-box").forEach(el => {
  el.classList.add("fade-up");
  contactObserver.observe(el);
});


// ================= DATE FIX =================
const dateInput = document.querySelector('input[name="date"]');

if(dateInput){
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}


// ================= EMAILJS =================

// 🔁 Replace these values
const PUBLIC_KEY = "CA0GbM3c8-LqU_F1_";
const SERVICE_ID = "service_ruvb64c";
const TEMPLATE_ID = "template_d1f033b";

(function(){
  emailjs.init(PUBLIC_KEY);
})();

document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  const btn = this.querySelector("button");
  btn.innerText = "Sending...";
  btn.disabled = true;

  const formData = {
    name: this.name.value,
    phone: this.phone.value,
    destination: this.destination.value,
    date: this.date.value,
    message: this.message.value
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
  .then(() => {
    btn.innerText = "✅ Request Sent";
    btn.style.background = "#28a745";

    this.reset();

    setTimeout(()=>{
      btn.innerText = "Request Luxury Quote →";
      btn.style.background = "#d72626";
      btn.disabled = false;
    }, 3000);
  })
  .catch(() => {
    btn.innerText = "❌ Failed, Try Again";
    btn.style.background = "#ff0000";

    setTimeout(()=>{
      btn.innerText = "Request Luxury Quote →";
      btn.style.background = "#d72626";
      btn.disabled = false;
    }, 3000);
  });
});