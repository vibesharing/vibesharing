((app) => {
    'use strict'
    app.service('MapsService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http;
            this.style = [
{
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "weight": "2.00"
        }
    ]
},
{
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#9c9c9c"
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
        {
            "color": "#f2f2f2"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#ffffff"
        }
    ]
},
{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#ffffff"
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "all",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 45
        }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#eeeeee"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#7b7b7b"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#ffffff"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "all",
    "stylers": [
        {
            "color": "#46bcec"
        },
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#c8d7d4"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#070707"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#ffffff"
        }
    ]
}
]
        }

        createMapWithMarker(array) {
            var latLng = {
                lat: parseFloat(array[0]),
                lng: parseFloat(array[1])
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                center: latLng,
                zoom: 10,
                scrollwheel: false,
                styles: this.style
            });

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
        }

        createMapWithMarkers(array) {
            var input = document.getElementById('pac-input');

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 48.85341,
                    lng: 2.3488
                },
                zoom: 3,
                maxZoom: 16, //district view
                minZoom: 2, //world view
                scrollwheel: false
            });

            var markers = [];

            var shape = { //clickable region of each marker
                coords: [1, 1, 1, 60, 100, 60, 100, 1],
                type: 'poly'
            };

            var infowindow = new google.maps.InfoWindow({
               content: ".."
             });

             var ibOptions = {
        		disableAutoPan: false,
        		maxWidth: 0,
        		pixelOffset: new google.maps.Size(-140, 0),
        		zIndex: null,
        		boxStyle: {
                  padding: "0px 0px 0px 0px",
                  width: "252px",
                  height: "100px"
                },
                closeBoxURL : "",
                infoBoxClearance: new google.maps.Size(1, 1),
        		isHidden: false,
        		pane: "floatPane",
        		enableEventPropagation: false
        	};

            for (var i = 0; i < array.length; i++) {
                if (array[i].company_name){
                    var position = new google.maps.LatLng(array[i].company_location.lat, array[i].company_location.lng);
                    // the marker is composed of a background-image (stored in mailChimp + the logo of the company in the center + the number of employee situated at the company and at the location)
                    var marker = new RichMarker({
                        position: position,
                        map: map,
                        flat: true,
                        title: array[i].company_name,
                        shape: shape,
                        content:
                        ' <div class="chip chip-map">'+
                            '<img src="'+
                            array[i].company_logo.url+
                            '" alt="Contact Person">'+
                            '<span style="font-size:8px">'+
                            array[i].company_name+
                            '</span>'+
                         '</div>',
                         html:
                        '<div class="info-box-wrap">'+
                            '<img src="'+array[i].company_logo.url+'" />'+
                            '<div class="info-box-text-wrap">'+
                                '<h6 class="address">Job position</h6>'+
                                '<p class="price">'+array[i].job_title+'</p>'+
                            '</div>'+
                            '<div class="action-btns">'+
                            '<p>in '+array[i].year+'</p>'+
                         '  </div>'+
                        '</div>'
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                    $(".infoBox").fadeOut(300);
                    // where I have added .html to the marker object.
                    //
                    var boxText = document.createElement("div");
                    boxText.style.cssText = "margin-top: 8px; background: #fff; padding: 0px;";
                    boxText.innerHTML = this.html;
                    ibOptions.content = boxText;
                    ibOptions.position = this.position;
                    var ib = new InfoBox(ibOptions);
                  	ib.open(map, this);
                    map.panTo(position);

                    });
                    google.maps.event.addListener(marker, 'mouseout', function () {
                        var t = setTimeout(function () {
                            infowindow.close()
                        }, 3000);
                    });



                    markers[i] = marker;


                }



            }

            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                maxZoom: 13
            });

            // When the map finishes loading, replace current history push stack
            // NOTE avoid weird situations when the map finishes loading AFTER the user re-filtered
            // (Always check you're still on the map)
            if ($("#display_type").val() === 'map') {
                replaceSearchHistory(searchForm())
            }
        }



    }])
})(angular.module('app.services'))
