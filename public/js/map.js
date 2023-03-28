mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsbG93am9obiIsImEiOiJjbGZvZnpkbDUwbHE0M3BwdDU0bXR4OWU1In0.ALwCqXcfY2Oo43mI0ctpjA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-79.20260999999999, 43.131], // starting position [lng, lat]
    zoom: 8 // starting zoom
});

const table = document.getElementById('myTable');
const tbody = table.getElementsByTagName('tbody')[0];

// Fetch locations from API
async function getFellowLocation() {
    // const res = await fetch('http://localhost:5000/api/v1/locate');
    const res = await fetch('https://rhfellowship-locator.onrender.com/api/v1/locate');
    const {data} = await res.json();

    console.log(data);

    const locator = data.map(locate => {
        console.log(locate.postalCode);
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        const cell4 = document.createElement('td');
        const cell5 = document.createElement('td');

        cell1.textContent = locate.fullName;
        cell2.textContent = locate.address;
        cell3.textContent = locate.phoneNumber;
        cell4.textContent = locate.attendanceMode;
        cell5.innerHTML = `<a href="edit.html?${locate._id}" class="btn btn-float" title="Edit"><i class="fa-solid fa-edit"></i></a>`;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        tbody.appendChild(row);

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [locate.location.coordinates[0], locate.location.coordinates[1]]
            },
            properties: {
                postal: locate.postalCode,
                icon: 'shop'
            }
        }
    });

    loadMap(locator);

}

// load map with locations
function loadMap(locator){
    map.on('load', function(){
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: locator
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{postal}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        })
    })
};

getFellowLocation();