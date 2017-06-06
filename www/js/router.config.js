'use strict';

angular
  .module('feedstar')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('feed', {
      url: '/items',
      templateUrl: 'html/feed.html',
      controller: 'FeedController',
    });

    $stateProvider.state('item', {
      url: '/items/:id',
      templateUrl: 'html/item.html',
      controller: 'ItemController'
    });

    $urlRouterProvider.otherwise('/items');
  });
