exports.PckgeSrvcpkTypeSchema = { 
                                    "fields":  [ {"nm": "srvcpk_type_nm","type":"varchar(120)","required":"true"},
									 {"nm": "srvcpk_type_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["srvcpk_type_id"],
                                    "keys": ["srvcpk_type_id"]
                                 };