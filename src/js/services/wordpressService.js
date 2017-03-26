((app) => {
    'use strict'
    app.service('WordpressService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http
         }

         getPostList() {
            var req = {
                  method: 'GET',
                  url: 'http://blog.vibesharing.com/wp-json/wp/v2/posts',
                  headers: {
                    //   'x-li-format': 'json'
                  }
              }
              return this.$http(req)
          }

    }])
})(angular.module('app.services'))
