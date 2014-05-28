(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
(function ($) {

  Drupal.behaviors.fontyourfaceBrowse = {

    attach:function(context, settings) {

      $('#fontyourface-apply-tabs').tabs();;

      $('#fontyourface-apply-tabs .css-selector input').each(function(){

        var input = $(this);
        var selector = input.val();

        var select = $('<select><option value="">-- none --</option><option value="h1, h2, h3, h4, h5, h6">all headers (h1, h2, h3, h4, h5, h6)</option><option value="h1">h1</option><option value="h2">h2</option><option value="h3">h3</option><option value="p, div">standard text (p, div)</option><option value="body">everything (body)</option><option value="&lt;none&gt;">-- add selector in theme CSS --</option><option value="-- other --">other</option></select>')
          .change(fontyourfaceCssSelectChange)
          .insertBefore(input.parent());

        if (select.find('option[value="' + selector + '"]').length > 0) {

          select.find('option[value="' + selector + '"]').attr('selected', true);
          input.hide();

        } // if
        else {

          select.find('option[value="-- other --"]').attr('selected', true);
          input.show();

        } // else
        
      });

    } // attach

  } // Drupal.behaviors.fontyourfaceAddForm

  function fontyourfaceCssSelectChange() {

    var select = $(this);
    var selector = select.val();
    var input = select.parent().find('input');
    var fontFamily = select.parent().attr('data-font-family');
    var fontStyle = select.parent().attr('data-font-style');
    var fontWeight = select.parent().attr('data-font-weight');

    if (selector == '-- other --') {

      if (input.val() == '<none>') {
        input.val('');
      } // if

      input.show();

    } // if
    else {

      input.val(selector);
      input.hide();
      select.parent().find('.font-family').remove();

      if (selector == '<none>') {

        var themeInstructions = 'font-family: ' + fontFamily + ';';
        if (fontStyle) {
          themeInstructions += ' font-style: ' + fontStyle + ';';
        }
        if (fontWeight) {
          themeInstructions += ' font-weight: ' + fontWeight + ';';
        }
        select.parent().append('<div class="font-family">' + themeInstructions + '</div>');

      } // if

    } // else

  } // fontyourfaceCssSelectChange

})(jQuery);
;
