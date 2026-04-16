const supabaseUrl = "https://wyhadatlbsbamdwxshzz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aGFkYXRsYnNiYW1kd3hzaHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjcyODYsImV4cCI6MjA5MTk0MzI4Nn0.vF8wlVH8bXqP19rniNB-FwRVM55hT66cE7X7S9vL9pQ";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

/* -------------------- ELEMENTS -------------------- */

const revealElements = document.querySelectorAll('.reveal');
const aboutImage = document.querySelector('.about-image img');
const projectCards = document.querySelectorAll('.project-card');

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const toggleBtn = document.getElementById('theme-toggle');
const form = document.getElementById("contact-form");

/* -------------------- MENU -------------------- */

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

/* close menu on click */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

/* -------------------- REVEAL -------------------- */

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 100) {
      el.classList.add('active');
    }
  });

  if (aboutImage && aboutImage.getBoundingClientRect().top < windowHeight - 100) {
    aboutImage.classList.add('active');
  }

  projectCards.forEach(card => {
    if (card.getBoundingClientRect().top < windowHeight - 100) {
      card.classList.add('active');
    }
  });
}

/* -------------------- NAV HIGHLIGHT -------------------- */

function highlightNav() {
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

/* optimized scroll */
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      highlightNav();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("load", () => {
  revealOnScroll();
  highlightNav();
});

/* -------------------- THEME -------------------- */

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode')
      ? '☀️'
      : '🌙';
  });
}

/* -------------------- SUPABASE FORM -------------------- */

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        }
      ]);

    if (error) {
      console.log(error);
      alert("Error sending message");
    } else {
      alert("Message sent!");
      form.reset();
    }
  });
}