const card = document.getElementById('card');
const avatar = document.getElementById('avatar');

// Typewriter effect
const typewriterElement = document.getElementById('typewriter');
const textToType = 'Ďîśʜà';
let charIndex = 0;

function typeWriter() {
  if (charIndex < textToType.length) {
    typewriterElement.textContent += textToType.charAt(charIndex);
    document.title = textToType.substring(0, charIndex + 1); // Also update tab title
    charIndex++;
    setTimeout(typeWriter, 100); // 100ms between each character
  }
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
  typeWriter();
});

// check if bg.gif exists; if it doesn't, fall back to dark overlay
const testImg = new Image();
testImg.src = 'bg.gif';
testImg.onerror = () => {
  // if bg.gif missing, apply dark overlay background
  document.body.style.background = 'linear-gradient(120deg, rgba(124,58,237,0.8), rgba(6,182,212,0.7), rgba(236,72,153,0.6))';
  document.body.style.backgroundSize = '300% 300%';
  document.body.style.animation = 'bgShift 8s ease-in-out infinite';
};

window.addEventListener('mousemove', (e) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = (e.clientX - w / 2) / (w / 2); // -1 .. 1
  const y = (e.clientY - h / 2) / (h / 2); // -1 .. 1

  // tilt card slightly
  const rotateX = (y * 8).toFixed(2);
  const rotateY = (x * -10).toFixed(2);
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;

  // avatar pop-out
  avatar.style.transform = `translateZ(30px) translateX(${x * -6}px) translateY(${y * -6}px)`;
});

// gently reset on mouse leave
window.addEventListener('mouseleave', () => {
  card.style.transform = '';
  avatar.style.transform = '';
});

// Background audio autoplay handling
const bgAudio = document.getElementById('bg-audio');

if (bgAudio) {
  // lower the volume a bit as requested
  bgAudio.volume = 0.90; // 0.0 - 1.0

  // Try autoplay on load. If blocked, wait for first user gesture (click/keydown/touchstart).
  window.addEventListener('load', () => {
    const p = bgAudio.play();
    if (p !== undefined) {
      p.catch(() => {
        const resume = () => {
          bgAudio.play().catch(() => {});
          window.removeEventListener('click', resume);
          window.removeEventListener('keydown', resume);
          window.removeEventListener('touchstart', resume);
        };
        window.addEventListener('click', resume, { once: true });
        window.addEventListener('keydown', resume, { once: true });
        window.addEventListener('touchstart', resume, { once: true });
      });
    }
  });
}

