'use strict';

angular
  .module('feedstar')
  .controller('FeedController', function($scope, FeedFactory, $ionicLoading) {
    $scope.feedUrl = FeedFactory.retrieveFeedUrl();

    $scope.refreshFeed = function() {
      refreshFeedAndItems().finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner><br>Loading'
    });

    refreshFeedAndItems().finally(function() {
      $ionicLoading.hide();
    });

    function refreshFeedAndItems() {
      return FeedFactory
        .getItems($scope.feedUrl)
        .then(function(response) {
          $scope.feed = response.feed;
          $scope.items = response.items;
        });
    }
  });
