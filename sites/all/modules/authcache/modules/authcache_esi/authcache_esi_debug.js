(function ($) {
  Drupal.behaviors.authcacheEsiDebug = {
    attach: function (context, settings) {
      if (settings.authcacheEsiDebug) {
        $('#authcache-esi-debug-table').load(settings.authcacheEsiDebug);
      }
    }
  };
}(jQuery));
