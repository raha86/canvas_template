import * as dat from 'dat.gui'

const canvas=document.querySelector('canvas')
var c=canvas.getContext('2d')
const gui=new dat.GUI()

canvas.width=window.innerWidth
canvas.height=window.innerHeight

const wave={
    y:canvas.height/2,
    waveLength:.01,
    amplitude:100,
    frequency:0.01,
}

// gui.add(wave, 'y', 0, canvas.height)
// gui.add(wave, 'waveLength', -0.01, 0.01)
// gui.add(wave, 'amplitude', -300, 300)

const waveProperty=gui.addFolder('wave')
waveProperty.add(wave, 'y', 0, canvas.height)
waveProperty.add(wave, 'waveLength', -0.01, 0.01)
waveProperty.add(wave, 'amplitude', -300, 300)
waveProperty.add(wave, 'frequency', 0.01, 1)
waveProperty.open();

const wavecolour={
    h:200,
    s:100,
    l:50
}

const waveColor=gui.addFolder('wave color')
waveColor.add(wavecolour, 'h', 0, 360)
waveColor.add(wavecolour, 's', 0, 100)
waveColor.add(wavecolour, 'l', 0, 100)
waveColor.open();

const backcolour={
    r:100,
    g:100,
    b:100
}

const backColor=gui.addFolder('background color')
backColor.add(backcolour, 'r', 0, 255)
backColor.add(backcolour, 'g', 0, 255)
backColor.add(backcolour, 'b', 0, 255)
backColor.open();

var increment=wave.waveLength;

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle=`rgba(${backcolour.r}, ${backcolour.g}, ${backcolour.b},.05)`;
    // c.fillStyle='rgba(255, 255, 255, .05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.beginPath();
    c.moveTo(0, wave.y);
    for(var i=0;i<canvas.width;i++){
        c.lineTo(i, wave.y + Math.sin(i * wave.waveLength + increment) * wave.amplitude * Math.sin(increment));
    }
    
    // c.strokeStyle='rgba(200, 200, 255, 100)'
    c.strokeStyle=`rgba(${wavecolour.h * Math.sin(increment)}, ${wavecolour.s}, ${wavecolour.l}, 100)`;
    c.stroke();
    increment += wave.frequency;
}

animate();
