((app) => {
    'use strict'
    app.service('CacheService', [ class PageService {

        constructor() {
            var a = {};
         }

         cacheData(var_name, val) {
           this.a['var_name'] = val;
           console.log( a['var_name'])

          }


    }]);
})(angular.module('app.services'))
