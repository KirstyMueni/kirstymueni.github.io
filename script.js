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

/* ===================== GALLERY DATA (EXACT ORIGINAL CONTENT) ===================== */
const galleryData = {
  cybersecurity: {
    title: 'Cybersecurity',
    images: [
      { name: 'Penetration Testing', src: 'images/pentest.png', description: 'Hands-on penetration testing in a controlled lab environment' },
      { name: 'Password Cracking', src: 'images/password.png', description: 'Password security analysis and testing in a controlled lab environment' },
      { name: 'Vulnerability Scanning', src: 'images/vulnerability.png', description: 'Systematic vulnerability scanning in a controlled lab environment' },
      { name: 'Network Security', src: 'images/network security.png', description: 'Network security in a controlled lab environment' },
      { name: 'Threat Analysis', src: 'images/threat.png', description: 'Security threat identification in a controlled lab environment' },
      { name: 'Firewall Configuration', src: 'images/firewall.png', description: 'Firewall setup and management in a controlled lab environment' }
    ]
  },
  networking: {
    title: 'Networking',
    images: [
      { name: 'Network Topology', src: 'images/network topology.png', description: 'Enterprise Multi-VLAN Network Topology implemented in Cisco Packet Tracer.' },
      { name: 'VLAN Configuration', src: 'images/vlan configuration.png', description: 'VLAN segmentation configured for Administration, Finance, and IT departments.' },
      { name: 'Trunk Configuration', src: 'images/trunk configuration.png', description: '802.1Q trunk links configured between switches and router.' },
      { name: 'Router Configuration', src: 'images/router configuration.png', description: 'Router-on-a-Stick subinterfaces configured for inter-VLAN routing.' },
      { name: 'Network Troubleshooting', src: 'images/network troubleshooting.png', description: 'Network issue diagnosis and resolution' },
      { name: 'Wireless Networks', src: 'images/wireless.png', description: 'Secure wireless network deployment' }
    ]
  },
  'digital-literacy': {
    title: 'Digital Literacy',
    images: [
      { name: 'Kolibri Installation & Configuration', src: 'images/kolibri.png', description: 'Configured and managed Kolibri offline learning servers, providing learners and teachers with access to interactive educational content and digital learning resources without internet access.' },
      { name: 'Offline Educational Content Distribution', src: 'images/phet.png', description: 'Provided learners with access to offline digital learning resources through Kolibri, including interactive simulations and educational materials that support self-paced learning without internet access.' },
      { name: 'Resource Usage Monitoring & Learning Analytics', src: 'images/areslogs.jpeg', description: 'Analyzed platform usage data to understand learner engagement, identify popular content, and monitor the effectiveness of digital learning resources.' },
      { name: 'Learner Device Engagement', src: 'images/digitalliteracy.png', description: 'Supported technology-enabled learning environments where learners actively utilized digital devices to access educational content, complete learning activities, and build digital competencies.' },
      { name: 'Computer Lab Setup & Digital Learning Environment', src: 'images/lab.png', description: 'Created a technology-enabled learning space that empowers students to access digital tools, educational resources and technology-enhanced learning opportunities. ' },
      { name: 'Digital Literacy Training', src: 'images/digital training.png', description: 'Conducted hands-on ARES training sessions for learners and teachers, equipping them with practical digital skills and guiding them on how to access, manage, and utilize digital learning resources effectively.' }
    ]
  },
  'edtech-stem': {
    title: 'EdTech & STEM',
    images: [
      { name: 'Scratch Programming', src: 'images/Scratch.png', description: 'Developed Math Quiz Challenge ; an interactive educational game developed in Scratch that helps learners strengthen their arithmetic skills through engaging, game-based learning. The application presents multiple mathematics questions, evaluates user responses in real time, provides immediate feedback, and tracks the learner\'s score using variables and conditional logic. Designed to promote computational thinking and digital literacy, the project demonstrates the use of Scratch programming to create an interactive and enjoyable classroom learning experience' },
      { name: 'PhET Interactive Simulations', src: 'images/phet sim.png', description: 'Integrated PhET Interactive Simulations into STEM to provide learners with virtual experiments in Physics, Chemistry, Biology, and Mathematics, enhancing conceptual understanding through inquiry-based and hands-on digital learning.' },
      { name: 'LED Traffic Light', src: 'images/arduino.png', description: 'Designed and programmed an Arduino-based traffic light system using LEDs to simulate real-world traffic signal operation. The project applies embedded programming concepts such as digital outputs, timing sequences, and control logic to demonstrate the fundamentals of automation and intelligent traffic management systems.' },
      { name: 'Innovation Projects', src: '', description: 'Student innovation and project development' },
      { name: 'Technology Integration', src: '', description: 'Technology in modern education' },
      { name: 'Learning Platform', src: '', description: 'Interactive online learning platform' }
    ]
  },
  'av-integration': {
    title: 'AV Integration',
    images: [
      { name: 'Conference Room Setup', src: 'images/avsetup.jpg', description: 'Professional conference room AV installation' },
      { name: 'Control Systems', src: 'images/control.jpeg', description: 'Professional audio control and signal management solutions featuring wireless microphone systems, powered mixers, and integrated PA equipment for seamless sound distribution, real-time audio control, and reliable event communication.' },
      { name: 'Event Setup', src: 'images/setup.png', description: 'Professional conference event setup featuring integrated projection, display, and sound systems, designed to deliver clear presentations, effective communication, and a seamless meeting experience in a premium venue environment.' },
      { name: 'Projection Systems', src: 'images/projector.jpeg', description: 'Professional projector and interactive presentation system setup featuring high-definition projection, a VTouch smart podium, and integrated audiovisual equipment designed to deliver seamless presentations, training sessions, and conference experiences' },
      { name: 'Interactive Presentation Solutions', src: 'images/presentation.png', description: 'Deployment and configuration of smart presentation systems, including interactive digital podiums and touchscreen displays, designed to enhance presentations, meetings, conferences, and training sessions through seamless content delivery and user engagement.' },
      { name: 'Video Conferencing', src: '', description: 'Video conferencing room setup' }
    ]
  },
  development: {
    title: 'Development',
    images: [
      { name: 'Web Development', src: 'images/web.png', description: 'Modern web application development' },
      { name: 'UI/UX Design', src: 'images/ui.png', description: 'User interface and experience design' },
      { name: 'Backend Systems', src: 'images/backend.png', description: 'A SQL query performing a relational join to aggregate and retrieve unified loan data from a normalized database.' },
      { name: 'API Development', src: 'images/api.png', description: 'Developed a RESTful API using Flask and SQLite to expose library management data through JSON endpoints, demonstrating backend integration and data retrieval through HTTP requests.' },
      { name: 'Mobile Apps', src: 'images/App development.png', description: 'A cross-platform fitness application built with React, TypeScript, and Capacitor, featuring personalized workouts, meal planning, exercise favorites, and Android deployment.' },
      { name: 'Database Design ', src: 'images/database.png', description: 'A relational database implementation featuring an entity relationship schema (the schema) and SQL driven data aggregation(the functional output)' }
    ]
  }
};

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
