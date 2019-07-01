<div class="operator-form">
    {!!
        Form::open(
            [
                'url' => route('user-edit', [$id]),
                'method' => 'post',
                'id' => 'user-edit',
                'class' => 'publisher-edit-basic-form',
                'enctype' => 'multipart/form-data',
            ]
        )
    !!}
    <div class="responsive-table">
        <table class="table table-bordered">
            <tr>
                <td>
                    <label for="company-name">{{ __('First name') }}</label>
                </td>
                <td>
                    {!!
                        Form::text(
                            'first_name',
                            old('first_name'),
                            [
                                "id" => "first_name",
                                "class" => "input-text input-text60",
                                "data-rule-required" => "true",
                                "data-rule-maxlength" => "255",
                                "data-msg-required" => __('view/publisher.publisher_edit.company_name_required'),
                                "data-msg-maxlength" => __('view/publisher.publisher_edit.company_name_maxlength'),
                            ]
                        )
                    !!}
                    {!! Helper::errorsFor('publisher.company_name', $errors, 'common') !!}
                    <span class="note">{{ __('view/publisher.publisher_edit.company_name_example') }}</span>
                </td>
                <td>
                    <label for="company-name">{{ __('First name') }}</label>
                </td>
                <td>
                    {!!
                        Form::text(
                            'last_name',
                            old('last_name'),
                            [
                                "id" => "last_name",
                                "class" => "input-text input-text60",
                                "data-rule-required" => "true",
                                "data-rule-maxlength" => "255",
                                "data-msg-required" => __('view/publisher.publisher_edit.company_name_required'),
                                "data-msg-maxlength" => __('view/publisher.publisher_edit.company_name_maxlength'),
                            ]
                        )
                    !!}
                    {!! Helper::errorsFor('publisher.company_name', $errors, 'common') !!}
                    <span class="note">{{ __('view/publisher.publisher_edit.company_name_example') }}</span>
                </td>
                <td>
                    {!!
                        Form::text(
                            'birthday',
                            old('birthday'),
                            [
                                "id" => "birthday",
                                "class" => "input-text input-text60",
                                "data-rule-required" => "true",
                                "data-rule-maxlength" => "255",
                                "data-msg-required" => __('view/publisher.publisher_edit.company_name_required'),
                                "data-msg-maxlength" => __('view/publisher.publisher_edit.company_name_maxlength'),
                            ]
                        )
                    !!}
                    <img src="{{ URL::asset('theme/img/calendar.png') }}" alt="calendar" width="18" class="img-calendar" style="position: absolute;top: 6px; right: 4px;">
                </td>
                <td>
                    <label for="company-name">{{ __('avatar') }}</label>
                </td>
                <td>
                    {!!
                        Form::file(
                            'avatar',
                            old('avatar'),
                            [
                                "id" => "avatar",
                                "class" => "input-text input-text60",
                                "data-rule-required" => "true",
                                "data-rule-maxlength" => "255",
                                "data-msg-required" => __('view/publisher.publisher_edit.company_name_required'),
                                "data-msg-maxlength" => __('view/publisher.publisher_edit.company_name_maxlength'),
                            ]
                        )
                    !!}
                    {!! Helper::errorsFor('publisher.company_name', $errors, 'common') !!}
                    <span class="note">{{ __('view/publisher.publisher_edit.company_name_example') }}</span>
                </td>
            </tr>
        </table>
    </div>
    <div class="form-group text-center">
        <input type="submit" value="{{ __('view/publisher.publisher_edit.edit_confirm_btn') }}" class="button button-large">
    </div>
    {!! Form::close() !!}
</div>