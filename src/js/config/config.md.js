((app) => {
})(angular.module('app.config', ['ui.router', 'ngCookies', 'ngMeta'])
  .run(['ngMeta', function(ngMeta) {
    ngMeta.init();
  }])
)
