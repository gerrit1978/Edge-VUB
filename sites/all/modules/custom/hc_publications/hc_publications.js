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
