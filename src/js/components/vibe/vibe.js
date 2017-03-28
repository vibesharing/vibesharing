((app) => {
    'use strict'
    app.component("vibe", {
        templateUrl: 'js/components/vibe/vibe.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', '$stateParams', function(ngMeta, JsonService, MapsService, $http, WordpressService, $stateParams) {
            angular.extend(this, {
                $onInit() {
                    WordpressService.getPostById($stateParams.id).then((res)=> {
                        console.log(res.data);
                        $( "#post-content" ).html($(res.data.content.rendered));
                        ngMeta.setTitle('Vibesharing |'+ res.data.title.rendered);
                                ngMeta.setTag('author', 'Hadrien Buret');
                                ngMeta.setTag('description', res.data.content.rendered.substring(0,121));
                                ngMeta.setTag('type', 'website');
                                ngMeta.setTag('image', res.data.better_featured_image.source_url);
                                ngMeta.setTag('url', 'http://www.vibesharing.com/#!/vibes/'+res.data.id);
                    })

                }
            })
        }]
    })
})(angular.module('app.vibe'))
