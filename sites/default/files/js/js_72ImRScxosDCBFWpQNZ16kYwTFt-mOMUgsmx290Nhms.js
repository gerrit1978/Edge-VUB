(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.clientStatus = {
  attach: function (context, settings) {
    // Connect checkbox wrapper to table-drag wrapper
    $('.clients-status-wrapper', context).once('clients-status-wrapper', function() {
      $clients_order_wrapper = $('#' + $(this).attr('id').replace(/-status-wrapper$/, '-order-wrapper'), context);
      $clients_status_warning = $(this).find('.authcache-p13n-clients-warning');

      $(this).bind('click.clientUpdate', function() {
        $checked = $(this).find('input.form-checkbox:checked');
        if ($checked.length > 1) {
          $clients_order_wrapper.show();
        }
        else {
          $clients_order_wrapper.hide();
        }

        if ($checked.length == 0) {
          $clients_status_warning.show();
        }
        else {
          $clients_status_warning.hide();
        }
      });

      $(this).triggerHandler('click.clientUpdate');
    });

    // Connect checkboxes to rows
    $('.clients-status-wrapper input.form-checkbox', context).once('clients-status-checkbox', function () {
      var $checkbox = $(this);
      // Retrieve the tabledrag row belonging to this client.
      var $row = $('#' + $checkbox.attr('id').replace(/-status$/, '-weight'), context).closest('tr');

      // Bind click handler to this checkbox to conditionally show and hide the
      // client's tableDrag row and vertical tab pane.
      $checkbox.bind('click.clientUpdate', function () {
        if ($checkbox.is(':checked')) {
          $row.show();
        }
        else {
          $row.hide();
        }
        // Restripe table after toggling visibility of table row.
        $clients_order_table = $row.closest('.clients-order-table');
        Drupal.tableDrag[$clients_order_table.attr('id')].restripeTable();
      });

      // Trigger our bound click handler to update elements to initial state.
      $checkbox.triggerHandler('click.clientUpdate');
    });
  }
};

})(jQuery);
;
