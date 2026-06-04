/**
 * ============================================================
 * KIRSTY MUENI PORTFOLIO — script.js
 * Features:
 *  - Dark / Light theme toggle with localStorage persistence
 *  - Responsive hamburger menu
 *  - Smooth scroll navigation
 *  - Expandable project categories
 *  - Scroll reveal animations
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

    // Re-render icons after theme change
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (icon) {
    if (theme === 'dark') {
      icon.setAttribute('data-lucide', 'sun');
    } else {
      icon.setAttribute('data-lucide', 'moon');
    }
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

  // Close menu when clicking outside
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
  const projectCategories = document.querySelectorAll('.project-category');

  // Set first project as active by default
  if (projectBtns.length > 0) {
    projectBtns[0].classList.add('active');
    const firstCategory = projectBtns[0].getAttribute('data-project');
    showProjectCategory(firstCategory);
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.getAttribute('data-project');

      // Update active button
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show project category
      showProjectCategory(project);
    });
  });
}

function showProjectCategory(project) {
  const projectCategories = document.querySelectorAll('.project-category');
  projectCategories.forEach(category => {
    const categoryProject = category.getAttribute('data-project');
    if (categoryProject === project) {
      category.style.display = 'block';
      category.style.animation = 'fadeIn 0.5s ease';
    } else {
      category.style.display = 'none';
    }
  });
}

/* ===================== SCROLL REVEAL ===================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about-text, .skill-card, .tool-card, .project-variation, ' +
    '.gallery-card, .case-study-card, .cert-card, .testimonial-card, ' +
    '.blog-card'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
          entry.target.style.animationDelay = `${index * 0.1}s`;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/* ===================== SMOOTH SCROLL ===================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
}
/* ===================== GALLERY DATA  ===================== */
const galleryData = {
  cybersecurity: {
    title: 'Cybersecurity',
    images: [
      {
        name: 'Penetration Testing',
        src: 'images/pentest.png',
        description: 'Hands-on penetration testing in controlled lab environment'
      },
      {
        name: 'Password Cracking',
        src: '',
        description: 'Advanced password security analysis and testing'
      },
      {
        name: 'Vulnerability Assessment',
        src: '',
        description: 'Systematic vulnerability scanning and documentation'
      },
      {
        name: 'Network Security',
        src:  'images/network security.png',
        description: 'Network security in controlled lab environment'
      },
      {
        name: 'Threat Analysis',
        src: '',
        description: 'Security threat identification and response'
      },
      {
        name: 'Firewall Configuration',
        src: '',
        description: 'Advanced firewall setup and management'
      }
    ]
  },
  networking: {
    title: 'Networking',
    images: [
      {
        name: 'Network Topology',
        src: '',
        description: 'Enterprise network topology design'
      },
      {
        name: 'Router Configuration',
        src: '',
        description: 'Advanced router and switch configuration'
      },
      {
        name: 'Network Monitoring',
        src: '',
        description: 'Real-time network performance monitoring'
      },
      {
        name: 'Data Center Setup',
        src: '',
        description: 'Enterprise data center infrastructure'
      },
      {
        name: 'Wireless Networks',
        src: '',
        description: 'Secure wireless network deployment'
      },
      {
        name: 'Network Troubleshooting',
        src: '',
        description: 'Network issue diagnosis and resolution'
      }
    ]
  },
  'digital-literacy': {
    title: 'Digital Literacy',
    images: [
      {
        name: 'Training',
        src: 'images/training.jpeg',
        description: 'ARES Training'
      },
      {
        name: 'Student Learning',
        src: 'images/digitalliteracy.png',
        description: 'Students engaging with digital tools'
      },
      {
        name: 'Online Safety',
        src: '',
        description: 'Online safety and privacy training'
      },
      {
        name: 'Basic Computing',
        src: '',
        description: 'Fundamental computer skills training'
      },
      {
        name: 'Internet Skills',
        src: '',
        description: 'Internet navigation and research skills'
      },
      {
        name: 'Digital Tools',
        src: '',
        description: 'Practical digital tools and applications'
      }
    ]
  },
  'edtech-stem': {
    title: 'EdTech & STEM',
    images: [
      {
        name: 'Robotics Lab',
        src: '',
        description: 'Hands-on robotics and STEM projects'
      },
      {
        name: 'Coding Workshop',
        src: '',
        description: 'Interactive coding and programming classes'
      },
      {
        name: 'STEM Experiments',
        src: '',
        description: 'Hands-on STEM experiments and demonstrations'
      },
      {
        name: 'Innovation Projects',
        src: '',
        description: 'Student innovation and project development'
      },
      {
        name: 'Technology Integration',
        src: '',
        description: 'Technology in modern education'
      },
      {
        name: 'Learning Platform',
        src: '',
        description: 'Interactive online learning platform'
      }
    ]
  },
  'av-integration': {
    title: 'AV Integration',
    images: [
      {
        name: 'Conference Room Setup',
        src: 'images/avsetup.jpg',
        description: 'Professional conference room AV installation'
      },
      {
        name: 'Projection Systems',
        src: '',
        description: 'Advanced projection and display systems'
      },
      {
        name: 'Audio Systems',
        src: '',
        description: 'Professional audio system installation'
      },
      {
        name: 'Video Conferencing',
        src: '',
        description: 'Video conferencing room setup'
      },
      {
        name: 'Control Systems',
        src: '',
        description: 'Integrated AV control systems'
      },
      {
        name: 'Event Setup',
        src: '',
        description: 'Large-scale event AV production'
      }
    ]
  },
  development: {
    title: 'Development',
    images: [
      {
        name: 'Web Development',
        src: '',
        description: 'Modern web application development'
      },
      {
        name: 'UI/UX Design',
        src: '',
        description: 'User interface and experience design'
      },
      {
        name: 'Mobile Apps',
        src: '',
        description: 'Cross-platform mobile application development'
      },
      {
        name: 'Backend Systems',
        src: '',
        description: 'Scalable backend infrastructure'
      },
      {
        name: 'Database Design',
        src: '',
        description: 'Database architecture and optimization'
      },
      {
        name: 'API Development',
        src: '',
        description: 'RESTful API design and implementation'
      }
    ]
  }
};

/* ===================== LIGHTBOX STATE ===================== */
let lightboxImages = [];
let lightboxIndex = 0;

// Function to open gallery modal
function openGalleryModal(category) {
  const modal = document.getElementById('galleryModal');
  const modalTitle = document.getElementById('modalTitle');
  const container = document.getElementById('galleryImagesContainer');
  
  const categoryData = galleryData[category];
  
  if (!categoryData) return;
  
  // Store images for lightbox use
  lightboxImages = categoryData.images;
  
  modalTitle.textContent = categoryData.title;
  container.innerHTML = '';
  
  categoryData.images.forEach((image, index) => {
    const imageCard = document.createElement('div');
    imageCard.className = 'gallery-image-card';
    imageCard.setAttribute('role', 'button');
    imageCard.setAttribute('tabindex', '0');
    imageCard.setAttribute('aria-label', `View ${image.name}`);
    imageCard.innerHTML = `
      <div class="gallery-image-wrapper">
        <img src="${image.src}" alt="${image.name}" class="gallery-image">
        <div class="gallery-image-overlay">
          <p class="gallery-image-description">${image.description}</p>
          <span class="gallery-view-hint">Click to view</span>
        </div>
      </div>
      <h4 class="gallery-image-name">${image.name}</h4>
    `;
    // Open lightbox on click
    imageCard.addEventListener('click', () => openLightbox(index));
    imageCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
    });
    container.appendChild(imageCard);
  });
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Function to close gallery modal
function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ===================== LIGHTBOX FUNCTIONS ===================== */
function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.getElementById('galleryLightbox');
  updateLightbox();
  lightbox.style.display = 'flex';
  // Trap keyboard navigation inside lightbox
  document.addEventListener('keydown', lightboxKeyHandler);
}

function closeLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  lightbox.style.display = 'none';
  document.removeEventListener('keydown', lightboxKeyHandler);
}

function closeLightboxOnBackdrop(event) {
  // Only close if the backdrop itself (not inner content) is clicked
  if (event.target === document.getElementById('galleryLightbox')) {
    closeLightbox();
  }
}

function lightboxNavigate(direction) {
  lightboxIndex = (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

function updateLightbox() {
  const image = lightboxImages[lightboxIndex];
  const imgEl = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDescription');
  const counterEl = document.getElementById('lightboxCounter');

  // Fade transition
  imgEl.style.opacity = '0';
  setTimeout(() => {
    imgEl.src = image.src || '';
    imgEl.alt = image.name;
    imgEl.style.opacity = '1';
  }, 150);

  titleEl.textContent = image.name;
  descEl.textContent = image.description;
  counterEl.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;

  // Show/hide nav arrows based on image availability
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  if (prevBtn) prevBtn.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
}

function lightboxKeyHandler(e) {
  if (e.key === 'ArrowLeft') lightboxNavigate(-1);
  else if (e.key === 'ArrowRight') lightboxNavigate(1);
  else if (e.key === 'Escape') closeLightbox();
}


/* ===================== FOOTER YEAR ===================== */
function setFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ===================== NAVBAR SCROLL EFFECT ===================== */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = 'var(--shadow)';
  }
});
