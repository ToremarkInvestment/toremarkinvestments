// Custom cursor
const customCursor = document.getElementById('custom-cursor');
const clickableElements = document.querySelectorAll('a, button, .logo, .clickable');

// Update cursor position
document.addEventListener('mousemove', (e) => {
  if (customCursor) {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  }
});

// Enlarge cursor on hover over clickable elements
clickableElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (customCursor) {
      customCursor.classList.add('hovering');
    }
  });
  
  element.addEventListener('mouseleave', () => {
    if (customCursor) {
      customCursor.classList.remove('hovering');
    }
  });
});

// Hide cursor when leaving document
document.addEventListener('mouseout', (e) => {
  if (e.relatedTarget === null) {
    if (customCursor) {
      customCursor.style.display = 'none';
    }
  }
});

document.addEventListener('mouseover', () => {
  if (customCursor) {
    customCursor.style.display = 'block';
  }
});

// Navbar functionality
const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.mobile-menu');
const currentYearElement = document.getElementById('currentYear');

// Set current year in footer
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Toggle mobile menu with animation
function toggleMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle('open');
  }
}

// Mobile menu item click handler with improved scrolling
function mobileMenuClick(target) {
  toggleMenu();
  
  if (target === 'top') {
    scrollToTop();
  } else {
    scrollToSection(target);
  }
}

// Handle navbar background on scroll
window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero');
  
  if (heroSection && navbar) {
    const quarterHeroHeight = heroSection.offsetHeight / 4;
    
    if (window.scrollY > quarterHeroHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Improved scroll to section function that exactly matches React version
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Get the mobile state for consistent behavior with React version
    const isMobile = window.innerWidth < 768;
    // Use the exact same navbar height values as in React version
    const navbarHeight = isMobile ? 50 : 70;
    
    // Calculate element position exactly as in React version
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    // Perform the smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Add event listeners to nav menu items
document.addEventListener('DOMContentLoaded', () => {
  // Desktop navigation menu items
  const navMenuItems = document.querySelectorAll('.nav-menu a');
  navMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').replace('#', '');
      if (target === '' || target === '#') {
        scrollToTop();
      } else {
        scrollToSection(target);
      }
    });
  });

  // Mobile menu items - add specific handler for each item to ensure correct scrolling
  const mobileItems = document.querySelectorAll('.mobile-menu a');
  mobileItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').replace('#', '');
      
      // Close mobile menu first, then scroll after a small delay
      // This matches the React behavior where menu closes before scrolling
      mobileMenu.classList.remove('open');
      
      setTimeout(() => {
        if (target === '' || target === '#') {
          scrollToTop();
        } else {
          scrollToSection(target);
        }
      }, 300); // Short delay to allow menu animation to complete
    });
  });

  // Check initial scroll position
  const heroSection = document.querySelector('.hero');
  
  if (heroSection && navbar) {
    const quarterHeroHeight = heroSection.offsetHeight / 4;
    
    if (window.scrollY > quarterHeroHeight) {
      navbar.classList.add('scrolled');
    }
  }
});