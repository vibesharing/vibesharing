((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.stories', {
            url:'/stories',
            template: '<stories />'
        })
    }])
})(angular.module('app.stories', ['ui.router']))
