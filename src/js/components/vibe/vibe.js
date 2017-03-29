((app) => {
    'use strict'
    app.component("vibe", {
        templateUrl: 'js/components/vibe/vibe.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', '$stateParams', function(ngMeta, JsonService, MapsService, $http, WordpressService, $stateParams) {
            angular.extend(this, {
                $onInit() {
                    WordpressService.getPostById($stateParams.id).then((res)=> {
                        this.vibe = res.data;
                        $( "#post-content" ).html($(res.data.content.rendered));
                        this.tagsName = [];
                        var lat;
                        var lng;
                        var coordinates;
                        var indices = [];
                        var string = res.data.content.rendered.substring(res.data.content.rendered.length - 45,res.data.content.rendered.length)
                        for(var i=0;i<string.length;i++) {
                            if (string[i] === "|") indices.push(i);
                        }
                        coordinates = string.substring(indices[0]+1, indices[1]).split(';');

                        MapsService.createMapWithMarker(coordinates);

                        res.data.tags.forEach((el)=> {
                                WordpressService.getTagById(el).then((response) => {
                                    this.tagsName.push(response.data.name)
                            });
                        })
                        console.log(res.data.better_featured_image.source_url)
                        ngMeta.setTitle('Vibesharing |'+ res.data.title.rendered);
                        ngMeta.setTag('author', 'Hadrien Buret');
                        ngMeta.setTag('description', res.data.content.rendered.substring(0,121));
                        ngMeta.setTag('type', 'article');
                        ngMeta.setTag('image', res.data.better_featured_image.source_url);
                        ngMeta.setTag('og:image:width',res.data.better_featured_image.media_details.width);
                        ngMeta.setTag('og:image:height',res.data.better_featured_image.media_details.height)
                        ngMeta.setTag('url', 'http://korea.vibesharing.com/#!/vibes/'+res.data.id);
                    })

                }
            })
        }]
    })
})(angular.module('app.vibe'))
