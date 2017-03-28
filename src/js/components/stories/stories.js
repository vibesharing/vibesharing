((app) => {
    'use strict'
    app.component("stories", {
        templateUrl: 'js/components/stories/stories.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', 'CacheService', '$state','moment', function(ngMeta, JsonService, MapsService, $http, WordpressService, CacheService, $state, moment) {
            angular.extend(this, {


                $onInit() {
                  ngMeta.setTitle('Vibesharing | List my stories, my vibes, my experiences and tips that are usefull for future travelers ');
                  ngMeta.setTag('author', 'Hadrien Buret');
                  ngMeta.setTag('description', ' This is the list of all the stories and the vibes that happened during my bike tour in South-Korea and in Asia');
                  ngMeta.setTag('type', 'website');
                  ngMeta.setTag('image', 'http://blog.vibesharing.com/wp-content/uploads/2017/03/vibesharing_stories_page_meta.png');
                  ngMeta.setTag('url', 'http://www.vibesharing.com/#!/stories');

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
