exports.addUser = {
    "body": {
        'frst_nm': {
            notEmpty: true,
            isAlpha: {
                errorMessage: 'Invalid First Name' // Error message for the parameter
            }
        },
        'usr_nm': {
            notEmpty: true,
            errorMessage: 'User Name Required'
        },
        'mbl_nu': {
            notEmpty: true,
            isInt: {
                errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        }
    },
}
exports.updateUsrDtlsVld = {
    "body": {
        'frst_nm': {
            notEmpty: true,
            isAlpha: {
                errorMessage: 'Invalid First Name' // Error message for the parameter
            }
        },
        'mbl_nu': {
            notEmpty: true,
            isInt: {
                errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        },
    },

}
exports.updtPrflVld = {
    "body": {
        'eml_tx': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'mbl_nu': {
            notEmpty: true,
            isInt: {
                errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        },
        'frst_nm': {
            notEmpty: true,
            isAlpha: {
                errorMessage: 'Invalid First Name' // Error message for the parameter
            }
        }
    },

}
exports.updtPwdlVld = {
    "body": {
        'usrnm': {
            notEmpty: true,
            isAlpha: {
                errorMessage: 'Invalid User Name' // Error message for the parameter
            }
        },
        'mbl_nu': {
            notEmpty: true,
            isInt: {
                errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        },
        'newPassword': {
            notEmpty: true,
            errorMessage: 'Invalid Mobile Number'
        },
    },

};