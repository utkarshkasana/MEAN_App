'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider,$locationProvider,RestangularProvider) {

      RestangularProvider.setBaseUrl('http://localhost:3000');

      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/movies', {
        templateUrl: 'views/movies1.html',
        controller: 'Movies1Ctrl',
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');

  })
    .factory('MovieRestangular', function (Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer){
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('Movie', function (MovieRestangular) {
        return MovieRestangular.service('movie');
    });
