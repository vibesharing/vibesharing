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

           getTagsList() {
               var req = {
                     method: 'GET',
                     url: 'http://blog.vibesharing.com/wp-json/wp/v2/tags'
                 };
                 return this.$http(req);
           }

           getTagById(id) {
              var req = {
                    method: 'GET',
                    url: 'http://blog.vibesharing.com/wp-json/wp/v2/tags/' + id
                };
                return this.$http(req);
            }

    }]);
})(angular.module('app.services'))
