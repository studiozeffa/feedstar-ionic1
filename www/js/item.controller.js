'use strict';

angular
  .module('feedstar')
  .controller('ItemController', function($scope, FeedFactory, $stateParams) {
    $scope.item = FeedFactory.getItemById($stateParams.id);
  });