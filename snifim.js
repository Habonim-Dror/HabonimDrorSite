$(document).ready( function() {
    mapboxgl.accessToken =
    'pk.eyJ1IjoiaWFuZ3VlbG1hbiIsImEiOiJjazJjY2JmaXcxeHN3M2hvamozNGsxazF5In0.xA8KBv93NZZAu44gw_fc3A';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ianguelman/ck9079fhe0odx1ir3p3ym9d42?optimize=true',
        center: [-53.2, -15.3333333],
        zoom: 3,
        maxBounds: [
            [-180, -90],
            [180, 90]
        ]
        // maxBounds: [[-73.98306253,-33.86890564],[-28.63411643,5.28428725]]
    })

    function addLayer(name, color, opacity) {
        map.addLayer({
            id: name,
            source: {
                type: 'geojson',
                data: '/geojson/' + name + '.json'
            },
            type: 'fill',
            paint: {
                'fill-color': color,
                'fill-opacity': opacity
            },
            layout: {}
        });
    }

    map.on('load', function () {

        addLayer("Brasil_Invertido", "#D2D8D8", 1)
        addLayer("MG", "red", 0.5)
        addLayer("SP", "red", 0.5)
        addLayer("RJ", "red", 0.5)
        addLayer("RS", "red", 0.5)
        addLayer("PR", "red", 0.5)
        addLayer("PE", "red", 0.5)
        addLayer("CE", "red", 0.5)
        addLayer("BA", "red", 0.5)
        addLayer("AM", "red", 0.5)

        $.getJSON('/geojson/Cidades.json', function (geojson) {
            geojson.features.forEach(function (marker) {
                var el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({
                            offset: 25
                        })
                        .setHTML(`<h3>${marker.properties.title}</h3>
                        <button class="${marker.properties.title.replace(' ', '').replace(' ', '')} btn btn-secondary"
                        onCLick="$('#'+$(this).attr('class').replace('btn btn-secondary',''))[0].scrollIntoView({behavior: 'smooth'})">Ver mais</button`))
                    .addTo(map)
            })
        })
    })
})