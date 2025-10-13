
const text = document.querySelector('.rainbow-text');
let glow = 0;
let increasing = true;

function pulseGlow() {
  if (increasing) {
    glow += 0.05;
    if (glow >= 1) increasing = false;
  } else {
    glow -= 0.05;
    if (glow <= 0.2) increasing = true;
  }

  text.style.filter = `
    drop-shadow(0 0 ${8 + glow * 6}px rgba(255,255,255,0.5))
    drop-shadow(0 0 ${12 + glow * 10}px rgba(255,0,255,0.3))
  `;

  requestAnimationFrame(pulseGlow);
}

pulseGlow();
