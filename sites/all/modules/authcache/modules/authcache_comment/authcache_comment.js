(function ($) {
  Drupal.behaviors.authcacheComment = {
    attach: function (context, settings) {
      $('.authcache-comment-new', context).once('authcache-comment-new', function() {
        var elem = $(this);
        elem.html(Drupal.formatPlural(elem.data('new-count'), '1 new comment', '@count new comments'));
      });

      if (settings.authcacheUser && settings.authcacheUser.uid) {
        $('.authcache-comment-edit', context).once('authcache-comment-edit', function() {
          var elem = $(this);
          if (elem.data('p13n-uid') == settings.authcacheUser.uid) {
            elem.show();
          }
        });
      }
    }
  };
}(jQuery));
