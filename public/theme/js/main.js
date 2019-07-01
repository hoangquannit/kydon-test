(function ($) {
  'use strict';
  // **********************************************************************//
  // ! Init variables global
  // **********************************************************************//
  var adminCountry = $("#admin-country").text();

  var $body = $('body'),
      $accordionMenu = $('[data-accordion="menu"]'),
      breakpoint = 768;

    // **************************************************************//
    // ! Check current menu sidebar to open
    // **************************************************************//
    var checkActiveMenu = function() {

        $('#menu-global ul a').each(function() {
            var $this = $(this),
                currentLink = location.href,
                href = $.trim($this.attr('href'));
            href = href.replace(/#/g, '');
            var base_url = window.location.origin+'/';
            currentLink = currentLink.replace('#forward', '');
            var _currentLink = currentLink.split("?")[0];
            if(href !== '' && _currentLink!= base_url && href == _currentLink) {
                var $parentLi = $this.parents().eq(2);
                $parentLi.find('a[data-accordion="menu"]').addClass('menu-open').end()
                    .find('ul').show();
                $this.css('font-weight','bold');
                $this.css('color', '#fff');
            }
            //Fix bug #62941
            if (currentLink == base_url) {
                if (href == base_url+'user/list') {
                  var $parentLi = $this.parents().eq(2);
                  $parentLi.find('a[data-accordion="menu"]').addClass('menu-open').end()
                      .find('ul').show();
                  $this.css('font-weight','bold');
                  $this.css('color', '#fff');
                }

            }
        });
    };

  // **********************************************************************//
  // ! Check status device
  // **********************************************************************//
  var checkStatusDevice = function () {
    if ($body.hasClass('page-full-width')) return;
    var $widthDevice = $(window).width();
    if ($widthDevice < breakpoint) {
      $body.removeClass('sidebar-open');
      $accordionMenu.removeClass('menu-open').parent().find('ul').removeAttr('style');
    } else {
      $body.addClass('sidebar-open');
    }
  };
  // **********************************************************************//
  // ! Menu global
  // **********************************************************************//
  var menuGlobal = function () {
    var $controlMenu = $('[data-control="menu"]');
    // Toggle sub menu
    $accordionMenu.on('click', function (e) {
      e.preventDefault();
      var $parent = $(this).parent(),
          $subMenu = $parent.find('ul');
      if ($body.hasClass('sidebar-open')) {
        $subMenu.slideToggle(500);
        $(this).toggleClass('menu-open');
      }
    });

    // Expand and Collapse menu
    $controlMenu.on('click', function (e) {
      if ($body.hasClass('sidebar-open')) {
        $body.removeClass('sidebar-open');
        $accordionMenu.removeClass('menu-open').parent().find('ul').removeAttr('style');
        scrollbar.mCustomScrollbar('destroy');
      } else {
        $body.addClass('sidebar-open');
        scrollSidebar();
      }
    });
  };

  // **********************************************************************//
  // ! Scroll sidebar
  // **********************************************************************//
  var scrollSidebar = function () {
    var $sidebarContent = $('#sidebar-content', '#main-sidebar');
    scrollbar = $sidebarContent.mCustomScrollbar({
      axis: 'y',
      scrollButtons: {
        enable: false
      },
      autoHideScrollbar: false,
      keyboard: {
        enable: true
      },
      theme: 'dark'
    });

    if (!$body.hasClass('sidebar-open')) {
      scrollbar.mCustomScrollbar('destroy');
    }
  };

  // **********************************************************************//
  // ! Responsive tabs
  // **********************************************************************//
  var responsiveTabs = function () {
    var $responsiveTabs = $('.responsiveTabs');
    if ($responsiveTabs.length) {
      $responsiveTabs.responsiveTabs({
        startCollapsed: 'accordion'
      });
    }
  };

  var showNameFileUpload = function () {
    $('.file-selection').on('change', function () {
      var txt;
      if (!this.value == '') {
        var arr = this.value.split('\\');
        txt = arr[arr.length - 1];
      }
      $('.txt-upload').html(txt);
    });
  };
  //--------------- validate form---------------------
  var validateChangePDFForm = function () {
    var $validateForm = $('#change-pdf'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  //--------------- validate form---------------------
  var validateForm = function () {
    var $validateForm = $('#validate-form'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  //--------------- publisher email confirm---------------------
  var validateEmailForm = function () {
    var $validateForm = $('#publisher-email-confirm'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  //--------------- publisher password change---------------------
  var validatePasswordForm = function () {
    var $validateForm = $('#publisher-password-change'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  //--------------- validate form---------------------
  var validatePublisherEditForm = function () {
    var $validateForm = $('#publisher-edit-form'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  // **********************************************************************//
  // ! Popup Image
  // **********************************************************************//
  var popupLightItem = function () {
    var $thumbnail = $('[data-lightgallery="feature"]');

    if ($thumbnail.length > 0) {
      $thumbnail.lightGallery({
        download: false,
        counter: false,
        fullScreen: false,
        thumbContHeight: 150,
        selector: '.images-music'
      });
    }
  };

  // **********************************************************************//
  // ! Light Gallery
  // **********************************************************************//

  var popupLightGallery = function () {
    var $thumbnail = $('[data-lightgallery="thumbnail"]');
    if ($thumbnail.length > 0) {
      $thumbnail.lightGallery({
        download: false,
        counter: false,
        fullScreen: false,
        thumbContHeight: 150,
        selector: '.images-music',
        thumbnail: true
      });
    }
  };

  // **********************************************************************//
  // ! Add lightgallery
  // **********************************************************************//
  var disableAddSample = function () {
    var count = $("#nav-lightgallery li").length;
    if (typeof max_thumbnail_sample !== "undefined" && (count) == max_thumbnail_sample) {
      $('.nav-toolbar-score .add-sample').bind('click', function(){ return false; });
      $('.nav-toolbar-score .add-sample').addClass('disable');
    }
  };

  var addLightGallery = function () {
    var $btnAdd = $('[data-lightgallery="add"]');
    var base_url = window.location.origin;
    var src_image = base_url+'/theme/img/music-model.jpg';
    var sid = $('#parent-id').val();
    $btnAdd.on('click', function (e) {
      e.preventDefault();
      var count = $("#nav-lightgallery li").length;

      if((count) == max_thumbnail_sample ) {
        $('.nav-toolbar-score .add-sample').bind('click', function(){ return false; });
        $('.nav-toolbar-score .add-sample').addClass('disable');
      }

      var $thumbnail = $('[data-lightgallery="thumbnail"]');

      if ($thumbnail.data('lightGallery')) {
        $thumbnail.data('lightGallery').destroy(true);
        popupLightGallery();
      }
    });
  };

  // **********************************************************************//
  // ! Close Alert warning
  // **********************************************************************//
  var readURL = function () {
    var $upload = $('#upload-control');
    $upload.on('change', function () {
      var input = $(this)[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#upload-media').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  };

  // **********************************************************************//
  // ! Close Alert warning
  // **********************************************************************//
  var closeAlerts = function () {
    var $btnClose = $('[data-alert="close"]');
    $btnClose.on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
          $parent = $this.parents('.alert');
      $parent.fadeOut(500, function () {
        $(this).remove();
      });
    });
  };

  // **********************************************************************//
  // ! Fancybox Alert
  // **********************************************************************//
  var fancyAlert = function (msg) {

    // Show modal alert
    $.fancybox({
      'modal': true,
      'content': '<div class="fancybox-alert">' + '<h4 class="fancybox-title">' + msg + '</h4>' + '<div class="fancybox-button"><button class="button button-blue" id="button-close-alert">OK</button></div>' + '</div>'
    });

    // Close modal alert

    $('#button-close-alert').on('click', function () {
      $.fancybox.close();
    });
  };


  // **********************************************************************//
  // ! SelectCheckbox
  // **********************************************************************//

  var fancyConfirm = function (callback, modal) {
    $.fancybox(modal, {
      modal: true,
      padding: 0,
      afterShow: function () {
        $('.button', modal).on('click', function (event) {
          var $target = $(event.target);

          if ($target.is('.button-blue')) {
            status = true;
          } else if ($target.is('.button-gray') || $target.is('.button-close')) {
            status = false;
          }
          // Hide modal box
          $.fancybox.close();
        });
      },
      afterClose: function () {
        callback.call(this, status);
      }
    });
  };

  // Delete image
  $('.panel-body').on('click', '[data-action="delete-image"]', function (e) {
    e.preventDefault();
    var $this = $(this),
        $parents = $(this).parents($this.data('group')),
        $imgMusic = $parents.find('.images-music'),
        $imgMedia = $parents.find('.upload-media'),
        srcDefault = $imgMedia.data('src');

    fancyConfirm(function (respond) {
      if (respond) {
        $imgMusic.attr('href', srcDefault);
        $imgMedia.attr('src', srcDefault);

        // Hide modal
        $.fancybox.close();
       // console.log('success');
      } else {
       // console.log('failed');
      }
    }, '#fancybox-delete-image1');
  });

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
        if (!$btnDelete.hasClass('button-gray')) {
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

    // Delete a row in table
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
         // console.log('success');
        } else {
          //console.log('failed');
        }
      }, '#fancybox-confirm');
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
  };

  // *********************** form fancybox
  // *********************** form fancybox
  //fancybox recommend
    if(adminCountry != 'CN') {
        var listStore = ["glb", "jp", "us", "uk", "ca", "de", "it", "fr", "es", "at"];
    } else {
        var listStore = ["cn"];
    }

  var resetFormInnerFancyBox = function (modal) {
      var box = $(modal);
      if (box.length) {
          var form = box.find('form#change-pdf');
          if (form.length) {
              form.first().trigger("reset");
              form.find('.txt-upload').html(title_required_upload_file);
          }
      }
  };

  var fancyShow = function (callback, modal) {
    $.fancybox(modal, {
      modal: true,
      padding: 0,
      closeClick: true,
      afterShow: function () {
        $('.button-submit', modal).on('click', function (event) {
          var $target = $(event.target);
          $(this).parents('form').submit();
        });

        $('.button-close', modal).on('click', function (event) {
          var $target = $(event.target);
          $.fancybox.close();
          resetFormInnerFancyBox(modal);
        });

        $('.fancybox-overlay').click(function (event) {
          if (!$(event.target).closest('.fancybox-wrap').length) {
            if ($('.fancybox-wrap').is(':visible')) {
              $.fancybox.close();
              resetFormInnerFancyBox(modal);
            }
          }
        });
      },
      afterClose: function () {
        $('#expiry-date').val('');

        for ( var i=0; i<listStore.length; i++ ) {
          if ($('#price-setting-form-'+listStore[i]).length && (
              $('#price-setting-form-'+listStore[i]+' .input-text').hasClass('error') ||
              $('#price-setting-form-'+listStore[i]+' .input-error').css('display') == 'inline' ||
              $('#price-setting-form-'+listStore[i]+' #sale-price-end-date-error-'+listStore[i]).css('display') == 'inline' ||
              $('#price-setting-form-'+listStore[i]+' #sale-price-end-date-error1-'+listStore[i]).css('display') == 'inline'
              )
          ) {
            $("#price-setting-form-"+listStore[i]+" .input-error").hide();
            $('#price-setting-form-'+listStore[i])[0].reset();
            $("#price-setting-form-"+listStore[i]).validate().resetForm();
            $("#price-setting-form-"+listStore[i]+" .error").removeClass("error");
          }
        }

        for ( var i=0; i<listStore.length; i++ ) {
          if ($('#setting-publish-form-'+listStore[i]).length && ($('#setting-publish-form-'+listStore[i]+' #publish-end-date-error-'+listStore[i]).css('display') == 'inline'
              || $('#setting-publish-form-'+listStore[i]+' #publish-end-date-error1-'+listStore[i]).css('display') == 'inline')
          ) {
            $("#setting-publish-form-"+listStore[i]+" .input-error").hide();
            $('#setting-publish-form-'+listStore[i])[0].reset();
            $("#setting-publish-form-"+listStore[i]).validate().resetForm();

            $("#setting-publish-form-"+listStore[i]+" .error").removeClass("error");
          }
        }
        if( $('#change-pdf').length && ( $('#file-selection-error').hasClass('input-error') || $('#file-selection-error1').text()!='')){
          $("#change-pdf #file-selection-error1").html('');
          $("#change-pdf .txt-upload").html(title_required_upload_file);
          $("#change-pdf .txt-upload").css('color', 'grey');
          $("#change-pdf").validate().resetForm();
        }

        if($('#add-new-tax').length && $('.input-text').hasClass('error')){
          $('#add-new-tax')[0].reset();
          $("#add-new-tax").validate().resetForm();
          $("#add-new-tax .error").removeClass("error");

        }

        if($('#add-new-tax').length){
          $('#add-new-tax .input-text').val('');
        }

        if($('#edit-tax').length && $('.input-text').hasClass('error')){
          $('#edit-tax')[0].reset();
          $("#edit-tax").validate().resetForm();
          $("#edit-tax .error").removeClass("error");
        }

        callback.call(this, status);
      }
    });
  };

  var fancyboxFile = function ($btnname) {

    $($btnname).click(function (e) {
      var fancyboxname = $(this).data('href');
      e.preventDefault();
      fancyShow(function (respond) {}, fancyboxname);
    });
  };

// **********************************************************************//
  // ! Up;padfile
  // **********************************************************************//
  var uploadfile = function () {
    $('.file-selection').on('change', function () {
      var txt, title;
      if (!this.value == '') {
        var arr = this.value.split('\\');
        txt = arr[arr.length - 1];
        title =  arr[arr.length - 1];
        if(txt.length > 16) {
          txt = txt.substr(0,16)+'...';
        }
      }
      $('.txt-upload').html(txt);
      $('.txt-upload').attr('title', title);
    });
  };

// **********************************************************************//
// !  setting price score
// **********************************************************************//
  var validateSettingPrice = function () {
    $( "#price-setting-form" ).submit(function( event ) {
      var rental_setting = $('#rental-setting').val();
      var rental_price   = $('#rental-price').val();
      if (rental_setting == 1 && rental_price =='') {
        $('#rental-price-error').show();
        event.preventDefault();
      }
    });
  };

// **********************************************************************//
// ! Datetime picker
// **********************************************************************//
  var datepicker = function () {
    var $datepicker = $('.datetimepicker'),
        $imgCalender = $('.img-calendar'),
        $imgCalenderGroup = $('.group-datepicker img');

    if ($datepicker.length) {
      $datepicker.datepicker({
        format: 'Y/m/d',
        showButtonPanel: true,
        closeText: 'Clear', // Text to show for "close" button
        onClose: function (dateText, obj) {
          if ($(window.event.srcElement).hasClass('ui-datepicker-close'))
            $(this).val('');
        }
      });

      $imgCalender.on('click', function () {
        $(this).prev('.datetimepicker').focus();
      });

      $imgCalenderGroup.on('click', function () {
        $(this).prev('.datetimepicker').focus();
      });
    }

    $.datepicker.regional['ja']  = {
      closeText: "閉じる",
      prevText: "&#x3C;前",
      nextText: "次&#x3E;",
      currentText: "今日",
      monthNames: [ "1月","2月","3月","4月","5月","6月",
        "7月","8月","9月","10月","11月","12月" ],
      monthNamesShort: [ "1月","2月","3月","4月","5月","6月",
        "7月","8月","9月","10月","11月","12月" ],
      dayNames: [ "日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日" ],
      dayNamesShort: [ "日","月","火","水","木","金","土" ],
      dayNamesMin: [ "日","月","火","水","木","金","土" ],
      weekHeader: "週",
      dateFormat: "yy/mm/dd",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: "年" };
    $.datepicker.setDefaults($.datepicker.regional['ja']);


    for (var i = 0; i < 24 ; i++){
      if (i<10) {
        $('#hour-publish').append($('<option />').val(i).html('0'+i));
        $('#hour-publish-1').append($('<option />').val(i).html('0'+i));
      } else {
        $('#hour-publish').append($('<option />').val(i).html(i));
        $('#hour-publish-1').append($('<option />').val(i).html(i));
      }
    }

    for (i = 0; i < 60 ; i++){
      if (i<10) {
        $('#minute-publish').append($('<option />').val(i).html('0'+i));
        $('#minute-publish-1').append($('<option />').val(i).html('0'+i));
      } else {
        $('#minute-publish').append($('<option />').val(i).html(i));
        $('#minute-publish-1').append($('<option />').val(i).html(i));
      }
    }

  };

  //--------------- validate score create form---------------------
  var validateScoreCreateForm = function () {
    var $validateForm = $('#score-create-form'),
        $messageForm = $('#message-form');

    // Validate login form
    if ($validateForm.length > 0) {

      $validateForm.validate({
        errorLabelContainer: $messageForm,
        errorClass: 'input-error'
      });
    }
  };

  // **********************************************************************//

  var sortable = function () {
    if ($('.draggable-element').length > 0) {
      $('.draggable-element').arrangeable({ dragSelector: '.drag-area' });
    }
  };
  // **********************************************************************//
  // ! SlimScroll
  // **********************************************************************//
  var slimScroll_Sidebar = function () {
    var sw = $(window).width();
    var mainSidebar = $('.main-sidebar'),
        mainMenu = mainSidebar.find('.menu-global'),
        mainSidebarHeader = mainSidebar.find('.sidebar-header');
    if (sw > 767) {
      mainSidebar.css('padding-top', 60);
      mainMenu.slimScroll({ height: '100%', width: '100%', color: '#ffff', size: '10px',start: 'top',railVisible: true,
        alwaysVisible: true, wheelStep: 2});
      $('.main-sidebar').addClass('fixed');
      mainSidebarHeader.addClass('fixed');
      $('.sidebar-control').click(function () {
        if ($('body').hasClass('sidebar-open')) {
          mainMenu.removeClass('visible fixed');
          $('.slimScrollDiv').removeClass('visible');
        } else {
          mainMenu.addClass('visible');
          $('.slimScrollDiv').addClass('visible fixed');
        }
      });
    } else {
      $('.main-sidebar').removeClass('fixed');
      mainSidebar.css('padding-top', 0);
      mainSidebarHeader.removeClass('fixed');
      mainMenu.removeAttr('style');
      mainMenu.parents('.slimScrollDiv').removeAttr('style');
    }
  };

  // *********************** form disable
  var form_disable = function () {
    var prt = $('.disable');
    prt.find('select').attr('disabled', 'disabled');
  };

  var resetClick = function () {
    $("[type='reset']").click(function () {
      var inputs = $(this.closest("form")).find('input[type=text],input[type=number]');
      for (var i = 0; i < inputs.length; ++i) {
        $(inputs[i]).attr('value', '');
      }
      $('select option:selected').removeAttr('selected');
    });
  };



  // **********************************************************************//
  // ! UI block config
  // **********************************************************************//
  if ($.blockUI != undefined) {
    jQuery.extend($.blockUI.defaults, $.blockUI.defaults, {
      fadeIn: 1000,
      message: '<img src="' + rootUrl + 'theme/img/loader.gif">',
      css: {
        padding: 10,
        margin: 0,
        width: '30%',
        top: '40%',
        left: '35%',
        textAlign: 'center',
        cursor: 'wait',
        opacity: 0.8
      },
      overlayCSS: {
        backgroundColor: '#696969',
        opacity: 0.5,
        cursor: "wait"
      },
      baseZ: 1500
    });
  }



  // **********************************************************************//
  // ! Window dom ready
  // **********************************************************************//
  $(document).ready(function () {
    checkStatusDevice();
    menuGlobal();
    responsiveTabs();
    //selectCheckbox('.form');
    slimScroll_Sidebar();
    form_disable();
    resetClick();
    closeAlerts();
    readURL();

    disableAddSample();
    selectCheckbox('.form');
    validateForm();
    validateChangePDFForm();
    validateSettingPrice();
    validateScoreCreateForm();
    validatePublisherEditForm();
    validateEmailForm();
    validatePasswordForm();
    datepicker();
    popupLightItem();
    popupLightGallery();
    addLightGallery();
    uploadfile();
    checkActiveMenu();
    sortable();
    //fancyAlert('Nội dung message alert');
    /*fancybox score price setting*/
    fancyboxFile('.btn-change-file');
    /*fancybox score price setting*/
    fancyboxFile('.btn-sprice');
    /*fancybox score publish setting*/
    fancyboxFile('.btn-publish');
    /*fancybox score recommend*/
    fancyboxFile('.button-add-score');
    /*fancybox edit date recommend*/
    fancyboxFile('.button-edit-date');
    /*fancybox add new tax*/
    fancyboxFile('.add-tax');
    /*fancybox edit tax*/
    fancyboxFile('.edit-tax');
    /*fancybox delete tax*/
    fancyboxFile('.delete-tax');

  });

  // **********************************************************************//
  // ! Window resize
  // **********************************************************************//
  $(window).on('resize', function () {
    checkStatusDevice();
    slimScroll_Sidebar();
  });

  $(window).load(function () {
    slimScroll_Sidebar();
  });

  //**********************************************************************//
  // ! Block when submit form
  //**********************************************************************//
  $(".score-update-form").on('submit', function () {
    if ($(this).valid()) {
      $.blockUI();
    }
  });

  //**********************************************************************//
  // ! Fix position right sidebar menu
  //**********************************************************************//
  $('.panel-detail-center').css({'min-height': '800px'});
  $(window).scroll(function () {
    var $scrollDiv = $('.panel-detail-right');
    if (!$scrollDiv.length) return;
    if ($(window).height() < 800) {
      $scrollDiv.removeAttr('style');
      return;
    }
    if ($(window).width() >= 1200) {
      if ($(window).scrollTop() > 250)
        $scrollDiv.css({
          'position': 'fixed',
          'top': '90px',
          'right': '70px',
          'margin-right': 0,
        });
      else
        $scrollDiv.css({
          'position': 'relative',
          'right': '25px',
          'margin-right': '-280px',
          'margin-top': 0,
          'top': 0
        });
    } else {
      $scrollDiv.css({
        'position': 'static',
        'top': 'inherit',
        'right': 'inherit',
        'margin-right': 'inherit',
      });
    }
  });
})(jQuery);