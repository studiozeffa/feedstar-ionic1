'use strict';

angular
  .module('feedstar')
  .controller('ItemController', function($scope, FeedFactory, $stateParams, $cordovaInAppBrowser, $ionicPlatform) {
    $scope.item = FeedFactory.getItemById($stateParams.id);

    $scope.openArticle = function(link) {
      // Open the link in the in-app-browser.
      $ionicPlatform.ready(function() {
        $cordovaInAppBrowser.open(link, '_blank');
      });
    };
  });