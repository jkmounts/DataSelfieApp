getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    data.forEach(item => {
        const root = document.createElement('div');
        root.className = 'item';
        const geo = document.createElement('div');
        geo.className = 'location';
        const date = document.createElement('div');
        date.className = 'date';
        const image = document.createElement('img');
        image.className = 'selfie';

        geo.textContent = `${item.lat}, ${item.lon}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;

        root.append(image, geo, date);
        document.body.append(root);
    });
};