function w3_open() { 
    if (document.body.clientWidth < 800){
        document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
        document.getElementsByClassName("w3-sidenav")[0].style.width = "100%";
    }
    else{
        document.getElementsByClassName("w3-sidenav")[0].style.display = "block";     
    } 
}


function w3_close() {
    document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
}



// varialbes
var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    draw = false,
    lastX = 0,
    lastY = 0,
    color = "#000",
    lineThickness = 5,
    isAndroid = false;

if( (navigator.userAgent || navigator.vendor || window.opera).match( /Android/i ) ){
    isAndroid = true;
}


function change_color(c){
    color = c;
    if (document.body.clientWidth < 800){
        w3_close();
    }
}


//check size
function my_dimension() {
    "use strict";
    canvas.width = document.getElementById("myCanvas").offsetWidth;
    canvas.height = document.getElementById("myCanvas").offsetHeight;
}
window.onload = my_dimension();
//window.addEventListener('resize', function(event){ myDimension();});

//whole background
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);


// mouse movenment

canvas.addEventListener( 'mousedown', down);
canvas.addEventListener( 'mouseup', up);
canvas.addEventListener( 'mousemove', move);

canvas.addEventListener( 'touchstart', down);
canvas.addEventListener( 'touchend', up);
canvas.addEventListener( 'touchmove', move);
    

function down(e) {
    "use strict";
    //e.preventDefault();
    draw = true;
    ctx.fillStyle = color;
    if(isAndroid){
        lastX = e.targetTouches[0].pageX - this.offsetLeft;
        lastY = e.targetTouches[0].pageY - this.offsetTop;
    }
    else{
        lastX = e.pageX - this.offsetLeft;
        lastY = e.pageY - this.offsetTop;
    }
    
}

function up(e) {
    "use strict";
    draw = false;
}

function move(e) {
    "use strict";
    e.preventDefault();//prevent scroll on mobile 
    if (draw) {
        var nowX = 0,
            nowY = 0;
        if(isAndroid){
            nowX = e.targetTouches[0].pageX - this.offsetLeft;
            nowY = e.targetTouches[0].pageY - this.offsetTop;
        }
        else{
            nowX = e.pageX - this.offsetLeft;
            nowY = e.pageY - this.offsetTop;
        }    

        // find all points between        
        var x1 = nowX,
            x2 = lastX,
            y1 = nowY,
            y2 = lastY;


        var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
        if (steep) {
            var x = x1;
            x1 = y1;
            y1 = x;

            var y = y2;
            y2 = x2;
            x2 = y;
        }
        if (x1 > x2) {
            var x = x1;
            x1 = x2;
            x2 = x;

            var y = y1;
            y1 = y2;
            y2 = y;
        }

        var dx = x2 - x1,
            dy = Math.abs(y2 - y1),
            error = 0,
            de = dy / dx,
            yStep = -1,
            y = y1;

        if (y1 < y2) {
            yStep = 1;
        }

        for (var x = x1; x < x2; x++) {
            if (steep) {
                ctx.fillRect(y, x, lineThickness , lineThickness );
            } else {
                ctx.fillRect(x, y, lineThickness , lineThickness );
            }

            error += de;
            if (error >= 0.5) {
                y += yStep;
                error -= 1.0;
            }
        }



        lastX = nowX;
        lastY = nowY;

    }// end of draw
}

