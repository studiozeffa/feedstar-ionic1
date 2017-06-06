(function() {
  'use strict';

  angular
    .module('feedstar')
    .factory('FeedFactory', FeedFactory);

  function FeedFactory($http, $q, $window) {
    var cache = null;
    var localStorage = $window.localStorage;

    var factory = {
      getItems: getItems,
      getItemById: getItemById,
      retrieveFeedUrl: retrieveFeedUrl,
      rememberFeedUrl: rememberFeedUrl
    };

    return factory;

    /**
     * Retrieve the RSS feed items from the
     * passed link.
     */
    function getItems(link) {
      var url = 'http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(link);
      return $http
        .get(url)
        .then(function(res) {
          cache = res.data;
          return res.data;
        });
    }

    /**
     * Find the item with the associated ID.
     */
    function getItemById(id) {
      var items = cache && cache.items || [];
      return items.find(function(item) {
        return item.guid === id;
      });
    }

    /**
     * Fetch the previously stored feed URL.
     */
    function retrieveFeedUrl() {
      var url = localStorage.getItem('feedUrl');
      if(!url) {
        // Fallback to default url.
        url = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';
      }
      return url;
    }

    /**
     * Store the feed URL so it can be
     * remembered for the next time the
     * app is loaded.
     */
    function rememberFeedUrl(url) {
      localStorage.setItem('feedUrl', url);
    }
  }

})();
