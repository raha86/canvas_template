const canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');

var mouse={
    x:0,
    y:0
}

var colours=[
    '#FC8DCA',
    '#C37EDB',
    '#B7A6F6',
    '#88A3E2',
    '#AAECFC'
]

window.addEventListener('mousemove', function(event){
    mouse.x=event.x,
    mouse.y=event.y
});

window.addEventListener('resize', function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max-min + 1) +min);
}

function randomColour(){
    return colours[Math.floor(Math.random()*colours.length)];
}

function Particle(x, y, radius, colour){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.colour=colour;
    this.velocity=0.03;
    this.radians=Math.random() * Math.PI * 2;
    this.distFormCenter=randomIntFromRange(50, 100);
    var lastMouse={
        x:x, y:y
    }


    this.draw=function(lastPoint){
        c.beginPath();
        c.strokeStyle=this.colour;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
    }

    this.update=function(){
        const lastPoint={
            x:this.x, 
            y:this.y
        }

        this.radians+=this.velocity;

        lastMouse.x += (mouse.x-lastMouse.x) * 0.05;
        lastMouse.y += (mouse.y-lastMouse.y) * 0.05;

        this.x = lastMouse.x + Math.cos(this.radians) * this.distFormCenter;
        this.y = lastMouse.y + Math.sin(this.radians) * this.distFormCenter;

        this.draw(lastPoint);
    }
}

var particles=[];
function init(){
    particles=[];
    for(var i=0;i<80;i++){
        var radius=randomIntFromRange(1, 2);
        var colour=randomColour();
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, colour));
    }
}

function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.fillStyle='rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach(particle => particle.update());
}

init();
animate();