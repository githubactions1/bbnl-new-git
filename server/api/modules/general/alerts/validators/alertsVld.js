var cmdSch =  require('../../../validators/commonVld');

exports.FenceGrpSch = {
     "body": {
       'email': {
            notEmpty: true,
            isEmail: {
            errorMessage: 'Invalid Email'
            }
        },
        'password': {
            notEmpty: true,
            matches: {
            options: ['example', 'i'] // pass options to the validator with the options property as an array
            // options: [/example/i] // matches also accepts the full expression in the first parameter
            },
            errorMessage: 'Invalid Password' // Error message for the parameter
        },
        'a_in':cmdSch.commonSch.a_in_Rule
              

        },
        "query":{

        },
        "params":{

        },
        "header":cmdSch.commonSch.standardHeader

};


