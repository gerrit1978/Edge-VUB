(function($) {
  $.authcache_cookie = function(name, value, lifetime) {
    lifetime = (typeof lifetime === 'undefined') ? Drupal.settings.authcache.cl : lifetime;
    $.cookie(name, value, $.extend(Drupal.settings.authcache.cp, {expires: lifetime}));
  };
}(jQuery));
;
/**
 * @file
 * A JavaScript file for the module.
 *
 */

(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.toggleAbstract = {
  attach: function(context, settings) {
    $('a.toggle-abstract').click(function(e) {
      var abstract = $(this).parent().parent().find('.abstract');
      if (abstract.is(':visible')) {
        abstract.hide();
        $(this).html('show abstract');
      } else {
        abstract.show();
        $(this).html('hide abstract');
      }
    });
  }
};


})(jQuery, Drupal, this, this.document);
;
