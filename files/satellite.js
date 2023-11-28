class Satellite {
    constructor(x, y, mass, vx=0, vy=0, nonMoveable=false) {
        this.x           = x;
        this.y           = y;
        this.mass        = mass;
        this.size        = 10;
        this.vx          = vx;
        this.vy          = vy;
        this.nonMoveable = nonMoveable;
    }

    attract() {
        let dist = Math.sqrt( Math.pow(this.x-blackhole.x, 2) + Math.pow(this.y-blackhole.y, 2) );
        let grav = blackhole.calculateGravitationalForce(this.mass, dist);
        this.vx += grav * ( (blackhole.x-this.x) / (dist*dist) );
        this.vy += grav * ( (blackhole.y-this.y) / (dist*dist) );

        // Return true when the satellite collides with the blackhole
        if (dist <= this.size+blackhole.size)   return true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    display() {
        ellipse(this.x, this.y, this.size*2, this.size*2);
        strokeWeight(3);
        stroke("#ffffff");
    }

    printInfo() {
        console.log("Satellite:\n    x = "+this.x+"\n    y = "+this.y+"\n    Mass = "+this.mass+"\n    vx = "+this.vx+"\n    vy = "+this.vy);
    }
}


function createSatellite() {
    const velocityScaler = 1/50;

    if (mousePress && !creatingSatellite) {
        //print("create");
        satellites.push(new Satellite(mouseX, mouseY, random(50, 100), 0, 0, true));
        creatingSatellite = true;
    } else if (mousePress && creatingSatellite) {
        //print("adjusting velocity");
        satellites[satellites.length-1].vx = (satellites[satellites.length-1].x-mouseX) * velocityScaler;
        satellites[satellites.length-1].vy = (satellites[satellites.length-1].y-mouseY) * velocityScaler;

        // Small velocity adjusting visualizing
        let x = satellites[satellites.length-1].x
        let y = satellites[satellites.length-1].y;
        let u = 2*x - mouseX;
        let v = 2*y - mouseY;
        line(x, y, u, v);
        strokeWeight(4);
        stroke("#ffffff");

    } else if (!mousePress && creatingSatellite) {
        //print("created");
        satellites[satellites.length-1].nonMoveable = false;
        creatingSatellite = false;
    }
}
