var deltaY;
var deltaX;
var relativeY;
var windowHeight;
var windowWidth;
var orientationDevice = 0;

//Debug
var debugDevice = document.getElementById('debug_device');

var heroOne = document.getElementById('hero1');
var heroTwo = document.getElementById('hero2');

var ticking = false,
    bgElmOne = document.getElementById('layer_one'),
    bgElm = document.getElementById('layer_two'),
    headerText = document.getElementById('starter_text');

// Y
var translateValueY = -4;
var maxTranslateY = -20;
var minTranslateY = -4;

// X
var translateValueX = 0;
var maxTranslateX = 10;
var minTranslateX = -10;

$(document).ready(function(){
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  // document.onmousemove = requestTickMouse();
  // If no tablet or smartphone
  if(window.orientation == undefined){
    heroOne.onmousemove = requestMouseHeroOne();
    heroTwo.onmousemove = requestMouseHeroTwo();
  }
  else {
    orientationDevice = window.orientation;
    window.ondeviceorientation = requestDeviceHeroOne();
    //window.ondeviceorientation = requestDeviceHeroTwo();
    //window.addEventListener("ondeviceorientation", requestDeviceHeroOne(), false);
    //window.addEventListener("ondeviceorientation", requestDeviceHeroTwo(), false);
    window.addEventListener("orientationchange", function(){
      orientationDevice = window.orientation;
    }, false);
  }

  // Gyroscope
  if (window.DeviceMotionEvent==undefined) {
    alert('Device Motion Not Working!!!');
  } else {
    window.ondevicemotion = function(event) {
      ax = event.accelerationIncludingGravity.x
      ay = event.accelerationIncludingGravity.y
      az = event.accelerationIncludingGravity.z
      rotation = event.rotationRate;
      if (rotation != null) {
        arAlpha = Math.round(rotation.alpha);
        arBeta = Math.round(rotation.beta);
        arGamma = Math.round(rotation.gamma);
      }
    }
  }

  // First Translate
  // hero1
  translateY3d(bgElm, translateValueX, translateValueY);
  translateY3d(headerText, translateValueX * 0.5, (translateValueY * 0.5) - 80);
  // hero2
  translateY3d(bgElm_h2, translateValueX_h2, translateValueY_h2);
  translateY3d(headerText_h2, translateValueX_h2 * 0.5, (translateValueY_h2 * 0.5) - 80);

  return false;
});

$(document).resize(function(){
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  return false;
});

// Hero1
var requestMouseHeroOne = function() {
  return function (e) {
    if (!ticking) {
      ticking = true;
      /*  alpha = Math.round(event.alpha);
          beta = Math.round(event.beta);
          gamma = Math.round(event.gamma); */
      deltaY = e.clientY / windowHeight;
      deltaX = e.clientX / windowWidth;
      window.requestAnimationFrame(checkMousePos);
    }
    return false;
  }
};

function Clamp(value, min, max){
  if(value < min){
    value = min;
  }
  else if(value > max){
    value = max;
  }
  return value;
}

var requestDeviceHeroOne = function() {
  return function (e) {
    if (!ticking) {
      ticking = true;
      // cross-browser wheel delta
      if(orientationDevice === 0){
        deltaY = Math.round(event.beta);
        deltaX = Math.round(event.gamma);
      }
      else if(orientationDevice === 90){
        deltaY = -Math.round(event.gamma);
        deltaX = Math.round(event.beta);
      } else {
        deltaY = Math.round(event.gamma);
        deltaX = -Math.round(event.beta);
      }
      deltaY = Clamp(deltaY, -20, 20);
      deltaY = (deltaY+20) /40;
      /*if(deltaX >= 180){
        deltaX -= 360;
      } */
      deltaX = Clamp(deltaX, -20, 20);
      deltaX = (deltaX+20) /40;
      //debugDevice.innerHTML = deltaY + ", " + deltaX;
      window.requestAnimationFrame(checkMousePos);
    }
    return false;
  }
};

function checkMousePos(){
  translateValueY = -((deltaY) * (minTranslateY - maxTranslateY)) + minTranslateY;
  translateValueX = ((1 - deltaX) * (maxTranslateX - minTranslateX)) + minTranslateX;

  // We don't want parallax to happen if scrollpos is below 0

  translateY3d(bgElm, translateValueX, translateValueY);

  translateY3d(headerText, translateValueX * 0.5, (translateValueY * 0.5) - 80);

  // Blur Smooth
  // bgElmOne.style['-webkit-filter'] = 'blur(' + Math.floor((4 - (translateValue - minTranslate)/4)) + 'px)';
  bgElmOne.style['-webkit-filter'] = 'blur(' + (4 - (translateValueY - maxTranslateY)/4) + 'px)';

  // Stop ticking
  ticking = false;
  return false;
}

// Translates an element on the Y axis using translate3d
// to ensure that the rendering is done by the GPU
var translateY3d = function(elm, valueX, valueY) {
  var translate = 'translate3d(' + valueX + 'px,' + valueY + 'px, 0px)';
  elm.style['-webkit-transform'] = translate;
  elm.style['-moz-transform'] = translate;
  elm.style['-ms-transform'] = translate;
  elm.style['-o-transform'] = translate;
  elm.style.transform = translate;
};

// Hero2
var deltaY_h2;
var deltaX_h2;
var relativeY;

var ticking_h2 = false,
    bgElmOne_h2 = document.getElementById('h2_layer_one'),
    bgElm_h2 = document.getElementById('h2_layer_two'),
    headerText_h2 = document.getElementById('h2_starter_text');

// Y
var translateValueY_h2 = -4;
var maxTranslateY_h2 = -20;
var minTranslateY_h2 = -4;

// X
var translateValueX_h2 = 0;
var maxTranslateX_h2 = 10;
var minTranslateX_h2 = -10;

var requestMouseHeroTwo = function() {
  return function (e) {
    if (!ticking_h2) {
      ticking_h2 = true;
      // cross-browser wheel delta
      deltaY_h2 = e.clientY / windowHeight;
      deltaX_h2 = e.clientX / windowWidth;
      window.requestAnimationFrame(checkMousePosHeroTwo);
    }
    return false;
  }
};

var requestDeviceHeroTwo = function() {
  return function (e) {
    if (!ticking_h2) {
      ticking_h2 = true;
      if(orientationDevice === 0){
        deltaY_h2 = Math.round(event.beta);
        deltaX_h2 = Math.round(event.gamma);
      }
      else if(orientationDevice === 90){
        deltaY_h2 = -Math.round(event.gamma);
        deltaX_h2 = Math.round(event.beta);
      } else {
        deltaY_h2 = Math.round(event.gamma);
        deltaX_h2 = -Math.round(event.beta);
      }
      deltaY_h2 = Clamp(deltaY_h2, -20, 20);
      deltaY_h2 = (deltaY_h2+20) /40;
      /*if(deltaX >= 180){
        deltaX -= 360;
      } */
      deltaX_h2 = Clamp(deltaX_h2, -20, 20);
      deltaX_h2 = (deltaX_h2+20) /40;
      //debugDevice.innerHTML = deltaY + ", " + deltaX;
      window.requestAnimationFrame(checkMousePosHeroTwo);
    }
    return false;
  }
};

function checkMousePosHeroTwo(){
  translateValueY_h2 = -((deltaY_h2) * (minTranslateY_h2 - maxTranslateY_h2)) + minTranslateY_h2;
  translateValueX_h2 = ((1 - deltaX_h2) * (maxTranslateX_h2 - minTranslateX_h2)) + minTranslateX_h2;

  // We don't want parallax to happen if scrollpos is below 0

  translateY3d(bgElm_h2, translateValueX_h2, translateValueY_h2);

  translateY3d(headerText_h2, translateValueX_h2 * 0.5, (translateValueY_h2 * 0.5) - 80);

  // Blur Smooth
  // bgElmOne.style['-webkit-filter'] = 'blur(' + Math.floor((4 - (translateValue - minTranslate)/4)) + 'px)';
  bgElmOne_h2.style['-webkit-filter'] = 'blur(' + (4 - (translateValueY_h2 - maxTranslateY_h2)/4) + 'px)';

  // Stop ticking
  ticking_h2 = false;
  return false;
}
