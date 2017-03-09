((app) => {
    'use strict'
    app.component("about", {
        templateUrl: 'js/components/about/about.html',
        controller: ['ngMeta', function(ngMeta) {
            angular.extend(this,{

              $onInit() {
                      ngMeta.setTitle('Vibe sharing | About');
                      ngMeta.setTag('author', 'Hadrien Buret');
                      ngMeta.setTag('description', 'Hadrien Buret, Online Marketer and Junior web developper. Bike tourer and yoga apprentice lover');
                      ngMeta.setTag('image', 'img/logo_vibesharing.png');
                  }
            })
        }]
    })
})(angular.module('app.about'))
