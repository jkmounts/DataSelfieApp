function setup() {
    noCanvas();
    const submitButton = document.querySelector("button");
    const video = createCapture(VIDEO);
    video.size(320,240);

    let lat, lon;

    function success(pos) {
        const crd = pos.coords;
        lat = crd.latitude;
        document.querySelector('#latitude').textContent = lat;
        lon = crd.longitude;
        document.querySelector('#longitude').textContent = lon;
    }
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(success);
    } else {
        console.log('geolocation not available');
    }

    submitButton.addEventListener('click', async e => {
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = {lat, lon, image64};

        const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);

    });
}
