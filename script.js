/**
 * BCA Department - National College, Trichy
 * Main JavaScript File
 * Features: SPA Navigation, GSAP Animations, Carousel, Accordions
 */

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const pages = document.querySelectorAll('.page');
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const modalClose = document.getElementById('modalClose');
const modalGotIt = document.getElementById('modalGotIt');
const modalNotify = document.getElementById('modalNotify');

// Gallery elements
const gallerySlider = document.getElementById('gallerySlider');
const galleryDots = document.getElementById('galleryDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

// ============================================
// Data
// ============================================
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop', title: 'Computer Laboratory', description: 'State-of-the-art computing facilities' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop', title: 'Collaborative Learning', description: 'Students working together on projects' },
  { url: 'https://images.unsplash.com/photo-1427504494785-cdba58dadff0?w=1200&h=800&fit=crop', title: 'Campus Life', description: 'Vibrant college campus environment' },
  { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop', title: 'Classroom Sessions', description: 'Interactive learning experiences' },
  { url: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=800&fit=crop', title: 'Library Resources', description: 'Extensive academic resources' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop', title: 'Group Discussions', description: 'Peer learning and collaboration' }
];

const facultyData = [
  { name: 'Dr. K. Ramesh', designation: 'Head of Department', qualification: 'Ph.D. in Computer Science', specialization: 'Artificial Intelligence', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. S. Lakshmi', designation: 'Associate Professor', qualification: 'Ph.D. in Data Science', specialization: 'Machine Learning', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
  { name: 'Prof. M. Venkatesh', designation: 'Assistant Professor', qualification: 'M.Tech, M.Phil.', specialization: 'Web Technologies', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. P. Anitha', designation: 'Associate Professor', qualification: 'Ph.D. in Cloud Computing', specialization: 'Cloud Architecture', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
  { name: 'Prof. R. Suresh', designation: 'Assistant Professor', qualification: 'M.C.A., M.Phil.', specialization: 'Database Systems', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. T. Priya', designation: 'Assistant Professor', qualification: 'Ph.D. in Cybersecurity', specialization: 'Information Security', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' }
];

// ============================================
// State
// ============================================
let currentSlide = 0;
let slideInterval = null;
let activePage = 'about';

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNavigation();
  initMobileMenu();
  initModal();
  initGallery();
  initFacultyGrid();
  initAccordions();
  initAnimations();
  initCounters();
});

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// SPA Navigation
// ============================================
function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const page = link.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(page) {
  // Update active states
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Animate page transition
  const currentPage = document.querySelector('.page.active');
  const nextPage = document.getElementById(`${page}Page`);

  if (currentPage && nextPage && currentPage !== nextPage) {
    gsap.to(currentPage, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        currentPage.classList.remove('active');
        nextPage.classList.add('active');
        gsap.fromTo(nextPage, 
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        );
        
        // Re-initialize page-specific animations
        if (page === 'about') {
          initAboutAnimations();
        } else if (page === 'gallery') {
          initGalleryAnimations();
        } else if (page === 'faculty') {
          initFacultyAnimations();
        }
      }
    });
  }

  // Close mobile menu
  mobileMenu.classList.remove('open');
  mobileMenuBtn.querySelector('.menu-icon').classList.remove('hidden');
  mobileMenuBtn.querySelector('.close-icon').classList.add('hidden');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  activePage = page;
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileMenuBtn.querySelector('.menu-icon').classList.toggle('hidden', isOpen);
    mobileMenuBtn.querySelector('.close-icon').classList.toggle('hidden', !isOpen);
  });
}

// ============================================
// Register Modal
// ============================================
function initModal() {
  registerBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalGotIt.addEventListener('click', closeModal);
  modalNotify.addEventListener('click', closeModal);
  
  registerModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
}

function openModal() {
  registerModal.classList.remove('hidden');
  requestAnimationFrame(() => {
    registerModal.classList.add('open');
  });
}

function closeModal() {
  registerModal.classList.remove('open');
  setTimeout(() => {
    registerModal.classList.add('hidden');
  }, 300);
}

// ============================================
// Gallery Carousel
// ============================================
function initGallery() {
  // Create dots
  galleryImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    galleryDots.appendChild(dot);
  });

  // Navigation buttons
  prevSlideBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  nextSlideBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  // Auto-play
  startSlideshow();
}

function goToSlide(index) {
  if (index < 0) index = galleryImages.length - 1;
  if (index >= galleryImages.length) index = 0;

  gsap.to(gallerySlider, {
    x: -index * 100 + '%',
    duration: 0.6,
    ease: 'power3.out'
  });

  // Update dots
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
  
  // Reset autoplay timer
  startSlideshow();
}

function startSlideshow() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    if (activePage === 'gallery') {
      goToSlide(currentSlide + 1);
    }
  }, 5000);
}

// ============================================
// Faculty Grid
// ============================================
function initFacultyGrid() {
  const facultyGrid = document.getElementById('facultyGrid');
  
  facultyData.forEach(faculty => {
    const card = document.createElement('div');
    card.className = 'faculty-card faculty-member card-glass';
    card.innerHTML = `
      <div class="faculty-avatar">
        <img src="${faculty.image}" alt="${faculty.name}">
        <span class="faculty-designation">${faculty.designation}</span>
      </div>
      <h3>${faculty.name}</h3>
      <div class="faculty-info">
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
          </svg>
          <span>${faculty.qualification}</span>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"></polyline>
          </svg>
          <span>${faculty.specialization}</span>
        </div>
      </div>
      <button class="faculty-contact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        Contact
      </button>
    `;
    facultyGrid.appendChild(card);
  });
}

// ============================================
// Syllabus Accordions
// ============================================
function initAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  // Open first accordion by default
  const firstItem = document.querySelector('.syllabus-item');
  if (firstItem) firstItem.classList.add('open');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.syllabus-item');
      const isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.syllabus-item').forEach(i => {
        i.classList.remove('open');
      });
      
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ============================================
// Animated Counters
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const end = parseInt(element.dataset.end);
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    const current = Math.floor(end * easeProgress);
    
    element.textContent = prefix + current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = prefix + end.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// GSAP Animations
// ============================================
function initAnimations() {
  // Initial page load animations
  initAboutAnimations();
}

function initAboutAnimations() {
  // Hero animations
  gsap.fromTo('.hero-title', 
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  );

  gsap.fromTo('.hero-subtitle',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
  );

  gsap.fromTo('.hero-stat',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.5, ease: 'power3.out' }
  );

  // Course cards
  gsap.fromTo('.course-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.course-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Vision & Mission
  gsap.fromTo('.vision-card',
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.vision-section',
        start: 'top 75%'
      }
    }
  );

  gsap.fromTo('.mission-card',
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.vision-section',
        start: 'top 75%'
      }
    }
  );

  // Projects
  gsap.fromTo('.project-item',
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 75%'
      }
    }
  );

  // Syllabus
  gsap.fromTo('.syllabus-item',
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.syllabus-section',
        start: 'top 75%'
      }
    }
  );
}

function initGalleryAnimations() {
  gsap.fromTo('.gallery-header',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  );

  gsap.fromTo('.gallery-container',
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
  );
}

function initFacultyAnimations() {
  gsap.fromTo('.faculty-header',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  );

  gsap.fromTo('.faculty-member',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out'
    }
  );
}
