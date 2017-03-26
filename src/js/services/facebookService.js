((app) => {
    'use strict'
    app.service('FacebookService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http
            this.$appId = '547365138737168'
        }

        getFeeds(limit) {
            var req = {
                method: 'GET',
                url: 'https://graph.facebook.com/v2.8/'+this.$appId+'/feed?limit='+limit,
                headers: {
                    'Authorization': 'OAuth EAANUp5iVRqYBACQMnpM42NjiiY3lSG06RRVzawlADOgvtqwFOqVa7u3fZCsnpMW6vglpKGBEc9JQSOsJuP9GYZCCDKcoObUAzyRsMllnDXstWWZBlUQJ7t8abK3X5lHKmshdBRrVGsSrkFLmvkjqvuIuipdW6otfpdONpPCDwZDZD'
                }
            }
            return this.$http(req)
        }
        getInfos(id) {
            var req = {
                method: 'GET',
                url: 'https://graph.facebook.com/v2.8/'+id+'?fields=picture,message,full_picture,created_time,place,link',
                headers: {
                    'Authorization': 'OAuth EAANUp5iVRqYBACQMnpM42NjiiY3lSG06RRVzawlADOgvtqwFOqVa7u3fZCsnpMW6vglpKGBEc9JQSOsJuP9GYZCCDKcoObUAzyRsMllnDXstWWZBlUQJ7t8abK3X5lHKmshdBRrVGsSrkFLmvkjqvuIuipdW6otfpdONpPCDwZDZD'
                }
            }
            return this.$http(req)
        }
    }])
})(angular.module('app.services'))
