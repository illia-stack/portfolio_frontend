document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll('.reveal');
const aboutImage = document.querySelector('.about-image img');
const projectCards = document.querySelectorAll('.project-card');

const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    heroTitle: "Junior e-commerce fullstack",
    intro: "Hello, I'm",
    aboutTitle: "About Me",
    aboutText:
      "I'm a full-stack web developer specializing in building dynamic e-commerce platforms and interactive web applications...",
    projectsTitle: "My Projects",
    contactTitle: "Feel free to reach me out",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Your message",
    send: "Send"
  },

  de: {
    home: "Startseite",
    about: "Über mich",
    projects: "Projekte",
    contact: "Kontakt",
    heroTitle: "Junior E-Commerce Fullstack",
    intro: "Hallo, ich bin",
    aboutTitle: "Über mich",
    aboutText:
      "Ich bin Full-Stack Webentwickler mit Fokus auf E-Commerce Plattformen und interaktive Webanwendungen...",
    projectsTitle: "Meine Projekte",
    contactTitle: "Kontaktiere mich gerne",
    namePlaceholder: "Dein Name",
    emailPlaceholder: "Deine E-Mail",
    messagePlaceholder: "Deine Nachricht",
    send: "Senden"
  }
};

let currentLang = "en";

function updateLanguage() {
  const t = translations[currentLang];

  // NAV LINKS
  document.querySelectorAll(".nav-links a")[0].textContent = t.home;
  document.querySelectorAll(".nav-links a")[1].textContent = t.about;
  document.querySelectorAll(".nav-links a")[2].textContent = t.projects;
  document.querySelectorAll(".nav-links a")[3].textContent = t.contact;

  // HERO
  document.querySelector(".intro").textContent = t.intro;
  document.querySelector(".hero-title").textContent = t.heroTitle;

  // ABOUT
  document.querySelector("#about h2").textContent = t.aboutTitle;
  document.querySelector(".about-text p").textContent = t.aboutText;

  // PROJECTS
  document.querySelector("#projects h2").textContent = t.projectsTitle;

  // CONTACT
  document.querySelector("#contact h2").textContent = t.contactTitle;

  document.querySelector('[name="name"]').placeholder = t.namePlaceholder;
  document.querySelector('[name="email"]').placeholder = t.emailPlaceholder;
  document.querySelector('[name="message"]').placeholder = t.messagePlaceholder;

  document.querySelector("#contact-form button").textContent = t.send;

  // Button Label
  document.getElementById("lang-toggle").textContent =
    currentLang === "en" ? "DE" : "EN";
}

const langBtn = document.getElementById("lang-toggle");

if (langBtn) {
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "de" : "en";
    updateLanguage();
  });
}


 // Navbar settings (pc, Android)
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}



function revealOnScroll() {
  const windowHeight = window.innerHeight;

  // Reveal general sections
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 100) {
      el.classList.add('active');
    }
  });

  // Reveal About image
  if(aboutImage) {
    const imgTop = aboutImage.getBoundingClientRect().top;
    if(imgTop < windowHeight - 100) {
      aboutImage.classList.add('active');
    }
  }

  // Reveal project cards
  projectCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if(top < windowHeight - 100) {
      card.classList.add('active');
    }
  });
}


window.addEventListener("load", () => {
  revealOnScroll();
  highlightNav();
});



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 200) {
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





if (nav) {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}


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




/* Theme toggle (safe) */
const toggleBtn = document.getElementById('theme-toggle');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  
    // Toggle icon
    if(document.body.classList.contains('dark-mode')) {
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = '🌙';
    }
  });
}


const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    console.log([...new FormData(form)]); 

    fetch("https://portfolio-backend-mr9w.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
     body: JSON.stringify({
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value
      })
    })

    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(data => {
      if (data.success) {
        alert(data.message);
        form.reset();
      } else {
        alert("Error sending message");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      alert("Server error");
    });
  });
}

updateLanguage();