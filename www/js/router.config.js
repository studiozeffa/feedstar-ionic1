'use strict';

angular
  .module('feedstar')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('feed', {
      url: '/items',
      templateUrl: 'html/feed.html',
      controller: 'FeedController',
    });

    $urlRouterProvider.otherwise('/items');
  });
