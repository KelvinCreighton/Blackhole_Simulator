class Satellite {
    constructor(x, y, mass, vx=0, vy=0, nonMoveable=false, img=null, size=10, title='') {
        this.x           = x;
        this.y           = y;
        this.mass        = mass;
        this.size        = size;
        this.vx          = vx;
        this.vy          = vy;
        this.nonMoveable = nonMoveable;
        this.img = img;
        this.title = title;
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
        if (this.img) {
            // If an image is set, draw the image
            Canvas.drawImage(this.img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        } else {
            // Otherwise, draw the ellipse
            ellipse(this.x, this.y, this.size*2, this.size*2);
            strokeWeight(3);
            stroke("#ffffff");
        }
        // ellipse(this.x, this.y, this.size*2, this.size*2);
        // strokeWeight(3);
        // stroke("#ffffff");
    }
    isClicked(mouseX, mouseY) {
        let distance = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
        let clicked = distance < this.size;
        console.log(`Distance: ${distance}, Size: ${this.size}, Clicked: ${clicked}`);
        return clicked;
    }

    printInfo() {
        console.log("Satellite:\n    x = "+this.x+"\n    y = "+this.y+"\n    Mass = "+this.mass+"\n    vx = "+this.vx+"\n    vy = "+this.vy);
    }
}

function createImageSatellite() {
    if (images.length === 0) {
        console.log("No images loaded");
        return;
    }

    let randomImageDetail = images[Math.floor(Math.random() * images.length)];
    let newSatellite = new Satellite(mouseX, mouseY, 100, 0, 0, true, randomImageDetail.img, 50, randomImageDetail.title);
    satellites.push(newSatellite);
    adjustSatelliteVelocity(newSatellite);

    selectedSatelliteTitle = newSatellite.title;

}

// function createSatellite() {
//     if (mousePressed && !creatingSatellite) {
//         createImageSatellite(); // Create an image satellite instead
//         creatingSatellite = true;
//     } else if (!mousePressed && creatingSatellite) {
//         creatingSatellite = false;
//     }
// }


function createSatellite() {
    if (mousePress && !creatingSatellite) {
        createImageSatellite();
        // let newSatellite = new Satellite(mouseX, mouseY, 100, 0, 0, true, 50);
        // satellites.push(newSatellite);
        // adjustSatelliteVelocity(newSatellite);
        creatingSatellite = true;
    } else if (!mousePress && creatingSatellite) {
        let lastSatellite = satellites[satellites.length-1];
        lastSatellite.nonMoveable = false;
        creatingSatellite = false;
    }
}

function adjustSatelliteVelocity(satellite) {
    const velocityScaler = 1/50;
    satellite.vx = (satellite.x - mouseX) * velocityScaler;
    satellite.vy = (satellite.y - mouseY) * velocityScaler;
}
// Set an interval to toggle the period state
setInterval(toggleBlinkingPeriod, 500); // Adjust the interval as needed


// function createSatellite() {
//     const velocityScaler = 1/50;

//     if (mousePress && !creatingSatellite) {
//         //print("create");
//         satellites.push(new Satellite(mouseX, mouseY, random(50, 100), 0, 0, true));
//         creatingSatellite = true;
//     } else if (mousePress && creatingSatellite) {
//         //print("adjusting velocity");
//         satellites[satellites.length-1].vx = (satellites[satellites.length-1].x-mouseX) * velocityScaler;
//         satellites[satellites.length-1].vy = (satellites[satellites.length-1].y-mouseY) * velocityScaler;

//         // Small velocity adjusting visualizing
//         let x = satellites[satellites.length-1].x
//         let y = satellites[satellites.length-1].y;
//         let u = 2*x - mouseX;
//         let v = 2*y - mouseY;
//         line(x, y, u, v);
//         strokeWeight(4);
//         stroke("#ffffff");

//     } else if (!mousePress && creatingSatellite) {
//         //print("created");
//         satellites[satellites.length-1].nonMoveable = false;
//         creatingSatellite = false;
//     }
// }
