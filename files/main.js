
const G = 5;    // Gravitational Constant

let blackhole = new Blackhole(Width/2, Height/2, 2000);
let satellites = [];
let creatingSatellite = false;

function Main() {
    //satellites.push(new Satellite(100, 100, random(50, 200), 1, 2));
    setInterval(Update, 20);    // 50fps
}

function Update() {
    background("#000000");

    createSatellite();
    
    blackhole.jetUpdate();
    blackhole.display();
    //blackhole.printInfo();

    for (let i = 0; i < satellites.length; i++) {
        // Only display nonMoveable satellites
        if (satellites[i].nonMoveable) {
            satellites[i].display();
            continue;
        }

        let collision = satellites[i].attract();
        if (collision) {
            blackhole.growAD(satellites[i].mass);
            satellites.splice(i, 1);
            continue;
        }
        satellites[i].update();
        satellites[i].display();
        
        //if (i == 0) satellites[i].printInfo();
    }
}

Main();



// Safegaurd because I keep typing 'print' like it's python and get stuck in this dumb webpage printing attempt
function print(m) {console.log(m);}
