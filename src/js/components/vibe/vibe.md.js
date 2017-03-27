((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.vibe', {
            url:'/vibes/:id',
            template: '<vibe />'
        })
    }])
})(angular.module('app.vibe', ['ui.router']))
