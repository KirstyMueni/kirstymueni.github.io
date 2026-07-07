/**
 * ============================================================
 * KIRSTY MUENI PORTFOLIO 
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initTheme();
  initMobileMenu();
  initProjectButtons();
  initScrollReveal();
  setFooterYear();
  initSmoothScroll();
});

/* ===================== THEME TOGGLE ===================== */
function initTheme() {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('km-theme') || 'light';

  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('km-theme', next);
    updateThemeIcon(toggleBtn, next);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

/* ===================== MOBILE MENU ===================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

/* ===================== PROJECT BUTTONS ===================== */
function initProjectButtons() {
  const projectBtns = document.querySelectorAll('.project-btn');
  
  if (projectBtns.length > 0) {
    const firstProject = projectBtns[0].getAttribute('data-project');
    projectBtns[0].classList.add('active');
    showProjectCategory(firstProject);
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.getAttribute('data-project');
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showProjectCategory(project);
    });
  });
}

function showProjectCategory(project) {
  const projectCategories = document.querySelectorAll('.project-category');
  projectCategories.forEach(category => {
    if (category.getAttribute('data-project') === project) {
      category.style.display = 'block';
      category.style.animation = 'fadeIn 0.5s ease';
    } else {
      category.style.display = 'none';
    }
  });
}



/* ===================== GALLERY MODAL ===================== */
let currentGalleryImages = [];
let currentLightboxIndex = 0;

function openGalleryModal(category) {
  const modal = document.getElementById('galleryModal');
  const title = document.getElementById('modalTitle');
  const container = document.getElementById('galleryImages');
  
  const data = galleryData[category];
  if (!data) return;

  title.textContent = data.title;
  container.innerHTML = '';
  currentGalleryImages = data.images;

  data.images.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-image-card';
    card.onclick = () => openLightbox(index);
    
    card.innerHTML = `
      <div class="gallery-image-wrapper">
        <img src="${img.src || 'images/placeholder.png'}" alt="${img.name}" class="gallery-image">
        <div class="gallery-image-overlay">
          <p class="gallery-image-description">${img.description}</p>
          <span class="gallery-view-hint">Click to expand</span>
        </div>
      </div>
      <h4 class="gallery-image-name">${img.name}</h4>
    `;
    container.appendChild(card);
  });

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  document.getElementById('galleryModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

/* ===================== LIGHTBOX ===================== */
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  document.getElementById('galleryLightbox').style.display = 'flex';
  document.addEventListener('keydown', lightboxKeyHandler);
}

function closeLightbox() {
  document.getElementById('galleryLightbox').style.display = 'none';
  document.removeEventListener('keydown', lightboxKeyHandler);
}

function updateLightbox() {
  const img = currentGalleryImages[currentLightboxIndex];
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDescription');
  const lightboxCounter = document.getElementById('lightboxCounter');

  lightboxImg.src = img.src || 'images/placeholder.png';
  lightboxTitle.textContent = img.name;
  lightboxDesc.textContent = img.description;
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentGalleryImages.length}`;
}

function lightboxNavigate(step) {
  currentLightboxIndex = (currentLightboxIndex + step + currentGalleryImages.length) % currentGalleryImages.length;
  updateLightbox();
}

function lightboxKeyHandler(e) {
  if (e.key === 'ArrowLeft') lightboxNavigate(-1);
  else if (e.key === 'ArrowRight') lightboxNavigate(1);
  else if (e.key === 'Escape') closeLightbox();
}

window.onclick = (event) => {
  const modal = document.getElementById('galleryModal');
  const lightbox = document.getElementById('galleryLightbox');
  if (event.target === modal) closeGalleryModal();
  if (event.target === lightbox) closeLightbox();
};

/* ===================== INITIALIZATIONS ===================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.about-text, .skill-card, .tool-card, .project-variation, .gallery-card, .case-study-card, .cert-card, .testimonial-card, .blog-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
