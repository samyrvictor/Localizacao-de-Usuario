let h2 = document.querySelector('h2');
var map;

function subcess(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude)
    h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;

    if (map === undefined) {
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Esta é minha localização')
        .openPopup();
}

function error(err) {/* receber o error do get position */
    console.log(err)
}

var whatchID = navigator.geolocation.watchPosition(subcess, error, {
    enableHighAccuracy: true,
    timeout: 5000
});/* metodo que para o usuario permitir, e outra para pegar a posição e se mudar de lugar também mostrar */

/*navigator.geolocation.clearWatch(whatchID);para não ficar monitorando se o usuario mudar de lugar  */

