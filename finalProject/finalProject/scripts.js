document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.retro-sidebar').forEach((sidebar) => {
    const toggle = sidebar.querySelector('.nav-toggle');
    const nav = sidebar.querySelector('.main-nav');

    if (!toggle || !nav) {
      return;
    }

    const closeMenu = () => {
      sidebar.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (sidebar.classList.contains('nav-open')) {
          closeMenu();
        }
      });
    });
  });

  // Sparkle Trail and Dust Cursor Effect
  const colour = "random"; // "random" can be replaced with any valid colour ie: "red"...
  const sparkles = 100; // increase or decrease for number of sparkles falling
  
  // Get CSS variable for pink theme
  const rootStyles = getComputedStyle(document.documentElement);
  const pinkColor = rootStyles.getPropertyValue('--pink').trim() || '#ff66cc';
  
  let x = 0, ox = 0;
  let y = 0, oy = 0;
  let swide = window.innerWidth || 800;
  let shigh = window.innerHeight || 600;
  let sleft = 0, sdown = 0;
  
  const tiny = [];
  const star = [];
  const starv = [];
  const starx = [];
  const stary = [];
  const tinyx = [];
  const tinyy = [];
  const tinyv = [];
  
  // Pink and purple shades
  const colours = [
    '#ff66cc', '#ff8bd4', '#ff9edc', '#ffb3e6', '#ffccef', // Pink shades
    '#d946ef', '#c026d3', '#a855f7', '#9333ea', '#7e22ce', // Purple shades
    '#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', // Pink-purple shades
    '#e879f9', '#f0abfc', '#f5d0fe' // Light purple shades
  ];
  
  // Cursor trail dots
  const n = 10;
  const dots = [];
  
  function createDiv(height, width) {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return div;
  }
  
  function newColour() {
    // Generate pink and purple shades
    const colorType = Math.random();
    if (colorType < 0.5) {
      // Pink shades: high red, medium-high green, high blue
      const r = 220 + Math.floor(Math.random() * 36); // 220-255
      const g = 100 + Math.floor(Math.random() * 100); // 100-200
      const b = 180 + Math.floor(Math.random() * 76); // 180-255
      return "rgb(" + r + ", " + g + ", " + b + ")";
    } else {
      // Purple shades: medium-high red, low-medium green, high blue
      const r = 150 + Math.floor(Math.random() * 106); // 150-255
      const g = 30 + Math.floor(Math.random() * 100); // 30-130
      const b = 200 + Math.floor(Math.random() * 56); // 200-255
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  
  // Create cursor trail dots
  for (let i = 0; i < n; i++) {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.width = (i / 2) + "px";
    dot.style.height = (i / 2) + "px";
    dot.style.background = pinkColor;
    dot.style.top = "0px";
    dot.style.left = "0px";
    document.body.appendChild(dot);
    dots.push(dot);
  }
  
  // Create sparkle elements
  for (let i = 0; i < sparkles; i++) {
    // Tiny particles - made larger
    const tinyEl = createDiv(5, 5);
    tinyEl.className = "sparkle-tiny";
    tinyEl.style.visibility = "hidden";
    tinyEl.style.zIndex = "999";
    document.body.appendChild(tinyEl);
    tiny.push(tinyEl);
    starv.push(0);
    tinyv.push(0);
    
    // Star particles (cross shape) - made larger
    const starEl = createDiv(9, 9);
    starEl.className = "sparkle-star";
    starEl.style.backgroundColor = "transparent";
    starEl.style.visibility = "hidden";
    starEl.style.zIndex = "999";
    
    const rlef = createDiv(2, 9);
    const rdow = createDiv(9, 2);
    starEl.appendChild(rlef);
    starEl.appendChild(rdow);
    rlef.style.position = "absolute";
    rlef.style.top = "3.5px";
    rlef.style.left = "0px";
    rdow.style.position = "absolute";
    rdow.style.top = "0px";
    rdow.style.left = "3.5px";
    
    document.body.appendChild(starEl);
    star.push(starEl);
  }
  
  function set_width() {
    const sw_min = Math.min(
      document.documentElement?.clientWidth || Infinity,
      window.innerWidth || Infinity,
      document.body?.clientWidth || Infinity
    ) || 800;
    
    const sh_min = Math.min(
      document.documentElement?.clientHeight || Infinity,
      window.innerHeight || Infinity,
      document.body?.clientHeight || Infinity
    ) || 600;
    
    swide = sw_min === Infinity ? 800 : sw_min;
    shigh = sh_min === Infinity ? 600 : sh_min;
  }
  
  function set_scroll() {
    if (typeof window.pageYOffset === 'number') {
      sdown = window.pageYOffset;
      sleft = window.pageXOffset;
    } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
      sdown = document.body.scrollTop;
      sleft = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
      sleft = document.documentElement.scrollLeft;
      sdown = document.documentElement.scrollTop;
    } else {
      sdown = 0;
      sleft = 0;
    }
  }
  
  function mouse(e) {
    if (e) {
      y = e.pageY;
      x = e.pageX;
    } else {
      set_scroll();
      y = event.y + sdown;
      x = event.x + sleft;
    }
  }
  
  function animate() {
    const o = window.pageYOffset || 0;
    
    for (let i = 0; i < n; i++) {
      const temp1 = dots[i];
      const randcolours = colours[Math.floor(Math.random() * colours.length)];
      temp1.style.background = randcolours;
      
      if (i < n - 1) {
        const temp2 = dots[i + 1];
        temp1.style.top = parseInt(temp2.style.top) + "px";
        temp1.style.left = parseInt(temp2.style.left) + "px";
      } else {
        temp1.style.top = (y + o) + "px";
        temp1.style.left = x + "px";
      }
    }
    
    setTimeout(animate, 10);
  }
  
  function update_star(i) {
    if (--starv[i] == 25) {
      star[i].style.clip = "rect(1px, 8px, 8px, 1px)";
    }
    if (starv[i]) {
      stary[i] += 1 + Math.random() * 3;
      starx[i] += (i % 5 - 2) / 5;
      if (stary[i] < shigh + sdown) {
        star[i].style.top = stary[i] + "px";
        star[i].style.left = starx[i] + "px";
      } else {
        star[i].style.visibility = "hidden";
        starv[i] = 0;
        return;
      }
    } else {
      tinyv[i] = 50;
      tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
      tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
      tiny[i].style.width = "4px";
      tiny[i].style.height = "4px";
      tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
      star[i].style.visibility = "hidden";
      tiny[i].style.visibility = "visible";
    }
  }
  
  function update_tiny(i) {
    if (--tinyv[i] == 25) {
      tiny[i].style.width = "3px";
      tiny[i].style.height = "3px";
    }
    if (tinyv[i]) {
      tinyy[i] += 1 + Math.random() * 3;
      tinyx[i] += (i % 5 - 2) / 5;
      if (tinyy[i] < shigh + sdown) {
        tiny[i].style.top = tinyy[i] + "px";
        tiny[i].style.left = tinyx[i] + "px";
      } else {
        tiny[i].style.visibility = "hidden";
        tinyv[i] = 0;
        return;
      }
    } else {
      tiny[i].style.visibility = "hidden";
    }
  }
  
  function sparkle() {
    let c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
      ox = x;
      oy = y;
      for (c = 0; c < sparkles; c++) {
        if (!starv[c]) {
          star[c].style.left = (starx[c] = x) + "px";
          star[c].style.top = (stary[c] = y + 1) + "px";
          star[c].style.clip = "rect(0px, 9px, 9px, 0px)";
          const sparkleColor = (colour == "random") ? newColour() : colour;
          star[c].childNodes[0].style.backgroundColor = sparkleColor;
          star[c].childNodes[1].style.backgroundColor = sparkleColor;
          star[c].style.visibility = "visible";
          starv[c] = 50;
          break;
        }
      }
    }
    for (c = 0; c < sparkles; c++) {
      if (starv[c]) update_star(c);
      if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
  }
  
  // Initialize
  set_width();
  set_scroll();
  document.addEventListener('mousemove', mouse);
  window.addEventListener('scroll', set_scroll);
  window.addEventListener('resize', set_width);
  animate();
  sparkle();
});

