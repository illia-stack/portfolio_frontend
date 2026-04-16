const revealElements = document.querySelectorAll('.reveal');
const aboutImage = document.querySelector('.about-image img');
const projectCards = document.querySelectorAll('.project-card');





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

window.addEventListener('load', revealOnScroll);



const sections = document.querySelectorAll("section");

function highlightNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}




const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
        nav.classList.remove("active");
                                });
});





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

    toggleBtn.textContent =
      document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}







const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("https://illia-stack.wuaze.com/send.php", {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        form.reset();
      } else {
        alert("Error sending message");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error");
    });
  });
}






















