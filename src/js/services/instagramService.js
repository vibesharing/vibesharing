((app) => {
    'use strict'
    app.service('InstagramService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http;
            this.$userId = '633601061';
            this.$clientId = 'ebb793447c4f4a1fb1c4d1819747b407';
            this.$accessToken = '633601061.ebb7934.20e8af5be1004857ac2d4e363763a858';
        }

        fetchPhotos() {
            var endpoint = 'https://api.instagram.com/v1/users/';
            endpoint += this.$userId;
            endpoint += '/media/recent/?';
            endpoint += '?count=99';
            endpoint += '&callback=JSON_CALLBACK';
            endpoint += '&access_token=' + this.$accessToken;
            return this.$http.jsonp(endpoint)
            .success(function(response) {
            })
            .error(function(xhr, status, err) {
              console.error(status, err);
            })
          }

    }])
})(angular.module('app.services'))
