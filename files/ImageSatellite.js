class ImageSatellite extends Satellite {
    constructor(x, y, mass, vx = 0, vy = 0, nonMoveable = false, img) {
        super(x, y, mass, vx, vy, nonMoveable);
        this.img = img;
    }

    display() {
        if (this.img) {
            Canvas.drawImage(this.img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        } else {
            super.display();  // Fall back to the parent class display method
        }
    }
}
