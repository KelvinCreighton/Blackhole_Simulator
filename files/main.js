
const G = 15;    // Gravitational Constant

let blackhole = new Blackhole(Width/2, Height/2, 2000);
let satellites = [];
let creatingSatellite = false;
let selectedSatelliteTitle = ''
// Load Images
let images = [];
let showBlinkingPeriod = false;

let imageDetails = [
    { path: 'images/banana.png', title: 'Banana' },
    { path: 'images/pizza.png', title: 'Pizza' },
    { path: 'images/spaghetti.png', title: 'Spaghetti' }
];
function loadImages() {
    imageDetails.forEach(detail => {
        loadImage(detail.path, (loadedImg) => {
            images.push({ img: loadedImg, title: detail.title });
            console.log(`Image loaded: ${detail.path}`);
        });
    });
}
loadImages();
function toggleBlinkingPeriod() {
    showBlinkingPeriod = !showBlinkingPeriod;
}

function Main() {
    //satellites.push(new Satellite(100, 100, random(50, 200), 1, 2));
    setInterval(toggleBlinkingPeriod, 500);
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
            blackhole.growMass(satellites[i].mass);
            satellites.splice(i, 1);
            continue;
        }
        satellites[i].update();
        satellites[i].display();
    }
    // Define titleX and titleY within this scope
    //let titleX = satellites[i].x;
    //let titleY = satellites[i].y - satellites[i].size - 20; // Adjust as needed

    // Display the title at the top right corner
    if (selectedSatelliteTitle && satellites.length > 0) {
        console.log("Drawing title: " + selectedSatelliteTitle);
        Canvas.font = "30px Consolas"; // Set the font size and style
        Canvas.fillStyle = "#FFFFFF"; // Set the text color
        Canvas.textAlign = "center";

        let textX = Width / 2;       // Middle of the screen horizontally
        let textY = Height * 0.20;   // 25% down from the top of the screen

        let displayTitle = selectedSatelliteTitle + (showBlinkingPeriod ? '.' : '');
        Canvas.fillText(displayTitle, textX, textY);

        Canvas.fillText(selectedSatelliteTitle, textX, textY);

        // Mass (right below the title)
        let massY = textY + 40; // Adjust this value to position the mass text
        let massText = "Mass: ";
        let lastSatellite = satellites[satellites.length-1];
        massText += (lastSatellite.mass/10).toFixed(2);
        massText += "x10^30kg";
        Canvas.font = "20px Consolas"; // Smaller font for the mass
        Canvas.fillText(massText, textX, massY);

        // // Display the stats right below 
        // Canvas.font = "20px Consolas";
        // let statsY = titleY + 25; // Position stats below the title
        // let statsText = `Velocity: ${satellites[i].velocityMagnitude.toFixed(2)}`; // Example stat
        // Canvas.fillText(statsText, titleX, statsY);

        
        //if (i == 0) satellites[i].printInfo();
    }
}

Main();

// Safegaurd because I keep typing 'print' like it's python and get stuck in this dumb webpage printing attempt
function print(m) {console.log(m);}
