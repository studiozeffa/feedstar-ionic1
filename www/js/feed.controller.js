'use strict';

angular
  .module('feedstar')
  .controller('FeedController', function($scope, FeedFactory, $ionicLoading, $ionicModal) {
    $scope.refreshFeed = function() {
      refreshFeedAndItems().finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.openFeedSettings = function() {
      $scope.modal.show();
    };

    $scope.changeFeed = function() {
      FeedFactory.rememberFeedUrl($scope.feedSettings.url);
      $scope.modal.hide();
      loadFeed();
    };

    $scope.feedSettings = {
      url: FeedFactory.retrieveFeedUrl()
    };

    createModal();
    loadFeed();

    function createModal() {
      $ionicModal.fromTemplateUrl('html/settings.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
    }

    function loadFeed() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple"></ion-spinner><br>Loading'
      });

      refreshFeedAndItems().finally(function() {
        $ionicLoading.hide();
      });
    }

    function refreshFeedAndItems() {
      return FeedFactory
        .getItems($scope.feedSettings.url)
        .then(function(response) {
          $scope.feed = response.feed;
          $scope.items = response.items;
        });
    }
  });
