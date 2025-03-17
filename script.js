document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Initialize cursor
  initCustomCursor();

  // Initialize navbar scroll listener
  initNavbarScroll();
});

// Custom cursor functionality
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Don't initialize on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    return;
  }

  // Track if mouse is inside the window
  let isMouseInWindow = false;

  // Add active class to body when mouse enters window
  document.addEventListener('mouseenter', function() {
    isMouseInWindow = true;
    document.body.classList.add('custom-cursor-active');
    cursor.style.opacity = 1;
  });

  // Remove active class when mouse leaves window
  document.addEventListener('mouseleave', function() {
    isMouseInWindow = false;
    document.body.classList.remove('custom-cursor-active');
    cursor.style.opacity = 0;
  });

  document.addEventListener('mousemove', function(e) {
    // Only update cursor if mouse is in window
    if (isMouseInWindow) {
      cursor.style.opacity = 1;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
  });

  // Add hover effect for all clickable elements
  const clickableElements = document.querySelectorAll('a, button, [role="button"], .clickable, input[type="submit"], input[type="button"]');
  clickableElements.forEach(function(element) {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('hovering');
    });
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('hovering');
    });
  });

  // Special class for mobile menu
  document.addEventListener('mousemove', function(e) {
    // Check if cursor is over the mobile menu when it's open
    if (mobileMenu.classList.contains('open')) {
      const rect = mobileMenu.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        cursor.classList.add('in-mobile-menu');
      } else {
        cursor.classList.remove('in-mobile-menu');
      }
    } else {
      cursor.classList.remove('in-mobile-menu');
    }
  });
}

// Navbar scroll functionality
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');
  
  if (hero && navbar) {
    window.addEventListener('scroll', function() {
      const quarterHeroHeight = hero.offsetHeight / 4;
      
      if (window.scrollY > quarterHeroHeight) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Mobile menu toggle
function toggleMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.toggle('open');
}

// Scroll to section
function scrollToSection(sectionId) {
  event.preventDefault();
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const navbarHeight = window.innerWidth < 768 ? 60 : 70;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // Close mobile menu if open
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
  }
}

// Mobile menu click handler (combines toggle and scroll)
function mobileMenuClick(targetId) {
  event.preventDefault();
  
  if (targetId === 'top') {
    scrollToTop();
  } else {
    scrollToSection(targetId);
  }
  
  // Close the menu
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.remove('open');
}

// Scroll to top
function scrollToTop() {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Close mobile menu if open
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
  }
}
