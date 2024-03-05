var cmdSch =  require('../../../validators/commonVld');

var isAlpha = function(field) {
    var re = /\A[a-z0-9\s]+\Z/i;
    return re.test(field);
}

var isPwd = function(field) {
    var pwd = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/;
    return pwd.test(field);
}


exports.usrmngtVld = {
   "body": {
       'usr_nm': {
            notEmpty: true,
            errorMessage: 'User Name Required'
        },
        'eml_tx': {
            notEmpty: true,
            isEmail: {
            errorMessage: 'Invalid Email'
            }
        },
        'clnt_id':{
            notEmpty: true,
            isInt:{
            errorMessage: 'Invalid Client Id' // Error message for the parameter
            }
        },
        'tnt_id':{
            notEmpty: true,
            isInt:{
            errorMessage: 'Invalid Tenant Id' // Error message for the parameter
            }
        },
        'frst_nm':{
            notEmpty: true,
            isAlpha:{
            errorMessage: 'Invalid First Name' // Error message for the parameter
            }
        },
        'lst_nm':{
            notEmpty: true,
            isAlpha:{
            errorMessage: 'Invalid Last Name' // Error message for the parameter
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
        'mbl_nu':{
            notEmpty: true,
            isInt:{
            errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        },
        'dsgn_id':{
        notEmpty: true,
        isInt:{
        errorMessage: 'Invalid Designation Id' // Error message for the parameter
           }
        },
        'frst_nm':{
            notEmpty: true,
            isAlpha:{
            errorMessage: 'Invalid First Name' // Error message for the parameter
            }
        },
        'lst_nm':{
            notEmpty: true,
            isAlpha:{
            errorMessage: 'Invalid Last Name' // Error message for the parameter
            }
        },
    },
    
}
exports.updtPwdlVld = {
   "body": {
        'usrnm':{
            notEmpty: true,
            isAlpha:{
            errorMessage: 'Invalid User Name' // Error message for the parameter
            }
        },
        'mbl_nu':{
            notEmpty: true,
            isInt:{
            errorMessage: 'Invalid Mobile Number' // Error message for the parameter
            }
        },
        'newPassword':{
            notEmpty: true,
            errorMessage: 'Invalid Mobile Number'
        },
    },
    
};