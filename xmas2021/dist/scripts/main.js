console.log('main.js');

const recipient = decodeURI(getUrlParam('r'));
const content = decodeURI(getUrlParam('c'));
const validation = decodeURI(getUrlParam('v'));
const reverse = decodeURI(getUrlParam('w'));

if (reverse === 'write') {
  console.log('Write mode: ');
  console.log(recipient);
  console.log(content);
  let url = 'https://www.see-also.com';
  const r = scramble(recipient, true);
  const c = scramble(content, true);
  const v = hashCode(r + c);
  console.log('Validation check: ');
  console.log(validateUrl(r, c, v));
  console.log('Link: ');
  console.log(url + '/xmas2021/?r=' + r + '&c=' + c + '&v=' + v);
}

if (recipient !== undefined && content !== undefined && validation !== undefined) {
  if (validateUrl(recipient, content, validation)) {
    console.log('Url is valid');
    document.documentElement.classList.add('custom');
    document.querySelector('#name').innerHTML = scramble(recipient);
    document.querySelector('#content').innerHTML = scramble(content);
  } else {
    console.log('Url is invalid');
    document.querySelector('#message').classList.add('active');
  }
} else {
  document.querySelector('#message').classList.add('active');
}

function scramble(str, create = false) {
  const chars = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', ' ', '.', ',', '!', '<', '>'];
  const charsScrambled = ['e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '1', '2', '3', '4', '5', '6', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E'];

  let result = [];

  for (let i = 0; i < str.length; i++) {
    for (let x = 0; x < chars.length; x++) {
      if (str[i] === (create ? chars : charsScrambled)[x]) {
        result.push((!create ? chars : charsScrambled)[x]);
      }
    }
  }
  
  return result.join('');
}

function getUrlVars() {
  let vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue = false){
  let urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
}

function validateUrl(r, c, validation) {
  const valid = hashCode(r + c);

  if (valid == validation) {
    return true;
  } else {
    return false;
  }
}


/**
 * Snow
 */

var canvas, ctx, height, width, flakes, flakeCount, flakeSize;

function drawFrame() {
  for (var i = 0; i < flakes.length; i++) {
    var flake = flakes[i];
    flake.y += flake.speed;
    if (flake.y > height) {
      flake.y = -50;
      flake.style.left = Math.floor(Math.random() * 100) + '%';
      if (flake.classList.contains('angel')) {
        flake.classList.remove('angel');
        flake.classList.remove('angel--alt');
      } else {
        if (Math.floor(Math.random() * 100 + 1) >= 96) {
          flake.classList.add('angel');

          if (Math.floor(Math.random() * 100 + 1 > 50)) {
            flake.classList.add('angel--alt');
          }
        }
      }
    }
    flake.style.top = flake.y + 'px';
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  drawFrame();
}

var width, height, types, snowContainer, flakes;

function initSnow() {
  height = document.body.offsetHeight,
  width = document.body.offsetWidth, 
  flakes = [], 
  flakeCount = 12,
  flakeSize = 24;
  snowContainer = document.querySelector('.snow');

  for (var i = 0; i < flakeCount; i++) {
    var x = Math.floor(Math.random() * 100);
    var y = -50;
    var size = Math.floor(Math.random() * 5);
    var flake = document.createElement('span');
    flake.classList.add('snow__flake');
    flake.style.left = Math.floor(Math.random() * 100) + '%';
    flake.style.top = y + 'px';
    flake.style.animationDuration = ((Math.random() * 15) + 5) + 's';
    flake.x = x;
    flake.y = y;
    flake.speed = (Math.random() + 0.15);
    flake.style.fontSize = flake.speed * 1.8 + 1 + 'em';
    snowContainer.appendChild(flake);
    flakes.push(flake);
  }

  animate();
}

initSnow();

/**
 * Buttons
 */

document.querySelector('#name').addEventListener('click', function(e) {
  document.querySelector('#message').classList.add('active');
});

/**
 * Snow button
 */
document.querySelector('#snow-button').addEventListener('click', function() {
  var audio = document.querySelector('#audio');

  if(audio.muted) {
    audio.muted = false;
    audio.volume = 0;
  }

  if(audio.paused) {
    audio.play();
  }

  if(this.classList.contains('mute__muted')) {
    adjustVolume(audio, 0.4);
    this.classList.remove('mute__muted');
  } else {
    adjustVolume(audio, 0);
    this.classList.add('mute__muted');
  }
});

// adjustVolume, credit - jedmao, https://stackoverflow.com/a/13149848
async function adjustVolume(
  element,
  newVolume,
  {
      duration = 750,
      easing = swing,
      interval = 13,
  } = {},
) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;
  if(!delta || !duration || !easing || !interval) {
      element.volume = newVolume;
      return Promise.resolve();
  }
  const ticks = Math.floor(duration / interval);
  let tick = 1;
  return new Promise((resolve) => {
      const timer = setInterval(() => {
          element.volume = originalVolume + (
              easing(tick / ticks) * delta
          );
          if(++tick === ticks) {
              clearInterval(timer);
              resolve();
          }
      }, interval);
  });
}

function swing(p) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}



/**
 * Marquees
 */

class Marquee {
  constructor(el) {
    this.el = el;
    this.wrapper = this.el.querySelector('.marquee__wrapper');
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  init() {
    const width = this.el.offsetWidth;
    const wrapperWidth = this.wrapper.offsetWidth;
    const ratio = wrapperWidth / width;
    const amount = Math.ceil(width / wrapperWidth);
    
    for (let i = 0; i < amount; i++) {
      var clone = this.wrapper.cloneNode(true);
      clone.classList.add('marquee__wrapper--clone');
      this.el.appendChild(clone);
    }

    this.el.querySelectorAll('.marquee__wrapper').forEach(function(marquee) {
      marquee.animate(
        [
          { transform: 'translate3d(0,0,0)' },
          { transform: 'translate3d(-100%,0,0)' }
        ], {
          duration: 40000 * ratio,
          iterations: Infinity,
        },
      );
    });
  }

  resize() {
    this.el.querySelectorAll('.marquee__wrapper--clone').forEach(function(clone) {
      clone.remove();
    });
    this.init();
  }
}

/**
 * Trees
 */
 class Forest {
  constructor(el) {
    this.el = el;
    this.tree = this.el.querySelector('.background__tree');
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  init() {
    const width = this.el.offsetWidth;
    const treeWidth = this.tree.offsetWidth;
    const ratio = treeWidth / width;
    const amount = Math.floor((width + treeWidth * 0.6) / treeWidth);
    // 100 / 33 = 3.33 = 3
    
    for (let i = 0; i < amount - 1; i++) {
      var clone = this.tree.cloneNode(true);
      clone.classList.add('background__tree--clone');
      clone.style.setProperty('--animation-offset', Math.random() * -1.5 + 's');
      this.el.appendChild(clone);
    }
  }

  resize() {
    this.el.querySelectorAll('.background__tree--clone').forEach(function(clone) {
      clone.remove();
    });
    this.init();
  }
}

window.addEventListener('load', function() {
  document.querySelectorAll('.background').forEach(function(el) {
    new Forest(el);
  });

  document.querySelectorAll('.marquee').forEach(function(el) {
    new Marquee(el);
  });
});

/**
 * String hash function
 */
function hashCode(text) {
  var hash = 0, i, chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
