((app) => {
    'use strict'
    app.component("about", {
        templateUrl: 'js/components/about/about.html',
        controller: ['ngMeta', 'JsonService', 'MapsService', '$http', function(ngMeta, JsonService, MapsService, $http) {
            angular.extend(this, {


                $onInit() {
                    ngMeta.setTitle('Vibesharing | My name is Hadrien I am the author of vibesharing');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('description', 'Profile of Hadrien Buret. French guy, coming from the Alps, studied Marketing at the EMBS program and now learning web programming. Biking | travelling and yoga, ');
                    ngMeta.setTag('type', 'profile');
                    ngMeta.setTag('og:profile:first_name', 'hadrien');
                    ngMeta.setTag('og:profile:last_name', 'Buret');
                    ngMeta.setTag('og:profile:gender', 'male');
                    ngMeta.setTag('image', 'https://s3.eu-central-1.amazonaws.com/vibesharing-static/vibesharing_about_page_meta.png');
                    ngMeta.setTag('url', 'http://www.vibesharing.com/#!/about');


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
