/**
  ============================================================
  KIRSTY MUENI PORTFOLIO 
  ============================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // Lucide Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
    initTheme();
    initMobileMenu();
    initProjectButtons();
    initGallery();
    initLightbox();
    initScrollReveal();
    initSmoothScroll();
    setFooterYear();
    addMobileLightboxGestures();
});

/* ===================== THEME ===================== */
function initTheme() {
    const html = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;
    const savedTheme =
        localStorage.getItem("km-theme") || "light";
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(toggleBtn, savedTheme);
    toggleBtn.addEventListener("click", () => {
        const current =
            html.getAttribute("data-theme");
        const next =
            current === "light"
                ? "dark"
                : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem(
            "km-theme",
            next
        );
        updateThemeIcon(toggleBtn, next);
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    });
}

function updateThemeIcon(button, theme) {
    if (!button) return;
    const icon = button.querySelector("i");
    if (!icon) return;
    icon.setAttribute(
        "data-lucide",
        theme === "dark"
            ? "sun"
            : "moon"
    );
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

/* ===================== MOBILE MENU ===================== */
function initMobileMenu() {
    const hamburger =
        document.getElementById("hamburger");
    const navMenu =
        document.getElementById("navMenu");
    const navLinks =
        document.querySelectorAll(".nav-link");
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
    document.addEventListener("click", e => {
        if (
            !e.target.closest(".navbar")
        ) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

/* ===================== PROJECT BUTTONS ===================== */
function initProjectButtons() {
    const buttons =
        document.querySelectorAll(".project-btn");
    const sections =
        document.querySelectorAll(".project-category");
    if (!buttons.length || !sections.length) return;
    
    // Function to show specific category
    const showCategory = (projectName) => {
        sections.forEach(section => {
            if (section.dataset.project === projectName) {
                section.style.display = "block";
                section.style.opacity = "0";
                setTimeout(() => {
                    section.style.opacity = "1";
                    section.style.transition = "opacity 0.4s ease";
                }, 10);
            } else {
                section.style.display = "none";
            }
        });
    };

    // Hide all first
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Show first category by default
    const initialCategory = buttons[0].dataset.project;
    buttons[0].classList.add("active");
    showCategory(initialCategory);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            showCategory(button.dataset.project);
        });
    });
}

/* ===================== GALLERY DATA ===================== */
const galleryData = {
  cybersecurity: {
    title: 'Cybersecurity',
    images: [
      {
        name: 'Penetration Testing',
        src: 'images/pentest.png',
        description: 'Performed SMB enumeration using Kali Linux to identify publicly accessible Samba shares on a target system during an authorized penetration testing lab.'
      },
      {
        name: 'Password Cracking and Hash Analysis',
        src: 'images/password.png',
        description: 'Performed password cracking in a controlled penetration testing lab using John the Ripper on Kali Linux.'
      },
      {
        name: 'Vulnerability Assessment',
        src: 'images/vulnerability.png',
        description: 'Performed a vulnerability assessment using Nmap NSE (Nmap Scripting Engine) to identify open ports and services.'
      },
      {
        name: 'Network Security Monitoring',
        src: 'images/network security.png',
        description: 'I performed network reconnaissance using Nmap to discover active hosts and enumerate open ports.'
      },
      {
        name: 'Web Application Threat Analysis',
        src: 'images/threat.png',
        description: 'I performed a web application vulnerability assessment using Nikto to identify security weaknesses.'
      },
      {
        name: 'Firewall Hardening',
        src: 'images/firewall.png',
        description: 'Implemented firewall policies on Kali Linux to mitigate potential attack vectors.'
      }
    ]
  },
  networking: {
    title: 'Networking',
    images: [
      {
        name: 'Enterprise Network Topology Design',
        src: 'images/network topology.png',
        description: 'Designed and simulated a secure enterprise network using Cisco Packet Tracer.'
      },
      {
        name: 'VLAN Configuration',
        src: 'images/vlan configuration.png',
        description: 'Configured and verified Virtual Local Area Networks (VLANs) on a Cisco switch.'
      },
      {
        name: 'Trunking',
        src: 'images/trunk configuration.png',
        description: 'Configured and verified trunk links on a Cisco switch using the Cisco IOS CLI.'
      },
      {
        name: 'Inter-VLAN Routing',
        src: 'images/router configuration.png',
        description: 'Configured inter-VLAN routing using the Router-on-a-Stick architecture.'
      },
      {
        name: 'Network Troubleshooting',
        src: 'images/network troubleshooting.png',
        description: 'Performed systematic network diagnostics and troubleshooting to resolve connectivity issues.'
      },
      {
        name: 'Wireless Network Deployment',
        src: 'images/wireless.png',
        description: 'Deployed and configured secure wireless networks within Cisco Packet Tracer.'
      }
    ]
  },
  'digital-literacy': {
    title: 'Digital Literacy',
    images: [
      {
        name: 'Kolibri Installation',
        src: 'images/kolibri.png',
        description: 'Configured and managed Kolibri offline learning servers.'
      },
      {
        name: 'Offline Content Distribution',
        src: 'images/phet.png',
        description: 'Provided learners with access to offline digital learning resources.'
      },
      {
        name: 'Learning Analytics',
        src: 'images/areslogs.jpeg',
        description: 'Analyzed platform usage data to understand learner engagement.'
      },
      {
        name: 'Learner Device Engagement',
        src: 'images/digitalliteracy.png',
        description: 'Supported technology-enabled learning environments.'
      },
      {
        name: 'Computer Lab Setup',
        src: 'images/lab.png',
        description: 'Created a technology-enabled learning space for students.'
      },
      {
        name: 'Digital Literacy Training',
        src: 'images/digital training.png',
        description: 'Conducted hands-on ARES training sessions for learners and teachers.'
      }
    ]
  },
  'edtech-stem': {
    title: 'EdTech & STEM',
    images: [
      {
        name: 'Scratch Programming',
        src: 'images/Scratch.png',
        description: 'Developed Math Quiz Challenge, an interactive educational game in Scratch.'
      },
      {
        name: 'PhET Simulations',
        src: 'images/phet sim.png',
        description: 'Integrated PhET Interactive Simulations into STEM learning.'
      },
      {
        name: 'LED Traffic Light',
        src: 'images/arduino.png',
        description: 'Designed and programmed an Arduino-based traffic light system.'
      },
      {
        name: 'Robot Brain Simulator',
        src: 'images/robot.png',
        description: 'Designed and programmed an Arduino-based autonomous robot controller.'
      },
      {
        name: 'Student Grade Predictor',
        src: 'images/mlearning.png',
        description: 'Developed a machine learning application built with Python and Scikit-learn that predicts student performance based on academic metrics and visualizes study patterns using Matplotlib.'
      },
      {
        name: '',
        src: '',
        description: ''
      }
    ]
  },
  'av-integration': {
    title: 'AV Integration',
    images: [
      {
        name: 'Smart Conference Room',
        src: 'images/avsetup.jpg',
        description: 'Integrated high-definition video conferencing systems with automated controls.'
      },
      {
        name: 'Control Systems',
        src: 'images/control.jpeg',
        description: 'Professional audio control and signal management solutions.'
      },
      {
        name: 'Event Setup',
        src: 'images/setup.png',
        description: 'Professional conference event setup featuring integrated projection and sound.'
      },
      {
        name: 'Projection Systems',
        src: 'images/projector.jpeg',
        description: 'Professional projector and interactive presentation system setup.'
      },
      {
        name: 'Interactive Presentation',
        src: 'images/presentation.png',
        description: 'Deployment and configuration of smart presentation systems.'
      },
      {
        name: '',
        src: '',
        description: ''
      }
    ]
  },
  development: {
    title: 'Development',
    images: [
      {
        name: 'Web Development',
        src: 'images/web.png',
        description: 'Designed and developed a responsive personal portfolio website.'
      },
      {
        name: 'UX Design',
        src: 'images/ui.png',
        description: 'Designed a clean and responsive portfolio landing page.'
      },
      {
        name: 'Database Development',
        src: 'images/backend.png',
        description: 'Implemented a relational database using SQLite to manage library records.'
      },
      {
        name: 'RESTful API',
        src: 'images/api.png',
        description: 'Developed a RESTful API to manage library resources.'
      },
      {
        name: 'Mobile Development',
        src: 'images/App development.png',
        description: 'Designed and developed a cross-platform fitness application.'
      },
      {
        name: 'Backend Systems',
        src: 'images/database.png',
        description: 'Engineered the backend infrastructure for a Library Management System.'
      }
    ]
  }
};

let currentGallery = [];
let currentGalleryIndex = 0;

/* ===================== GALLERY MODAL ===================== */
function initGallery() {
    const buttons = document.querySelectorAll(".gallery-btn");
    if (!buttons.length) return;

    buttons.forEach(button => {
        // Find category from data-manus_click_id or text or parent context
        // But the most reliable is the original onclick mapping
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const text = button.parentElement.querySelector('h3').textContent.trim().toLowerCase();
            let category = '';
            if (text.includes('cybersecurity')) category = 'cybersecurity';
            else if (text.includes('networking')) category = 'networking';
            else if (text.includes('digital literacy')) category = 'digital-literacy';
            else if (text.includes('edtech')) category = 'edtech-stem';
            else if (text.includes('av integration')) category = 'av-integration';
            else if (text.includes('development')) category = 'development';
            
            if (category) {
                openGallery(category);
            }
        });
        // Remove the inline onclick handler to prevent double execution
        button.removeAttribute('onclick');
    });
}

function openGallery(category) {
    if (!galleryData[category]) return;
    
    currentGallery = galleryData[category].images;
    const modal = document.getElementById("galleryModal");
    const modalTitle = document.getElementById("modalTitle");
    const grid = document.getElementById("galleryImages");

    if (!modal || !modalTitle || !grid) return;

    modalTitle.textContent = galleryData[category].title;
    grid.innerHTML = "";

    currentGallery.forEach((image, index) => {
        const card = document.createElement("div");
        card.className = "gallery-image-card";
        card.innerHTML = `
            <div class="gallery-image-wrapper">
                <img class="gallery-image" src="${image.src}" alt="${image.name}" loading="lazy">
                <div class="gallery-image-overlay">
                    <p class="gallery-image-description">${image.description}</p>
                    <span class="gallery-view-hint">Click to View</span>
                </div>
            </div>
            <h4 class="gallery-image-name">${image.name}</h4>
        `;
        card.addEventListener("click", () => openLightbox(index));
        grid.appendChild(card);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
    const modal = document.getElementById("galleryModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}

// Global modal close listeners
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close")) {
        closeGalleryModal();
    }
    const modal = document.getElementById("galleryModal");
    if (modal && e.target === modal) {
        closeGalleryModal();
    }
});

/* ===================== LIGHTBOX ===================== */
function initLightbox() {
    const closeBtn = document.getElementById("lightboxClose");
    const nextBtn = document.getElementById("lightboxNext");
    const prevBtn = document.getElementById("lightboxPrev");
    const lightbox = document.getElementById("galleryLightbox");

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);
    if (prevBtn) prevBtn.addEventListener("click", previousImage);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

function openLightbox(index) {
    if (!currentGallery.length) return;
    currentGalleryIndex = index;
    const lightbox = document.getElementById("galleryLightbox");
    if (!lightbox) return;
    
    updateLightbox();
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function updateLightbox() {
    const imageData = currentGallery[currentGalleryIndex];
    const image = document.getElementById("lightboxImage");
    const title = document.getElementById("lightboxTitle");
    const desc = document.getElementById("lightboxDescription");
    const counter = document.getElementById("lightboxCounter");

    if (image) {
        image.src = imageData.src;
        image.alt = imageData.name;
    }
    if (title) title.textContent = imageData.name;
    if (desc) desc.textContent = imageData.description;
    if (counter) counter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
}

function closeLightbox() {
    const lightbox = document.getElementById("galleryLightbox");
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    }
}

function nextImage() {
    if (!currentGallery.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGallery.length;
    updateLightbox();
}

function previousImage() {
    if (!currentGallery.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
}

/* ===================== KEYBOARD SUPPORT ===================== */
document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("galleryLightbox");
    if (!lightbox || lightbox.style.display !== "flex") return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
});

/* ===================== MOBILE GESTURES ===================== */
function addMobileLightboxGestures() {
    const lightbox = document.getElementById("galleryLightbox");
    if (!lightbox) return;

    let startX = 0;
    lightbox.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextImage();
        else if (endX - startX > 50) previousImage();
    });
}

/* ===================== OTHER UTILS ===================== */
function initScrollReveal() {
    const elements = document.querySelectorAll(".about-text, .skill-card, .tool-card, .project-variation, .gallery-card, .case-study-card, .cert-card, .testimonial-card, .blog-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
                window.scrollTo({ top: target.offsetTop - navHeight, behavior: "smooth" });
            }
        });
    });
}

function setFooterYear() {
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}
