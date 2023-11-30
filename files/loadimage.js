function loadImage(path, callback) {
    let img = new Image();
    img.onload = () => callback(img); // Call callback function when the image is loaded
    img.onerror = () => {
        console.error(`Failed to load image at ${path}`);
    };
    img.src = path;
}
