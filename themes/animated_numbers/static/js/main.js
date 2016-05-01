var $layer_two = $("#layer_two");
var startValueY = 110;
var minValue = 110;
var maxValue = 120;
var scale = 0.5;

$(document).ready(function(){
   console.log( "ready!" );
   return false;
});

document.addEventListener("mousewheel", MouseWheelHandler(), false);

function MouseWheelHandler() {
    return function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //scrolling down?
        if (delta < 0) {
            console.log("Down " + delta);
            startValueY += delta * scale;
            if(startValueY < minValue){
              startValueY = minValue;
            }
            $layer_two[0].style.marginTop = "-" + startValueY + "vh";
          //  console.log($layer_two[0].style.marginTop);
        }

        //scrolling up?
        else {
             console.log("Up " + delta);
             startValueY += delta * scale;
             if(startValueY > maxValue){
               startValueY = maxValue;
             }
             $layer_two[0].style.marginTop = "-" + startValueY + "vh";
        }
        return false;
    }
}
