exports.commonSch = {
     
    "standardHeader":{
            'clnt_id':{
                    notEmpty: true,
                    isInt:{
                    errorMessage: 'Invalid Client Id' // Error message for the parameter
                    },
            },'tnt_id':{
                    notEmpty: true,
                    isInt:{
                    errorMessage: 'Invalid Tenant Id' // Error message for the parameter
                    },           
            }   
    },

        'a_in_Rule':{
                notEmpty: false,
                isBoolean:{
                errorMessage: 'Only 0 and 1 are allowed for this field' // Error message for the parameter
                },
        }


};


