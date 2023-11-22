class Blackhole {
    constructor(x, y, mass) {
        this.x    = x;
        this.y    = y;
        this.mass = mass;
        this.size = 50;
    }

    // Calculate gravitational force between this black hole and another satellite
    calculateGravitationalForce(objectMass, distance) {
        return (G * this.mass * objectMass) / (distance*distance);
    }

    display() {
        ellipse(this.x, this.y, this.size*2, this.size*2);
        strokeWeight(3);
        stroke("#ffffff");
    }

    printInfo() {
        console.log("Black Hole:\n    x = "+this.x+"\n    y = "+this.y+"\n    Mass = "+this.mass);
    }
}
