$(document).ready(function () {

  jQuery.validator.addMethod('password_letter_number', function (value, element) {
    return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value);
  }, 'Pass with letter and number');
  
  jQuery.validator.addMethod('password_lower', function (value, element) {
    var regex = /[-~｡-ﾟ\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
    return this.optional(element) || !regex.test(value);
  }, '半角英数で入力してください。');

  jQuery.validator.addMethod("emailja", function(value, element) {
    return this.optional(element)||/^[a-zA-Z0-9.:;!#$%&@(\[\\)\]<>",'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+\.[a-zA-Z]{2,9}$/.test(value);
  }, 'Fomat email invalid');

  $('#form-login').validate({

    rules: {
      username: {
        required: true
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 32,
        password_letter_number: true,
        password_lower: true
      },
      email: {
        required: true,
        emailja: true
      },
      password1: {
        required: true,
        minlength: 8,
        maxlength: 32,
        password_lower: true,
        password_letter_number: true
      },
      password2: {
        required: true,
        equalTo: '.password1'
      },
      password3: {
        required: true
      }
    },
    messages: {
      username: {
        required: 'メールアドレスを入力してください。'
      },
      password: {
        required: 'パスワードを入力してください。',
        minlength: 'パスワードは8文字以上で入力してください｡',
        maxlength: 'パスワードは32文字以内で入力してください｡',
        password_letter_number: 'パスワードはアルファベットと数字を混合で入力してください。',
        password_lower: '半角英数で入力してください。'
      },
      email: {
        required: 'メールアドレスを入力してください。',
      },
      password1: {
        required: '新しいパスワードを入力してください。',
        minlength: 'パスワードは8文字以上で入力してください｡',
        maxlength: 'パスワードは32文字以内で入力してください｡',
        password_letter_number: 'パスワードはアルファベットと数字を混合で入力してください。',
        password_lower: '半角英数で入力してください。'
      },
      password2: {
        required: '新しいパスワード（確認）を入力してください。',
        equalTo: '入力したパスワードと確認用のパスワードが一致しません。',
        password_lower: '半角英数で入力してください。'
      },
      password3: {
        required: '現在のパスワードを入力してください。'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.form-login-error',
    wraper: 'li',
    errorClass: 'error-login'
  });

  jQuery("#form-login .input-text").change(function() {
    if (jQuery(".form-login-error").find(".error-login").length > 0){
      jQuery( ".form-login-error .error-login" ).remove();
    }
    if (jQuery(".form-login-error-sv").length > 0 && jQuery(".form-login-error-sv").find(".error-login").length > 0){
      jQuery( ".form-login-error-sv .error-login" ).remove();
    }
  });
});
//# sourceMappingURL=login.js.map
