var log         = require(appRoot+'/utils/logmessages');
var std         = require(appRoot+'/utils/standardMessages');
/**************************************************************************************
* Controller     : validate_req_params
* Parameters     : None
* Description    : Utility function to validate if all the required fields are passed
* Change History :
* 04/16/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.validate_req_params =function(json_var,fields,callback){
	var t_json_var =json_var;
	//console.log("json keys  ::"+getJsonParams(json_var));
	var t_recvdFieldsArray = getJsonParams(json_var);
	var t_fieldArray = fields.split(',');
	var t_alwdFieldArray =[];
	// Build array of allowd fields names
	for(var i=0;i<t_fieldArray.length;i++){
		var t_field_dtl=t_fieldArray[i].split(':');
		t_alwdFieldArray.push(t_field_dtl[0]);
	}
	// Check if any invalid feilds are send.
    for(var k=0;k<t_recvdFieldsArray.length;k++){
    	if(t_alwdFieldArray.indexOf(t_recvdFieldsArray[k])<0){
    		callback(false, {"status":std.message.UN_REQ_FIELDS.code,"msg":std.message.UN_REQ_FIELDS.message+". Please check attribure '"+t_recvdFieldsArray[k]+"'. Only allowed feilds are "+t_alwdFieldArray});
					return;
    	}
    }  
    // validate for the required fields and their data types.
	for(var i=0;i<t_fieldArray.length;i++){
			var t_field_dtl=t_fieldArray[i].split(':');
			if(t_field_dtl.length<3) {
					callback(false, {"status":std.message.IVALID_DATA.code,"msg":"Invalid Parameters"});
					return;
			}else if(t_field_dtl[1] == 1) {
					if(json_var[t_field_dtl[0]] === undefined || json_var[t_field_dtl[0]] == null || json_var[t_field_dtl[0]] == "") {
						callback(false, {"status":std.message.NO_REQ_FIELDS.code,"msg":t_field_dtl[0]+" is a required field and can not be empty."});
						return;
				    }else{
				    	if(t_field_dtl[2] == "decVal") { null;}
						else if (t_field_dtl[2] == "intVal") { 
							if(!isInt(json_var[t_field_dtl[0]])){
								callback(false, {"status":message.IVALID_DATA.code,"msg":t_field_dtl[0]+" is not a valied Integer."});
							    return;
							}
						}
						else if (t_field_dtl[2] == "dateVal") { 
							if(!isValidDate(json_var[t_field_dtl[0]])) {
								callback(false, {"status":std.message.IVALID_DATE.code,"msg":t_field_dtl[0]+" is not in valid date format. All date fields need to be "+STD_DATE_FORMAT+" format."});
								return;
							}
						}
						else if (t_field_dtl[2] == "bolVal") { 
							if(json_var[t_field_dtl[0]] !=1 & json_var[t_field_dtl[0]]!=0){
								callback(false, {"status":std.message.IVALID_DATA.code,"msg":t_field_dtl[0]+" is not valied boolean value. Only 1 or 0 are accepted values for this field."});
								return;
							}
						}
						else if (t_field_dtl[2] == "dblVal") { null;}
						else if (t_field_dtl[2] == "emlVal") { null;}
						else if (t_field_dtl[2] == "phVal") { null;}
						else if (t_field_dtl[2] == "latlngVal") { null;}
						else { 
							console.log("in else for validation");
						}
				    }
			}else{
					//console.log(" Not a required field :: "+t_field_dtl[0]+ " :: "+t_field_dtl[1]);
					if(json_var[t_field_dtl[0]] === undefined ) {
						
						if(t_field_dtl[2] == "decVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "intVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "dateVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "dblVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "emlVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "phVal") t_field_dtl[2] = null
						else if (t_field_dtl[2] == "latlngVal") t_field_dtl[2] = null
						else t_json_var[t_field_dtl[0]] = "";
					}
			}

	}
	callback(false, {"status":1,"msg":null,"data":t_json_var});
	return;
}
/**************************************************************************************
* Controller     : validate_nonreq_params
* Parameters     : None
* Description    : Utility function to validate if all the optional fields are passed
* Change History :
* 04/16/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.validate_nonreq_params =function(json_var,fields){
	var t_fieldArray = fields.split(',');
	for(var i=0;i<t_fieldArray.length;i++){
		//console.log("json_var[i] :: "+t_fieldArray[i]+" :: "+json_var[t_fieldArray[i]]);
		if(json_var[t_fieldArray[i]] === undefined ) {
			return {"status":0,"msg":t_fieldArray[i]+" is required field.If not value, please send null or an empty string."}
		}
	}
	return {"status":1,"msg":null};
}

/**************************************************************************************
* Controller     : validate_nonreq_params
* Parameters     : None
* Description    : Utility function to validate if all the optional fields are passed
* Change History :
* 04/16/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.add_optional_feilds =function(json_var,fields){
	var t_json_var =json_var;
	var t_fieldArray = fields.split(',');
	for(var i=0;i<t_fieldArray.length;i++){
		if(json_var[t_fieldArray[i]] === undefined ) {
			t_json_var[t_fieldArray[i]] = "";
		}
	}
	return t_json_var;
}

/**************************************************************************************
* Controller     : isValidDate
* Parameters     : None
* Description    : validates a date format
* Change History :
* 04/16/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
var isValidDate = function(date_field){
	return moment(date_field, STD_DATE_FORMAT,true).isValid();
}

/**************************************************************************************
* Controller     : isInt
* Parameters     : None
* Description    : validates a  integer
* Change History :
* 04/16/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
var isInt = function(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}


var getJsonParams = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

var isEmail = function(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

var isPhoneNumber = function(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}

var isAlphaNum = function(field) 
{
    var re = /^[a-z0-9]+$/i;
    return re.test(field);
}
