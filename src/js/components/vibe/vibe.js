((app) => {
    'use strict'
    app.component("vibe", {
        templateUrl: 'js/components/vibe/vibe.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', '$stateParams', function(ngMeta, JsonService, MapsService, $http, WordpressService, $stateParams) {
            angular.extend(this, {
                $onInit() {
                    ngMeta.setTitle('Vibe sharing | Stories');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Discover my vibe about travelling in South-Korea with a bike');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');
                    console.log('vibe')
                    console.log($stateParams)

                    WordpressService.getPostById($stateParams.id).then((res)=> {
                        $( "#post-content" ).html($(res.data.content.rendered));
                    })

                }
            })
        }]
    })
})(angular.module('app.vibe'))
