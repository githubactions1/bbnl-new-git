exports.CafTypeSchema = { 
                                    "fields":  [ {"nm": "caf_type_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_user_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_user_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["caf_type_id"],
                                    "keys": ["caf_type_id"]
                                 };