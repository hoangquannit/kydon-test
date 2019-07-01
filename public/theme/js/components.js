$(document).ready(function () {

  var selectCheckbox = function (formcheckbox) {
    var $form = $(formcheckbox),
        path = 'data/ajax.txt';
    if (!$form.length) return;
    var checkbox_all = $('.input-checkbox-all', formcheckbox),
        $btnDelete = $('.button-checkbox-delete', formcheckbox),
        $checkboxID = $('.input-checkbox-id', formcheckbox),
        $panelHeader = $('.panel-header', formcheckbox),
        status;

    $checkboxID.on('click', function () {
      var $panelMessage = $('.panel-message', formcheckbox);
      if ($(this).hasClass('input-checkbox-all')) {
        $(this).closest($form).find('.input-checkbox-id').prop('checked', this.checked);
      } else {
        var checkboxed = $form.find('.input-checkbox-id:checked').length,
            checkbox_number = $checkboxID.length;
        if (checkbox_all.is(':checked')) {
          checkbox_all.prop('checked', false);
        } else {
          if (checkbox_number - checkboxed > 1) {
            checkbox_all.prop('checked', false);
          } else {
            checkbox_all.prop('checked', true);
          }
        }
      }

      if ($form.find('.input-checkbox-id:checked').length > 0) {
        $btnDelete.removeClass('button-gray').prop('disabled', false);
      } else {
        if ($btnDelete.hasClass('button-blue')) {
          $btnDelete.removeClass('button-blue').addClass('button-gray').prop('disabled', true);
        }
      }
    });

    var fancyConfirm = function (callback) {
      $.fancybox('#fancybox-confirm', {
        modal: true,
        afterShow: function () {
          $('.button', '#fancybox-confirm').on('click', function (event) {
            var $target = $(event.target);

            if ($target.is('.button-blue')) {
              status = true;
            } else if ($target.is('.button-gray')) {
              status = false;
            }
            // Disable event submit form
            $form.on('submit', function (e) {
              e.preventDefault();
            });
            // Hide modal box
            $.fancybox.close();
          });
        },
        afterClose: function () {
          callback.call(this, status);
        }
      });
    };

    $btnDelete.on('click', function (e) {
      e.preventDefault();

      fancyConfirm(function (respond) {
        if (respond) {
          // TODO: Request ajax
          // Delete input checked
          var $checkboxSelected = $form.find('input[type="checkbox"]:checked').parents('tr');
          $checkboxSelected.remove();
          // Disable button delete
          $btnDelete.prop('disabled', true).addClass('button-gray');
          // Hide modal
          $.fancybox.close();
          // Add message
          addMessage();
        }
      });
    });

    var addMessage = function () {
      var message = $('.button-blue', '#fancybox-confirm').data('message'),
          $panelMessage = $('.panel-message', formcheckbox);
      if ($panelMessage.length) {
        $panelMessage.show();
      } else {
        $('<h4/>', {
          text: message,
          'class': 'panel-message'
        }).prependTo($panelHeader);
      }
    };

    //var removeMessage = function(time) {
    //  var $panelMessage = $('.panel-message', formcheckbox);
    //  if($panelMessage.length) {
    //    window.clearTimeout(timeOut);
    //    timeOut = setTimeout(function() {
    //      $panelMessage.hide();
    //    }, time);
    //  }
    //};
  };
  selectCheckbox('.form-checkbox');
});
//# sourceMappingURL=components.js.map
