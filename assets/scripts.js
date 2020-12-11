var layer1 = [
  '                               <br>                               <br>                               <br>                               <br>        /\\                     <br>       (|/                     <br>    ,-\' | \'-.                  <br>    |"-___-"|                  <br>    |       |                  <br>    |       |                  <br>    \'-.___,-\'                  <br>                               <br>',
  '                               <br>                               <br>                               <br>                               <br>       /\\                      <br>       \\|)                     <br>    ,-\' | \'-.                  <br>    |"-___-"|                  <br>    |       |                  <br>    |       |                  <br>    \'-.___,-\'                  <br>                               <br>',
];
var layer2 = [
'                               <br>               /\\              <br>              (|/              <br>           ,-\' | \'-.           <br>           |"-___-"|           <br>           |                   <br>                               <br>                               <br>             .___,             <br>                               <br>                               <br>                               <br>',
'                               <br>              /\\               <br>              \\|)              <br>           ,-\' | \'-.           <br>           |"-___-"|           <br>           |                   <br>                               <br>                               <br>             .___,             <br>                               <br>                               <br>                               <br>',
];
var layer3 = [
'                               <br>                               <br>                               <br>                      /\\       <br>                     (|/       <br>                  ,-\' | \'-.    <br>                  |"-___-"|    <br>                  |       |    <br>                  |       |    <br>                  \'-.___,-\'    <br>                               <br>                               <br>',
'                               <br>                               <br>                               <br>                     /\\        <br>                     \\|)       <br>                  ,-\' | \'-.    <br>                  |"-___-"|    <br>                  |       |    <br>                  |       |    <br>                  \'-.___,-\'    <br>                               <br>                               <br>',
];

var layer4 = [
'          *     <br>*               <br>               *<br>  *             <br>                <br>',
'  *        *    <br>                <br>             *  <br>                <br>*               <br>',
];


document.querySelector('#layer-1').innerHTML = layer1[0];
document.querySelector('#layer-2').innerHTML = layer2[0];
document.querySelector('#layer-3').innerHTML = layer3[0];
document.querySelector('#layer-4').innerHTML = layer4[0];

var canvasEl = document.querySelector('#canvas');

var flickering = false;

setInterval(function() { 
  
if(!flickering) {
  if(randomInt(1, 3) >= 2) {
    flicker();
  }
}

}, 1000);

var starsFrame = 0;
setInterval(function() { 
starsFrame = starsFrame ? 0 : 1;
document.querySelector('#layer-4').innerHTML = layer4[starsFrame];
}, 2200);

function flicker() {
flickering = true;
canvasEl.classList.add('flickering');
var flickerCount = 0;
var flickerLength = randomInt(1, 3);
var flickerLengthLower = 0; 
var flickerLengthUpper = 0;

if(flickerLength == 1) {
  flickerLengthLower = 200;
  flickerLengthUpper = 500;
} else if(flickerLength == 2) {
  flickerLengthLower = 500;
  flickerLengthUpper = 750;
} else {
  flickerLengthLower = 1000;
  flickerLengthUpper = 1250;
}

//layer 1
setTimeout(function() {
  document.querySelector('#layer-1').innerHTML = layer1[1];
  
  setTimeout(function() {
    document.querySelector('#layer-1').innerHTML = layer1[0];
    
    flickerCount++;
    if(flickerCount >= 3) {
      flickering = false;
      canvasEl.classList.remove('flickering');
    }
  }, randomInt(flickerLengthLower, flickerLengthUpper));
  
}, randomInt(0, flickerLengthLower));

//layer 2
setTimeout(function() {
  document.querySelector('#layer-2').innerHTML = layer2[1];
  
  setTimeout(function() {
    document.querySelector('#layer-2').innerHTML = layer2[0];
    
    flickerCount++;
    if(flickerCount >= 3) {
      flickering = false;
      canvasEl.classList.remove('flickering');
    }
  }, randomInt(flickerLengthLower, flickerLengthUpper));
  
}, randomInt(0, flickerLengthLower));

//layer 3
setTimeout(function() {
  document.querySelector('#layer-3').innerHTML = layer3[1];
  
  setTimeout(function() {
    document.querySelector('#layer-3').innerHTML = layer3[0];
    
    flickerCount++;
    if(flickerCount >= 3) {
      flickering = false;
      canvasEl.classList.remove('flickering');
    }
  }, randomInt(flickerLengthLower, flickerLengthUpper));
  
}, randomInt(0, flickerLengthLower));
}

function randomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

document.querySelector('#about').addEventListener('click', function() {
var aboutModal = document.querySelector('#about-modal');

if( aboutModal.classList.contains('about-modal__visible') ) {
  aboutModal.classList.remove('about-modal__visible');
} else {
  aboutModal.classList.add('about-modal__visible');
}
});
