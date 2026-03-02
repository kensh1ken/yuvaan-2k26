// Smooth scroll for "Enter the Abyss" button
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enter-abyss-btn");
  const eventsSection = document.getElementById("events");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const modalOverlay = document.getElementById("event-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const yearSpan = document.getElementById("year");

  if (enterBtn && eventsSection) {
    enterBtn.addEventListener("click", () => {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // Event modals
  const eventCards = document.querySelectorAll(".event-card");

  const openModal = (title, description) => {
    if (!modalOverlay) return;
    modalTitle.textContent = title;
    modalBody.textContent = description;
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  eventCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title") || "Event";
      const description =
        card.getAttribute("data-description") ||
        "More details will be revealed soon.";
      openModal(title, description);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // Schedule day tabs
  const scheduleTabs = document.querySelectorAll(".schedule-tab");
  const scheduleDays = document.querySelectorAll(".schedule-day");

  scheduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-day");
      if (!target) return;

      scheduleTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      scheduleDays.forEach((day) => {
        day.classList.toggle("active", day.id === target);
      });
    });
  });

  // IntersectionObserver for scroll reveal
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Footer year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Particle background
  initParticles();
});

// Simple particle system for atmospheric background
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const colors = ["#ff2e88", "#2ddb6e", "#ffd60a", "#c1121f", "#3b0a45"];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const createParticles = () => {
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 25000));
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.8 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  createParticles();
  window.addEventListener("resize", createParticles);

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, hexToRgba(p.color, p.alpha));
      gradient.addColorStop(1, hexToRgba(p.color, 0));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  draw();
}

// Utility: convert hex to rgba string
function hexToRgba(hex, alpha) {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}