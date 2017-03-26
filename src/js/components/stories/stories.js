((app) => {
    'use strict'
    app.component("stories", {
        templateUrl: 'js/components/stories/stories.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', function(ngMeta, JsonService, MapsService, $http) {
            angular.extend(this, {


                $onInit() {
                    ngMeta.setTitle('Vibe sharing | Stories');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Discover my stories about travelling in South-Korea with a bike');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');

                }
            })
        }]
    })
})(angular.module('app.stories'))
