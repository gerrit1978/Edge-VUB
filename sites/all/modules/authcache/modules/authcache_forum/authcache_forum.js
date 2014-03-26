(function ($) {
  Drupal.behaviors.authcacheComment = {
    attach: function (context, settings) {
      $('.authcache-comment-new').once('authcache-comment-new', function() {
        var elem = $(this);

        // Update number of new comments / topics.
        elem.html(Drupal.t('@count new', {'@count': elem.data('new-count')}));

        // Update icon.
        var icon = elem.closest('tr').find('td > div').get(0);
        if (icon) {
          icon.className = icon.className.replace('status-default', 'status-new').replace('status-hot', 'status-hot-new');
        }
      });
    }
  };
}(jQuery));
