var canvas=document.querySelector('canvas')
var c=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var mouse={
    x:undefined,
    y:undefined
}

var colours=[
    '#8F797E',
    '#FFC2B5',
    '#FFE3CC',
    '#646C8F',
    '#DCC3A1'
]

var gravity=1;
var friction=0.95;

window.addEventListener('mousemove', function(event){
    mouse.x=event.x,
    mouse.y=event.y
});

window.addEventListener('resize', function(event){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    init();
});

window.addEventListener('click', function(event){
    init();
});

function randomColour(){
    return colours[Math.floor(Math.random()*colours.length)];
}

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Ball(x, y, dx, dy, radius, colour){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.colour=colour;

    this.draw=function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle=this.colour;
        c.fill();
        // c.closePath();
    }

    this.update=function(){
        if(this.y+this.radius+this.dy > canvas.height){
            this.dy=-this.dy * friction;
        }
        else{
            this.dy+=gravity;
        }

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx=-this.dx;
        }
        this.y+=this.dy;
        this.x+=this.dx;

        this.draw();
    }

}

var ballArray=[];

function init(){
    ballArray=[];
    for(var i=0;i<400;i++){
        var radius=randomIntFromRange(8, 30);
        var x = Math.random()*(canvas.width - 2*radius) + radius;
        var y = Math.random()*(canvas.height - 2*radius) + radius;
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var colour=randomColour();
        ballArray.push(new Ball(x, y, dx, dy, radius, colour));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // ball.update();
    for(var i=0;i<ballArray.length;i++){
        ballArray[i].update();
    }
}

init();
animate();