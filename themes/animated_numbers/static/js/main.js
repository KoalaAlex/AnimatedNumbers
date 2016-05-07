var em;
var delta;
var deltaY;
var deltaX;
var relativeY;
var windowHeight;
var windowWidth;
var scale = 1;

var lastScrollY = 0,
    ticking = false,
    bgElmOne = document.getElementById('layer_one'),
    bgElm = document.getElementById('layer_two'),
    headerText = document.getElementById('starter_text'),
    speedDivider = -20;

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
  document.onmousemove = requestTickMouse();

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
      alert("Numebrs: " + ax + " " + ay + " " + az);
    }

    window.ondeviceorientation = function(event) {
      alpha = Math.round(event.alpha);
      beta = Math.round(event.beta);
      gamma = Math.round(event.gamma);
    }
  }

  // First Translate
  translateY3d(bgElm, translateValueX, translateValueY);

  translateY3d(headerText, translateValueX * 0.5, (translateValueY * 0.5) - 80);

  return false;
});

$(document).resize(function(){
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  return false;
});

/*
var requestTickWheel = function() {
  return function (e) {
    if (!ticking) {
      ticking = true;
      // cross-browser wheel delta
      em = window.event || e;
      delta = Math.max(-1, Math.min(1, (em.wheelDelta || -em.detail)));
      console.log(e.clientY);
      window.requestAnimationFrame(checkScroll);
    }
    return false;
  }
};*/

var requestTickMouse = function() {
  return function (e) {
    if (!ticking) {
      ticking = true;
      // cross-browser wheel delta
      deltaY = e.clientY / windowHeight;
      deltaX = e.clientX / windowWidth;
      window.requestAnimationFrame(checkMousePos);
    }
    return false;
  }
};

//window.addEventListener('wheel', requestTickWheel(), false);

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
