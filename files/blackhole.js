class Blackhole {
    constructor(x, y, mass) {
        this.x    = x;
        this.y    = y;
        this.mass = mass;
        this.size = 50;
        
        // Accretion Disk (AD)
        this.ADSize = 0;
        this.ADMaxSize = 10;
        this.jetActivate = false;
        this.jetMassFlow = 0.05;
    }

    jetUpdate() {
        // Activate the jet when the accretion disk gets too large
        if (this.ADSize >= this.ADMaxSize)
            this.jetActivate = true;
        // Decrease the accretion disk when the jet is activated
        if (this.jetActivate && this.ADSize > 0)
            this.ADSize -= this.jetMassFlow;
        // Deactivate the jet when the accretion disk reaches 0 again
        if (this.jetActivate && this.ADSize <= 0) {
            this.jetActivate = false;
            this.ADSize = 0;
        }
    }

    // Calculate gravitational force between this black hole and another satellite
    calculateGravitationalForce(objectMass, distance) {
        return (G * this.mass * objectMass) / (distance*distance);
    }

    growAD(mass) {
        let growPercent = 0.01
        this.ADSize += mass * growPercent;
    }

    display() {
        // Simple repeating ellipse as the accretion disk grows
        let ringGrowSize = 4
        strokeWeight(ringGrowSize/2.0);
        for (let i = 0; i < this.ADSize; i++) {
            ellipse(this.x, this.y, this.size*2 + i*ringGrowSize, this.size*2 + i*ringGrowSize);
            stroke("#aaaaff");
        }

        strokeWeight(4);
        // Display Jet
        if (this.jetActivate) {
            // Up
            for (let i = 0; i < floor(random(4,8)); i++) {
                line(this.x, this.y, this.x + random(-this.size, this.size), this.y + random(this.size*2, this.size*6));
                stroke("#ffaaaa");
            }
            // Down
            for (let i = 0; i < floor(random(4,8)); i++) {
                line(this.x, this.y, this.x + random(-this.size, this.size), this.y - random(this.size*2, this.size*6));
                stroke("#ffaaaa");
            }
        }
        
        
        // Display Blackhole
        // ellipse(this.x, this.y, this.size*2, this.size*2);
        // strokeWeight(3);
        // stroke("#ffffff");        
    }

    printInfo() {
        console.log("Black Hole:\n    x = "+this.x+"\n    y = "+this.y+"\n    Mass = "+this.mass);
    }
}
