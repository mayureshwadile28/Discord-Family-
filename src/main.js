document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section, .final-footer');
  const bgText = document.getElementById('bg-text');
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  
  // Intersection Observer for fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Intersection Observer for changing background text and glow colors
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Change background text
        const name = entry.target.getAttribute('data-name');
        if (name) {
          bgText.style.opacity = '0';
          bgText.style.transform = 'scale(0.9)';
          
          setTimeout(() => {
            bgText.textContent = name;
            bgText.style.opacity = '1';
            bgText.style.transform = 'scale(1.1)';
            setTimeout(() => {
              bgText.style.transform = 'scale(1)';
            }, 400);
          }, 400); // Wait for fade out
        }

        // Change the glowing orb colors based on section data attributes to set the vibe!
        const color1 = entry.target.getAttribute('data-color') || '#ff007b';
        const color2 = entry.target.getAttribute('data-bg') || '#4a00e0';
        
        if (orb1 && orb2) {
            orb1.style.background = color1;
            orb2.style.background = color2;
        }
      }
    });
  }, {
    // Instead of threshold 0.5 (which fails if a section is taller than the screen),
    // we use a rootMargin that creates a trigger line in the middle of the screen.
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));

  // Interactive Forgive Me Button Logic
  const forgiveBtn = document.getElementById('forgive-btn');
  const secretMessage = document.getElementById('secret-message');
  const clickHint = document.getElementById('click-hint');

  if (forgiveBtn && secretMessage) {
    forgiveBtn.addEventListener('click', () => {
      // Hide button and show message
      forgiveBtn.style.display = 'none';
      if (clickHint) clickHint.style.display = 'none';
      secretMessage.style.display = 'block';
      
      // Spawn falling hearts and sparkles!
      const emojis = ['❤️', '💖', '✨', '🥺', '🌟'];
      
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.classList.add('falling-heart');
          heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          
          // Randomize horizontal position and animation duration
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
          heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
          
          document.body.appendChild(heart);
          
          // Clean up the DOM after animation completes
          setTimeout(() => {
            heart.remove();
          }, 6000);
        }, i * 60); // Stagger the spawn to create a continuous shower
      }
    });
  }

  // --- Interactive Touch & Mouse Sparkle Trail ---
  const createSparkle = (x, y) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('touch-sparkle');
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Add slight random color variation (pink/purple/blue glowing vibes)
    const hue = Math.floor(Math.random() * 60) + 280; 
    sparkle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 60%), 0 0 20px hsl(${hue - 40}, 100%, 50%)`;
    sparkle.style.background = `radial-gradient(circle, #fff 0%, hsl(${hue}, 100%, 70%) 50%, transparent 100%)`;

    document.body.appendChild(sparkle);

    // Clean up sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  };

  // Mobile Touch Trail
  document.addEventListener('touchmove', (e) => {
    for (let i = 0; i < e.touches.length; i++) {
      if (Math.random() > 0.3) { // 70% chance to spawn to keep it smooth
        createSparkle(e.touches[i].clientX, e.touches[i].clientY);
      }
    }
  }, { passive: true });

  document.addEventListener('touchstart', (e) => {
    for (let i = 0; i < e.touches.length; i++) {
      createSparkle(e.touches[i].clientX, e.touches[i].clientY);
    }
  }, { passive: true });

  // PC Mouse Drag Trail
  let isMouseDown = false;
  document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    createSparkle(e.clientX, e.clientY);
  });
  document.addEventListener('mousemove', (e) => {
    if (isMouseDown && Math.random() > 0.3) {
      createSparkle(e.clientX, e.clientY);
    }
  });
  document.addEventListener('mouseup', () => { isMouseDown = false; });
});
