console.log('main.js');

// http://localhost:8080/?r=rFRJbwZWSFRJ&c=lNbrFRJcdGWEbxMNXbNXbYMJbRFNSbGTIAbHTSYJSYbTKbYMJbRJXXFLJCbmYbHFSbGJbMT3J1JWbQTSLb3Jb3FSYcbFQYMTZLMbYMFYbITJXbRJFSbFbQTSLJWbZWQb1FWNFGQJbUFWFRJYJWCCCdGWEfWJFPbYFLXbHFSbGJbZXJIbKTWbQNSJGWJFPXCdGWEqJWWAbgMWNXYRFXbKWTRbwJJbeQXT&v=2688
console.log(scramble('Name Surname', true));
console.log(scramble('Hi Name,<br> This is the main body content of the message. It can be however long we want, although that does mean a longer url variable parameter...<br>Break tags can be used for linebreaks.<br>Merry Christmas from See Also', true));
//

const recipient = getUrlParam('r');
const content = getUrlParam('c');
const validation = getUrlParam('v');

if (recipient !== undefined && content !== undefined && validation !== undefined) {
  if (validateUrl(recipient.length, content.length, validation)) {
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

function validateUrl(recipientLength, contentLength, validation) {
  const valid = recipient.length * content.length;

  if (valid == validation) {
    return true;
  } else {
    console.log('Should equal ' + valid);
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
    flake.innerText = '*';
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
    console.log(ratio);
    const amount = Math.ceil(width / wrapperWidth);
    
    for (let i = 0; i < amount; i++) {
      console.log(amount);
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
          duration: 20000 * ratio,
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

document.querySelectorAll('.marquee').forEach(function(el) {
  new Marquee(el);
});

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
    const amount = Math.ceil(width / treeWidth);
    
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

document.querySelectorAll('.background').forEach(function(el) {
  new Forest(el);
});
