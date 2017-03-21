((app) => {
    'use strict'
    app.service('SlackService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http;
            this.$general = 'https://hooks.slack.com/services/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';
            this.$random = 'https://hooks.slack.com/services/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';
        }

        postMessage(channel, message) {
            var req = {
                method: "POST",
                url: this[channel],
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'payload=' + JSON.stringify({"text": "message"})
            }
            return this.$http(req)
        }

    }])
})(angular.module('app.services'))
