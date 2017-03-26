((app) => {
    'use strict'
    app.component("stories", {
        templateUrl: 'js/components/stories/stories.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', function(ngMeta, JsonService, MapsService, $http, WordpressService) {
            angular.extend(this, {


                $onInit() {
                    ngMeta.setTitle('Vibe sharing | Stories');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Discover my stories about travelling in South-Korea with a bike');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');


                    WordpressService.getPostList().then((res)=>{
                        console.log(res.data);
                        this.stories = res.data
                    })
                }
            })
        }]
    })
})(angular.module('app.stories'))
