// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Particles.js Configuration
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#8a2be2' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#8a2be2', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true }
      },
      retina_detect: true
    });
  }

  // Bulb Cursor Animation
  const cursor = document.querySelector('.bulb-cursor');
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .project-card, .skill-card, .exp-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth Scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '' && href !== 'index.html#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollToTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) scrollTopBtn.classList.add('show');
      else scrollTopBtn.classList.remove('show');
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Animate elements on scroll
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card, .project-card, .exp-card, .section-header').forEach(el => observer.observe(el));

  // Toast Notification Functions
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout = null;

  window.showToast = function(title, message, isError = false) {
    if (!toast) return;
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    
    const toastIcon = toast.querySelector('.toast-icon i');
    if (toastIcon) {
      if (isError) {
        toastIcon.className = 'fas fa-exclamation-triangle';
        toast.style.borderLeftColor = '#ff4444';
      } else {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.borderLeftColor = '#8a2be2';
      }
    }
    
    setTimeout(() => {
      if (toastIcon && !toast.classList.contains('show')) {
        toastIcon.className = 'fas fa-download';
        toast.style.borderLeftColor = '#8a2be2';
      }
    }, 500);
    
    toast.classList.remove('hide');
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => {
        if (toastIcon) toastIcon.className = 'fas fa-download';
      }, 300);
    }, 4000);
  };

  window.closeToast = function() {
    if (!toast) return;
    toast.classList.remove('show');
    toast.classList.add('hide');
    if (toastTimeout) clearTimeout(toastTimeout);
    const toastIcon = toast.querySelector('.toast-icon i');
    setTimeout(() => {
      if (toastIcon) toastIcon.className = 'fas fa-download';
    }, 300);
  };

  // Resume Download Functionality
const resumeBtn = document.getElementById('resumeDownloadBtn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // The actual PDF file name in your folder
    const pdfFileName = 'My-Resume-(1).pdf';
    
    // Create a temporary anchor to trigger download
    const link = document.createElement('a');
    link.href = pdfFileName;
    link.download = 'Mridul_Tyagi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success toast
    if (typeof window.showToast === 'function') {
      window.showToast('Download Complete!', 'Your resume has been downloaded successfully.');
    } else {
      alert('Resume downloaded successfully!');
    }
  });
}
  // Contact Form Handling (without EmailJS - just console log)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const subject = document.getElementById('subject')?.value;
      const message = document.getElementById('message')?.value;
      
      console.log('Form submitted:', { name, email, subject, message });
      
      if (typeof window.showToast === 'function') {
        window.showToast('Message Received!', 'Thank you for reaching out. I\'ll contact you soon.');
      } else {
        alert('Thank you for your message! I will get back to you soon.');
      }
      contactForm.reset();
    });
  }

  // Fix for images not loading - add fallback
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.src.includes('picsum') && !this.src.includes('placeholder')) {
        this.src = 'https://picsum.photos/id/20/600/400';
      }
    });
  });

});