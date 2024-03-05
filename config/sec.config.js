var pwdComplexity = {
    pubusers: {
        min_password_length: 8
        , max_password_length: 12
        , special_character_required: 1
        , mixed_case_required: true
        , min_uppercase_required: 1
        , min_lowercase_required: 1
        , digit_required: 1
        , password_expiry: 80
        , password_history_count: 5
        , max_inactive_days: 90
    }
    , adminusers: {
        min_password_length: 8
        , max_password_length: 12
        , special_character_required: 1
        , mixed_case_required: true
        , min_uppercase_required: 1
        , min_lowercase_required: 1
        , digit_required: 1
        , password_expiry: 80
        , password_history_count: 5
        , max_inactive_days: 90
    }
    , auto_generated_pwd: function () {
        return Array.apply(null, { 'length': 8 })
            .map(function () {
                var result;
                while (true) {
                    result = String.fromCharCode(Math.floor(Math.random() * 256));
                    if (/[a-zA-Z0-9_\-\+\.]/.test(result)) {
                        return result;
                    }
                }
            }, this)
            .join('');
    }
}

exports.pwdComplexity = pwdComplexity;