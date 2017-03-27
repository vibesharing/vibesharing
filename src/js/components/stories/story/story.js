((app) => {
    'use strict'
    app.component("story", {
        bindings:{
          story: "<"
        },
        templateUrl: 'js/components/stories/story/story.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', '$state', function(ngMeta, JsonService, MapsService, $http, WordpressService, $state) {
            angular.extend(this, {

                fullvibe (story) {
                    console.log(story.title.rendered)
                $state.go('app.vibe', { id: story.id});
              }

            })
        }]
    })
})(angular.module('app.stories'))
