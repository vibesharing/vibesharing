((app) => {
    'use strict'
    // toastr
    toastr.options = {
        positionClass: "toast-bottom-right"
    }

    const checkPassword = () => {
        return {
            require: 'ngModel',
            link(scope, elem, attrs, ctrl) {
                let firstPassword = '#' + attrs.checkPassword
                elem.add(firstPassword).on('keyup', () => {
                    scope.$apply(() => {
                        let v = elem.val() === $(firstPassword).val()
                        ctrl.$setValidity('passwordMatch', v)
                    })
                })
            }
        }
    }

    const gravatar = ['md5', (md5) => {
        return {
            replace: true,
            required: 'email',
            template: '<img ng-src="https://www.gravatar.com/avatar/{{hash}}?s={{size}}&d=identicon" />',
            link(scope, element, attrs) {
                attrs.$observe('email', (value) => {
                    if (!value) return

                    scope.hash = md5.createHash(value.toLowerCase())
                    scope.size = attrs.size

                    if (angular.isUndefined(scope.size))
                        scope.size = 60
                })
            }
        }
    }]

    app.directive('checkPassword', checkPassword)
    app.directive('gravatar', gravatar)

    app.filter("cut", function(){
        return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace !== -1) {
                      //Also remove . and , so its gives a cleaner result.
                      if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                        lastspace = lastspace - 1;
                      }
                      value = value.substr(0, lastspace);
                    }
                }
                return value + (tail || ' …');
            };
    }),

    app.filter("keep", function(){
        return function (value) {
          var match = value.match(/<h1>(.*)<\/h1>/);
          return match[1];
            };
    }),

    app.run()

})(angular.module('app', [
    'ui.router',
     'ngMap',
    'ngMeta',
    'ngCookies',
    'ngSanitize',
    'angular-md5',
    'InlineTextEditor',
    'textAngular',
    'pascalprecht.translate',
    'app.views',
    'app.config',
    'app.services',
    'app.common',
    'app.login',
    'app.home',
    'app.blog',
    'app.vibe',
    'app.about',
    'app.stories',
    'app.dashboard',
    'app.dashboard.summary',
    'app.dashboard.users',
    'app.dashboard.posts'
]))
