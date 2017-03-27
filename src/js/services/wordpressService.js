((app) => {
    'use strict'
    app.service('WordpressService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http;
         }

         getPostList() {
            var req = {
                  method: 'GET',
                  url: 'http://blog.vibesharing.com/wp-json/wp/v2/posts'
              };
              return this.$http(req);
          }

          getPostById(id) {
             var req = {
                   method: 'GET',
                   url: 'http://blog.vibesharing.com/wp-json/wp/v2/posts/' + id
               };
               return this.$http(req);
           }

    }]);
})(angular.module('app.services'))
