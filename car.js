class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
        
        this.image = new Image();
        this.image.src = "Ambulance.png";
    }

    update(){
        this.#move();
    }

    #move(){
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        // Update the car's position (before boundary check)
        const newX = this.x - Math.sin(this.angle) * this.speed;
        const newY = this.y - Math.cos(this.angle) * this.speed;

        // Calculate left and right boundaries considering the car width
        const leftLaneBoundary = road.left + this.width / 2;
        const rightLaneBoundary = road.right - this.width / 2;

        // Ensure the car's body stays within the lane boundaries
        if (newX - this.width / 2 >= leftLaneBoundary && newX + this.width / 2 <= rightLaneBoundary) {
            this.x = newX;
        }

        // Ensure the car stays within vertical bounds of the road
        if (newY > road.top && newY < road.bottom) {
            this.y = newY;
        }
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
    
        const scaleFactor = 2.5; // Adjust this value to make it bigger
        const newWidth = this.width * scaleFactor;
        const newHeight = this.height * scaleFactor;
    
        ctx.drawImage(this.image, -newWidth / 2, -newHeight /2, newWidth, newHeight);
        
        ctx.restore();
    }
}
