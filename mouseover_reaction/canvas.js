var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');


var maxRadius=40;
// var colourArray=[
//     'red',
//     'green',
//     'blue',
//     'yellow',
//     'orange',
//     'purple'
// ]
var colourArray=[
    '#8F797E',
    '#FFC2B5',
    '#FFE3CC',
    '#646C8F',
    '#DCC3A1'
]

var mouse={
    x:undefined,
    y:undefined
}

window.addEventListener('resize', function(event){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    
    init(); 
})

window.addEventListener('mousemove', function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})

function circle(x, y, dx, dy, radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.colour=colourArray[Math.floor(Math.random()*colourArray.length)];
    
    this.draw=function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle='blue';
        c.fillStyle=this.colour;
        c.fill();

    }

    this.update=function(){
        if(this.x + this.radius>innerWidth || this.x - this.radius<0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius>innerHeight || this.y - this.radius<0){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        
        if(mouse.x-this.x < 50 && this.x-mouse.x < 50 
            && mouse.y-this.y < 50 && this.y-mouse.y < 50){
                if(this.radius < maxRadius){
                    this.radius+=1;
                }
        }else if(this.radius > this.minRadius){
            this.radius-=1;
        }

        this.draw();
    }
}

var circleArray=[];

function init(){
    circleArray=[];
    
    for(var i=0;i<800;i++){
        var x=Math.random() * (innerWidth - 2 * radius) + radius;
        var y=Math.random() * (innerHeight - 2 * radius) + radius;
        var dx=(Math.random() - 0.5);
        var dy=(Math.random() - 0.5);
        var radius=Math.random() * 4 + 1;
        circleArray.push(new circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0;i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();