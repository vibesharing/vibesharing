((app) => {
    'use strict'
    app.component("story", {
        bindings:{
          story: "<"
        },
        templateUrl: 'js/components/stories/story/story.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', 'WordpressService', '$state', 'moment', 'Socialshare', function(ngMeta, JsonService, MapsService, $http, WordpressService, $state, moment, Socialshare) {
        angular.extend(this, {

                getMomentDate(){
                  return moment(this.date).format('DD-MM-YYYY')
              },

                fullvibe (story) {
                $state.go('app.vibe', { id: story.id});
              }

            })
        }]
    })
})(angular.module('app.stories'))
