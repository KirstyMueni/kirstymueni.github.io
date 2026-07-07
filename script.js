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
    title: cybersecurity: {
  title: 'Cybersecurity',
  images: [
    {
      name: 'Penetration Testing',
      src: 'images/pentest.png',
      description: 'Executed targeted penetration tests using Kali Linux, performing anonymous SMB enumeration and service reconnaissance to identify exploitable vulnerabilities within network shares and services.'
    },
    {
      name: 'Password Security Analysis',
      src: 'images/password.png',
      description: 'Conducted password hash cracking exercises using John the Ripper against various hash types, demonstrating the critical importance of strong password policies and multi-factor authentication.'
    },
    {
      name: 'Vulnerability Assessment',
      src: 'images/vulnerability.png',
      description: 'Performed comprehensive vulnerability scans with Nmap, identifying critical exposures such as web server misconfigurations (e.g., Apache byte-range DoS) and SMB vulnerabilities, along with potential administrative access points.'
    },
    {
      name: 'Network Security Monitoring',
      src: 'images/network security.png',
      description: 'Utilized Nmap for host discovery and service version detection across network segments, identifying open ports (e.g., SSH, HTTP, JDBC) and their associated software versions to assess potential attack surfaces.'
    },
    {
      name: 'Web Application Threat Analysis',
      src: 'images/threat.png',
      description: 'Conducted web server vulnerability assessments using Nikto, uncovering critical misconfigurations (e.g., missing X-Frame-Options header) and identifying accessible administrative paths, which could lead to sensitive data exposure.'
    },
    {
      name: 'Firewall Configuration & Management',
      src: 'images/firewall.png',
      description: 'Implemented and managed Uncomplicated Firewall (UFW) rules on Linux systems, configuring precise inbound/outbound traffic policies (e.g., allowing SSH, denying FTP/SMB) to establish robust host-based network defenses.'
    }
  ]
},

  networking: {
  title: 'Networking',
  images: [
    {
      name: 'Enterprise Network Topology Design',
      src: 'images/network topology.png',
      description: 'Designed and simulated a multi-VLAN enterprise network topology in Cisco Packet Tracer, integrating routers, core switches, and departmental PCs (Admin, Finance, IT) with a central primary server for robust connectivity.'
    },
    {
      name: 'VLAN Segmentation & Configuration',
      src: 'images/vlan configuration.png',
      description: 'Configured and verified VLANs (e.g., VLAN10, VLAN20, VLAN30) on Cisco switches within a simulated enterprise environment, ensuring logical separation of departmental traffic for enhanced security and performance.'
    },
    {
      name: 'Trunking & Inter-VLAN Routing',
      src: 'images/trunk configuration.png',
      description: 'Implemented 802.1Q trunking protocols on switch interfaces and configured Router-on-a-Stick for efficient inter-VLAN routing, enabling seamless communication across segmented networks.'
    },
    {
      name: 'Router Interface Management',
      src: 'images/router configuration.png',
      description: 'Managed and configured router interfaces, including assigning IP addresses and verifying operational status, to ensure proper routing and connectivity within complex network architectures.'
    },
    {
      name: 'Network Troubleshooting & Diagnostics',
      src: 'images/network troubleshooting.png',
      description: 'Performed systematic network diagnostics and troubleshooting to resolve connectivity issues, utilizing command-line tools and network analysis techniques to restore optimal network functionality.'
    },
    {
      name: 'Wireless Network Deployment',
      src: 'images/wireless.png',
      description: 'Deployed and configured secure wireless networks within Cisco Packet Tracer, integrating wireless routers and validating client connectivity through successful ping tests to ensure reliable access.'
    }
  ]
},
  'digital-literacy': {
    title: 'Digital Literacy',
    images: [
      { name: 'Kolibri Installation & Configuration', 
       src: 'images/kolibri.png', 
       description: 'Configured and managed Kolibri offline learning servers, providing learners and teachers with access to interactive educational content and digital learning resources without internet access.'
      },
      { name: 'Offline Educational Content Distribution', 
       src: 'images/phet.png', 
       description: 'Provided learners with access to offline digital learning resources through Kolibri, including interactive simulations and educational materials that support self-paced learning without internet access.' 
      },
      { name: 'Resource Usage Monitoring & Learning Analytics',
       src: 'images/areslogs.jpeg', 
       description: 'Analyzed platform usage data to understand learner engagement, identify popular content, and monitor the effectiveness of digital learning resources.'
      },
      { name: 'Learner Device Engagement', 
       src: 'images/digitalliteracy.png', 
       description: 'Supported technology-enabled learning environments where learners actively utilized digital devices to access educational content, complete learning activities, and build digital competencies.'
      },
      { name: 'Computer Lab Setup & Digital Learning Environment', 
       src: 'images/lab.png', 
       description: 'Created a technology-enabled learning space that empowers students to access digital tools, educational resources and technology-enhanced learning opportunities. '
      },
      { name: 'Digital Literacy Training',
       src: 'images/digital training.png',
       description: 'Conducted hands-on ARES training sessions for learners and teachers, equipping them with practical digital skills and guiding them on how to access, manage, and utilize digital learning resources effectively.' 
      }
    ]
  },
  'edtech-stem': {
    title: 'EdTech & STEM',
    images: [
      { name: 'Scratch Programming', 
       src: 'images/Scratch.png', 
       description: 'Developed Math Quiz Challenge ; an interactive educational game developed in Scratch that helps learners strengthen their arithmetic skills through engaging, game-based learning. The application presents multiple mathematics questions, evaluates user responses in real time, provides immediate feedback, and tracks the learner's score using variables and conditional logic. Designed to promote computational thinking and digital literacy, the project demonstrates the use of Scratch programming to create an interactive and enjoyable classroom learning experience' 
      },
      { name: 'PhET Interactive Simulations', 
       src: 'images/phet sim.png',  
       description: 'Integrated PhET Interactive Simulations into STEM to provide learners with virtual experiments in Physics, Chemistry, Biology, and Mathematics, enhancing conceptual understanding through inquiry-based and hands-on digital learning.' 
      },
      
      { name: 'LED Traffic Light',
       src: 'images/arduino.png', 
       description: 'Designed and programmed an Arduino-based traffic light system using LEDs to simulate real-world traffic signal operation. The project applies embedded programming concepts such as digital outputs, timing sequences, and control logic to demonstrate the fundamentals of automation and intelligent traffic management systems.' 
      },
      
      { name: 'Autonomous Robot Brain Simulator', 
       src: 'images/robot.png', 
       description: 'Designed and programmed an Arduino-based autonomous robot controller capable of detecting obstacles using an HC-SR04 ultrasonic sensor. The system continuously measures the distance to nearby objects and makes autonomous decisions to move forward, stop, or turn. LED indicators simulate robot actions, demonstrating the core principles of robotics, embedded systems, sensor integration, and autonomous decision-making.' 
      },

      { name: 'Student Grade Predictor', 
       src: 'images/mlearning.png', 
       description: 'Developed a beginner-friendly machine learning application developed in Python that analyzes historical student performance data to predict final academic grades. Built using Pandas, Scikit-learn, and Matplotlib, the project demonstrates the complete machine learning workflow, including data preparation, model training, prediction, evaluation, and visualization. It highlights practical experience in predictive analytics and the application of artificial intelligence techniques to solve real-world educational challenges.'
      },
     
      { name: 'Learning Platform', 
       src: '',
       description: 'Interactive online learning platform'
      }
    ]
  },
  'av-integration': {
    title: 'AV Integration',
    images: [
      { name: 'Smart Conference Room',
       src: 'images/avsetup.jpg', 
       description: 'Integrated high-definition video conferencing systems with automated environmental controls to create a frictionless, professional meeting experience.' },
      { name: 'Control Systems', 
       src: 'images/control.jpeg', 
       description: 'Professional audio control and signal management solutions featuring wireless microphone systems, powered mixers, and integrated PA equipment for seamless sound distribution, real-time audio control, and reliable event communication.' },
      { name: 'Event Setup', 
       src: 'images/setup.png', 
       description: 'Professional conference event setup featuring integrated projection, display, and sound systems, designed to deliver clear presentations, effective communication, and a seamless meeting experience in a premium venue environment.' },
      { name: 'Projection Systems', 
       src: 'images/projector.jpeg',
       description: 'Professional projector and interactive presentation system setup featuring high-definition projection, a VTouch smart podium, and integrated audiovisual equipment designed to deliver seamless presentations, training sessions, and conference experiences' },
      { name: 'Interactive Presentation Solutions',
       src: 'images/presentation.png', 
       description: 'Deployment and configuration of smart presentation systems, including interactive digital podiums and touchscreen displays, designed to enhance presentations, meetings, conferences, and training sessions through seamless content delivery and user engagement.' },
      { name: 'Video Conferencing', 
       src: '',
       description: 'Video conferencing room setup' }
    ]
  },
 development: {
  title: 'Development',
  images: [
    { name: 'Web Development', 
     src: 'images/web.png', 
     description: 'Developed responsive, user-centric web applications using modern JavaScript frameworks, focusing on performance, accessibility, and clean code architecture.' },
    { name: 'User Experience (UX) Design', 
     src: 'images/ui.png', 
     description: 'Created intuitive user interfaces and interactive prototypes in Figma, prioritizing user-flow efficiency and consistent visual branding across all platforms.' },
    { name: 'Relational Database Engineering', 
     src: 'images/backend.png', 
     description: 'Architected optimized MySQL database schemas with complex relational mapping to ensure data integrity and high-speed query performance for data-heavy applications.' },
    { name: 'RESTful API Architecture', 
     src: 'images/api.png',
     description: 'Engineered secure backend APIs using Flask, implementing JSON-based endpoints for seamless data exchange between client-side interfaces and server-side logic.' },
    { name: 'Cross-Platform Mobile Dev', 
     src: 'images/App development.png',
     description: 'Built and deployed a high-performance fitness application using React and TypeScript, leveraging Capacitor for native-like performance on both Android and iOS.' },
    { name: 'Scalable Backend Systems', 
     src: 'images/database.png',
     description: 'Designed robust server-side architectures that handle complex data aggregation and user authentication while maintaining low latency under high traffic loads.' }
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
