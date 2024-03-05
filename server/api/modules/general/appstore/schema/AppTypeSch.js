exports.AppTypeSchema = { 
                                    "fields":  [ {"nm": "app_type_nm","type":"bigint(11)","required":"false"},
									 {"nm": "app_type_dscn_tx","type":"varchar(120)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["app_type_id,app_type_nm,app_type_dscn_tx"],
                                    "keys": ["app_type_id"]
                                 };