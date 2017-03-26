((app) => {
    'use strict'
    app.component("story", {
        bindings:{
          story: "<"
        },
        templateUrl: 'js/components/stories/story/story.html',
    })
})(angular.module('app.stories'))
