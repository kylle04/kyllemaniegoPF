document.addEventListener("DOMContentLoaded", () => {
  // Modern fade-up animation with enhanced features
  const elements = document.querySelectorAll(".fade-up");
  
  // Performance optimization: Use transform3d for hardware acceleration
  const animationConfig = {
    initial: {
      opacity: 0,
      transform: 'translate3d(0, 60px, 0) scale(0.95)',
      filter: 'blur(10px)'
    },
    final: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)'
    }
  };

  // Apply initial styles immediately to prevent flash
  elements.forEach((el, index) => {
    Object.assign(el.style, {
      opacity: '0',
      transform: 'translate3d(0, 60px, 0) scale(0.95)',
      filter: 'blur(10px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: `${index * 0.1}s`, // Staggered animation
      willChange: 'transform, opacity, filter' // Optimize for animations
    });
  });

  // Enhanced intersection observer with better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Animate in with modern easing
        requestAnimationFrame(() => {
          Object.assign(target.style, {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0)'
          });
        });

        // Clean up after animation completes
        setTimeout(() => {
          target.style.willChange = 'auto';
        }, 800);

        // Stop observing this element
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px 0px -50px 0px' // Trigger slightly before/after viewport
  });

  // Observe all elements
  elements.forEach((el) => observer.observe(el));

  // Respect user's motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  }

  // Optional: Add scroll-triggered counter animations for numbers
  const animateNumbers = () => {
    const numberElements = document.querySelectorAll('[data-number]');
    
    numberElements.forEach((el) => {
      const target = parseInt(el.dataset.number);
      const duration = 2000;
      const start = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth number animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        el.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
  };

  // Enhanced version with multiple animation types
  const initAdvancedAnimations = () => {
    // Slide-in variants
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    
    slideElements.forEach((el) => {
      const isLeft = el.classList.contains('slide-in-left');
      const initialTransform = isLeft ? 'translate3d(-100px, 0, 0)' : 'translate3d(100px, 0, 0)';
      
      Object.assign(el.style, {
        opacity: '0',
        transform: initialTransform,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform, opacity'
      });
    });

    // Scale-in elements
    const scaleElements = document.querySelectorAll('.scale-in');
    scaleElements.forEach((el) => {
      Object.assign(el.style, {
        opacity: '0',
        transform: 'scale(0.8)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform, opacity'
      });
    });

    // Universal observer for all animation types
    const universalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          requestAnimationFrame(() => {
            Object.assign(target.style, {
              opacity: '1',
              transform: 'translate3d(0, 0, 0) scale(1)',
              transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
              filter: 'blur(0)'
            });
          });
          universalObserver.unobserve(target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    [...slideElements, ...scaleElements].forEach((el) => {
      universalObserver.observe(el);
    });
  };

  // Initialize advanced animations if elements exist
  if (document.querySelector('.slide-in-left, .slide-in-right, .scale-in')) {
    initAdvancedAnimations();
  }

  // Expose animation utilities globally
  window.modernAnimations = {
    // Manually trigger fade-in for dynamically added elements
    fadeIn: (element, delay = 0) => {
      Object.assign(element.style, animationConfig.initial);
      element.style.transition = 'all 0.7s cubic-bezier(0.4,0,0.2,1)';
      element.style.transitionDelay = `${delay}ms`;
      requestAnimationFrame(() => {
        Object.assign(element.style, animationConfig.final);
      });
    },
    
    // Batch animate multiple elements
    batchAnimate: (elements, staggerDelay = 100) => {
      elements.forEach((el, index) => {
        window.modernAnimations.fadeIn(el, index * staggerDelay);
      });
    }
  };
 const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('emailModal');

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });
});

// Education card/modal click logic
(function() {
  function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) {
      var bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }
  // Card click
  document.querySelectorAll('.clickable-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Prevent double open if clicking image
      if (e.target.classList.contains('clickable-img')) return;
      var modalId = card.getAttribute('data-modal');
      if (modalId) openModal(modalId);
    });
  });
  // Image click
  document.querySelectorAll('.clickable-img').forEach(function(img) {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      var src = img.getAttribute('data-img');
      var modalId = img.closest('.clickable-card').getAttribute('data-modal');
      if (modalId) openModal(modalId);
    });
  });
})();

// Certificate Image Viewer Modal Logic
// Handles opening the viewer modal with the correct image and title

document.addEventListener('DOMContentLoaded', function() {
  var viewerModal = document.getElementById('modal-certificate-viewer');
  var viewerImg = viewerModal.querySelector('.certificate-viewer-img');
  var viewerTitle = viewerModal.querySelector('.certificate-viewer-title');
  var backBtn = document.getElementById('certificate-back-btn');
  var lastParentModal = null;

  document.querySelectorAll('.certificate-img-viewer').forEach(function(img) {
    img.addEventListener('click', function() {
      var src = img.getAttribute('data-img');
      var title = img.getAttribute('data-title');
      viewerImg.src = src;
      viewerTitle.textContent = title;
      // Find which parent modal is open
      var parentModal = img.closest('.modal');
      if (parentModal) {
        lastParentModal = parentModal;
        // Hide parent modal but keep backdrop
        var bsParentModal = bootstrap.Modal.getInstance(parentModal);
        if (bsParentModal) bsParentModal.hide();
      }
    });
  });

  // Back button returns to previous modal
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      var bsViewerModal = bootstrap.Modal.getInstance(viewerModal);
      if (bsViewerModal) bsViewerModal.hide();
      if (lastParentModal) {
        var bsParentModal = bootstrap.Modal.getOrCreateInstance(lastParentModal);
        setTimeout(function() { bsParentModal.show(); }, 350); // Wait for fade
      }
    });
  }

  // Clear image on modal close for better UX
  viewerModal.addEventListener('hidden.bs.modal', function() {
    viewerImg.src = '';
    viewerTitle.textContent = '';
  });
});
