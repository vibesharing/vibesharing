((app) => {
    'use strict'
    app.service('JsonService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http
         }

         getCompaniesInfo() {
            var req = {
                  method: 'GET',
                  url: 'json/companies.json',
              }
              return this.$http(req)
          }

    }])
})(angular.module('app.services'))
