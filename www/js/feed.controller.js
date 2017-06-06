'use strict';

angular
  .module('feedstar')
  .controller('FeedController', function($scope, FeedFactory) {
    $scope.feedUrl = FeedFactory.retrieveFeedUrl();
  });
