<?php
/**
 * Common app helper
 */

namespace App\Helpers;


class Helper
{
    /**
     * Generate error from validation message
     *
     * @param        $attribute
     * @param        $errors
     * @param string $type
     *
     * @return HTML string
     */
    public static function errorsFor($attribute, $errors, $type = 'login', $options = [])
    {
        switch ($type) {
            case 'login':
                $errorHtml = '<span class="error-login"> :message </span>';

                return $errors->first($attribute, $errorHtml);
            case 'account':
                $errorHtml = '<span class="error"> :message </span>';
                if ($errorId = array_get($options, 'id')) {
                    $errorHtml = '<span id="{ID}" class="error"> :message </span>';
                    $errorHtml = str_replace('{ID}', $errorId, $errorHtml);
                }
                return $errors->first($attribute, $errorHtml);
            case 'score':
                $errorHtml = '<span class="error"> :message </span>';

                if ($errorId = array_get($options, 'id')) {
                    $errorHtml = '<span id="{ID}" class="error"> :message </span>';
                    $errorHtml = str_replace('{ID}', $errorId, $errorHtml);
                }
                return $errors->first($attribute, $errorHtml);

            case 'common':
                $errorHtml = '<span id="{ID}" class="{CLASS}"> :message </span>';
                $errorId = array_get($options, 'id');
                $errorClass = array_get($options, 'class');
                if ($tag = array_get($options, 'tag')) {
                    $errorHtml = '<' . $tag . ' id="{ID}" class="{CLASS}"> :message </' . $tag . '>';
                }
                if ($errorId && $errorClass) {
                    $errorHtml = str_replace(['{ID}', '{CLASS}'], [$errorId, $errorClass], $errorHtml);
                } elseif ($errorId) {
                    $errorHtml = str_replace('class="{CLASS}"', '', $errorHtml);
                    $errorHtml = str_replace('{ID}', $errorId, $errorHtml);
                } elseif ($errorClass) {
                    $errorHtml = str_replace('id="{ID}"', '', $errorHtml);
                    $errorHtml = str_replace('{CLASS}', $errorClass, $errorHtml);
                } else {
                    $errorHtml = '<span class="error"> :message </span>';
                }
                return $errors->first($attribute, $errorHtml);
            default:
                return null;
        }

    }
}
