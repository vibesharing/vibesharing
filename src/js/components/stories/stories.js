((app) => {
    'use strict'
    app.component("stories", {
        templateUrl: 'js/components/stories/stories.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', 'CacheService', '$state','moment', function(ngMeta, JsonService, MapsService, $http, WordpressService, CacheService, $state, moment) {
            angular.extend(this, {


                $onInit() {
                    ngMeta.setTitle('Vibe sharing | Stories');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Discover my stories about travelling in South-Korea with a bike');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');

                    if (!app.postList) {
                    WordpressService.getPostList().then((res)=>{
                        this.stories = res.data;
                        app.postList = res.data;
                    })
                } else {
                    this.stories = app.postList;
                    console.log(app.postList);
                }
                }
            })
        }]
    })
})(angular.module('app.stories'))
