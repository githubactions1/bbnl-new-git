exports.SbstnTypeSchema = { 
                                    "fields":  [ {"nm": "sbstn_type_nm","type":"varchar(120)","required":"true"},
									 {"nm": "sbstn_type_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["sbstn_type_id"],
                                    "keys": ["sbstn_type_id"]
                                 };