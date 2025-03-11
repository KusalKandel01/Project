class Microphone{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.radius=0;
    }

    receive(soundWaves){
        for (const soundWave of soundWaves) {
            if (dist(soundWave, this) <= soundWave.radius) {
                soundWave.play();
            }
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🎙️",this.x,this.y);
        ctx.stroke();
    }
}