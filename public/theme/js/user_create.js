/**
 *  validate create user form
 */
$(document).ready(function () {

    var userCreate = function () {
        $('.user-lb').css('float', 'left');
        $('.user-lb').css('padding', '4px');
    };

    jQuery.validator.addMethod('password_lower', function (value, element) {
        var regex = /[-~｡-ﾟ\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
        return this.optional(element) || !regex.test(value);
    }, '半角英数で入力してください。');

    jQuery.validator.addMethod('password_letter_number', function (value, element) {
        return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value);
    }, 'パスワードはアルファベットと数字を混合で入力してください。');

    jQuery.validator.addMethod('give_name_valid', function (value, element) {
        return this.optional(element) || /^[[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[a-zA-Z]+|[ａ-ｚＡ-Ｚ]+[々〆〤]+$/.test(value);
    }, '名を入力してください。');

    jQuery.validator.addMethod('family_name_valid', function (value, element) {
        return this.optional(element) || /^[[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[a-zA-Z]+|[ａ-ｚＡ-Ｚ]+[々〆〤]+$/.test(value);
    }, '姓を入力してください。');

    jQuery.validator.addMethod("emailja", function(value, element) {
        return this.optional(element)||/^[a-zA-Z0-9.:;!#$%&@(\[\\)\]<>",'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+\.[a-zA-Z]{2,9}$/.test(value);
    }, '正しいメールアドレスを入力してください。');

    jQuery.validator.addMethod("notEqual", function(value, element, param) {
        return this.optional(element) || value != param;
    }, "This has to be different...");
    // validate phone
    jQuery.validator.addMethod("phoneNumber", function(value, element) {
        return this.optional(element)||/^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/u.test(value);
    }, '電話番号は半角数字で入力してください。');
    $('#user-create-form').validate({
        rules: {
            give_name: {
                required: true,
                give_name_valid: true,
                maxlength: 32
            },
            family_name: {
                required: true,
                family_name_valid: true,
                maxlength: 32
            },
            email: {
                required: true,
                emailja: true,

                remote: {
                    url: USER_ACC_EMAIL_CHECK,
                    type: "post",
                    headers: {
                        'X-CSRF-TOKEN': $('input[name="_token"]').val()
                    },
                    data: {
                        email: function () {
                            return $('#user-create-form :input[name="email"]').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 32,
                password_lower: true,
                password_letter_number: true
            },
            password_confirm: {
                required: true,
                equalTo : '[name="password"]'
            },
            country_code: {
                required: true,
                notEqual : 0
            },
            nickname: {
                required: true,
                maxlength: 16,

            },
            country: {
                required: true
            }
        },
        messages: {
            give_name: {
                required: '名を入力してください。',
                maxlength: '名は32文字以内で入力してください｡'
            },
            family_name: {
                required: '姓を入力してください。',
                maxlength: '姓は32文字以内で入力してください｡'
            },
            email: {
                required: 'メールアドレスを入力してください。',
                email: '正しいメールアドレスを入力してください。',
                remote: 'メールアドレス は既に存在します。'
            },
            password: {
                required: 'パスワードを入力してください。',
                minlength: 'パスワードは8文字以上で入力してください｡',
                maxlength: 'パスワードは32文字以内で入力してください｡'
            },
            password_confirm: {
                required: 'パスワード（確認）を入力してください。',
                equalTo: '入力したパスワードと確認用のパスワードが一致しません。'
            },
            country_code: {
                required: 'パスワード（確認）を入力してください。',
                notEqual: 'お国を入力してください。'
            },
            nickname: {
                required: 'ニックネームを入力してください。',
                maxlength: 'ニックネームは16文字以内で入力してください｡'
            },
            country: {
                required: '国を選択してください。'
            }
        },
        errorElement: 'span'
    });

    var checkAccount = function () {
        var $is_b2b = parseInt($('select[name="is_b2b"]').val());
        var field_hide_on_b2b =  $('.is_hide_on_b2b');

        if (0 === $is_b2b) {
            $('#max_device').children('td').hide();
            field_hide_on_b2b.show();
        } else {
            $.blockUI();
            $('#max_device').children('td').show();
            field_hide_on_b2b.hide();
            $.unblockUI();
        }
    };

    checkAccount();
    $('select[name="is_b2b"]').change( function () {
        checkAccount();
    });

    // Submit click handle
    $('#accountCreateBtn').on('click', function (event) {
        event.preventDefault();
        $form = $(this).closest('form');
        var birthdayValid = birthdayValidate();
        if ($form.valid() && birthdayValid) {
            $.blockUI();
            $form.submit();
        }
    });

    if ($('select[name="country_code"]').val() != 'GLB') {
        $('#country_tr').children('td').remove();
    }

    $('select[name="country_code"]').change( function (e) {
    if ($('select[name="country_code"]').val() == 'GLB') {
        $('#country_tr').append(
            '<td><span>国</span></td>\n' +
            '<td>\n' +
            '<select name="country" id="country" class="input-text input-text-350" style="padding-top: 0!important;">\n' +
            '<option value="" selected="selected">Country...</option>\n' +
            '<option value="Afghanistan">Afghanistan</option>\n' +
            '<option value="Albania">Albania</option>\n' +
            '<option value="Algeria">Algeria</option>\n' +
            '<option value="American Samoa">American Samoa</option>\n' +
            '<option value="Andorra">Andorra</option>\n' +
            '<option value="Angola">Angola</option>\n' +
            '<option value="Anguilla">Anguilla</option>\n' +
            '<option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>\n' +
            '<option value="Argentina">Argentina</option>\n' +
            '<option value="Armenia">Armenia</option>\n' +
            '<option value="Aruba">Aruba</option>\n' +
            '<option value="Australia">Australia</option>\n' +
            '<option value="Austria">Austria</option>\n' +
            '<option value="Azerbaijan">Azerbaijan</option>\n' +
            '<option value="Bahamas">Bahamas</option>\n' +
            '<option value="Bahrain">Bahrain</option>\n' +
            '<option value="Bangladesh">Bangladesh</option>\n' +
            '<option value="Barbados">Barbados</option>\n' +
            '<option value="Belarus">Belarus</option>\n' +
            '<option value="Belgium">Belgium</option>\n' +
            '<option value="Belize">Belize</option>\n' +
            '<option value="Benin">Benin</option>\n' +
            '<option value="Bermuda">Bermuda</option>\n' +
            '<option value="Bhutan">Bhutan</option>\n' +
            '<option value="Bolivia">Bolivia</option>\n' +
            '<option value="Bonaire">Bonaire</option>\n' +
            '<option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>\n' +
            '<option value="Botswana">Botswana</option>\n' +
            '<option value="Brazil">Brazil</option>\n' +
            '<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>\n' +
            '<option value="Brunei">Brunei</option>\n' +
            '<option value="Bulgaria">Bulgaria</option>\n' +
            '<option value="Burkina Faso">Burkina Faso</option>\n' +
            '<option value="Burundi">Burundi</option>\n' +
            '<option value="Cambodia">Cambodia</option>\n' +
            '<option value="Cameroon">Cameroon</option>\n' +
            '<option value="Canada">Canada</option>\n' +
            '<option value="Canary Islands">Canary Islands</option>\n' +
            '<option value="Cape Verde">Cape Verde</option>\n' +
            '<option value="Cayman Islands">Cayman Islands</option>\n' +
            '<option value="Central African Republic">Central African Republic</option>\n' +
            '<option value="Chad">Chad</option>\n' +
            '<option value="Channel Islands">Channel Islands</option>\n' +
            '<option value="Chile">Chile</option>\n' +
            '<option value="China">China</option>\n' +
            '<option value="Christmas Island">Christmas Island</option>\n' +
            '<option value="Cocos Island">Cocos Island</option>\n' +
            '<option value="Colombia">Colombia</option>\n' +
            '<option value="Comoros">Comoros</option>\n' +
            '<option value="Congo">Congo</option>\n' +
            '<option value="Cook Islands">Cook Islands</option>\n' +
            '<option value="Costa Rica">Costa Rica</option>\n' +
            '<option value="Cote D\'Ivoire">Cote D\'Ivoire</option>\n' +
            '<option value="Croatia">Croatia</option>\n' +
            '<option value="Cuba">Cuba</option>\n' +
            '<option value="Curacao">Curacao</option>\n' +
            '<option value="Cyprus">Cyprus</option>\n' +
            '<option value="Czech Republic">Czech Republic</option>\n' +
            '<option value="Denmark">Denmark</option>\n' +
            '<option value="Djibouti">Djibouti</option>\n' +
            '<option value="Dominica">Dominica</option>\n' +
            '<option value="Dominican Republic">Dominican Republic</option>\n' +
            '<option value="East Timor">East Timor</option>\n' +
            '<option value="Ecuador">Ecuador</option>\n' +
            '<option value="Egypt">Egypt</option>\n' +
            '<option value="El Salvador">El Salvador</option>\n' +
            '<option value="Equatorial Guinea">Equatorial Guinea</option>\n' +
            '<option value="Eritrea">Eritrea</option>\n' +
            '<option value="Estonia">Estonia</option>\n' +
            '<option value="Ethiopia">Ethiopia</option>\n' +
            '<option value="Falkland Islands">Falkland Islands</option>\n' +
            '<option value="Faroe Islands">Faroe Islands</option>\n' +
            '<option value="Fiji">Fiji</option>\n' +
            '<option value="Finland">Finland</option>\n' +
            '<option value="France">France</option>\n' +
            '<option value="French Guiana">French Guiana</option>\n' +
            '<option value="French Polynesia">French Polynesia</option>\n' +
            '<option value="French Southern Ter">French Southern Ter</option>\n' +
            '<option value="Gabon">Gabon</option>\n' +
            '<option value="Gambia">Gambia</option>\n' +
            '<option value="Georgia">Georgia</option>\n' +
            '<option value="Germany">Germany</option>\n' +
            '<option value="Ghana">Ghana</option>\n' +
            '<option value="Gibraltar">Gibraltar</option>\n' +
            '<option value="Great Britain">Great Britain</option>\n' +
            '<option value="Greece">Greece</option>\n' +
            '<option value="Greenland">Greenland</option>\n' +
            '<option value="Grenada">Grenada</option>\n' +
            '<option value="Guadeloupe">Guadeloupe</option>\n' +
            '<option value="Guam">Guam</option>\n' +
            '<option value="Guatemala">Guatemala</option>\n' +
            '<option value="Guinea">Guinea</option>\n' +
            '<option value="Guyana">Guyana</option>\n' +
            '<option value="Haiti">Haiti</option>\n' +
            '<option value="Hawaii">Hawaii</option>\n' +
            '<option value="Honduras">Honduras</option>\n' +
            '<option value="Hong Kong">Hong Kong</option>\n' +
            '<option value="Hungary">Hungary</option>\n' +
            '<option value="Iceland">Iceland</option>\n' +
            '<option value="India">India</option>\n' +
            '<option value="Indonesia">Indonesia</option>\n' +
            '<option value="Iran">Iran</option>\n' +
            '<option value="Iraq">Iraq</option>\n' +
            '<option value="Ireland">Ireland</option>\n' +
            '<option value="Isle of Man">Isle of Man</option>\n' +
            '<option value="Israel">Israel</option>\n' +
            '<option value="Italy">Italy</option>\n' +
            '<option value="Jamaica">Jamaica</option>\n' +
            '<option value="Japan">Japan</option>\n' +
            '<option value="Jordan">Jordan</option>\n' +
            '<option value="Kazakhstan">Kazakhstan</option>\n' +
            '<option value="Kenya">Kenya</option>\n' +
            '<option value="Kiribati">Kiribati</option>\n' +
            '<option value="Korea North">Korea North</option>\n' +
            '<option value="Korea South">Korea South</option>\n' +
            '<option value="Kuwait">Kuwait</option>\n' +
            '<option value="Kyrgyzstan">Kyrgyzstan</option>\n' +
            '<option value="Laos">Laos</option>\n' +
            '<option value="Latvia">Latvia</option>\n' +
            '<option value="Lebanon">Lebanon</option>\n' +
            '<option value="Lesotho">Lesotho</option>\n' +
            '<option value="Liberia">Liberia</option>\n' +
            '<option value="Libya">Libya</option>\n' +
            '<option value="Liechtenstein">Liechtenstein</option>\n' +
            '<option value="Lithuania">Lithuania</option>\n' +
            '<option value="Luxembourg">Luxembourg</option>\n' +
            '<option value="Macau">Macau</option>\n' +
            '<option value="Macedonia">Macedonia</option>\n' +
            '<option value="Madagascar">Madagascar</option>\n' +
            '<option value="Malaysia">Malaysia</option>\n' +
            '<option value="Malawi">Malawi</option>\n' +
            '<option value="Maldives">Maldives</option>\n' +
            '<option value="Mali">Mali</option>\n' +
            '<option value="Malta">Malta</option>\n' +
            '<option value="Marshall Islands">Marshall Islands</option>\n' +
            '<option value="Martinique">Martinique</option>\n' +
            '<option value="Mauritania">Mauritania</option>\n' +
            '<option value="Mauritius">Mauritius</option>\n' +
            '<option value="Mayotte">Mayotte</option>\n' +
            '<option value="Mexico">Mexico</option>\n' +
            '<option value="Midway Islands">Midway Islands</option>\n' +
            '<option value="Moldova">Moldova</option>\n' +
            '<option value="Monaco">Monaco</option>\n' +
            '<option value="Mongolia">Mongolia</option>\n' +
            '<option value="Montserrat">Montserrat</option>\n' +
            '<option value="Morocco">Morocco</option>\n' +
            '<option value="Mozambique">Mozambique</option>\n' +
            '<option value="Myanmar">Myanmar</option>\n' +
            '<option value="Nambia">Nambia</option>\n' +
            '<option value="Nauru">Nauru</option>\n' +
            '<option value="Nepal">Nepal</option>\n' +
            '<option value="Netherland Antilles">Netherland Antilles</option>\n' +
            '<option value="Netherlands">Netherlands (Holland, Europe)</option>\n' +
            '<option value="Nevis">Nevis</option>\n' +
            '<option value="New Caledonia">New Caledonia</option>\n' +
            '<option value="New Zealand">New Zealand</option>\n' +
            '<option value="Nicaragua">Nicaragua</option>\n' +
            '<option value="Niger">Niger</option>\n' +
            '<option value="Nigeria">Nigeria</option>\n' +
            '<option value="Niue">Niue</option>\n' +
            '<option value="Norfolk Island">Norfolk Island</option>\n' +
            '<option value="Norway">Norway</option>\n' +
            '<option value="Oman">Oman</option>\n' +
            '<option value="Pakistan">Pakistan</option>\n' +
            '<option value="Palau Island">Palau Island</option>\n' +
            '<option value="Palestine">Palestine</option>\n' +
            '<option value="Panama">Panama</option>\n' +
            '<option value="Papua New Guinea">Papua New Guinea</option>\n' +
            '<option value="Paraguay">Paraguay</option>\n' +
            '<option value="Peru">Peru</option>\n' +
            '<option value="Philippines">Philippines</option>\n' +
            '<option value="Pitcairn Island">Pitcairn Island</option>\n' +
            '<option value="Poland">Poland</option>\n' +
            '<option value="Portugal">Portugal</option>\n' +
            '<option value="Puerto Rico">Puerto Rico</option>\n' +
            '<option value="Qatar">Qatar</option>\n' +
            '<option value="Republic of Montenegro">Republic of Montenegro</option>\n' +
            '<option value="Republic of Serbia">Republic of Serbia</option>\n' +
            '<option value="Reunion">Reunion</option>\n' +
            '<option value="Romania">Romania</option>\n' +
            '<option value="Russia">Russia</option>\n' +
            '<option value="Rwanda">Rwanda</option>\n' +
            '<option value="St Barthelemy">St Barthelemy</option>\n' +
            '<option value="St Eustatius">St Eustatius</option>\n' +
            '<option value="St Helena">St Helena</option>\n' +
            '<option value="St Kitts-Nevis">St Kitts-Nevis</option>\n' +
            '<option value="St Lucia">St Lucia</option>\n' +
            '<option value="St Maarten">St Maarten</option>\n' +
            '<option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>\n' +
            '<option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>\n' +
            '<option value="Saipan">Saipan</option>\n' +
            '<option value="Samoa">Samoa</option>\n' +
            '<option value="Samoa American">Samoa American</option>\n' +
            '<option value="San Marino">San Marino</option>\n' +
            '<option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>\n' +
            '<option value="Saudi Arabia">Saudi Arabia</option>\n' +
            '<option value="Senegal">Senegal</option>\n' +
            '<option value="Serbia">Serbia</option>\n' +
            '<option value="Seychelles">Seychelles</option>\n' +
            '<option value="Sierra Leone">Sierra Leone</option>\n' +
            '<option value="Singapore">Singapore</option>\n' +
            '<option value="Slovakia">Slovakia</option>\n' +
            '<option value="Slovenia">Slovenia</option>\n' +
            '<option value="Solomon Islands">Solomon Islands</option>\n' +
            '<option value="Somalia">Somalia</option>\n' +
            '<option value="South Africa">South Africa</option>\n' +
            '<option value="Spain">Spain</option>\n' +
            '<option value="Sri Lanka">Sri Lanka</option>\n' +
            '<option value="Sudan">Sudan</option>\n' +
            '<option value="Suriname">Suriname</option>\n' +
            '<option value="Swaziland">Swaziland</option>\n' +
            '<option value="Sweden">Sweden</option>\n' +
            '<option value="Switzerland">Switzerland</option>\n' +
            '<option value="Syria">Syria</option>\n' +
            '<option value="Tahiti">Tahiti</option>\n' +
            '<option value="Taiwan">Taiwan</option>\n' +
            '<option value="Tajikistan">Tajikistan</option>\n' +
            '<option value="Tanzania">Tanzania</option>\n' +
            '<option value="Thailand">Thailand</option>\n' +
            '<option value="Togo">Togo</option>\n' +
            '<option value="Tokelau">Tokelau</option>\n' +
            '<option value="Tonga">Tonga</option>\n' +
            '<option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>\n' +
            '<option value="Tunisia">Tunisia</option>\n' +
            '<option value="Turkey">Turkey</option>\n' +
            '<option value="Turkmenistan">Turkmenistan</option>\n' +
            '<option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>\n' +
            '<option value="Tuvalu">Tuvalu</option>\n' +
            '<option value="Uganda">Uganda</option>\n' +
            '<option value="Ukraine">Ukraine</option>\n' +
            '<option value="United Arab Erimates">United Arab Emirates</option>\n' +
            '<option value="United Kingdom">United Kingdom</option>\n' +
            '<option value="United States of America">United States of America</option>\n' +
            '<option value="Uruguay">Uruguay</option>\n' +
            '<option value="Uzbekistan">Uzbekistan</option>\n' +
            '<option value="Vanuatu">Vanuatu</option>\n' +
            '<option value="Vatican City State">Vatican City State</option>\n' +
            '<option value="Venezuela">Venezuela</option>\n' +
            '<option value="Vietnam">Vietnam</option>\n' +
            '<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>\n' +
            '<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>\n' +
            '<option value="Wake Island">Wake Island</option>\n' +
            '<option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>\n' +
            '<option value="Yemen">Yemen</option>\n' +
            '<option value="Zaire">Zaire</option>\n' +
            '<option value="Zambia">Zambia</option>\n' +
            '<option value="Zimbabwe">Zimbabwe</option>\n' +
            '</select>\n' +
            '<br>\n' +
            '\n' +
            '</td>'
        );
    } else {
        $('#country_tr').children('td').remove();
    }
    });

    // Check validate birthday
    $('#birthday-selector select').on('change', function(){
        birthdayValidate();
    });

    var birthdayValidate = function () {
        var selectedDate = $('#years-birthday option:selected').val() + '/' + $('#months-birthday option:selected').val() + '/' + $('#days-birthday option:selected').val();
        var d = new Date();
        var now = d.getFullYear() + '/' + (d.getMonth()+1) + '/' +  d.getDate();

        // Set date to hidden
        $('#birthday-date-input').val(selectedDate);

        if(selectedDate >= now) {
                $('#years-birthday-error').show();
            return false;
        }else {
            $('#years-birthday-error').hide();

            return true;
        }
    }

});