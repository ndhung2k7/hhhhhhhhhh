// Tách chuỗi thành từng span con
function toSpans(span) {
  const str = span.textContent;
  span.textContent = "";
  for (let i = 0; i < str.length; i++) {
    const theSpan = document.createElement("span");
    theSpan.textContent = str.charAt(i);
    span.appendChild(theSpan);
  }
}

// Lớp RainbowSpan
function RainbowSpan(span, hue = 0, deg = 360, brt = 255, spd = 50, hspd = 18) {
  this.deg = Math.abs(deg);
  this.hue = Math.abs(hue) % 360;
  this.hspd = Math.abs(hspd) % 360;
  this.length = span.textContent.length;
  this.span = span;
  this.speed = Math.abs(spd);
  this.hInc = this.deg / this.length;
  this.brt = Math.abs(brt) % 256;
  this.timer = null;
  toSpans(span);
  this.moveRainbow();
}

RainbowSpan.prototype.moveRainbow = function () {
  if (this.hue > 359) this.hue -= 360;
  const b = this.brt;
  const a = this.length;
  let h = this.hue;

  for (let i = 0; i < a; i++) {
    if (h > 359) h -= 360;

    let red, grn, blu, color;
    if (h < 60) { color = Math.floor((h / 60) * b); red = b; grn = color; blu = 0; }
    else if (h < 120) { color = Math.floor(((h - 60) / 60) * b); red = b - color; grn = b; blu = 0; }
    else if (h < 180) { color = Math.floor(((h - 120) / 60) * b); red = 0; grn = b; blu = color; }
    else if (h < 240) { color = Math.floor(((h - 180) / 60) * b); red = 0; grn = b - color; blu = b; }
    else if (h < 300) { color = Math.floor(((h - 240) / 60) * b); red = color; grn = 0; blu = b; }
    else { color = Math.floor(((h - 300) / 60) * b); red = b; grn = 0; blu = b - color; }

    h += this.hInc;
    this.span.childNodes[i].style.color = `rgb(${red}, ${grn}, ${blu})`;
  }

  this.hue += this.hspd;
};

// Khi trang tải xong, tạo hiệu ứng
window.addEventListener("DOMContentLoaded", () => {
  const r1 = document.getElementById("r1");
  const myRainbowSpan = new RainbowSpan(r1, 0, 360, 255, 50, 18);
  myRainbowSpan.timer = setInterval(() => myRainbowSpan.moveRainbow(), myRainbowSpan.speed);
});
(function() {
  const fpsDisplay = document.getElementById('fps-display');
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fps = 0;

  function update() {
    const now = performance.now();
    frameCount++;
    const delta = now - lastFrameTime;

    if (delta >= 1000) { // mỗi 1 giây tính FPS một lần
      fps = Math.round((frameCount * 1000) / delta);
      fpsDisplay.textContent = `FPS: ${fps}`;
      frameCount = 0;
      lastFrameTime = now;

      // đổi màu nếu FPS thấp
      if (fps >= 50) fpsDisplay.style.color = '#00ff00'; // xanh
      else if (fps >= 30) fpsDisplay.style.color = '#ffff00'; // vàng
      else fpsDisplay.style.color = '#ff0000'; // đỏ
    }

    requestAnimationFrame(update);
  }

  update();
})();
