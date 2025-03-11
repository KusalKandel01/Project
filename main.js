const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50);
const microphone=new Microphone(road.getLaneCenter(1),-400);

let neeNaw="nee";
const soundWave = []
setInterval (() => {
   soundWave.push(new SoundWave(car.x , car.y,neeNaw));
   neeNaw=neeNaw=="nee"?"naw":"nee";
}, 1000);

animate();

function animate(){
    car.update();
    for (const soundwave of soundWave) {
        soundwave.update();
    }   
    microphone.receive(soundWave);

    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    microphone.draw(ctx);
    car.draw(ctx);
    for (const soundwave of soundWave) {
        soundwave.draw(ctx);
    }

    ctx.restore();
    requestAnimationFrame(animate);
}