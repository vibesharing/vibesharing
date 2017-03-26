((app) => {
    'use strict'
    app.component("about", {
        templateUrl: 'js/components/about/about.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', function(ngMeta, JsonService, MapsService, $http) {
            angular.extend(this, {


                $onInit() {
                    ngMeta.setTitle('Vibe sharing | About');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Hadrien Buret, Online Marketer and Junior web developper. Bike tourer and yoga apprentice lover');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');


                    JsonService.getCompaniesInfo().then((res) => {
                        this.years = res.data;
                        this.companies = [];
                        this.years.forEach((el, index) => {
                            if (el.professionnal_experiences) {
                                this. companies = this.companies.concat(el.professionnal_experiences)
                            }
                        });
                        MapsService.createMapWithMarkers(this.companies)
                    })

                }
            })
        }]
    })
})(angular.module('app.about'))
